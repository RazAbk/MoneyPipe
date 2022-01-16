import { NextFunction, Request, Response } from "express";
import { IAction, IErrorMsg } from "../../interfaces/dataInterfaces"

const userService = require('./user.service')

module.exports = {
    getData,
    getUser,
    updateUser,
    updateData,
    addAction,
    deleteAction,
    duplicateAction,
    addCategory,
    deleteCategory,
    addLabel,
    deleteLabel,
    deleteUser
}

// User

async function getData(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await userService.getById(req.user._id)

        req.data = user.data
        next()
    } catch (err) {
        const errorMsg: IErrorMsg = { title: 'Opps, an error occurred', msg: 'Could not get your account data, try again later', type: 'danger' }
        res.status(200).send(errorMsg)
    }
}

async function getUser(req: Request, res: Response) {
    try {
        const user = await userService.getById(req.user._id)
        delete user.data
        res.json(user)

    } catch (err) {
        const errorMsg: IErrorMsg = { title: 'Opps, an error occurred', msg: 'Could not get your account data, try again later', type: 'danger' }
        res.status(200).send(errorMsg)
    }
}

async function updateUser(req: Request, res: Response) {
    try {
        const user = await userService.updateUser(req.body, req.user._id)
        delete user.data
        res.json(user)
    } catch (err) {
        const errorMsg: IErrorMsg = { title: 'Opps, an error occurred', msg: 'Could not update your account data, try again later', type: 'danger' }
        res.status(200).send(errorMsg)
    }
}

async function updateData(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await userService.updateData(req.body, req.user._id)
        req.data = user.data
        next()
    } catch (err) {
        const errorMsg: IErrorMsg = { title: 'Opps, an error occurred', msg: 'Could not update your account data, try again later', type: 'danger' }
        res.status(200).send(errorMsg)
    }
}


// Crud

async function addAction(req: Request, res: Response, next: NextFunction) {
    try {
        const action = req.body
        const userId = req.user._id
        const data = await userService.addAction(action, userId)
        req.data = data
        next()
    } catch (err) {
        const errorMsg: IErrorMsg = { title: 'Opps, an error occurred', msg: 'Could not add new action, try again later', type: 'danger' }
        res.status(200).send(errorMsg)
    }
}

async function deleteAction(req: Request, res: Response, next: NextFunction) {
    try {
        const { actionId } = req.params
        const userId = req.user._id
        const data = await userService.deleteAction(actionId, userId)
        req.data = data
        next()
    } catch (err) {
        const errorMsg: IErrorMsg = { title: 'Opps, an error occurred', msg: 'Could not delete action, try again later', type: 'danger' }
        res.status(200).send(errorMsg)
    }
}

async function duplicateAction(req: Request, res: Response, next: NextFunction) {
    try {
        const { actionId } = req.params
        const userId = req.user._id
        const data = await userService.duplicateAction(actionId, userId)
        req.data = data
        next()
    } catch (err) {
        const errorMsg: IErrorMsg = { title: 'Opps, an error occurred', msg: 'Could not duplicate action, try again later', type: 'danger' }
        res.status(200).send(errorMsg)
    }
}

async function addCategory(req: Request, res: Response, next: NextFunction) {
    try {
        const category = req.body
        const userId = req.user._id
        const data = await userService.addCategory(category, userId)
        req.data = data
        next()
    } catch (err) {
        const errorMsg: IErrorMsg = { title: 'Opps, an error occurred', msg: 'Could not add new category, try again later', type: 'danger' }
        res.status(200).send(errorMsg)
    }
}

async function deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
        const { categoryId } = req.params
        const userId = req.user._id
        const data = await userService.deleteCategory(categoryId, userId)
        req.data = data
        next()
    } catch (err) {
        const errorMsg: IErrorMsg = { title: 'Opps, an error occurred', msg: 'Could not delete category, try again later', type: 'danger' }
        res.status(200).send(errorMsg)
    }
}

async function addLabel(req: Request, res: Response, next: NextFunction) {
    try {
        const label = req.body
        const userId = req.user._id
        const data = await userService.addLabel(label, userId)
        req.data = data
        next()
    } catch (err) {
        const errorMsg: IErrorMsg = { title: 'Opps, an error occurred', msg: 'Could not add new label, try again later', type: 'danger' }
        res.status(200).send(errorMsg)
    }
}

async function deleteLabel(req: Request, res: Response, next: NextFunction) {
    try {
        const { labelId } = req.params
        const userId = req.user._id
        const data = await userService.deleteLabel(labelId, userId)
        req.data = data
        next()
    } catch (err) {
        const errorMsg: IErrorMsg = { title: 'Opps, an error occurred', msg: 'Could not delete later, try again later', type: 'danger' }
        res.status(200).send(errorMsg)
    }
}

async function deleteUser(req: Request, res: Response) {
    try{
        const data = await userService.deleteUser(req.user._id)
        if(data){
            res.clearCookie('token')
        }
        res.json(data)
    } catch(err) {
        const errorMsg: IErrorMsg = { title: 'Opps, an error occurred', msg: 'Could not delete your account, try again later', type: 'danger' }
        res.status(200).send(errorMsg)
    }
}