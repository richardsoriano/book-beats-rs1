import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'

export default function SortableColumn({
  children,
  className,
  sort = false,
  setSort = () => {},
  sortableDirection,
}) {
  return (
    <th
      className={`${className} ${sort ? ' underline' : ''}`}
      onClick={() => {
        setSort(true)
      }}
    >
      <div className='flex items-center'>
        <div>{children}</div>
        <div className='w-4'>
          {sort &&
            (sortableDirection === 'asc' ? (
              <ChevronUpIcon className='text-green-500' />
            ) : (
              <ChevronDownIcon className='text-green-500' />
            ))}
        </div>
      </div>
    </th>
  )
}
