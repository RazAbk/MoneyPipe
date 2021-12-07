import { Request, Response } from "express";

const authService = require('./auth.service')
const userService = require('../user/user.service')

module.exports = {
    signup,
    login,
    logout
}

async function signup(req: Request, res: Response) {
    try {
        const { userName, password, firstName, lastName } = req.body

        const isUserTaken = await userService.getByUsername(userName)

        if (isUserTaken) {
            res.status(500).send('username is taken')
        } else {
            await authService.signup(userName, password, firstName, lastName)
            const user = await authService.login(userName, password)

            req.session.user = user
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

        req.session.user = user
        res.json(user)
    } catch (err) {
        console.log('could not log in', err)
        res.json(null)
    }
}

async function logout(req: Request, res: Response) {
    try {
        const user = req.session.user?.userName

        req.session.destroy(() => {
            console.log('user logged out:', user)
        })
        res.send('logged out successfully')
    } catch (err) {
        console.log('could not logout', err)
        res.status(500).send('could not log out')
    }
}