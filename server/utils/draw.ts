type Rng = () => number;

function shuffle<T>(items: T[], rng: Rng): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j]!, result[i]!];
  }
  return result;
}

/**
 * Draws who gifts whom: every id gives exactly once and receives exactly once,
 * nobody gifts themselves and every pair satisfies `allowed(giver, receiver)`.
 *
 * Prefers a single circle (A → B → C → … → A) like the original draw. If no
 * circle is found quickly, it falls back to a randomized bipartite matching,
 * which always finds a valid draw if one exists.
 *
 * Returns giverId → receiverId, or null if no valid draw exists.
 */
export function drawAssignments(
  ids: string[],
  allowed: (giver: string, receiver: string) => boolean = () => true,
  rng: Rng = Math.random
): Map<string, string> | null {
  if (ids.length < 2) return null;
  const ok = (giver: string, receiver: string) =>
    giver !== receiver && allowed(giver, receiver);

  // 1) Random single circles
  for (let attempt = 0; attempt < 200; attempt++) {
    const order = shuffle(ids, rng);
    if (order.every((giver, i) => ok(giver, order[(i + 1) % order.length]!))) {
      return new Map(order.map((giver, i) => [giver, order[(i + 1) % order.length]!]));
    }
  }

  // 2) Randomized maximum bipartite matching (Kuhn's augmenting paths)
  const candidates = new Map(
    ids.map((giver) => [giver, shuffle(ids, rng).filter((r) => ok(giver, r))])
  );
  const giverOf = new Map<string, string>(); // receiver → giver

  const augment = (giver: string, visited: Set<string>): boolean => {
    for (const receiver of candidates.get(giver)!) {
      if (visited.has(receiver)) continue;
      visited.add(receiver);
      const current = giverOf.get(receiver);
      if (current === undefined || augment(current, visited)) {
        giverOf.set(receiver, giver);
        return true;
      }
    }
    return false;
  };

  for (const giver of shuffle(ids, rng)) {
    if (!augment(giver, new Set())) return null;
  }
  return new Map([...giverOf].map(([receiver, giver]) => [giver, receiver]));
}
