import dbPromise from '@/modules/mongodb'

export default async function CreateBag(req, res) {
  const { name, category, books, assigned, pickupStatus } = JSON.parse(req.body)
  console.log('create', name)

  const dbConnection = await dbPromise
  const collection = await dbConnection.db().collection('bags')
  const { insertedId } = await collection.insertOne({
    name,
    category,
    books,
    assigned,
    pickupStatus,
  })
  res.status(201).json({
    _id: insertedId.toString(),
    name,
    category,
    books,
    assigned,
    pickupStatus,
  })
}
