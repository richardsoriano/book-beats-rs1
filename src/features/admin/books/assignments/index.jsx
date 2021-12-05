import { useState } from 'react'
import { uniq } from '@/modules/array'
import Filters from './filters'
import BookAssignmentResults from 'features/admin/books/assignments/results'

const statuses = ['Any', 'Completed', 'In progress']

export default function AdminBooksAssignments({ bookAssignments = [] }) {
  const genres = uniq(
    bookAssignments.reduce((acc, assignment) => {
      return [...acc, ...assignment.genres]
    }, [])
  )

  const [query, setQuery] = useState('')
  const [filteredStatus, setFilteredStatus] = useState(statuses[0])
  const [filteredGenres, setFilteredGenres] = useState([])

  return (
    <div>
      <h1 className='text-2xl font-bold'>Book Assignments</h1>
      <Filters
        setFilteredStatus={setFilteredStatus}
        filteredStatus={filteredStatus}
        setFilteredGenres={setFilteredGenres}
        filteredGenres={filteredGenres}
        setQuery={setQuery}
        query={query}
        statuses={statuses}
        genres={genres}
      />
      <BookAssignmentResults
        bookAssignments={bookAssignments}
        query={query}
        filteredStatus={filteredStatus}
        filteredGenres={filteredGenres}
        statuses={statuses}
      />
    </div>
  )
}
