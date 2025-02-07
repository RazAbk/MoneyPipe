import Axios from "axios"
const { Logger } = require('../logger');

module.exports = {
    makeId,
    convertCurrency,
};

const currencyURL = `https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.CURRENCY_API_KEY}`;

const CurrenciesMap: any = {
    "$": "USD", "USD": "USD", // U.S. Dollar
    "₪": "ILS", "ILS": "ILS", // Israeli Shekel
    "€": "EUR", "EUR": "EUR", // Euro
    "£": "GBP", "GBP": "GBP", // British Pound
    "¥": "JPY", "JPY": "JPY", // Japanese Yen
    "₩": "KRW", "KRW": "KRW", // South Korean Won
    "₹": "INR", "INR": "INR", // Indian Rupee
    "C$": "CAD", "CAD": "CAD", // Canadian Dollar
    "A$": "AUD", "AUD": "AUD", // Australian Dollar
    "R$": "BRL", "BRL": "BRL", // Brazilian Real
    "₽": "RUB", "RUB": "RUB", // Russian Ruble
    "S$": "SGD", "SGD": "SGD", // Singapore Dollar
    "HK$": "HKD", "HKD": "HKD", // Hong Kong Dollar
    "₺": "TRY", "TRY": "TRY", // Turkish Lira
    "R": "ZAR", "ZAR": "ZAR", // South African Rand
    "CHF": "CHF", // Swiss Franc
    "CNY": "CNY", // Chinese Yuan
    "CZK": "CZK", // Czech Koruna
    "DKK": "DKK", // Danish Krone
    "HRK": "HRK", // Croatian Kuna (now replaced by EUR)
    "HUF": "HUF", // Hungarian Forint
    "IDR": "IDR", // Indonesian Rupiah
    "ISK": "ISK", // Icelandic Krona
    "MX$": "MXN", "MXN": "MXN", // Mexican Peso
    "MYR": "MYR", // Malaysian Ringgit
    "NOK": "NOK", // Norwegian Krone
    "NZ$": "NZD", "NZD": "NZD", // New Zealand Dollar
    "₱": "PHP", "PHP": "PHP", // Philippine Peso
    "zł": "PLN", "PLN": "PLN", // Polish Zloty
    "RON": "RON", // Romanian Leu
    "SEK": "SEK", // Swedish Krona
    "THB": "THB", // Thai Baht
    "BGN": "BGN", // Bulgarian Lev
    "CLP": "CLP", // Chilean Peso
    "COP": "COP", // Colombian Peso
    "EGP": "EGP", // Egyptian Pound
    "MAD": "MAD", // Moroccan Dirham
    "TWD": "TWD", "NT$": "TWD", // New Taiwan Dollar
    "UAH": "UAH", // Ukrainian Hryvnia
    "VND": "VND", "₫": "VND", // Vietnamese Dong
    "SAR": "SAR", // Saudi Riyal
    "AED": "AED", // United Arab Emirates Dirham
    "QAR": "QAR", // Qatari Riyal
    "KWD": "KWD", // Kuwaiti Dinar
    "BHD": "BHD", // Bahraini Dinar
    "OMR": "OMR", // Omani Rial
    "PKR": "PKR", "Rs": "PKR", // Pakistani Rupee
    "LKR": "LKR", "SLRs": "LKR", // Sri Lankan Rupee
    "BDT": "BDT", // Bangladeshi Taka
    "MMK": "MMK", // Myanmar Kyat
    "GHS": "GHS", // Ghanaian Cedi
    "NGN": "NGN", // Nigerian Naira
    "KES": "KES", // Kenyan Shilling
    "TZS": "TZS", // Tanzanian Shilling
    "UGX": "UGX", // Ugandan Shilling
    "MZN": "MZN", // Mozambican Metical
    "ETB": "ETB", // Ethiopian Birr
    "DZD": "DZD", // Algerian Dinar
    "IRR": "IRR", // Iranian Rial
    "IQD": "IQD", // Iraqi Dinar
    "JOD": "JOD", // Jordanian Dinar
};

let CurrenciesRates: { [curr: string]: number } = {};
let CurrenciesRatesLastUpdate: number = 0;


async function getCurrencies() {
    if (Date.now() - CurrenciesRatesLastUpdate < (1000 * 60 * 60 * 24)) { // 1 day
        Logger.info("Fetched currencies from cache");
        return CurrenciesRates;
    } else {
        const response = await Axios.get(currencyURL);
        const currencies = response?.data ?? {};
        CurrenciesRatesLastUpdate = Date.now();

        CurrenciesRates = currencies;
        Logger.info("Fetched currencies from internet");
        return CurrenciesRates;
    }
}


async function convertCurrency(amountStr: string, defaultCurrency: string, toCurrency: string) {
    const CurrenciesRates = ((await getCurrencies()).data) as any;

    const { amount, currency } = splitCurrency(amountStr);
    const fromRate = CurrenciesRates[CurrenciesMap[(currency)?.toUpperCase() as string] ?? CurrenciesMap[(defaultCurrency)?.toUpperCase()]];
    const toRate = CurrenciesRates[CurrenciesMap[(toCurrency)?.toUpperCase()]];

    return amount * (toRate / fromRate);
}

function splitCurrency(amountStr: string): { amount: number; currency: string | null; } {
    const regex = /^([\d.,]+)\s*([^\d\s]*)$/;
    const match = amountStr.match(regex);

    if (match) {
        return {
            amount: parseFloat(match[1].replace(',', '')), // Convert the number to float
            currency: match[2] || null                    // Return the currency symbol or null if none
        };
    }

    throw new Error("Invalid input format");
}


function makeId(length: number = 6) {
    let txt = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';

    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}