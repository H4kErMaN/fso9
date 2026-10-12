import { useState } from 'react'
import type { SyntheticEvent } from 'react'
import axios from 'axios'
import { createDiary } from '../services/diaryService.ts'
import { Weather, Visibility } from '../types.ts'
import type { DiaryEntry } from '../types.ts'

interface NewDiaryFormProps {
  onDiaryAdded: (diary: DiaryEntry) => void
}

const NewDiaryForm = ({ onDiaryAdded }: NewDiaryFormProps) => {
  const [date, setDate] = useState('')
  const [weather, setWeather] = useState<Weather>(Weather.Sunny)
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great)
  const [comment, setComment] = useState('')
  const [error, setError] = useState<string | null>(null)

  const submit = async (event: SyntheticEvent): Promise<void> => {
    event.preventDefault()

    try {
      const created = await createDiary({
        date,
        weather,
        visibility,
        comment,
      })
      onDiaryAdded(created)
      setDate('')
      setWeather(Weather.Sunny)
      setVisibility(Visibility.Great)
      setComment('')
      setError(null)
    } catch (err: unknown) {
      // Narrow down the axios error so we can surface the backend's
      // actual message. The server sends validation errors as the
      // response body (either a string or a Zod issues object).
      if (axios.isAxiosError(err)) {
        const data: unknown = err.response?.data
        if (typeof data === 'string') {
          setError(data)
        } else if (data && typeof data === 'object') {
          setError(JSON.stringify(data))
        } else {
          setError(err.message)
        }
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Unknown error')
      }

      // Clear the error after a few seconds so the UI does not get
      // permanently stuck on a stale message.
      setTimeout(() => setError(null), 5000)
    }
  }

  return (
    <div>
      <h2>Add new entry</h2>
      {error && (
        <p style={{ color: 'red' }}>{error}</p>
      )}
      <form onSubmit={(event) => void submit(event)}>
        <div>
          <label htmlFor="date">date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>weather </label>
          {Object.values(Weather).map((w) => (
            <label key={w}>
              <input
                type="radio"
                name="weather"
                value={w}
                checked={weather === w}
                onChange={() => setWeather(w)}
              />
              {w}
            </label>
          ))}
        </div>
        <div>
          <label>visibility </label>
          {Object.values(Visibility).map((v) => (
            <label key={v}>
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={visibility === v}
                onChange={() => setVisibility(v)}
              />
              {v}
            </label>
          ))}
        </div>
        <div>
          <label htmlFor="comment">comment</label>
          <input
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default NewDiaryForm
