const users = require('./user')
const express = require('express')
const router = express.Router()

router.use("/user", users)

module.export = router