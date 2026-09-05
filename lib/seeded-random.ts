// Deterministic pseudo-random generator so server and client render identical
// candle/star positions and avoid hydration mismatches.
export function seededRandom(seed: number) {
  let state = seed * 7919 + 104729
  return () => {
    state = (state * 9301 + 49297) % 233280
    return state / 233280
  }
}
