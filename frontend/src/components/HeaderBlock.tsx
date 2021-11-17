import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { FaFilter } from 'react-icons/fa'

export const HeaderBlock = () => {

    const currentViewMode = useSelector((state: RootState) => state.userModule.currentViewMode)
    const currentLabel = useSelector((state: RootState) => state.userModule.currentLabel)

    return (
        <div className="header-block">
            <div className="header-block-content">
                {currentLabel && <h2>{currentLabel}</h2>}
                {(!currentLabel && currentViewMode) && <h2>{currentViewMode}</h2>}
                <p>{currentViewMode} of <u>{'*Time*'}</u> incomes and expenses</p>
            </div>
            <div className="filter-btn">
                <FaFilter/>
            </div>
        </div>
    )
}
