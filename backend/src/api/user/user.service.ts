import { ICredentials } from "../../interfaces/userInterfaces"

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

async function getByUsername(userName: string) {
    try {
        const collection = await dbService.getCollection('users')
        const user = await collection.findOne({ userName: userName })
        return user
    } catch (err) {
        console.log(`while finding user ${userName}`, err)
        throw err
    }
}

async function add(userName: string, password: string, firstName: string, lastName: string) {
    try{
        const newUser = {
            userName,
            password,
            firstName,
            lastName,
            createdAt: Date.now(),
            picture: '',
            data: {
                currencySign: '₪',
                currency: 'nis',
                labels: [],
                categories: [],
                actions: []
            }
        }

        const collection = await dbService.getCollection('users')
        await collection.insertOne(newUser)
        return newUser
    } catch(err) {
        console.log('error while adding user')
        throw err
    }
}

module.exports = {
    getById,
    getByUsername,
    add
}