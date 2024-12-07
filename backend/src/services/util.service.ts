import Axios from "axios"

module.exports = {
    makeId,
    convertCurrency,
};

const currencyURL = `https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.CURRENCY_API_KEY}`;

const CurrenciesMap: any = {
    "$": "USD",    // U.S. Dollar
    "USD": "USD",
    "₪": "ILS",    // Israeli Shekel
    "ILS": "ILS",
    "€": "EUR",    // Euro
    "EUR": "EUR",
    "£": "GBP",    // British Pound
    "GBP": "GBP",
    "¥": "JPY",    // Japanese Yen
    "JPY": "JPY",
    "₩": "KRW",    // South Korean Won
    "KRW": "KRW",
    "₹": "INR",    // Indian Rupee
    "INR": "INR",
    "C$": "CAD",   // Canadian Dollar
    "CAD": "CAD",
    "A$": "AUD",   // Australian Dollar
    "AUD": "AUD",
    "R$": "BRL",   // Brazilian Real
    "BRL": "BRL",
    "₽": "RUB",    // Russian Ruble
    "RUB": "RUB",
    "S$": "SGD",   // Singapore Dollar
    "SGD": "SGD",
    "HK$": "HKD",  // Hong Kong Dollar
    "HKD": "HKD",
    "₺": "TRY",    // Turkish Lira
    "TRY": "TRY",
    "R": "ZAR",    // South African Rand
    "ZAR": "ZAR",
    "CHF": "CHF",  // Swiss Franc
    "CNY": "CNY",  // Chinese Yuan
    "CZK": "CZK",  // Czech Koruna
    "DKK": "DKK",  // Danish Krone
    "HRK": "HRK",  // Croatian Kuna
    "HUF": "HUF",  // Hungarian Forint
    "IDR": "IDR",  // Indonesian Rupiah
    "ISK": "ISK",  // Icelandic Krona
    "MX$": "MXN",  // Mexican Peso
    "MXN": "MXN",
    "MYR": "MYR",  // Malaysian Ringgit
    "NOK": "NOK",  // Norwegian Krone
    "NZ$": "NZD",  // New Zealand Dollar
    "NZD": "NZD",
    "₱": "PHP",    // Philippine Peso
    "PHP": "PHP",
    "zł": "PLN",   // Polish Zloty
    "PLN": "PLN",
    "RON": "RON",  // Romanian Leu
    "SEK": "SEK",  // Swedish Krona
    "THB": "THB",  // Thai Baht
};

let CurrenciesRates: { [curr: string]: number } = {};
let CurrenciesRatesLastUpdate: number = 0;


async function getCurrencies() {
    if (Date.now() - CurrenciesRatesLastUpdate < (1000 * 60 * 60 * 24)) { // 1 day
        console.log("Currencies from cache");
        return CurrenciesRates;
    } else {
        const response = await Axios.get(currencyURL);
        const currencies = response?.data ?? {};
        CurrenciesRatesLastUpdate = Date.now();
        
        CurrenciesRates = currencies;
        console.log("Fetched currencies");
        return CurrenciesRates;
    }
}


async function convertCurrency(amountStr: string, defaultCurrency: string, toCurrency: string) {
    const CurrenciesRates = ((await getCurrencies()).data) as any;

    const { amount, currency } = splitCurrency(amountStr);
    const fromRate = CurrenciesRates[CurrenciesMap[currency as string] ?? CurrenciesMap[defaultCurrency]];
    const toRate = CurrenciesRates[CurrenciesMap[toCurrency]];

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