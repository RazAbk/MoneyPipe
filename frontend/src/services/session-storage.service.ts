export const sessionStorageService = {
    load,
    save,
    remove
}

function load(key: string): any {
    const obj: any = sessionStorage.getItem(key)
    return JSON.parse(obj)
}

function save(key: string, obj: any) {
    sessionStorage.setItem(key, JSON.stringify(obj))
}

function remove(key: string) {
    sessionStorage.removeItem(key)
}