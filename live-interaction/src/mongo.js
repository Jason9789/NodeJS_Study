// @ts-check

const { MongoClient } = require('mongodb')

const uri = `mongodb+srv://lifebook0809:${process.env.MONGO_PASSWORD}@cluster0.t80fz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const client = new MongoClient(uri, {
  // @ts-ignore
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = client
