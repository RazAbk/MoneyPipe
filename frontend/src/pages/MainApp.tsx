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
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { GoPrimitiveDot } from 'react-icons/go'


export const MainApp = () => {

    const dispatch = useDispatch()

    const [isMenuOpen, setMenuOpen] = useState(false)
    const [currentBlock, setCurrentBlock] = useState(0)

    // Mobile slider
    const [ref] = useKeenSlider<HTMLDivElement>({
        spacing: 16,
        initial: 0,
        slideChanged(s) {
            setCurrentBlock(s.details().relativeSlide)
        }
    })

    useEffect(() => {
        dispatch(getData())

    }, [dispatch])

    return (
        <>
            <div className="main-app">
                <MainAppMenu isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />

                <div className="app-content">
                    <div className="full-screen-content">
                        <MobileMenu setMenuOpen={setMenuOpen} />

                        <HeaderBlock />
                        <BalanceBlock />
                        <div ref={ref} className="main-content-blocks mobile-only keen-slider">
                            <div className="pagination-dots">
                                <GoPrimitiveDot className={`${currentBlock === 1 ? 'fade-dot' : ''}`}/>
                                <GoPrimitiveDot className={`${currentBlock === 0 ? 'fade-dot' : ''}`}/>
                            </div>
                            <IncomesBlock />
                            <ExpensesBlock />
                        </div>

                        <div className="main-content-blocks above-mobile">
                            <IncomesBlock />
                            <ExpensesBlock />
                        </div>
                    </div>

                </div>
            </div>
            <Screen isOpen={isMenuOpen} exitScreen={setMenuOpen} />
        </>
    )
}
