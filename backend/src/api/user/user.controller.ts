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

async function addAction(req: Request, res: Response) {
    try{
        if(req.session.user){
            const action = req.body
            const userId = req.session.user._id
            const data = await userService.addAction(action, userId)
            res.json(data)
        }
    } catch(err){
        console.log('could not add action', err)
    }
}

async function deleteAction(req: Request, res: Response) {
    try{
        if(req.session.user){
            const { actionId } = req.params
            const userId = req.session.user._id
            const data = await userService.deleteAction(actionId, userId)
            return res.json(data)
        }
    } catch(err) {
        console.log('could not delete action', err)
    }
}

module.exports = {
    getUserById,
    addAction,
    deleteAction
}