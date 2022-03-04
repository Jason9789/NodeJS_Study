const express = require("express");
const router = express.Router()
const dotenv = require('dotenv')
dotenv.config()

const google = require('./google')

router.use("/", google)

module.exports = router

