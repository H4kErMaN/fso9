import { useEffect, useState } from 'react'
import { getAllDiaries } from './services/diaryService.ts'
import type { DiaryEntry, NonSensitiveDiaryEntry } from './types.ts'
import DiaryList from './components/DiaryList.tsx'
import NewDiaryForm from './components/NewDiaryForm.tsx'

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([])

  useEffect(() => {
    getAllDiaries()
      .then((data) => setDiaries(data))
      .catch((error) => {
        console.error('Error fetching diaries:', error)
      })
  }, [])

  const handleDiaryAdded = (diary: DiaryEntry): void => {
    // DiaryEntry contains comment; NonSensitiveDiaryEntry does not.
    // We append the server's returned entry (comment stripped for list).
    const { comment: _comment, ...nonSensitive } = diary
    setDiaries(diaries.concat(nonSensitive))
  }

  return (
    <div>
      <h1>Ilari's flight diaries</h1>
      <NewDiaryForm onDiaryAdded={handleDiaryAdded} />
      <DiaryList diaries={diaries} />
    </div>
  )
}

export default App
