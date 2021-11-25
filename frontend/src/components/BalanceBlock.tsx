import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IDataObject } from '../interfaces/dataInterfaces'
import { utilService } from '../services/util.service'
import { RootState } from '../store/store'

export const BalanceBlock = () => {

    const filterBy = useSelector((state: RootState) => state.appStateModule.filterBy)
    const rawData: IDataObject = useSelector((state: RootState) => state.userModule.data)

    const [balance, setBalance] = useState<string | number>('')

    const startDateString = utilService.getDateAsString(filterBy.startDate)
    const endDateString = utilService.getDateAsString(filterBy.endDate)

    useEffect(() => {
        if(rawData){
            const balance = rawData.actions.reduce((balance, action) => {
                if (action.createdAt < filterBy.startDate || action.createdAt > filterBy.endDate) return balance
                if (filterBy.category && action.category !== filterBy.category) return balance
                if (filterBy.label && !action.labels.includes(filterBy.label)) return balance
                
                if (action.type === 'income') balance += action.amount
                if (action.type === 'expense') balance -= action.amount
                return balance
            }, 0)

            setBalance(balance)
        }
    }, [rawData])

    if(!balance) return <h1>Loading...</h1>
    return (
        <div className="header-block">
            <div className="header-block-content">
                <h2>Balance</h2>
                <p>Total balance for <b>{startDateString} - {endDateString}</b></p>
            </div>
            <div className="balance-amount">{balance.toLocaleString()}{rawData.actions[0].currencySign}</div>
        </div>
    )
}
