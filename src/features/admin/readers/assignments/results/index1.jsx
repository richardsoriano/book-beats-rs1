import { useState, useEffect } from 'react'
import { filter, search } from './helpers'
import SortableColumn from './sortable-column'

export default function BookAssignmentResults({
  bookAssignments,
  query,
  statuses,
  filteredStatus,
  filteredGenres,
}) {
  const [sortableColumn, setSortableColumn] = useState(undefined)
  const [sortableDirection, setSortableDirection] = useState(undefined)

  const thClassNames = 'text-left font-bold border-b-2'
  const columns = [
    { heading: 'Title', sortable: 'title' },
    { heading: 'Round', sortable: 'round' },
    { heading: 'Genres', sortable: 'genres' },
    { heading: 'Assigned', sortable: 'assignedCount' },
    { heading: 'Completed', sortable: 'reviewedCount' },
    { heading: 'Status', sortable: 'status' },
  ]

  useEffect((sortableColumn) => {
    if (!sortableColumn) return
  }, [])

  function sort(assignments) {
    if (!sortableColumn) return assignments

    return assignments.sort((a, b) => {
      if (a[sortableColumn] > b[sortableColumn])
        return sortableDirection === 'asc' ? 1 : -1
      if (a[sortableColumn] < b[sortableColumn])
        return sortableDirection === 'desc' ? 1 : -1
      return 0
    })
  }
  return (
    <table cellSpacing={0} cellPadding={0} className='w-full table-auto'>
      <thead>
        <tr>
          {columns.map((col) => (
            <SortableColumn
              sort={sortableColumn === col.sortable}
              setSort={() => {
                setSortableColumn(col.sortable)
                setSortableDirection((prev) =>
                  prev === 'asc' ? 'desc' : 'asc'
                )
              }}
              className={thClassNames}
            >
              {col.heading}
            </SortableColumn>
          ))}
        </tr>
      </thead>
      <tbody>
        {sort(
          filter(
            search(bookAssignments, query),
            filteredStatus,
            filteredGenres,
            statuses
          )
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
  )
}
