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
  const cities = client.db('fc21').collection('cities')

  // deleteMany -> 항상 비워지게 됨. 또한 필터를 걸어야 작동함
  await users.deleteMany({})
  await cities.deleteMany({})

  // --------------------------------------
  // City Init
  await cities.insertMany([
    {
      name: '서울',
      population: 1000,
    },
    {
      name: '부산',
      population: 350,
    },
  ])

  // --------------------------------------
  // User Init
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
      city: '서울',
    },
    {
      name: 'Bar',
      birthYear: 1995,
      contacts: [
        {
          type: 'phone',
          number: '+821011111111',
        },
      ],
      city: '부산',
    },
    {
      name: 'Baz',
      birthYear: 1990,
      city: '부산',
    },
    {
      name: 'Poo',
      birthYear: 1993,
      city: '서울',
    },
  ])

  const cursor = users.aggregate([
    {
      $lookup: {
        from: 'cities',
        localField: 'city',
        foreignField: 'name',
        as: 'city_info',
      },
    },
    {
      $match: {
        $or: [
          {
            'city_info.population': {
              $gte: 500,
            },
          },
          {
            birthYear: {
              $gte: 1995,
            },
          },
        ],
      },
    },
    {
      $count: 'num_users',
    },
  ])

  // Read
  await cursor.forEach(console.log)

  await client.close()
}

main()
