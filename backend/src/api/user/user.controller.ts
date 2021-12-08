import { Request, Response } from "express"
import { IAction } from "../../interfaces/dataInterfaces"

const userService = require('./user.service')

module.exports = {
    getData,
    updateUser,
    addAction,
    deleteAction,
    addCategory,
    addLabel
}

// User

async function getData(req: Request, res: Response) {
    try{
        if(req.session.user){
            const user = await userService.getById(req.session.user._id)
            
            const { startDate, endDate } = req.query

            if(startDate && endDate){
                const filteredActions = user.data.actions.filter((action: IAction) => {
                    if(action.createdAt < +startDate || action.createdAt > +endDate) return false
                    return true
                })

                user.data.actions = filteredActions
            }
            res.json(user.data)
            
        }
    } catch(err) {
        console.log('could not fetch data', err)
    }
}

async function updateUser(req: Request, res: Response) {
    try{
        if(req.session.user){
            const user = await userService.updateUser(req.body, req.session.user._id)
            req.session.user = user
            delete user.data
            res.json(user)
        }
    } catch(err) {

    }
}

// Crud

async function addAction(req: Request, res: Response) {
    try {
        if (req.session.user) {
            const action = req.body
            const userId = req.session.user._id
            const data = await userService.addAction(action, userId)
            res.json(data)
        }
    } catch (err) {
        console.log('could not add action', err)
    }
}

async function deleteAction(req: Request, res: Response) {
    try {
        if (req.session.user) {
            const { actionId } = req.params
            const userId = req.session.user._id
            const data = await userService.deleteAction(actionId, userId)
            return res.json(data)
        }
    } catch (err) {
        console.log('could not delete action', err)
    }
}

async function addCategory(req: Request, res: Response) {
    try {
        if (req.session.user) {
            const category = req.body
            const userId = req.session.user._id
            const data = await userService.addCategory(category, userId)
            res.json(data)
        }
    } catch (err) {
        console.log('could not add category', err)
    }
}

async function addLabel(req: Request, res: Response) {
    try {
        if (req.session.user) {
            const label = req.body
            const userId = req.session.user._id
            const data = await userService.addLabel(label, userId)
            res.json(data)
        }
    } catch (err) {
        console.log('could not add label', err)
    }
}