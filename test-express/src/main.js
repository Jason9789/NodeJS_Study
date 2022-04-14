// @ts-check

/* eslint-disable no-console */

const express = require('express')

const app = express()
app.use(express.json()) // express 4 이상 버전에서는 body Parser를 사용하지 않고 이렇게 사용해도 된다.
app.set('views', 'src/views')
app.set('view engine', 'pug')

const PORT = 8000

const userRouter = require('./routers/user')

app.use('/users', userRouter)
app.use('public', express.static('src/public'))

// expree에서는 다음과 같은 4개의 인자가 들어간 경우만 에러 핸들링으로 취급한다.
app.use((err, req, res, next) => {
  res.statusCode = err.statusCode || 500
  res.send(err.message)
})

app.listen(PORT, () => {
  console.log(`The Express server is listening at port: ${PORT}`)
})
