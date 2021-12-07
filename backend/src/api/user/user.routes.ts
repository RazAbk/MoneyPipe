import express from 'express'
const { getUserById, addAction, deleteAction } = require('./user.controller')

const userRouter = express.Router()

userRouter.get('/:userId', getUserById)
userRouter.post('/action', addAction)
userRouter.delete('/action/:actionId', deleteAction)

module.exports = userRouter
