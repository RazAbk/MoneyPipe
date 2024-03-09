import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MainAppMenu } from '../components/MainAppMenu'
import { MobileMenu } from '../components/MobileMenu'
import { HeaderBlock } from '../components/blocks/HeaderBlock'
import { getData, getUser } from '../store/actions/user.action'
import { BalanceBlock } from '../components/blocks/BalanceBlock'
import { SummeryBlock } from '../components/blocks/SummeryBlock'
import { RootState } from '../store/store'
import { GraphBlock } from '../components/blocks/GraphBlock'
import { SearchModal } from '../components/modals/SearchModal'
import { ActionModal } from '../components/modals/ActionModal'
import { setBlocksIdx, setLoader, setPaginationDots, setSelectedAction } from '../store/actions/app-state.action'
import { sessionStorageService } from '../services/session-storage.service'
import { dateService } from '../services/date.service'
import { SettingsModal } from '../components/modals/SettingsModal'
import { useNavigate } from 'react-router'
import { utilService } from '../services/util.service'
import { PaginationDots } from '../components/PaginationDots'
import { ReactDimmer } from 'react-dimmer'

export const MainApp = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentViewMode = useSelector((state: RootState) => state.appStateModule.currentViewMode)
    const user = useSelector((state: RootState) => state.userModule.loggedInUser) || sessionStorageService.load('loggedInUser')
    const filterBy = useSelector((state: RootState) => state.appStateModule.filterBy)
    

    const [isMenuOpen, setMenuOpen] = useState(false)
    const [isSearchModalOpen, setSearchModalOpen] = useState(false)
    const [isSettingsModalOpen, setSettingsModalOpen] = useState(false)
    const [isActionModalOpen, setActionModalOpen] = useState(false)

    const blocksRef = useRef(null)

    useEffect(() => {
        const _getData = async () => {
            dispatch(setLoader(true))
            await dispatch(getData(dateService.getDateFilterBy(filterBy)))
            dispatch(setLoader(false))
        }

        const _getUser = async () => {
            return await dispatch(getUser())
        }

        if(user){
            _getData()
        } else {
            const fetchedUser = _getUser()
            if(!fetchedUser){
                navigate('/')
            }
        }
    }, [dispatch, user, filterBy, navigate])

    useEffect(() => {
        if (!isActionModalOpen || isMenuOpen || isSettingsModalOpen) dispatch(setSelectedAction(null))
    }, [dispatch, isActionModalOpen, isMenuOpen, isSettingsModalOpen])

    useEffect(() => {
        const updatePaginationDots = utilService.debounce((ev: any) => {
            if(ev.target.scrollingElement.scrollTop > 0) {
                dispatch(setPaginationDots(true))
            } else {
                dispatch(setPaginationDots(false))
            }
        }, 100)
        
        if(currentViewMode === 'Graph'){
            if(window.scrollY > 0){
                dispatch(setPaginationDots(true))
            } else {
                dispatch(setPaginationDots(false))
            }
            window.addEventListener('scroll', updatePaginationDots)
        } else {
            dispatch(setPaginationDots(true))
            window.removeEventListener('scroll', updatePaginationDots)
        }
        
        return () => {
            window.removeEventListener('scroll', updatePaginationDots)
        }
    }, [dispatch, currentViewMode])


    const _handleScroll = (ev: any) => {
        if(ev.target.scrollLeft > 0) {
            dispatch(setBlocksIdx(1))
        } else {
            dispatch(setBlocksIdx(0))
        }
    }

    const handleBlocksScroll = utilService.debounce(_handleScroll, 100)

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
                        <div ref={blocksRef} onScroll={handleBlocksScroll} className="main-content-blocks">
                            <SummeryBlock type="expense" setActionModalOpen={setActionModalOpen} />
                            <SummeryBlock type="income" setActionModalOpen={setActionModalOpen} />
                            <SummeryBlock type="investment" setActionModalOpen={setActionModalOpen} />
                        </div>
                    </div>

                </div>
            </div>

            <PaginationDots />

            <ReactDimmer isOpen={isMenuOpen} exitDimmer={setMenuOpen} blur={1.5} saturate={85} />
            <ReactDimmer isOpen={isSearchModalOpen} exitDimmer={setSearchModalOpen} blur={1.5} saturate={85} />
            <ReactDimmer isOpen={isActionModalOpen} exitDimmer={setActionModalOpen} blur={1.5} saturate={85} />
            <ReactDimmer isOpen={isSettingsModalOpen} exitDimmer={setSettingsModalOpen} blur={1.5} saturate={85} />

            {isSearchModalOpen && <SearchModal closeModal={setSearchModalOpen} />}
            {isActionModalOpen && <ActionModal closeModal={setActionModalOpen} />}
            {isSettingsModalOpen && <SettingsModal closeModal={setSettingsModalOpen} />}
        </>
    )
}
