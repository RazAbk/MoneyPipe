import React from 'react'
import { IoIosWarning } from 'react-icons/io'

import { HiShoppingCart } from 'react-icons/hi'
import { MdDirectionsCar, MdFastfood } from 'react-icons/md'
import { FaMotorcycle, FaBeer, FaEnvira, FaFly, FaHotjar, FaItunesNote, FaUntappd, FaBabyCarriage, FaBasketballBall, FaBicycle, FaBoxOpen, FaBook, FaBone, FaBus, FaBuilding, FaCampground, FaCamera, FaCapsules, FaCity, FaChartPie, FaChurch, FaCocktail, FaCode, FaCoins, FaDog, FaExclamationCircle, FaFaucet, FaExclamationTriangle, FaFilm, FaGasPump, FaGuitar, FaHamburger, FaHammer, FaHeart, FaInfoCircle, FaLaptop, FaMobileAlt, FaPeopleCarry, FaSmoking, FaSubway, FaUserGraduate } from 'react-icons/fa'
import { BsFillHouseDoorFill } from 'react-icons/bs'
import { GiMoneyStack } from 'react-icons/gi'


interface IconProps {
    iconName: string;
}

export const GetIcon = ({ iconName }: IconProps) => {
    return <>
        {iconName === 'shopping-cart' && <HiShoppingCart />}
        {iconName === 'car' && <MdDirectionsCar />}
        {iconName === 'bus' && <FaBus />}
        {iconName === 'train' && <FaSubway />}
        {iconName === 'food' && <MdFastfood />}
        {iconName === 'motorcycle' && <FaMotorcycle />}
        {iconName === 'code' && <FaCode />}
        {iconName === 'beer' && <FaBeer />}
        {iconName === 'cocktail' && <FaCocktail />}
        {iconName === 'home' && <BsFillHouseDoorFill />}
        {iconName === 'money' && <GiMoneyStack />}
        {iconName === 'coins' && <FaCoins />}
        {iconName === 'leaf' && <FaEnvira />}
        {iconName === 'travel' && <FaFly />}
        {iconName === 'fire' && <FaHotjar />}
        {iconName === 'music' && <FaItunesNote />}
        {iconName === 'bottles' && <FaUntappd />}
        {iconName === 'baby' && <FaBabyCarriage />}
        {iconName === 'ball' && <FaBasketballBall />}
        {iconName === 'bicycle' && <FaBicycle />}
        {iconName === 'box' && <FaBoxOpen />}
        {iconName === 'book' && <FaBook />}
        {iconName === 'student' && <FaUserGraduate />}
        {iconName === 'bone' && <FaBone />}
        {iconName === 'dog' && <FaDog />}
        {iconName === 'building' && <FaBuilding />}
        {iconName === 'camping' && <FaCampground />}
        {iconName === 'camera' && <FaCamera />}
        {iconName === 'capsules' && <FaCapsules />}
        {iconName === 'pie-graph' && <FaChartPie />}
        {iconName === 'industry' && <FaCity />}
        {iconName === 'church' && <FaChurch />}
        {iconName === 'exclamation' && <FaExclamationCircle />}
        {iconName === 'water' && <FaFaucet />}
        {iconName === 'warning' && <FaExclamationTriangle />}
        {iconName === 'movie' && <FaFilm />}
        {iconName === 'gas' && <FaGasPump />}
        {iconName === 'guitar' && <FaGuitar />}
        {iconName === 'hamburger' && <FaHamburger />}
        {iconName === 'hammer' && <FaHammer />}
        {iconName === 'heart' && <FaHeart />}
        {iconName === 'information' && <FaInfoCircle />}
        {iconName === 'laptop' && <FaLaptop />}
        {iconName === 'smartphone' && <FaMobileAlt />}
        {iconName === 'carry' && <FaPeopleCarry />}
        {iconName === 'smoke' && <FaSmoking />}
        {!iconName && <IoIosWarning />}
    </>
}