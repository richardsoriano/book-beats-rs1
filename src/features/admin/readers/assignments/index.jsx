import { useState } from 'react'
import Filters from './filters'
import ReaderAssignmentResults from 'features/admin/readers/assignments/results'
import { uniq } from '@/modules/array'

export default function AdminReadersAssignments({ readerAssignments = [] }) {
  const [query, setQuery] = useState('')
  const [filteredCategories, setFilteredCategories] = useState([])

  const categories = uniq(
    readerAssignments.reduce((acc, assignment) => {
      return [...acc, ...assignment.categories]
    }, [])
  )

  return (
    <div className='container mx-auto'>
      <h1 className='text-2xl font-bold'>Reader Assignments</h1>
      <Filters
        setQuery={setQuery}
        query={query}
        setFilteredCategories={setFilteredCategories}
        filteredCategories={filteredCategories}
        categories={categories}
      />
      <ReaderAssignmentResults
        readerAssignments={readerAssignments}
        query={query}
        filteredCategories={filteredCategories}
      />
    </div>
  )
}
