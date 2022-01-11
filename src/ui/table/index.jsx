import { useState, useEffect } from 'react'
import SortableColumn from './sortable-column'

export default function Table({
  columns = [],
  rows = [],
  renderRow = () => {},
}) {
  const [sortableColumn, setSortableColumn] = useState(
    columns.find((column) => column.sortable).sortable
  )
  const [sortableDirection, setSortableDirection] = useState('asc')
  const thClassNames = 'text-left font-bold border-b-2'

  useEffect((sortableColumn) => {
    if (!sortableColumn) return
  }, [])

  function sort(rows) {
    if (!sortableColumn) return rows

    return rows.sort((a, b) =>
      typeof a[sortableColumn] === 'string'
        ? sortString(a, b)
        : sortNumber(a, b)
    )
  }

  function sortString(a, b) {
    if (a[sortableColumn].toLowerCase() > b[sortableColumn].toLowerCase())
      return sortableDirection === 'asc' ? 1 : -1
    if (a[sortableColumn].toLowerCase() < b[sortableColumn].toLowerCase())
      return sortableDirection === 'desc' ? 1 : -1
    return 0
  }
  function sortNumber(a, b) {
    if (a[sortableColumn] > b[sortableColumn])
      return sortableDirection === 'asc' ? 1 : -1
    if (a[sortableColumn] < b[sortableColumn])
      return sortableDirection === 'desc' ? 1 : -1
    return 0
  }
  return (
    <table cellSpacing={0} cellPadding={0} className='w-full table-auto'>
      <thead>
        <tr>
          {columns.map((column) =>
            column.sortable ? (
              <SortableColumn
                setSort={() => {
                  setSortableColumn(column.sortable)
                  setSortableDirection((prev) =>
                    prev === 'asc' ? 'desc' : 'asc'
                  )
                }}
                sort={sortableColumn === column.sortable}
                className={thClassNames}
                sortableDirection={sortableDirection}
              >
                {column.heading}
              </SortableColumn>
            ) : (
              <th>{column.heading}</th>
            )
          )}
        </tr>
      </thead>
      <tbody>{sort(rows).map((row, i) => renderRow(row, i))}</tbody>
    </table>
  )
}
