import express from 'express'
const { signup, login, logout } = require('./auth.controller')

const authRouter = express.Router()

authRouter.post('/signup', signup)
authRouter.post('/login', login)
authRouter.post('/logout', logout)

module.exports = authRouter
