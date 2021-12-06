import express from 'express'
const { signup, login } = require('./auth.controller')

const authRouter = express.Router()

authRouter.post('/signup', signup)
authRouter.post('/login', login)

module.exports = authRouter
