import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MainAppMenu } from '../components/MainAppMenu'
import { MobileMenu } from '../components/MobileMenu'
import { Screen } from '../components/Screen'
// import { IDataObject } from '../interfaces/dataInterfaces'
import { getData } from '../store/actions/user.action'
import { RootState } from '../store/store'


export const MainApp = () => {

    const [isMenuOpen, setMenuOpen] = useState(false)
    const dispatch = useDispatch()
    const data = useSelector<RootState>(state => state.userModule.data)

    // Initialize: get the user's data
    useEffect(() => {
        dispatch(getData())

    }, [dispatch])

    console.log('data is:', data)

    return (
        <div className="main-app">
            <MainAppMenu isMenuOpen={isMenuOpen}/>
            <MobileMenu setMenuOpen={setMenuOpen}/>

            <Screen isOpen={isMenuOpen} exitScreen={setMenuOpen}/>
        </div>
    )
}
