import type { CoursePart } from '../types.ts'
import Part from './Part.tsx'

interface ContentProps {
  parts: CoursePart[]
}

const Content = ({ parts }: ContentProps) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  )
}

export default Content
