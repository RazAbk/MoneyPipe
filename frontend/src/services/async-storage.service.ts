import { localStorageService } from "./local-storage.service"

// export const storageService = {
//     query,
//     get,
//     post,
//     put,
//     remove
// }

// function query(entityType: string) {
//     const entities: any = localStorageService.load(entityType) || null

//     return Promise.resolve(entities)
// }


// async function get(entityType: string, entityId: string) {
//     const entity = await query(entityType)
//     for(const key in entity){
//         if(entity[key]._id === entityId) return entity[key]
//     }
//     return null
// }
// function post(entityType: string, newEntity: string) {
//     newEntity._id = _makeId()
//     return query(entityType)
//         .then(entities => {
//             entities.push(newEntity)
//             _save(entityType, entities)
//             return newEntity
//         })
// }

// function put(entityType: string, updatedEntity) {
//     return query(entityType)
//         .then(entities => {
//             const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
//             entities.splice(idx, 1, updatedEntity)
//             _save(entityType, entities)
//             return updatedEntity
//         })
// }

// function remove(entityType: string, entityId) {
//     return query(entityType)
//         .then(entities => {
//             const idx = entities.findIndex(entity => entity._id === entityId)
//             entities.splice(idx, 1)
//             _save(entityType, entities)
//         })
// }


// function _save(entityType: string, entities) {
//     localStorage.setItem(entityType, JSON.stringify(entities))
// }

// function _makeId(length = 5) {
//     var text = ''
//     var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//     for (var i = 0; i < length; i++) {
//         text += possible.charAt(Math.floor(Math.random() * possible.length))
//     }
//     return text
// }