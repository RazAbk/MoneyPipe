import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdAddCircle } from 'react-icons/md'

interface IMobileMenuProps{
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setActionAddEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MobileMenu = ({setMenuOpen, setActionAddEditModalOpen}: IMobileMenuProps) => {
    return (
        <div className="mobile-menu">
            <div className="mobile-menu-icon">
                <GiHamburgerMenu onClick={() => {setMenuOpen(prevState => !prevState)}}/>
            </div>
            <h1 className="app-logo">MoneyPipe</h1>
            <div className="mobile-menu-icon">
                <MdAddCircle onClick={() => {setActionAddEditModalOpen(true)}}/>
            </div>
        </div>
    )
}
