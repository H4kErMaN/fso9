import type { CoursePart } from '../types.ts'

interface PartProps {
  part: CoursePart
}

// Helper that TypeScript uses to enforce exhaustive switches.
// If a new CoursePart kind is added without a matching case, the
// compiler reports an error on the `_value: never` parameter here.
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case 'basic':
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          <em>{part.description}</em>
        </p>
      )
    case 'group':
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          project exercises {part.groupProjectCount}
        </p>
      )
    case 'background':
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          <em>{part.description}</em>
          <br />
          background material: {part.backgroundMaterial}
        </p>
      )
    case 'special':
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          <em>{part.description}</em>
          <br />
          required skills: {part.requirements.join(', ')}
        </p>
      )
    default:
      return assertNever(part)
  }
}

export default Part
