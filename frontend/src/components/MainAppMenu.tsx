import React from 'react'
import { IoMdExit, IoMdSettings } from 'react-icons/io'
import { MdAddCircle } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { setCurrentViewMode, setCurrentLabel } from '../store/actions/app-state.action'
import { logout } from '../store/actions/user.action'
import { IDataObject } from '../interfaces/dataInterfaces'
import { setFilterBy } from '../store/actions/app-state.action'
import { useNavigate } from 'react-router'
import { IUser } from '../interfaces/userInterfaces'
import { sessionStorageService } from '../services/session-storage.service'

interface IMainAppMenuProps {
    isMenuOpen: boolean;
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setActionAddEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSettingsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MainAppMenu = ({ isMenuOpen, setMenuOpen, setActionAddEditModalOpen, setSettingsModalOpen }: IMainAppMenuProps) => {

    const navigate = useNavigate()

    const currentViewMode = useSelector((state: RootState) => state.appStateModule.currentViewMode)
    const currentLabel = useSelector((state: RootState) => state.appStateModule.currentLabel)
    const filterBy = useSelector((state: RootState) => state.appStateModule.filterBy)
    const user: IUser = useSelector((state: RootState) => state.userModule.loggedInUser) || sessionStorageService.load('loggedInUser')
    const data: IDataObject = useSelector((state: RootState) => state.userModule.data)

    const dispatch = useDispatch()

    const handleViewModeClick = (value: string) => {
        dispatch(setCurrentViewMode(value))
        setMenuOpen(false)
    }

    const handleLabelClick = (value: string) => {
        const label = currentLabel === value ? '' : value
        const newFilterBy = {...filterBy, label}
        dispatch(setCurrentLabel(label))
        dispatch(setFilterBy(newFilterBy))
        setMenuOpen(false)
    }

    const handleLogout = () => {
        (async () => {
            await dispatch(logout())
            navigate('/')
        })()
    }

    return (
        <div className={`main-app-menu ${isMenuOpen ? 'open-menu' : ''}`}>
            <h1 className="app-logo">MoneyPipe</h1>
            <div className="user-details">
                <div className="image" style={{backgroundImage: `url(${user.picture})`}}></div>
                <h3>{user && user.firstName} {user && user.lastName}</h3>
            </div>
            <div className="main-menu">
                <div className="inner-menu">
                    <h2>View mode</h2>
                    <ul>
                        <li className={`${currentViewMode === 'Summery' ? 'menu-li-active' : ''}`}
                            onClick={() => { handleViewModeClick('Summery') }}>
                            Summery
                        </li>
                        <li className={`${currentViewMode === 'Graph' ? 'menu-li-active' : ''}`}
                            onClick={() => { handleViewModeClick('Graph') }}>
                            Graph
                        </li>
                    </ul>
                </div>
                <hr />
                <div className="inner-menu labels-menu">
                    <h2>My labels</h2>
                    <ul>
                        {data && data.labels.map(label => {
                            return <li onClick={() => {handleLabelClick(label.labelName)}}
                                       className={`${currentLabel === label.labelName ? 'menu-li-active' : ''}`}
                                       key={label.labelName}>
                                       {label.title}
                                    </li>
                        })}
                    </ul>
                </div>
            </div>

            <div className="actions-bar">
                <div className="account-actions">
                    <IoMdExit className="logout-btn" onClick={handleLogout}/>
                    <IoMdSettings onClick={() => {setSettingsModalOpen(true); setMenuOpen(false)}}/>
                </div>
                <div className="quick-actions">
                    <MdAddCircle onClick={() => {setActionAddEditModalOpen(true); setMenuOpen(false)}}/>
                </div>
            </div>
        </div>
    )
}
