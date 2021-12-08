import express from 'express'
const { getData, updateUser, addAction, deleteAction, addCategory, addLabel } = require('./user.controller')

const userRouter = express.Router()

userRouter.get('/data', getData)
userRouter.put('/', updateUser)

userRouter.post('/action', addAction)
userRouter.delete('/action/:actionId', deleteAction)

userRouter.post('/category', addCategory)

userRouter.post('/label', addLabel)

module.exports = userRouter
