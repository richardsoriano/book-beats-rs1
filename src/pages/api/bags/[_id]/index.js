import dbPromise from '@/modules/mongodb'
import { ObjectId } from 'mongodb'
import connect from 'next-connect'

const handler = connect()

async function saveBag(req, res) {
  const { _id, name, category, books, assigned, pickupStatus } = JSON.parse(
    req.body
  )
  const dbConnection = await dbPromise
  const collection = await dbConnection.db().collection('bags')
  console.log('save Bag', books)
  const dbRes = await collection.updateOne(
    { _id: ObjectId(_id) },
    { $set: { name, category, books, assigned, pickupStatus } }
  )

  res.status(200).json({ _id, name, category, books, assigned, pickupStatus })
}

handler.patch((req, res) => saveBag(req, res))

handler.delete(async (req, res) => {
  const { _id, name, category, books, assigned, pickupStatus } = JSON.parse(
    req.body
  )
  const dbConnection = await dbPromise
  const collection = await dbConnection.db().collection('bags')

  await collection.deleteOne({ _id: ObjectId(_id) })

  res.status(200).json({})
})

export default handler
