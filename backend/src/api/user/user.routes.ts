const express = require('express')
const { getUserById } = require('./user.controller')

const router = express.Router()

router.get('/:userId', getUserById)

module.exports = router
