import { Request, Response } from "express"

const userService = require('./user.service')

async function getUserById(req: Request, res: Response) {
    try {
        const user = await userService.getById(req.params.userId)
        res.send(user)
    } catch (err) {
        console.log(err)
        res.status(500).send({ err: 'Failed to get user' })
    }
}

module.exports = {
    getUserById
}