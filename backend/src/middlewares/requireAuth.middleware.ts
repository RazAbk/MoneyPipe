import { NextFunction, Request, Response } from "express";
const jwt = require('jsonwebtoken')

module.exports = {
    authenticateToken
}

function authenticateToken(req: Request, res: Response, next: NextFunction) {
    try{
        const token = req?.cookies?.token ?? req?.headers?.authorization;

        if(!token) return res.status(200).send('')
        
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
            if (err) return res.status(401).send({title: 'Not authenticated!', msg: 'Please login to continue', type: 'danger'})

            req.user = user
            next()
        })
    } catch(err) {
        res.send({title: 'Not authenticated!', msg: 'Please login to continue', type: 'danger'})
    }
}