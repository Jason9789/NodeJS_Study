const users = require('./user')
const express = require('express')
const router = express.Router()

router.user("/user", users)

module.export = router