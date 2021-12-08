import axios from "axios"
import { localStorageService } from "./local-storage.service"

export const utilService = {
    debounce,
    makeId,
    getFormatedDigits,
    getCurrencies,
    getIcons,
    getColors
}

const CURRENCY_API = process.env.REACT_APP_CURRENCY_API

function debounce<Params extends any[]>(func: (...args: Params) => any, timeout: number,): (...args: Params) => void {
    let timer: NodeJS.Timeout

    return (...args: Params) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func(...args)
        }, timeout)
    }
}

function makeId(length: number = 6) {
    let txt = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function getFormatedDigits(num: number) {
    return num < 10 ? '0' + num : num
}

async function getCurrencies() {
    try{
        const currencies = localStorageService.load('currencies')
        if(currencies){
            return currencies
        } else {
            const res = await axios.get(`https://free.currconv.com/api/v7/currencies?apiKey=${CURRENCY_API}`)
            localStorageService.save('currencies', res.data.results)
            return res.data.results
        }
    } catch(err) {
        console.log(err)
    }
}

function getIcons() {
    return [
        'shopping-cart',
        'car',
        'bus',
        'train',
        'food',
        'motorcycle',
        'code',
        'beer',
        'cocktail',
        'home',
        'money',
        'coins',
        'leaf',
        'travel',
        'fire',
        'music',
        'bottles',
        'baby',
        'ball',
        'bicycle',
        'box',
        'book',
        'student',
        'bone',
        'dog',
        'building',
        'camping',
        'camera',
        'capsules',
        'pie-graph',
        'industry',
        'church',
        'exclamation',
        'water',
        'warning',
        'movie',
        'gas',
        'guitar',
        'hamburger',
        'hammer',
        'heart',
        'information',
        'laptop',
        'smartphone',
        'carry',
        'smoke'
    ]
}

function getColors() {
    return  [
        '#C8331B',
        '#c35353',
        '#DB7476',
        '#ef6f71',
        '#D99CA5',
        '#E56D31',
        '#f37a11',
        '#fba66c',
        '#EDCB9C',
        '#FFE7C9',
        '#F4CF47',
        '#fdd149',
        '#dfda68',
        '#FFFAC9',
        '#51A885',
        '#68A828',
        '#62c799',
        '#87e38d',
        '#b0f52d',
        '#b1e27d',
        '#C2E0AE',
        '#97c598',
        '#C9EFCB',
        '#21ADD7',
        '#267A9E',
        '#4374b4',
        '#4274fd',
        '#6ac1d4',
        '#986B9B',
        '#9174a9',
        '#9e8af8',
        '#b4ced8',

    ]

}