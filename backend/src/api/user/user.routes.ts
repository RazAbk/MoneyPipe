import express from 'express'
const { getUserById, addAction, deleteAction, addCategory, addLabel } = require('./user.controller')

const userRouter = express.Router()

userRouter.get('/:userId', getUserById)

userRouter.post('/action', addAction)
userRouter.delete('/action/:actionId', deleteAction)

userRouter.post('/category', addCategory)

userRouter.post('/label', addLabel)



module.exports = userRouter
