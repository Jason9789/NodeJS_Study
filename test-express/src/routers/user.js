// @ts-check
const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('User list')
})

const USERS = {
  15: {
    nickname: 'foo',
  },
  16: {
    nickname: 'bar',
  },
}

router.param('id', async (req, res, next, value) => {
  try {
    // @ts-ignore
    const user = USERS[value]

    // 유저가 없을 때 에러 핸들링
    if (!user) {
      const err = new Error('User not found.')
      // @ts-ignore
      err.statusCode = 404
      throw err
    }
    // @ts-ignore
    req.user = USERS[value]

    next()
  } catch (err) {
    next(err)
  }
})

router.get('/:id', (req, res) => {
  const resMimeType = req.accepts(['json', 'html'])

  if (resMimeType === 'json') {
    // @ts-ignore
    res.send(req.user)
  } else if (resMimeType === 'html') {
    res.render('user-profile', {
      // @ts-ignore
      nickname: req.user.nickname,
    })
  }
})

router.post('/', (req, res) => {
  // Register user
  res.send('User Registered.')
})

router.post('/:id/nickname', (req, res) => {
  // req.body: { "nickname": "bar" }

  // @ts-ignore
  const { user } = req
  const { nickname } = req.body

  user.nickname = nickname

  res.send(`User nickname updated: ${nickname}`)
})

module.exports = router
