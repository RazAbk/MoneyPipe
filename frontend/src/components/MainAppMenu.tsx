import React from 'react'
import { IoMdExit } from 'react-icons/io'
import { FaUserAlt } from 'react-icons/fa'
import { MdAddCircle } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { setCurrentViewMode, setCurrentLabel } from '../store/actions/user.action'
import { IDataObject } from '../interfaces/dataInterfaces'

interface IMainAppMenuProps {
    isMenuOpen: boolean;
}

export const MainAppMenu = ({ isMenuOpen }: IMainAppMenuProps) => {

    const currentViewMode = useSelector((state: RootState) => state.userModule.currentViewMode)
    const currentLabel = useSelector((state: RootState) => state.userModule.currentLabel)
    const data: IDataObject = useSelector((state: RootState) => state.userModule.data)

    const dispatch = useDispatch()

    const handleViewModeClick = (value: string) => {
        dispatch(setCurrentViewMode(value))
    }

    const handleLabelClick = (value: string) => {
        let label = currentLabel === value ? null : value
        dispatch(setCurrentLabel(label))
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
                <div className="inner-menu">
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
