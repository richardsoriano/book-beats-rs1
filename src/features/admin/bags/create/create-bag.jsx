import TextField from '@/ui/text-field'

export default function CreateBag({ bagName, setBagName, placeholder }) {
  return (
    <div>
      <TextField
        placeholder={placeholder}
        value={bagName}
        onChange={(bagName) => setBagName(bagName)}
      />
    </div>
  )
}
