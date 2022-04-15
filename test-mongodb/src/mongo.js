// @ts-check

require('dotenv').config()

const { MongoClient } = require('mongodb')

const uri = `mongodb+srv://lifebook0809:${process.env.MONGO_PASSWORD}@cluster0.t80fz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const client = new MongoClient(uri, {
  // @ts-ignore
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

async function main() {
  const c = await client.connect()

  const users = client.db('fc21').collection('users')

  // deleteMany -> 항상 비워지게 됨. 또한 필터를 걸어야 작동함
  await users.deleteMany({})

  // Create, 추가
  await users.insertMany([
    {
      name: 'Foo',
      birthYear: 2000,
      contacts: [
        {
          type: 'phone',
          number: '+821012345678',
        },
        {
          type: 'home',
          number: '+829233334444',
        },
      ],
    },
    {
      name: 'Bar',
      birthYear: 1995,
    },
    {
      name: 'Baz',
      birthYear: 1990,
    },
    {
      name: 'Poo',
      birthYear: 1993,
    },
  ])

  // Delete, 하나만 삭제
  await users.deleteOne({
    name: 'Baz',
  })

  // Update
  // await users.updateOne(
  //   {
  //     name: 'Baz',
  //   },
  //   {
  //     $set: {
  //       name: 'Boo',
  //     },
  //   }
  // )

  const cursor = users.find(
    {
      birthYear: {
        $gte: 1990,
      },
    },
    {
      sort: {
        // sort 할 때 -1은 내림차순, 1은 오름차순
        birthYear: 1,
      },
    }
  )

  // Read
  await cursor.forEach(console.log)

  await client.close()
}

main()
