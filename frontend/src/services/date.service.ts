import { IFilterBy } from "../interfaces/dataInterfaces"
import { utilService } from "./util.service"

export const dateService = {
    getDayTimestampByHour,
    getDaysTimeData,
    getMonthsTimeData,
    getYearsTimeData,
    getNextMonth,
    getMonthStartTimeStamp,
    getDayMaxHour,
    getRelativeDate,
    getDateAsString,
    getShortYear,
    calculatePeriodDays
}

function getDayTimestampByHour(date: number, hour: string) {
    const now = new Date(date)

    return new Date(`${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} ${hour}`).getTime()
}

function getDaysTimeData(days: number, filterBy: IFilterBy) {
    let timePoints: string[] = []
    let timeStamps: number[] = []

    for (let i = 0; i < days; i++) {
        const date = new Date(filterBy.startDate + (86400000 * i))
        timePoints.push(`${date.getDate()}/${date.getMonth() + 1}`)
        timeStamps.push(date.getTime())
    }

    return { timePoints, timeStamps }
}

function getMonthsTimeData(filterBy: IFilterBy) {
    const firstDate = new Date(filterBy.startDate)

    let monthIdx = firstDate.getMonth() + 1
    let yearIdx = getShortYear(firstDate.getFullYear())

    const firstTimePoint = `${utilService.getFormatedDigits(monthIdx)}/${yearIdx}`

    let timePoints: string[] = [firstTimePoint]
    let timeStamps: number[] = [filterBy.startDate]

    let dateIdx = getNextMonth(monthIdx, yearIdx)

    while (dateIdx < filterBy.endDate) {
        const date = new Date(dateIdx)
        monthIdx = date.getMonth() + 1
        yearIdx = getShortYear(date.getFullYear())

        timePoints.push(`${utilService.getFormatedDigits(monthIdx)}/${yearIdx}`)
        timeStamps.push(date.getTime() - 1000)

        dateIdx = getNextMonth(monthIdx, yearIdx)
    }

    timeStamps.push(filterBy.endDate)

    return { timePoints, timeStamps }
}

function getYearsTimeData(filterBy: IFilterBy) {
    let yearIdx = new Date(filterBy.startDate).getFullYear()

    let timePoints: string[] = []
    let timeStamps: number[] = [filterBy.startDate]

    while(yearIdx < new Date().getFullYear()){
        timePoints.push(`${yearIdx}`)
        timeStamps.push(new Date(`01/01/${yearIdx + 1}`).getTime() - 1000)

        yearIdx++
    }
    timePoints.push(`${new Date().getFullYear()}`)
    timeStamps.push(filterBy.endDate)
    
    return { timePoints, timeStamps }
}

function getNextMonth(month: number, year: number) {
    month++
    if (month > 12) {
        month = 1
        year++
    }

    return getMonthStartTimeStamp(new Date(`${month}/01/${year}`))
}

function getMonthStartTimeStamp(date: Date = new Date()) {
    const thisYear = date.getFullYear()
    const thisMonth = date.getMonth() + 1

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
        day: utilService.getFormatedDigits(nowTimeStamp.getDate()),
        month: utilService.getFormatedDigits(nowTimeStamp.getMonth() + 1),
        year: nowTimeStamp.getFullYear(),
        hours: utilService.getFormatedDigits(nowTimeStamp.getHours()),
        minutes: utilService.getFormatedDigits(nowTimeStamp.getMinutes()),
    }

    const date = {
        day: utilService.getFormatedDigits(dateTimeStamp.getDate()),
        month: utilService.getFormatedDigits(dateTimeStamp.getMonth() + 1),
        year: dateTimeStamp.getFullYear(),
        hours: utilService.getFormatedDigits(dateTimeStamp.getHours()),
        minutes: utilService.getFormatedDigits(dateTimeStamp.getMinutes()),
    }

    // Today
    if (now.day === date.day && now.year === date.year && now.month === date.month) {
        return `Today ${date.hours}:${date.minutes}`
        // Yesterday
    } else if (now.day === utilService.getFormatedDigits(+date.day + 1) && now.year === date.year && now.month === date.month) {
        // Todo: Improve! not accurate!
        return `Yesterday ${date.hours}:${date.minutes}`
    // Some Date
    } else {
        return `${date.day}/${date.month} ${date.hours}:${date.minutes}`
    }
}

function getDateAsString(date: number) {
    const dateObj = new Date(date)
    const day = dateObj.getDate()
    const month = dateObj.getMonth() + 1

    return `${utilService.getFormatedDigits(day)}/${utilService.getFormatedDigits(month)}/${dateObj.getFullYear()}`
}

function getShortYear(year: number) {
    return +(year + '').substr(2,3)
}

function calculatePeriodDays(startDate: number, endDate: number){
    const rawResult = endDate - startDate

    return Math.ceil(rawResult / 86400000)
}