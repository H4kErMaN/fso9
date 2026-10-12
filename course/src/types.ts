interface CoursePartBase {
  name: string
  exerciseCount: number
}

// Shared middle layer for parts that have a description field —
// introduced to avoid repeating `description: string` in multiple
// interfaces.
interface CoursePartDescribed extends CoursePartBase {
  description: string
}

interface CoursePartBasic extends CoursePartDescribed {
  kind: 'basic'
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number
  kind: 'group'
}

interface CoursePartBackground extends CoursePartDescribed {
  backgroundMaterial: string
  kind: 'background'
}

interface CoursePartSpecial extends CoursePartDescribed {
  requirements: string[]
  kind: 'special'
}

// Discriminated union: TypeScript narrows the specific interface
// based on the `kind` field in each object.
export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial
