import { useState } from 'react'

import Table from '@/ui/table'
import Modal from '@/ui/modal'
import Button from '@/ui/button'
import BagForm from './form'
import { XIcon } from '@heroicons/react/solid'

const newBag = {
  _id: '',
  name: '',
  category: undefined,
  books: [],
}

export default function AdminBags({ bags, books }) {
  const [_bags, setBags] = useState(bags)
  const [selectedBag, setSelectedBag] = useState(undefined)
  const [bagToDelete, setBagToDelete] = useState(undefined)

  function deleteBag(bag) {
    setBagToDelete(bag)
  }

  async function deleteBagConfirmed() {
    const newBag = {
      _id: bagToDelete._id,
      name: '',
      category: undefined,
      books: [],
    }
    const res = await fetch(`/api/bags/${bagToDelete._id}`, {
      method: 'DELETE',
      body: JSON.stringify(newBag),
    })
    setBags((prev) => prev.filter((_bag) => _bag._id !== bagToDelete._id))
  }

  return (
    <>
      <Button onClick={() => setSelectedBag(newBag)}>New Bag</Button>
      <Table
        columns={[
          { heading: 'Name', sortable: 'name' },
          { heading: 'Category', sortable: 'category' },
          { heading: 'Num Books', sortable: 'numBooks' },
          { heading: 'Delete', sortable: false },
        ]}
        rows={_bags}
        renderRow={(bag, i) => {
          const tdProps = {
            className: `${i % 2 !== 0 ? 'bg-blue-100' : ''} p-2`,
            onClick: () => setSelectedBag(bag),
          }
          const tdDel = {
            className: `${i % 2 !== 0 ? 'bg-blue-100' : ''} p-2`,
            onClick: () => deleteBag(bag),
          }
          return (
            <tr>
              <td {...tdProps}>{bag.name}</td>
              <td {...tdProps}>{bag.category}</td>
              <td {...tdProps}>{bag.numBooks}</td>
              <td {...tdDel}>{<XIcon className='w-5 h-5 text-red-500' />}</td>
            </tr>
          )
        }}
      />
      {selectedBag && (
        <Modal open={true} close={() => setSelectedBag(undefined)}>
          <BagForm
            books={books}
            bagProps={selectedBag}
            bags={_bags}
            setBags={setBags}
            setSelectedBag={setSelectedBag}
          />
        </Modal>
      )}
      {bagToDelete && (
        <Modal open={bagToDelete} close={() => setBagToDelete(undefined)}>
          <p>Are you sure you want to delete the bag {bagToDelete.name}</p>
          <Button
            onClick={() => {
              deleteBagConfirmed(selectedBag)
              setBagToDelete(undefined)
            }}
          >
            Yes
          </Button>
          <Button onClick={() => setBagToDelete(undefined)}>No</Button>
        </Modal>
      )}
    </>
  )
}
