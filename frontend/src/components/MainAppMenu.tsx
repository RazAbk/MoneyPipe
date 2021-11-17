import React from 'react'
import { IoMdExit } from 'react-icons/io'
import { FaUserAlt } from 'react-icons/fa'
import { MdAddCircle } from 'react-icons/md'

export const MainAppMenu = () => {
    return (
        <div className="main-app-menu">
            <h1 className="app-logo">MoneyPipe</h1>
            <div className="user-details">
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" />
                <h3>User Name</h3>
            </div>
            <div className="main-menu">
                <div className="inner-menu">
                    <h2>Overall</h2>
                    <ul>
                        <li>
                            Summery
                        </li>
                        <li>
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
