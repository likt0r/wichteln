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
 * Minimum-cost perfect assignment (Hungarian algorithm, O(n³)).
 * Returns for each row the chosen column.
 */
function hungarian(cost: number[][]): number[] {
  const n = cost.length;
  const u = new Array<number>(n + 1).fill(0);
  const v = new Array<number>(n + 1).fill(0);
  const p = new Array<number>(n + 1).fill(0);
  const way = new Array<number>(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    p[0] = i;
    let j0 = 0;
    const minv = new Array<number>(n + 1).fill(Infinity);
    const used = new Array<boolean>(n + 1).fill(false);
    do {
      used[j0] = true;
      const i0 = p[j0]!;
      let delta = Infinity;
      let j1 = 0;
      for (let j = 1; j <= n; j++) {
        if (used[j]) continue;
        const cur = cost[i0 - 1]![j - 1]! - u[i0]! - v[j]!;
        if (cur < minv[j]!) {
          minv[j] = cur;
          way[j] = j0;
        }
        if (minv[j]! < delta) {
          delta = minv[j]!;
          j1 = j;
        }
      }
      for (let j = 0; j <= n; j++) {
        if (used[j]) {
          u[p[j]!] = u[p[j]!]! + delta;
          v[j] = v[j]! - delta;
        } else {
          minv[j] = minv[j]! - delta;
        }
      }
      j0 = j1;
    } while (p[j0] !== 0);
    do {
      const j1 = way[j0]!;
      p[j0] = p[j1]!;
      j0 = j1;
    } while (j0);
  }

  const result = new Array<number>(n);
  for (let j = 1; j <= n; j++) result[p[j]! - 1] = j - 1;
  return result;
}

export type DrawResult = {
  /** giverId → receiverId */
  assignments: Map<string, string>;
  /** Number of pairs that were already drawn in an earlier round */
  repeats: number;
};

/**
 * Draws who gifts whom: every id gives exactly once and receives exactly once,
 * and nobody ever gifts themselves.
 *
 * `lastGifted(giver, receiver)` returns the round in which this pair was last
 * drawn (undefined if never). The draw avoids such repeats; if that is
 * impossible, it uses as few repeats as possible and prefers the pairs that
 * lie furthest back.
 *
 * Prefers a single circle (A → B → C → … → A) like the original draw when a
 * draw without repeats exists. Returns null only for fewer than 2 people.
 */
export function drawAssignments(
  ids: string[],
  lastGifted: (giver: string, receiver: string) => number | undefined = () => undefined,
  rng: Rng = Math.random
): DrawResult | null {
  const n = ids.length;
  if (n < 2) return null;

  const countRepeats = (assignments: Map<string, string>) =>
    [...assignments].filter(([g, r]) => lastGifted(g, r) !== undefined).length;

  // 1) Random single circles without repeats
  for (let attempt = 0; attempt < 200; attempt++) {
    const order = shuffle(ids, rng);
    const assignments = new Map(order.map((g, i) => [g, order[(i + 1) % n]!]));
    if (countRepeats(assignments) === 0) return { assignments, repeats: 0 };
  }

  // 2) Minimum-cost assignment. Cost per pair, in order of importance:
  //    self (never) ≫ repeat ≫ how recent the repeat is ≫ random tie-break
  const order = shuffle(ids, rng);
  let latest = 0;
  for (const g of order) for (const r of order) latest = Math.max(latest, lastGifted(g, r) ?? 0);
  const REPEAT = n * (latest + 1) + 1; // more than all recency costs together
  const SELF = n * (REPEAT + latest + 1) + 1; // more than any assignment without self
  const jitter = () => rng() / (n + 1); // all jitter together stays below 1

  const cost = order.map((g) =>
    order.map((r) => {
      if (g === r) return SELF;
      const last = lastGifted(g, r);
      return (last === undefined ? 0 : REPEAT + last) + jitter();
    })
  );
  const columns = hungarian(cost);
  const assignments = new Map(order.map((g, i) => [g, order[columns[i]!]!]));

  // Safety net: never hand out a self-assignment
  if ([...assignments].some(([g, r]) => g === r)) {
    throw new Error("Draw produced a self-assignment");
  }
  return { assignments, repeats: countRepeats(assignments) };
}
