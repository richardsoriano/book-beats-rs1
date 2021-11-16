import SelectField from '@/ui/select-field'
import MultiSelectField from '@/ui/multi-select-field'

export default function Filters({
  setFilteredStatus,
  filteredStatus,
  setFilteredGenres,
  filteredGenres,
  setQuery,
  query,
}) {
  return (
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
        </div>
      </div>
    </div>
  )
}
