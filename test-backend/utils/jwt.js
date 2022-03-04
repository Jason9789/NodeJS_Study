const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, "PASSWORD")
    return decoded
  } catch (error) {
    // TokenExpiredError - 기간 만료

    // JsonWebTokenERror - 서명이 유효하지 않거나 수정된 경우

    // NotBeforeError - jwt 형식이 아닌 경우

    if (error.name === 'TokenExpiredError') {

    }

    if (error.name === 'JsonWebTokenError') {
      console.log(error)
    }

    if (error.name === 'NotBeforeError') {
      console.log(error)
    }

    console.log(err)
    return false
  }
}

// access 토큰
// 유효시간 2시간
// 매 요청마다 로그인 수행 -> cookie
const makeAccessToken = (id) => {
  try {
    return jwt.sign({
      id
    }, "PASSWORD", {
      expiresIn: '2h'
    })
  } catch (error) {

  }
}

// refresh 토큰
const makeRefreshToken = (id) => {
  try {
    return jwt.sign({
      id
    }, "PASSWORD", {
      expiresIn: '14d'
    })
  } catch (error) {
    // 로그 남기기
    return "error"
  }
}

module.exports = { verifyToken, makeAccessToken, makeRefreshToken }