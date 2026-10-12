// Helper that TypeScript uses to enforce exhaustive switches.
// If a new Entry kind is added without a matching case, the compiler
// errors on the `value: never` parameter because the leftover entry
// type can no longer be narrowed down to never.
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}
