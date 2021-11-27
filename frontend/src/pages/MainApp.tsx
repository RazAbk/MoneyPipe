import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MainAppMenu } from '../components/MainAppMenu'
import { MobileMenu } from '../components/MobileMenu'
import { Screen } from '../components/Screen'
import { HeaderBlock } from '../components/HeaderBlock'
import { getData } from '../store/actions/user.action'
import { BalanceBlock } from '../components/BalanceBlock'
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { GoPrimitiveDot } from 'react-icons/go'
import { SummeryBlock } from '../components/SummeryBlock'
import { RootState } from '../store/store'
import { GraphBlock } from '../components/GraphBlock'
import { SearchModal } from '../components/SearchModal'
import { ActionAddModal } from '../components/ActionAddModal'


export const MainApp = () => {

    const dispatch = useDispatch()
    const currentViewMode = useSelector((state: RootState) => state.appStateModule.currentViewMode)

    const [isMenuOpen, setMenuOpen] = useState(false)
    const [isSearchModalOpen, setSearchModalOpen] = useState(false)
    const [isActionAddModalOpen, setActionAddModalOpen] = useState(false)
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
    }, [])


    return (
        <>
            <div className="main-app">
                <MainAppMenu isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} setActionAddModalOpen={setActionAddModalOpen}/>
                <div className="app-content">
                    <div className="full-screen-content">
                        <MobileMenu setMenuOpen={setMenuOpen} setActionAddModalOpen={setActionAddModalOpen}/>
                        <HeaderBlock setSearchModalOpen={setSearchModalOpen} />
                        <BalanceBlock />
                        {currentViewMode === 'Graph' && <GraphBlock />}
                        <div ref={ref} className="main-content-blocks mobile-only keen-slider">
                            <SummeryBlock type="expense" />
                            <SummeryBlock type="income" />
                        </div>

                        <div className="main-content-blocks above-mobile">
                            <SummeryBlock type="expense" />
                            <SummeryBlock type="income" />
                        </div>
                    </div>

                </div>
            </div>

            <div className="pagination-dots mobile-only">
                <GoPrimitiveDot className={`${currentBlock ? 'fade-dot' : ''}`} />
                <GoPrimitiveDot className={`${!currentBlock ? 'fade-dot' : ''}`} />
            </div>
            <Screen isOpen={isMenuOpen} exitScreen={setMenuOpen} />
            <Screen isOpen={isSearchModalOpen} exitScreen={setSearchModalOpen} />
            <Screen isOpen={isActionAddModalOpen} exitScreen={setActionAddModalOpen} />

            {isSearchModalOpen && <SearchModal closeModal={setSearchModalOpen}/> }
            {isActionAddModalOpen && <ActionAddModal closeModal={setActionAddModalOpen}/> }
        </>
    )
}
