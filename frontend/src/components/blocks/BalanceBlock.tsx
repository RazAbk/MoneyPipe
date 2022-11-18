import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IDataObject } from '../../interfaces/dataInterfaces'
import { RootState } from '../../store/store'

export const BalanceBlock = () => {

    const filterBy = useSelector((state: RootState) => state.appStateModule.filterBy)
    const rawData: IDataObject = useSelector((state: RootState) => state.userModule.data)

    const [balance, setBalance] = useState(0)
    const [balanceColor, setBalanceColor] = useState('#000000')


    useEffect(() => {
        if(rawData){
            const balance = rawData.actions.reduce((balance, action) => {
                if (!!filterBy.categories?.length && filterBy.categories.every((category: string) => category !== action.category)) return balance
                if (!!filterBy.labels?.length && !action.labels.some((label: string) => filterBy.labels.includes(label))) return balance
                if (!action.description.includes(filterBy.searchTxt)) return balance
                
                if (action.type === 'income') balance += +action.amount
                if (action.type === 'expense') balance -= +action.amount
                return balance
            }, 0)
            
            setBalance(balance)
            if(balance === 0){
                setBalanceColor('#000000')
            } else{
                setBalanceColor(balance > 0 ? '#00600F' : '#8A0000')
            }
        }
    }, [rawData, filterBy])

    return (
        <div className="header-block">
            <div className="header-block-content">
                <h2>Balance</h2>
                <p>Total balance</p>
            </div>
            <div className="balance-amount" style={{color: balanceColor}}>{balance ? Math.round(balance).toLocaleString() : '0'}{rawData && rawData.currency.sign}</div>
        </div>
    )
}
