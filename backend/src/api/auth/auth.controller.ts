import { Request, Response } from "express";

const jwt = require('jsonwebtoken')
const authService = require('./auth.service')
const userService = require('../user/user.service')

module.exports = {
    signup,
    login,
    logout
}

async function signup(req: Request, res: Response) {
    try {
        const { userName, password, firstName, lastName, picture, isGoogle } = req.body

        const isUserTaken = await userService.getByUsername(userName)

        if (isUserTaken) {
            res.status(500).send('username is taken')
        } else {
            await authService.signup(userName, password, firstName, lastName, picture, isGoogle)
            const user = await authService.login(userName, password)

            if (!user) res.json(null)

            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

            res.cookie("token", accessToken, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 48,
                secure: true
            })

            res.json(user)
        }
    } catch (err) {
        console.log('could not sign up', err)
        res.json(null)
    }
}

async function login(req: Request, res: Response) {
    try {
        const { userName, password } = req.body

        const user = await authService.login(userName, password)

        if (!user) res.json(null)

        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

        res.cookie("token", accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 48,
            secure: true
        })

        res.json(user)
    } catch (err) {
        console.log('could not log in', err)
        res.json(null)
    }
}

async function logout(req: Request, res: Response) {
    try {
        res.clearCookie('token')
        res.send('logged out successfully')
    } catch (err) {
        console.log('could not logout', err)
        res.status(500).send('could not log out')
    }
}