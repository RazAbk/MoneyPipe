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
import { ActionModal } from '../components/modals/ActionModal'
import { setLoader, setSelectedAction } from '../store/actions/app-state.action'
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
    const [isActionModalOpen, setActionModalOpen] = useState(false)
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
        const _getData = async () => {
            dispatch(setLoader(true))
            await dispatch(getData(dateService.getDateFilterBy(filterBy)))
            dispatch(setLoader(false))
        }
        if(user){
            _getData()
        } else {
            // Todo: Do something if no user (check if req.session is alive?)
            console.log('no user')
        }
    }, [dispatch, user, filterBy])

    useEffect(() => {
        if (!isActionModalOpen) dispatch(setSelectedAction(null))
    }, [dispatch, isActionModalOpen])


    return (
        <>
            <div className="main-app">
                <MainAppMenu isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} setActionModalOpen={setActionModalOpen} setSettingsModalOpen={setSettingsModalOpen} />
                <div className="app-content">
                    <div className="full-screen-content">
                        <MobileMenu setMenuOpen={setMenuOpen} setActionModalOpen={setActionModalOpen} />
                        <HeaderBlock setSearchModalOpen={setSearchModalOpen} />
                        <BalanceBlock />
                        {currentViewMode === 'Graph' && <GraphBlock />}
                        <div ref={ref} className="main-content-blocks mobile-only keen-slider">
                            <SummeryBlock type="expense" setActionModalOpen={setActionModalOpen} />
                            <SummeryBlock type="income" setActionModalOpen={setActionModalOpen} />
                        </div>

                        <div className="main-content-blocks above-mobile">
                            <SummeryBlock type="expense" setActionModalOpen={setActionModalOpen} />
                            <SummeryBlock type="income" setActionModalOpen={setActionModalOpen} />
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
            <Screen isOpen={isActionModalOpen} exitScreen={setActionModalOpen} />
            <Screen isOpen={isSettingsModalOpen} exitScreen={setSettingsModalOpen} />

            {isSearchModalOpen && <SearchModal closeModal={setSearchModalOpen} />}
            {isActionModalOpen && <ActionModal closeModal={setActionModalOpen} />}
            {isSettingsModalOpen && <SettingsModal closeModal={setSettingsModalOpen} />}
        </>
    )
}
