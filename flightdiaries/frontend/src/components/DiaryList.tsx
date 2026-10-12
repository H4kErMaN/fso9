import type { NonSensitiveDiaryEntry } from '../types.ts'

interface DiaryListProps {
  diaries: NonSensitiveDiaryEntry[]
}

const DiaryList = ({ diaries }: DiaryListProps) => {
  if (diaries.length === 0) {
    return <p>No diary entries yet.</p>
  }

  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map((diary) => (
        <div key={diary.id} style={{ marginBottom: 15 }}>
          <h3>{diary.date}</h3>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      ))}
    </div>
  )
}

export default DiaryList
