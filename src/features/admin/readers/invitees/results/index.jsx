import { useState, useEffect } from 'react'
import { search, filter } from './helpers'
import SortableColumn from './sortable-column'

export default function ReaderInviteeResults({
  readers,
  query,
  filteredCategories,
}) {
  const [sortableColumn, setSortableColumn] = useState(undefined)
  const [sortableDirection, setSortableDirection] = useState(undefined)

  const thClassNames = 'text-left font-bold border-b-2'
  const columns = [
    { heading: 'Reader', sortColumn: 'name' },
    { heading: 'Email', sortColumn: 'email' },
    { heading: 'Role', sortColumn: 'role' },
    { heading: 'Categories', sortColumn: 'categories' },
  ]
  useEffect((sortableColumn) => {
    if (!sortableColumn) return
  }, [])

  function sort(invitees) {
    if (!sortableColumn) return invitees

    return invitees.sort((a, b) => {
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
        {sort(filter(search(readers, query), filteredCategories)).map(
          (reader) => (
            <tr>
              <td>{reader.name}</td>
              <td>{reader.email}</td>
              <td>{reader.role.join(', ')}</td>
              <td>{reader.categories.join(',')}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  )
}
