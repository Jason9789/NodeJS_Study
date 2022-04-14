// @ts-check

/* eslint-disable no-console */

const express = require('express')
const bodyParser = require('body-parser')

const userRouter = express.Router()

const app = express()
// app.use(bodyParser.json())
app.use(express.json()) // express 4 이상 버전에서는 body Parser를 사용하지 않고 이렇게 사용해도 된다.

const PORT = 8000

// 일관된 API를 하나로 묶고 싶다면 Router를 사용하면 된다.
userRouter.get('/', (req, res) => {
  res.send('User list')
})

const USERS = {
  15: {
    nickname: 'foo',
  },
}

userRouter.param('id', (req, res, next, value) => {
  console.log(`id parametar: ${value}`)

  // @ts-ignore
  req.user = USERS[value]

  next()
})

userRouter.get('/:id', (req, res) => {
  console.log('userRouter get ID')
  // @ts-ignore
  res.send(req.user)
})

userRouter.post('/', (req, res) => {
  // Register user
  res.send('User list - POST')
})

userRouter.post('/:id/nickname', (req, res) => {
  // req.body: { "nickname": "bar" }

  // @ts-ignore
  const { user } = req
  const { nickname } = req.body

  user.nickname = nickname

  res.send(`User nickname updated: ${nickname}`)
})

app.use('/users', userRouter)

app.listen(PORT, () => {
  console.log(`The Express server is listening at port: ${PORT}`)
})
