export const utilService = {
    debounce,
    getTime,
    getDay
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

function getTime(timeStamp: string): string{
    const date = new Date(timeStamp)

    return `${date.getHours()}:${date.getMinutes()} • ${_getDay(date.getDay())} ${date.getDate()} ${_getMonth(date.getMonth())} ${date.getFullYear()}`
}

function getDay(timeStamp: string): string{
    const date = new Date(timeStamp)

    return _getDay(date.getDay())
}


function _getDay(day: number): string{
    switch(day){
        case 0:
            return 'Sun'
        case 1:
            return 'Mon'
        case 2:
            return 'Tue'
        case 3:
            return 'Wed'
        case 4:
            return 'Thu'
        case 5:
            return 'Fri'
        case 6:
            return 'Sat'
        default:
            return ''
    }
}

function _getMonth(month: number): string{
    switch(month){
        case 0:
            return 'Jan'
        case 1:
            return 'Feb'
        case 2:
            return 'Mar'
        case 3:
            return 'Apr'
        case 4:
            return 'May'
        case 5:
            return 'Jun'
        case 6:
            return 'Jul'
        case 7:
            return 'Aug'
        case 8:
            return 'Sep'
        case 9:
            return 'Oct'
        case 10:
            return 'Nov'
        case 11:
            return 'Dec'
        default:
            return ''
    }
}