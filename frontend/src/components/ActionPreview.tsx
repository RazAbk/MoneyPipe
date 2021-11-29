import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { IAction, IDataObject } from '../interfaces/dataInterfaces'
import { utilService } from '../services/util.service'
import { RootState } from '../store/store'
import { GetIcon } from './GetIcon'
import { FaRegEdit } from 'react-icons/fa'
import { VscTrash } from 'react-icons/vsc'


interface IActionProps {
    action: IAction
}


export const ActionPreview = ({ action }: IActionProps) => {

    const rawData: IDataObject = useSelector((state: RootState) => state.userModule.data)

    const [showActions, setShowActions] = useState(false)

    const ref = useRef(null)

    useEffect(() => {
        const closeActions = () => {
            setShowActions(false)
        }

        if(ref){
            if(ref.current){
                const el: HTMLDivElement = ref.current
                el.addEventListener('blur', closeActions)

                return () => {
                    el.removeEventListener('blur', closeActions)
                }
            }
        }
    }, [])

    const findCategoryData = (category: string) => {
        if(rawData){
            const currCat =  rawData.categories.find(currCat => currCat.title === category)
            return currCat
        }
    }

    const categoryData = findCategoryData(action.category)

    if(!categoryData) return <h1>Loading</h1>
    return (
        <div ref={ref} tabIndex={-1} className="action-preview" onClick={() => {setShowActions(prevState => !prevState)}}>
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
            <div className="action-preview-actions" style={{transform: showActions ? 'translateX(0%)' : 'translateX(100%)'}}>
                <button><FaRegEdit/></button>
                <button><VscTrash/></button>
            </div>
        </div>
    )
}
