import { useState, useEffect } from 'react'
import { search, filter } from './helpers'
import SortableColumn from './sortable-column'

export default function ReaderAssignmentResults({
  readerAssignments,
  query,
  filteredCategories,
}) {
  const [sortableColumn, setSortableColumn] = useState(undefined)
  const [sortableDirection, setSortableDirection] = useState(undefined)

  const thClassNames = 'text-left font-bold border-b-2'
  const columns = [
    { heading: 'Reader', sortColumn: 'reader' },
    { heading: 'Max', sortColumn: 'max' },
    { heading: 'Assigned', sortColumn: 'assignedCount' },
    { heading: 'Completed', sortColumn: 'completedCount' },
    { heading: 'Available', sortColumn: 'availableCount' },
    { heading: 'Categories', sortColumn: 'categories' },
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
              className={thClassNames}
              sort={sortableColumn === col.sortColumn}
              setSort={() => {
                setSortableColumn(col.sortColumn)
                setSortableDirection((prev) =>
                  prev === 'asc' ? 'desc' : 'asc'
                )
              }}
              sortableDirection={sortableDirection}
            >
              {col.heading}
            </SortableColumn>
          ))}
        </tr>
      </thead>
      <tbody>
        {sort(filter(search(readerAssignments, query), filteredCategories)).map(
          (readerAssignment) => (
            <tr>
              <td>{readerAssignment.reader}</td>
              <td>{readerAssignment.max}</td>
              <td>{readerAssignment.assignedCount}</td>
              <td>{readerAssignment.completedCount}</td>
              <td>{readerAssignment.availableCount} </td>

              <td>{readerAssignment.categories.join(',')}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  )
}
