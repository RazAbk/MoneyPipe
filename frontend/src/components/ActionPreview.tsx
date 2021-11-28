import React from 'react'
import { useSelector } from 'react-redux'
import { IAction, IDataObject } from '../interfaces/dataInterfaces'
import { utilService } from '../services/util.service'
import { RootState } from '../store/store'
import { GetIcon } from './GetIcon'

interface IActionProps {
    action: IAction
}


export const ActionPreview = ({ action }: IActionProps) => {

    const rawData: IDataObject = useSelector((state: RootState) => state.userModule.data)


    const findCategoryData = (category: string) => {
        if(rawData){
            const currCat =  rawData.categories.find(currCat => currCat.title === category)
            return currCat
        }
    }

    const categoryData = findCategoryData(action.category)

    if(!categoryData) return <h1>Loading</h1>
    return (
        <div className="action-preview">
            <div className="left-side">
            <div className="action-details-icon" style={{ backgroundColor: categoryData.bgColor }}>
                <GetIcon iconName={categoryData.icon}/>
            </div>
                <div className="action-data">
                    <p className="action-date">{utilService.getRelativeDate(action.createdAt)}</p>
                    <h3>{action.description}</h3>
                    <p className="action-labels">{action.labels.map(label => <span key={`label-${action.createdAt}-${label}`}>{label}</span>)}</p>
                </div>
            </div>
            <div className="right-side">
                <h3>{action.amount.toLocaleString()}{rawData.currencySign}</h3>
            </div>
        </div>
    )
}
