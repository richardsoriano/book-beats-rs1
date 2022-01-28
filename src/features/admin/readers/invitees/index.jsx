import { useState } from 'react'

import Table from '@/ui/table'
import Filters from './filters'

import ReaderInviteeResults from './results'
import categories from '@/data/categories'

export default function AdminReadersInvitees({ readers }) {
  const [_readers, setReaders] = useState(readers)
  const [query, setQuery] = useState('')
  const [filteredCategories, setFilteredCategories] = useState([])

  return (
    <div>
      <h2 className='text-2xl font-bold'>Reader Invitees Page</h2>
      <Filters
        setQuery={setQuery}
        query={query}
        setFilteredCategories={setFilteredCategories}
        filteredCategories={filteredCategories}
        categories={categories}
      />

      <ReaderInviteeResults
        readers={_readers}
        query={query}
        filteredCategories={filteredCategories}
      />
    </div>
  )
}
