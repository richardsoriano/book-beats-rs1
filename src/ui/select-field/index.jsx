import { useState, useRef } from 'react'
import useClickOutside from 'hooks/use-click-outside'

export default function SelectField({
  label,
  value,
  options = [],
  onChange = () => {},
  renderOption = (option) => option,
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef(undefined)
  useClickOutside(ref, () => setOpen(false))

  return (
    <div className='relative w-full' ref={ref}>
      {label && (
        <label
          onClick={() => {
            setOpen(true)
          }}
        >
          {label}
        </label>
      )}

      <div
        className='border p-2 w-full'
        onClick={() => setOpen((prev) => !prev)}
      >
        {value}
      </div>
      <div
        className={`border p-2 w-full mt-1 absolute ${
          open ? 'block' : 'hidden'
        }`}
      >
        {options.map((option) => (
          <div
            className='bg-white'
            onClick={() => {
              onChange(option)
              setOpen(false)
            }}
          >
            {renderOption(option)}
          </div>
        ))}
      </div>
    </div>
  )
}
