import React from 'react'
import { IoMdExit } from 'react-icons/io'
import { FaUserAlt } from 'react-icons/fa'
import { MdAddCircle } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { setViewMode } from '../store/actions/user.action'

interface IMainAppMenuProps {
    isMenuOpen: boolean;
}

export const MainAppMenu = ({isMenuOpen}: IMainAppMenuProps) => {

    const currentViewMode = useSelector<RootState>(state => state.userModule.currentViewMode)
    const dispatch = useDispatch()

    const handleViewModeClick = (value: string) => {
        dispatch(setViewMode(value))
    }
    console.log('currentViewMode', currentViewMode)

    return (
        <div className={`main-app-menu ${isMenuOpen ? 'open-menu' : ''}`}>
            <h1 className="app-logo">MoneyPipe</h1>
            <div className="user-details">
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" />
                <h3>User Name</h3>
            </div>
            <div className="main-menu">
                <div className="inner-menu">
                    <h2>View mode</h2>
                    <ul>
                        <li className={`${currentViewMode === 'summery' ? 'menu-li-active' : ''}`} 
                            onClick={() => {handleViewModeClick('summery')}}>
                            Summery
                        </li>
                        <li className={`${currentViewMode === 'graph' ? 'menu-li-active' : ''}`}
                            onClick={() => {handleViewModeClick('graph')}}>
                            Graph
                        </li>
                    </ul>
                </div>
                <hr/>
                <div className="inner-menu">
                    <h2>My labels</h2>
                    <ul>
                        <li>
                            Car
                        </li>
                        <li>
                            Groceries
                        </li>
                        <li>
                            House hold
                        </li>
                    </ul>
                </div>
            </div>

            <div className="actions-bar">
                <div className="account-actions">
                    <IoMdExit />
                    <FaUserAlt />
                </div>
                <div className="quick-actions">
                    <MdAddCircle />
                </div>
            </div>
        </div>
    )
}
