import dbPromise, { jsonify } from '@/modules/mongodb'
import Table from '@/ui/table'
import { useState } from 'react'

export default function AdminBags({ bags }) {
  const [showModal, setShowModal] = useState(undefined)
  return (
    <Table
      columns={[
        { column: 'Name', sortable: 'name' },
        { column: 'Category', sortable: 'category' },
      ]}
      rows={bags}
      renderRow={(bag) => (
        <tr>
          <td>{bag.name}</td>
          <td>{bag.category}</td>
          <td>{bag.books.length}</td>
        </tr>
      )}
    />
  )
}
export async function getServerSideProps(ctx) {
  const dbConnection = await dbPromise
  const collection = await dbConnection.db().collection('bags')
  const bags = await collection.find({}).toArray()
  return {
    props: {
      bags: jsonify(bags),
    },
  }
}
