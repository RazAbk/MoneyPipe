export const utilService = {
    debounce,
    getCurrMonthStartTS
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

function getCurrMonthStartTS(){
    const now = new Date()
    const thisYear = now.getFullYear()
    const thisMonth = now.getMonth() + 1

    const dateString = new Date(`${thisYear}-${thisMonth}-1`) + ''

    return Date.parse(dateString)
}

