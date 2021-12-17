import axios from "axios"
import { localStorageService } from "./local-storage.service"

export const utilService = {
    debounce,
    makeId,
    getFormatedDigits,
    getCurrencies,
    getSymbolFromCode,
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

function getSymbolFromCode(currencyCode: string) {
    const currencies = localStorageService.load('currencies')
    return currencies[currencyCode].currencySymbol
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
    // return  [
    //     '#820014',
    //     '#a8071a',
    //     '#cf1322',
    //     '#f5222d',
    //     '#871400',
    //     '#ad2102',
    //     '#d4380d',
    //     '#fa541c',
    //     '#873800',
    //     '#ad4e00',
    //     '#d46b08',
    //     '#fa8c16',
    //     '#613400',
    //     '#874d00',
    //     '#ad6800',
    //     '#d48806',
    //     '#614700',
    //     '#876800',
    //     '#ad8b00',
    //     '#d4b106',
    //     '#254000',
    //     '#3f6600',
    //     '#5b8c00',
    //     '#7cb305',
    //     '#092b00',
    //     '#135200',
    //     '#237804',
    //     '#389e0d',
    //     '#002329',
    //     '#00474f',
    //     '#006d75',
    //     '#08979c',
    //     '#002766',
    //     '#003a8c',
    //     '#0050b3',
    //     '#096dd9',
    //     '#030852',
    //     '#061178',
    //     '#10239e',
    //     '#1d39c4',
    //     '#120338',
    //     '#22075e',
    //     '#391085',
    //     '#531dab',
    //     '#520339',
    //     '#780650',
    //     '#9e1068',
    //     '#c41d7f',
    //     '#000000',
    //     '#141414',
    //     '#1f1f1f',
    //     '#262626'
    // ]

    return [
        '#a8071a',
        '#cf1322',
        '#f5222d',
        '#ff4d4f',
        '#ad2102',
        '#d4380d',
        '#fa541c',
        '#ff7a45',
        '#ad4e00',
        '#d46b08',
        '#fa8c16',
        '#ffa940',
        '#ad6800',
        '#d48806',
        '#faad14',
        '#ffc53d',
        '#ad8b00',
        '#d4b106',
        '#fadb14',
        '#ffec3d',
        '#5b8c00',
        '#7cb305',
        '#a0d911',
        '#bae637',
        '#237804',
        '#389e0d',
        '#52c41a',
        '#73d13d',
        '#006d75',
        '#08979c',
        '#13c2c2',
        '#36cfc9',
        '#0050b3',
        '#096dd9',
        '#1890ff',
        '#40a9ff',
        '#10239e',
        '#1d39c4',
        '#2f54eb',
        '#597ef7',
        '#391085',
        '#531dab',
        '#722ed1',
        '#9254de',
        '#9e1068',
        '#c41d7f',
        '#eb2f96',
        '#f759ab',
        '#000000',
        '#141414',
        '#1f1f1f',
        '#262626'
    ]

}