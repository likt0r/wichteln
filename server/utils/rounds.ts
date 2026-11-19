import { and, eq, lt, lte, or } from "drizzle-orm";
import { groups, members } from "../database/schema";

type Group = typeof groups.$inferSelect;
type Member = typeof members.$inferSelect;
type MemberRef = Pick<Member, "id" | "personId">;

/** The first round's group id; legacy groups without series are their own series */
export const seriesIdOf = (group: Pick<Group, "id" | "seriesId">) => group.seriesId ?? group.id;

/** Stable id of a person across rounds */
export const personIdOf = (member: MemberRef) => member.personId ?? member.id;

const pairKey = (giverPerson: string, receiverPerson: string) => `${giverPerson}>${receiverPerson}`;

const inSeries = (seriesId: string) => or(eq(groups.id, seriesId), eq(groups.seriesId, seriesId));

/** All members of a series' rounds up to and including `maxRound`, with their round */
async function seriesMembers(seriesId: string, maxRound: number) {
  if (maxRound < 1) return [];
  return db
    .select({
      id: members.id,
      personId: members.personId,
      name: members.name,
      targetMemberId: members.targetMemberId,
      round: groups.round,
    })
    .from(members)
    .innerJoin(groups, eq(members.groupId, groups.id))
    .where(and(inSeries(seriesId), lte(groups.round, maxRound)))
    .all();
}

/**
 * Who gifted whom in a series up to and including round `maxRound`:
 * "giverPerson>receiverPerson" → round in which this pair was last drawn.
 */
export async function seriesHistory(seriesId: string, maxRound: number): Promise<Map<string, number>> {
  const history = new Map<string, number>();
  const all = await seriesMembers(seriesId, maxRound);
  const personByMember = new Map(all.map((m) => [m.id, personIdOf(m)]));

  for (const m of all) {
    const receiver = m.targetMemberId && personByMember.get(m.targetMemberId);
    if (!receiver) continue;
    const key = pairKey(personIdOf(m), receiver);
    history.set(key, Math.max(history.get(key) ?? 0, m.round));
  }
  return history;
}

/**
 * For members of one round: in which earlier round did `giver` last gift
 * `receiver` (member ids)? undefined if never.
 */
export function lastGiftedIn(roundMembers: MemberRef[], history: Map<string, number>) {
  const personByMember = new Map(roundMembers.map((m) => [m.id, personIdOf(m)]));
  return (giver: string, receiver: string) =>
    history.get(pairKey(personByMember.get(giver)!, personByMember.get(receiver)!));
}

/** giverId → { receiverId → round last drawn } for all pairs drawn before */
export function lastGiftedMatrix(roundMembers: MemberRef[], history: Map<string, number>) {
  const lastGifted = lastGiftedIn(roundMembers, history);
  return Object.fromEntries(
    roundMembers.map((g) => [
      g.id,
      Object.fromEntries(
        roundMembers
          .filter((r) => r.id !== g.id && lastGifted(g.id, r.id) !== undefined)
          .map((r) => [r.id, lastGifted(g.id, r.id)!])
      ),
    ])
  );
}

/**
 * People who took part in an earlier round of the series but are not part of
 * this round (e.g. someone who skipped a year), with their most recent name.
 */
export async function formerParticipants(
  group: Pick<Group, "id" | "seriesId" | "round">,
  roundMembers: MemberRef[]
) {
  const present = new Set(roundMembers.map(personIdOf));
  const earlier = await db
    .select({ id: members.id, personId: members.personId, name: members.name, round: groups.round })
    .from(members)
    .innerJoin(groups, eq(members.groupId, groups.id))
    .where(and(inSeries(seriesIdOf(group)), lt(groups.round, group.round)))
    .all();

  const latest = new Map<string, { personId: string; name: string; round: number }>();
  for (const m of earlier) {
    const personId = personIdOf(m);
    if (present.has(personId)) continue;
    const known = latest.get(personId);
    if (!known || m.round > known.round) latest.set(personId, { personId, name: m.name, round: m.round });
  }
  return [...latest.values()].sort((a, b) => a.name.localeCompare(b.name));
}

/** Previous and next round of a group (with admin tokens, so admins only) */
export async function roundLinks(group: Pick<Group, "id" | "previousGroupId">) {
  const columns = { id: groups.id, adminToken: groups.adminToken, round: groups.round };
  const previous = group.previousGroupId
    ? ((await db.select(columns).from(groups).where(eq(groups.id, group.previousGroupId)).get()) ?? null)
    : null;
  const next =
    (await db.select(columns).from(groups).where(eq(groups.previousGroupId, group.id)).get()) ?? null;
  return { previous, next };
}
