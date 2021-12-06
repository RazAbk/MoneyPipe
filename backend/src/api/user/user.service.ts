const dbService = require('../../services/db.service')
const { ObjectId } = require('mongodb')



async function getById(userId: string) {
    try{
        const collection = await dbService.getCollection('users')
        const user = await collection.findOne({'_id': ObjectId(userId)})
        delete user.password
        return user
    } catch(err) {
        console.log(err)
        throw err
    }
}

module.exports = {
    getById
}