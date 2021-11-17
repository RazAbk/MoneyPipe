import React, { useState } from 'react'
import { MainAppMenu } from '../components/MainAppMenu'
import { MobileMenu } from '../components/MobileMenu'
import { Screen } from '../components/Screen'

export const MainApp = () => {

    const [isMenuOpen, setMenuOpen] = useState(false)

    return (
        <div className="main-app">
            <MainAppMenu isMenuOpen={isMenuOpen}/>
            <MobileMenu setMenuOpen={setMenuOpen}/>

            <Screen isOpen={isMenuOpen} exitScreen={setMenuOpen}/>
        </div>
    )
}
