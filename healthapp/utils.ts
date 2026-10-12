// Helper that returns true when the given argument cannot be converted
// to a number. Using `unknown` is safer than `any` — the caller must
// narrow the type before using it as something concrete.
export const isNotNumber = (argument: unknown): boolean =>
  isNaN(Number(argument))
