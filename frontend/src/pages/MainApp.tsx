import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MainAppMenu } from '../components/MainAppMenu'
import { MobileMenu } from '../components/MobileMenu'
import { Screen } from '../components/Screen'
import { HeaderBlock } from '../components/blocks/HeaderBlock'
import { getData } from '../store/actions/user.action'
import { BalanceBlock } from '../components/blocks/BalanceBlock'
import { GoPrimitiveDot as MobileIdx } from 'react-icons/go'
import { SummeryBlock } from '../components/blocks/SummeryBlock'
import { RootState } from '../store/store'
import { GraphBlock } from '../components/blocks/GraphBlock'
import { SearchModal } from '../components/modals/SearchModal'
import { ActionAddEditModal } from '../components/modals/ActionAddEditModal'
import { setSelectedAction } from '../store/actions/app-state.action'
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { sessionStorageService } from '../services/session-storage.service'
import { dateService } from '../services/date.service'
import { SettingsModal } from '../components/modals/SettingsModal'


export const MainApp = () => {

    const dispatch = useDispatch()
    const currentViewMode = useSelector((state: RootState) => state.appStateModule.currentViewMode)
    const user = useSelector((state: RootState) => state.userModule.loggedInUser) || sessionStorageService.load('loggedInUser')
    const filterBy = useSelector((state: RootState) => state.appStateModule.filterBy)

    const [isMenuOpen, setMenuOpen] = useState(false)
    const [isSearchModalOpen, setSearchModalOpen] = useState(false)
    const [isSettingsModalOpen, setSettingsModalOpen] = useState(false)
    const [isActionAddEditModalOpen, setActionAddEditModalOpen] = useState(false)
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
        if(user){
            dispatch(getData(dateService.getDateFilterBy(filterBy)))
        }
    }, [dispatch, user, filterBy])

    useEffect(() => {
        if (!isActionAddEditModalOpen) dispatch(setSelectedAction(null))
    }, [dispatch, isActionAddEditModalOpen])


    return (
        <>
            <div className="main-app">
                <MainAppMenu isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} setActionAddEditModalOpen={setActionAddEditModalOpen} setSettingsModalOpen={setSettingsModalOpen} />
                <div className="app-content">
                    <div className="full-screen-content">
                        <MobileMenu setMenuOpen={setMenuOpen} setActionAddEditModalOpen={setActionAddEditModalOpen} />
                        <HeaderBlock setSearchModalOpen={setSearchModalOpen} />
                        <BalanceBlock />
                        {currentViewMode === 'Graph' && <GraphBlock />}
                        <div ref={ref} className="main-content-blocks mobile-only keen-slider">
                            <SummeryBlock type="expense" setActionAddEditModalOpen={setActionAddEditModalOpen} />
                            <SummeryBlock type="income" setActionAddEditModalOpen={setActionAddEditModalOpen} />
                        </div>

                        <div className="main-content-blocks above-mobile">
                            <SummeryBlock type="expense" setActionAddEditModalOpen={setActionAddEditModalOpen} />
                            <SummeryBlock type="income" setActionAddEditModalOpen={setActionAddEditModalOpen} />
                        </div>
                    </div>

                </div>
            </div>

            <div className="pagination-dots mobile-only">
                <MobileIdx className={`${currentBlock ? 'fade-dot' : ''}`} />
                <MobileIdx className={`${!currentBlock ? 'fade-dot' : ''}`} />
            </div>

            <Screen isOpen={isMenuOpen} exitScreen={setMenuOpen} />
            <Screen isOpen={isSearchModalOpen} exitScreen={setSearchModalOpen} />
            <Screen isOpen={isActionAddEditModalOpen} exitScreen={setActionAddEditModalOpen} />
            <Screen isOpen={isSettingsModalOpen} exitScreen={setSettingsModalOpen} />

            {isSearchModalOpen && <SearchModal closeModal={setSearchModalOpen} />}
            {isActionAddEditModalOpen && <ActionAddEditModal closeModal={setActionAddEditModalOpen} />}
            {isSettingsModalOpen && <SettingsModal closeModal={setSettingsModalOpen} />}
        </>
    )
}
