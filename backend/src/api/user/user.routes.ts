import express from 'express'
const { getData, getUser, updateUser, updateData, addAction, deleteAction, addCategory, deleteCategory, deleteLabel, addLabel } = require('./user.controller')
const { authenticateToken } = require('../../middlewares/requireAuth.middleware')

const userRouter = express.Router()

userRouter.use(authenticateToken)

userRouter.get('/data', getData)
userRouter.get('/user', getUser)

userRouter.put('/user', updateUser)
userRouter.put('/data', updateData)

userRouter.post('/action', addAction)
userRouter.post('/category', addCategory)
userRouter.post('/label', addLabel)

userRouter.delete('/action/:actionId', deleteAction)
userRouter.delete('/category/:categoryId', deleteCategory)
userRouter.delete('/label/:labelId', deleteLabel)

module.exports = userRouter
