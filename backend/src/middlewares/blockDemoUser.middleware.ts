import { NextFunction, Request, Response } from "express";

module.exports = {
    blockDemoUser
}

function blockDemoUser(req: Request, res: Response, next: NextFunction) {
    if(req.user.userName === 'DemoUser'){
        res.status(200).send({title: 'Opps...', msg: 'Changes cannot be made on demo user', type: 'warning'})
    } else {
        next()
    }
}