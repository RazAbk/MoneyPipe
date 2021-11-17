export const localStorageService = {
    load,
    save,
    remove
}

function load(key: string): any {
    const obj: any = localStorage.getItem(key)
    return JSON.parse(obj)
}

function save(key: string, obj: any) {
    localStorage.setItem(key, JSON.stringify(obj))
}

function remove(key: string) {
    localStorage.removeItem(key)
}