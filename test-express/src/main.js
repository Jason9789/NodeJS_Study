// @ts-check

/* eslint-disable no-console */

const express = require('express')
const fs = require('fs')

const app = express()

const PORT = 8000

// 미들웨어는 위어서부터 정의한 순서대로 실행된다.
// 또한 next 객체를 통해 현재 미들웨어에서 다음 미들웨어를 실행하게 해준다.
app.use('/', async (req, res, next) => {
  console.log('Middleware 1')

  const fileContent = await fs.promises.readFile('.prettierrc')

  const requestedAt = new Date()

  // @ts-ignore
  req.requestedAt = requestedAt
  // @ts-ignore
  req.fileContent = fileContent
  next()
})

app.use((req, res) => {
  console.log('Middleware 2')
  // @ts-ignore
  res.send(` Requested at ${req.requestedAt},\n ${req.fileContent}`)
})

app.listen(PORT, () => {
  console.log(`The Express server is listening at port: ${PORT}`)
})
