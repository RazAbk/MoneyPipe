import { IAction, ICategory, ILabel } from "../../interfaces/dataInterfaces"
import { ICredentials } from "../../interfaces/userInterfaces"

const dbService = require('../../services/db.service')
const { ObjectId } = require('mongodb')
const utilService = require('../../services/util.service')



async function getById(userId: string) {
    try {
        const collection = await dbService.getCollection('users')
        const user = await collection.findOne({ '_id': ObjectId(userId) })
        delete user.password
        return user
    } catch (err) {
        console.log('could not get user by id')
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
        console.log(`error accrued while finding user ${userName}`, err)
        throw err
    }
}

async function addUser(userName: string, password: string, firstName: string, lastName: string) {
    try {
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
    } catch (err) {
        console.log('error accrued while adding user')
        throw err
    }
}

async function addAction(action: IAction, userId: string) {
    try {
        const collection = await dbService.getCollection('users')
        const user = await collection.findOne({ '_id': ObjectId(userId) })

        
        if(action._id){
            const actionIdx = user.data.actions.findIndex((currAction: IAction) => action._id === currAction._id)
            user.data.actions[actionIdx] = action
        } else {
            action._id = utilService.makeId()
            user.data.actions.push(action)
        }
        
        await collection.updateOne({"_id": ObjectId(userId)}, { $set: { "data" : user.data }})

        return user.data
    } catch (err) {
        console.log('could not add new action', err)
        throw err
    }
}

async function deleteAction(actionId: string, userId: string) {
    try {
        const collection = await dbService.getCollection('users')
        const user = await collection.findOne({ '_id': ObjectId(userId) })

        const actionIdx = user.data.actions.findIndex((currAction: IAction) => currAction._id === actionId)
        user.data.actions.splice(actionIdx, 1)
        
        await collection.updateOne({"_id": ObjectId(userId)}, { $set: { "data" : user.data }})

        return user.data
    } catch (err) {
        console.log('could not delete action', err)
        throw err
    }
}

async function addCategory(category: ICategory, userId: string) {
    try {
        const collection = await dbService.getCollection('users')
        const user = await collection.findOne({ '_id': ObjectId(userId) })

        const isCategoryExist = user.data.categories.find((cat: ICategory) => cat.title === category.title)
        if(isCategoryExist){
            return
        } else {
            user.data.categories.push(category)
        }

        await collection.updateOne({"_id": ObjectId(userId)}, { $set: { "data" : user.data }})

        return user.data
    } catch (err) {
        console.log('could not add category', err)
        throw err
    }
}

async function addLabel(label: ILabel, userId: string) {
    try {
        const collection = await dbService.getCollection('users')
        const user = await collection.findOne({ '_id': ObjectId(userId) })

        const isLabelExist = user.data.labels.find((lab: ILabel) => lab.labelName === label.labelName)
        if(isLabelExist){
            return
        } else {
            user.data.labels.push(label)
        }

        await collection.updateOne({"_id": ObjectId(userId)}, { $set: { "data" : user.data }})

        return user.data
    } catch (err) {
        console.log('could not add label', err)
        throw err
    }
}

module.exports = {
    getById,
    getByUsername,
    addUser,
    addAction,
    deleteAction,
    addCategory,
    addLabel
}