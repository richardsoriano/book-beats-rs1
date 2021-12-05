import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
export default function SortableColumn({
  children,
  className,
  sortableDirection = 'asc',
  sort = false,
  setSort = () => {},
}) {
  return (
    <th
      onClick={() => setSort(true)}
      className={`${className} ${sort ? 'underline' : ''}`}
    >
      <div className='flex space-x-1'>
        <div>{children} </div>
        <div className='w-3'>
          {sort &&
            (sortableDirection === 'asc' ? (
              <ChevronUpIcon />
            ) : (
              <ChevronUpIcon />
            ))}
        </div>
      </div>
    </th>
  )
}
