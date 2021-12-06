import express from 'express'
const { signup } = require('./auth.controller')

const authRouter = express.Router()

authRouter.post('/signup', signup)

module.exports = authRouter
