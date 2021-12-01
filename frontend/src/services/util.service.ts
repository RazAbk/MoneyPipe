export const utilService = {
    debounce,
    getCurrMonthStartTimeStamp,
    getDayMaxHour,
    getRelativeDate,
    getDateAsString,
    calculatePeriodDays,
    makeId
}

function debounce<Params extends any[]>(func: (...args: Params) => any, timeout: number,): (...args: Params) => void {
    let timer: NodeJS.Timeout

    return (...args: Params) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func(...args)
        }, timeout)
    }
}

function getCurrMonthStartTimeStamp() {
    const now = new Date()
    const thisYear = now.getFullYear()
    const thisMonth = now.getMonth() + 1

    const dateString = new Date(`${thisMonth}/01/${thisYear}`)

    return dateString.getTime()
}

function getDayMaxHour(timeStamp: number) {
    const date = new Date(timeStamp)

    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    return new Date(year, month, day, 23, 59, 59).getTime()
}

function getRelativeDate(timeStamp: number) {
    const nowTimeStamp = new Date()
    const dateTimeStamp = new Date(timeStamp)

    const now = {
        day: getFormatedDigits(nowTimeStamp.getDate()),
        month: getFormatedDigits(nowTimeStamp.getMonth() + 1),
        year: nowTimeStamp.getFullYear(),
        hours: getFormatedDigits(nowTimeStamp.getHours()),
        minutes: getFormatedDigits(nowTimeStamp.getMinutes()),
    }

    const date = {
        day: getFormatedDigits(dateTimeStamp.getDate()),
        month: getFormatedDigits(dateTimeStamp.getMonth() + 1),
        year: dateTimeStamp.getFullYear(),
        hours: getFormatedDigits(dateTimeStamp.getHours()),
        minutes: getFormatedDigits(dateTimeStamp.getMinutes()),
    }

    if (now.day === date.day && now.year === date.year && now.month === date.month) {
        return `Today ${date.hours}:${date.minutes}`
    } else if ((now.day === date.day && now.year === date.year && now.month === date.month) || Date.now() - timeStamp < 24 * 60 * 60 * 1000) {
        // Todo: Improve! not accurate!
        return `Yesterday ${date.hours}:${date.minutes}`
    } else {
        return `${date.day}/${date.month} ${date.hours}:${date.minutes}`
    }
}

function getDateAsString(date: number) {
    const dateObj = new Date(date)
    const day = dateObj.getDate()
    const month = dateObj.getMonth() + 1

    return `${getFormatedDigits(day)}/${getFormatedDigits(month)}/${dateObj.getFullYear()}`
}

function getFormatedDigits(num: number) {
    return num < 10 ? '0' + num : num
}

function calculatePeriodDays(startDate: number, endDate: number){
    const rawResult = endDate - startDate

    return Math.ceil(rawResult / 86400000)
}

function makeId(length: number = 6) {
    let txt = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}