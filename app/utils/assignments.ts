/** giverId → receiverId */
export type Assignments = Record<string, string>;

/**
 * Swaps the receivers of two givers. Swapping keeps the draw a valid
 * permutation (everyone gives once and receives once); it may temporarily
 * create self-assignments, which `selfAssigned` reports.
 */
export function swapReceivers(
  assignments: Assignments,
  giverA: string,
  giverB: string
): Assignments {
  if (giverA === giverB) return assignments;
  return {
    ...assignments,
    [giverA]: assignments[giverB]!,
    [giverB]: assignments[giverA]!,
  };
}

/**
 * Gives `receiver` to `giver`; whoever had `receiver` before gets the
 * giver's previous receiver.
 */
export function assignReceiver(
  assignments: Assignments,
  giver: string,
  receiver: string
): Assignments {
  const previousGiver = Object.keys(assignments).find(
    (g) => assignments[g] === receiver
  );
  if (!previousGiver) return assignments;
  return swapReceivers(assignments, giver, previousGiver);
}

/** Givers that would have to gift themselves */
export function selfAssigned(assignments: Assignments): string[] {
  return Object.keys(assignments).filter((g) => assignments[g] === g);
}
