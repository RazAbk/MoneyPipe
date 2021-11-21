import React from 'react'
import { IAction } from '../interfaces/dataInterfaces'
import { utilService } from '../services/util.service'
import { GetIcon } from './GetIcon'

interface IActionProps {
    action: IAction
}


export const ActionPreview = ({ action }: IActionProps) => {

    return (
        <div className="action-preview">
            <div className="left-side">
                <GetIcon iconName={'bla bla'} />
                <div className="action-data">
                    <p className="action-date">{utilService.getRelativeDate(action.createdAt)}</p>
                    <h3>{action.description}</h3>
                    <p className="action-labels">{action.labels.map(label => <span>{label}</span>)}</p>
                </div>
            </div>
            <div className="right-side">
                <h3>{action.amount}{action.currencySign}</h3>
            </div>
        </div>
    )
}
