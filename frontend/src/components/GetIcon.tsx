import React from 'react'
import { IoIosWarning } from 'react-icons/io'

import { HiShoppingCart } from 'react-icons/hi'
import { MdDirectionsCar, MdFastfood } from 'react-icons/md'
import { FaMotorcycle, FaBeer } from 'react-icons/fa'
import { BsFillHouseDoorFill } from 'react-icons/bs'
import { GiMoneyStack } from 'react-icons/gi'


interface IconProps {
    iconName: string;
}

export const GetIcon = ({iconName}: IconProps) => {
    return <>
                {iconName === 'shopping-cart' && <HiShoppingCart />}
                {iconName === 'car' && <MdDirectionsCar />}
                {iconName === 'food' && <MdFastfood />}
                {iconName === 'motorcycle' && <FaMotorcycle />}
                {iconName === 'beer' && <FaBeer />}
                {iconName === 'home' && <BsFillHouseDoorFill />}
                {iconName === 'money' && <GiMoneyStack />}
                {!iconName && <IoIosWarning />}
            </>


}
