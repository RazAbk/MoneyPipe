import { Request, Response } from "express";

const authService = require('./auth.service')
const userService = require('../user/user.service')

async function signup(req: Request, res: Response) {
    try{
        const { userName, password, firstName, lastName } = req.body
        
        const isUser = await userService.getByUsername(userName)
        
        if(isUser){
            res.status(500).send('username is taken')
        } else {
            await authService.signup(userName, password, firstName, lastName)
            const user = await authService.login(userName, password)
            
            req.session.user = user
            res.json(user)
        }
    } catch (err) {
        console.log('could not sign up', err)
        throw err
    }
}

async function login(req: Request, res: Response) {
    try{
        const { userName, password } = req.body
        
        const user = await authService.login(userName, password)
        
        req.session.user = user
        res.json(user)
    } catch(err){
        console.log('could not login', err)
        throw err
    }
}

module.exports = {
    signup,
    login
}