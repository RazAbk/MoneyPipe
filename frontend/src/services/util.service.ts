export const utilService = {
    debounce,
    getCurrMonthStartTimeStamp,
    getRelativeDate
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

    const dateString = new Date(`${thisYear}-${thisMonth}-1`) + ''

    return Date.parse(dateString)
}

function getRelativeDate(timeStamp: number) {
    const now = new Date()
    const date = new Date(timeStamp)

    if (now.getDate() === date.getDate() && now.getFullYear() === date.getFullYear() && now.getMonth() === date.getMonth()) {
        return `Today ${date.getHours()}:${date.getMinutes()}`
    } else if ((now.getDate() === date.getDate() + 1 && now.getFullYear() === date.getFullYear() && now.getMonth() === date.getMonth()) || Date.now() - timeStamp < 24 * 60 * 60 * 1000) {
        // Todo: Improve! not accurate!
        return `Yesterday ${date.getHours()}:${date.getMinutes()}`
    } else {
        return `${date.getDate()}/${date.getMonth() + 1} ${date.getHours()}:${date.getMinutes()}`
    }
}
