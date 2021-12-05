import dbPromise from '@/modules/mongodb'

export default async function CreateBag(req, res) {
  const dbConnection = await dbPromise
  const collection = await dbConnection.db().collection('bags')
  const { insertId } = await collection.insertOne(JSON.parse(req.body))
  res.status(201).json(insertId)
}
