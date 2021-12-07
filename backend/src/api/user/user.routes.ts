import express from 'express'
const { getUserById, addAction } = require('./user.controller')

const userRouter = express.Router()

userRouter.get('/:userId', getUserById)
userRouter.post('/action', addAction)

module.exports = userRouter
