export type PairingMember = {
  id?: string;
  name: string;
  targetId?: string;
  target?: string;
};

export type Pairing = { id: string; giver: string; receiver: string };

/**
 * Turns members with assigned targets into giver → receiver pairs, ordered as
 * a chain (A → B, B → C, …) so a circular draw reads naturally.
 * Members without an id or target are skipped.
 */
export function toChainedPairings(members: PairingMember[]): Pairing[] {
  const list = members.filter((m) => m.id && m.targetId);
  const byId = new Map(list.map((m) => [m.id!, m]));
  const result: Pairing[] = [];
  const seen = new Set<string>();

  for (const start of list) {
    let current: PairingMember | undefined = start;
    while (current && !seen.has(current.id!)) {
      seen.add(current.id!);
      result.push({
        id: current.id!,
        giver: current.name,
        receiver: current.target ?? "?",
      });
      current = byId.get(current.targetId!);
    }
  }
  return result;
}
