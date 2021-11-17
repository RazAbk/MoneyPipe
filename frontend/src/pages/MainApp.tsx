import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { MainAppMenu } from '../components/MainAppMenu'
import { MobileMenu } from '../components/MobileMenu'
import { Screen } from '../components/Screen'
import { HeaderBlock } from '../components/HeaderBlock'
import { getData } from '../store/actions/user.action'
import { BalanceBlock } from '../components/BalanceBlock'
import { IncomesBlock } from '../components/IncomesBlock'
import { ExpensesBlock } from '../components/ExpensesBlock'


export const MainApp = () => {

    const [isMenuOpen, setMenuOpen] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getData())

    }, [dispatch])


    return (
        <>
            <div className="main-app">
                <MainAppMenu isMenuOpen={isMenuOpen} />

                <div className="app-content">
                    <div className="full-screen-content">
                        <MobileMenu setMenuOpen={setMenuOpen} />

                        <HeaderBlock />
                        <BalanceBlock />
                        <div className="main-content-blocks">
                            <IncomesBlock/>
                            <ExpensesBlock/>
                        </div>
                    </div>

                </div>
            </div>
            <Screen isOpen={isMenuOpen} exitScreen={setMenuOpen} />
        </>
    )
}
