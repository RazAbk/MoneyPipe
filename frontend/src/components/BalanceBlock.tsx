import React from 'react'
import { useSelector } from 'react-redux'
import { utilService } from '../services/util.service'
import { RootState } from '../store/store'

export const BalanceBlock = () => {

    const filterBy = useSelector((state: RootState) => state.appStateModule.filterBy)

    const startDateString = utilService.getDateAsString(filterBy.startDate)
    const endDateString = utilService.getDateAsString(filterBy.endDate)


    return (
        <div className="header-block">
            <div className="header-block-content">
                <h2>Balance</h2>
                <p>Total balance for <b>{startDateString} - {endDateString}</b></p>
            </div>
            <div className="balance-amount">
                24,000₪
            </div>
        </div>
    )
}
