import { and, eq, inArray, lte, or } from "drizzle-orm";
import { groups, members } from "../database/schema";

type Group = typeof groups.$inferSelect;
type Member = typeof members.$inferSelect;

/** The first round's group id; legacy groups without series are their own series */
export const seriesIdOf = (group: Pick<Group, "id" | "seriesId">) => group.seriesId ?? group.id;

/** Stable id of a person across rounds */
export const personIdOf = (member: Pick<Member, "id" | "personId">) => member.personId ?? member.id;

const pairKey = (giverPerson: string, receiverPerson: string) => `${giverPerson}>${receiverPerson}`;

/**
 * All giver → receiver pairs (as person ids) drawn in the group's series up to
 * and including round `maxRound`.
 */
export async function seriesPairs(seriesId: string, maxRound: number): Promise<Set<string>> {
  const pairs = new Set<string>();
  if (maxRound < 1) return pairs;

  const seriesGroups = await db
    .select({ id: groups.id })
    .from(groups)
    .where(and(or(eq(groups.id, seriesId), eq(groups.seriesId, seriesId)), lte(groups.round, maxRound)))
    .all();
  if (seriesGroups.length === 0) return pairs;

  const seriesMembers = await db
    .select()
    .from(members)
    .where(inArray(members.groupId, seriesGroups.map((g) => g.id)))
    .all();
  const personByMember = new Map(seriesMembers.map((m) => [m.id, personIdOf(m)]));

  for (const m of seriesMembers) {
    const receiver = m.targetMemberId && personByMember.get(m.targetMemberId);
    if (receiver) pairs.add(pairKey(personIdOf(m), receiver));
  }
  return pairs;
}

/**
 * Returns a check whether `giver` may gift `receiver` (member ids of the same
 * round) without repeating a pair from the given earlier pairs.
 */
export function allowedByHistory(
  roundMembers: Pick<Member, "id" | "personId">[],
  earlierPairs: Set<string>
) {
  const personByMember = new Map(roundMembers.map((m) => [m.id, personIdOf(m)]));
  return (giver: string, receiver: string) =>
    !earlierPairs.has(pairKey(personByMember.get(giver)!, personByMember.get(receiver)!));
}

/** For each member: ids of members (same round) they already gifted in earlier rounds */
export function earlierReceivers(
  roundMembers: Pick<Member, "id" | "personId">[],
  earlierPairs: Set<string>
) {
  const allowed = allowedByHistory(roundMembers, earlierPairs);
  return Object.fromEntries(
    roundMembers.map((g) => [
      g.id,
      roundMembers.filter((r) => r.id !== g.id && !allowed(g.id, r.id)).map((r) => r.id),
    ])
  );
}

/** Whether every person has gifted every other person after this round */
export function isSeriesComplete(round: number, memberCount: number) {
  return memberCount >= 2 && round >= memberCount - 1;
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
