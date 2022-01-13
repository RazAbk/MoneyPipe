import { NextFunction, Request, Response } from "express";
import { IAction, IErrorMsg } from "../interfaces/dataInterfaces";

module.exports = {
    filterBy
}

function filterBy(req: Request, res: Response, next: NextFunction) {
    try{
        const { startDate, endDate } = req.query

        if (startDate && endDate) {
            const filteredActions = req.data.actions.filter((action: IAction) => {
                if (action.createdAt < +startDate || action.createdAt > +endDate) return false
                return true
            })

            req.data.actions = filteredActions
        }
        
        res.json(req.data)
    } catch(err) {
        const errorMsg: IErrorMsg = { title: 'Opps, an error occurred', msg: 'Something went wrong, try again later', type: 'danger' }
        res.status(200).send(errorMsg)
    }
}