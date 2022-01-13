import express from 'express'
const { getData, getUser, updateUser, updateData, addAction, deleteAction, addCategory, deleteCategory, deleteLabel, addLabel, deleteUser } = require('./user.controller')
const { authenticateToken } = require('../../middlewares/requireAuth.middleware')
const { blockDemoUser } = require('../../middlewares/blockDemoUser.middleware')
const { filterBy } = require('../../middlewares/filterBy.middleware')

const userRouter = express.Router()

userRouter.use(authenticateToken)

userRouter.get('/data', getData, filterBy)
userRouter.get('/user', getUser)

userRouter.use(blockDemoUser)

userRouter.put('/user', updateUser)
userRouter.put('/data', updateData, filterBy)

userRouter.post('/action', addAction, filterBy)
userRouter.post('/category', addCategory, filterBy)
userRouter.post('/label', addLabel, filterBy)

userRouter.delete('/action/:actionId', deleteAction, filterBy)
userRouter.delete('/category/:categoryId', deleteCategory, filterBy)
userRouter.delete('/label/:labelId', deleteLabel, filterBy)
userRouter.delete('/', deleteUser)

module.exports = userRouter
