import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MainAppMenu } from '../components/MainAppMenu'
import { MobileMenu } from '../components/MobileMenu'
import { Screen } from '../components/Screen'
import { HeaderBlock } from '../components/HeaderBlock'
// import { IDataObject } from '../interfaces/dataInterfaces'
import { getData } from '../store/actions/user.action'
import { RootState } from '../store/store'
import { BalanceBlock } from '../components/BalanceBlock'


export const MainApp = () => {

    const [isMenuOpen, setMenuOpen] = useState(false)
    const dispatch = useDispatch()
    // const data = useSelector<RootState>(state => state.userModule.data)
    // const currentViewMode = useSelector<RootState>(state => state.userModule.currentViewMode)
    // const currentLabel = useSelector<RootState>(state => state.userModule.currentLabel)

    // Initialize: get the user's data
    useEffect(() => {
        dispatch(getData())

    }, [dispatch])

    // console.log('data is:', data)
    // console.log('currentViewMode is:', currentViewMode)
    // console.log('currentLabel is:', currentLabel)

    return (
        <>
            <div className="main-app">
                <MainAppMenu isMenuOpen={isMenuOpen} />
                <div className="app-content">

                <MobileMenu setMenuOpen={setMenuOpen} />

                <HeaderBlock />
                <BalanceBlock />

                </div>
            </div>
            <Screen isOpen={isMenuOpen} exitScreen={setMenuOpen} />
        </>
    )
}
