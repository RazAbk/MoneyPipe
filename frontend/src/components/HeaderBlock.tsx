import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { BiSearchAlt } from 'react-icons/bi'

export const HeaderBlock = () => {

    const currentViewMode = useSelector((state: RootState) => state.appStateModule.currentViewMode)
    const currentLabel = useSelector((state: RootState) => state.appStateModule.currentLabel)

    return (
        <div className="header-block">
            <div className="header-block-content">
                {currentLabel && <h2>{currentLabel}</h2>}
                {(!currentLabel && currentViewMode) && <h2>{currentViewMode}</h2>}
                <p>{currentViewMode} of <u>{'*Time*'}</u> incomes and expenses</p>
            </div>
            <div className="filter-btn">
                <BiSearchAlt/>
            </div>
        </div>
    )
}
