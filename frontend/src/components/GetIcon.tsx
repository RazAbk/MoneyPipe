import React from 'react'
import { IoIosWarning } from 'react-icons/io'

import { HiShoppingCart } from 'react-icons/hi'
import { MdDirectionsCar, MdFastfood } from 'react-icons/md'
import { FaMotorcycle, FaBeer } from 'react-icons/fa'
import { BsFillHouseDoorFill } from 'react-icons/bs'
import { GiMoneyStack } from 'react-icons/gi'


interface IconProps {
    iconName: string;
    iconColor: string;
}

export const GetIcon = ({ iconName, iconColor = '#e57373' }: IconProps) => {
    return <div className="action-details-icon" style={{ backgroundColor: iconColor }}>
                {iconName === 'shopping-cart' && <HiShoppingCart />}
                {iconName === 'car' && <MdDirectionsCar />}
                {iconName === 'food' && <MdFastfood />}
                {iconName === 'motorcycle' && <FaMotorcycle />}
                {iconName === 'beer' && <FaBeer />}
                {iconName === 'home' && <BsFillHouseDoorFill />}
                {iconName === 'money' && <GiMoneyStack />}
                {!iconName && <IoIosWarning />}
            </div>


}
