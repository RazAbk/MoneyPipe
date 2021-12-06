import express from 'express'
const { getUserById } = require('./user.controller')

const userRouter = express.Router()

userRouter.get('/:userId', getUserById)

module.exports = userRouter
