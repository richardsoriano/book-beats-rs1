import { useState } from 'react'
import { uniq } from '@/modules/array'
import SelectField from '@/ui/select-field'
//   import MultiSelectField from '@/ui/multi-select-field'
import MultiSelectField from '@/ui/multi-select-field'

function searchTitle(assignment, query) {
  return assignment.title.toLowerCase().includes(query.toLowerCase())
}

function searchGenres(assignment, query) {
  return (
    assignment.genres.filter((genre) =>
      genre.toLowerCase().includes(query.toLowerCase())
    ).length > 0
  )
}

function search(assignments, query) {
  if (query.length < 3) return assignments
  return assignments.filter((assignment) => searchTitle(assignment, query))
}

function filterByStatus(assignment, filteredStatus, statuses) {
  if (compareCaseInsensitive(filteredStatus, statuses[0])) return true
  return compareCaseInsensitive(assignment.status, filteredStatus)
}

function filterByGenres(assignment, filteredGenres) {
  console.dir(filteredGenres)
  console.log('f Genres')
  if (filteredGenres.length === 0) return true
  return assignment.genres.some((genre) => filteredGenres.includes(genre))
}

// function filterByStatus(assignment, filteredStatus,statuses) {
//   if (compareCaseInsensitive(filteredStatus, status[0])) return true
//   return compareCaseInsensitive(filteredStatus, assignment.status)
// }
// function filterByGenres(assignments, filteredGenres) {
//   if (filteredGenres.length ===0) return true
//   return filteredGenres.includes(assignment.genres)
// }
function filter(assignments, filteredStatus, filteredGenres) {
  const ass = assignments.filter(
    (assignment) =>
      filterByStatus(assignment, filteredStatus, statuses) &&
      filterByGenres(assignment, filteredGenres)
  )
  console.log('ass', ass)
  return ass
}

function compareCaseInsensitive(a, b) {
  return a.toLowerCase() === b.toLowerCase()
}
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

  const thClassNames = 'text-left font-bold border-b-2'

  return (
    <div>
      <h1 className='text-2xl font-bold'>Book Assignments</h1>

      <div className='w-full border my-4 p-8'>
        <div className='flex items-center w-full space-x-4'>
          <div>
            <button
              className='border py-1 px-6 rounded text-xs bg-blue-100 border-blue-400 my-3'
              onClick={() => {
                setFilteredStatus(statuses[0])
                setFilteredGenres([])
                setQuery('')
              }}
            >
              Reset
            </button>
          </div>
          <div className='w-full'>
            <input
              className='w-full border p-2'
              placeholder='Type to filter on name'
              type='text'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className='w-full flex items-center space-x-10'>
          <div className='w-64'>
            <SelectField
              label='Filter by status'
              value={filteredStatus}
              options={statuses}
              onChange={(status) => setFilteredStatus(status)}
            />
          </div>
          <div className='w-64'>
            <MultiSelectField
              label='Filter by any matching genre'
              value={filteredGenres}
              options={genres}
              onChange={(genres) => setFilteredGenres(genres)}
            />
            {/* <MultiSelectField
              label='Filter by any matching genre'
              value={filteredGenres}
              options={genres}
              onChange={(genres) => setFilteredGenres(genres)}
            /> */}
          </div>
        </div>
      </div>

      <table cellSpacing={0} cellPadding={0} className='w-full table-auto'>
        <thead>
          <tr>
            <th className={thClassNames}>Title 1</th>
            <th className={thClassNames}>Round</th>
            <th className={thClassNames}>Genres</th>
            <th className={thClassNames}>Assigned</th>
            <th className={thClassNames}>Completed</th>
            <th className={thClassNames}>Status</th>
          </tr>
        </thead>
        <tbody>
          {filter(
            search(bookAssignments, query),
            filteredStatus,
            filteredGenres
          ).map((bookAssignment) => (
            <tr>
              <td>{bookAssignment.title}</td>
              <td>{bookAssignment.round}</td>
              <td>{bookAssignment.genres.join(',')}</td>
              <td>{bookAssignment.assignedCount}</td>
              <td>{bookAssignment.reviewedCount}</td>
              <td>{bookAssignment.status} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
