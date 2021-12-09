import { IAction, ICategory, ILabel, IDateFilterBy } from "../../interfaces/dataInterfaces"
import { ICredentials, IUserUpdateForm, IDataUpdateForm, IUser } from "../../interfaces/userInterfaces"

const { ObjectId } = require('mongodb')
const bcrypt = require('bcrypt')
const dbService = require('../../services/db.service')
const utilService = require('../../services/util.service')

module.exports = {
    getById,
    getByUsername,
    addUser,
    updateUser,
    updateData,
    addAction,
    deleteAction,
    addCategory,
    addLabel
}

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

async function _filterActions(actions: IAction[], filterBy: IDateFilterBy) {
    return await actions.filter((action: IAction) => {
        if (action.createdAt < filterBy.startDate || action.createdAt > filterBy.endDate) return false
        return true
    })
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
                currency : {
                    sign : "₪",
                    code : "ILS"
                },
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

async function updateUser(data: IUserUpdateForm, userId: string) {
    try {
        const collection = await dbService.getCollection('users')
        
        if(data.password){
            const saltRound = 10
            const hash = await bcrypt.hash(data.password, saltRound)
            data.password = hash
        }

        await collection.updateOne({ "_id": ObjectId(userId) }, { $set: data})
        const user = await collection.findOne({ "_id": ObjectId(userId)})
        return user
    } catch (err) {
        
    }
}

async function updateData(data: IDataUpdateForm, userId: string) {
    try {
        const fieldToUpdate = Object.keys(data)[0]
        
        const $setObj = { $set: {[`data.${fieldToUpdate}`]: data[fieldToUpdate as keyof IDataUpdateForm]}}
        
        const collection = await dbService.getCollection('users')
        
        await collection.updateOne({ "_id": ObjectId(userId) }, $setObj)
        
        const user = await collection.findOne({ "_id": ObjectId(userId)})
        return user
    } catch (err) {

    }
}

async function addAction(action: IAction, userId: string) {
    try {
        const collection = await dbService.getCollection('users')
        const user = await collection.findOne({ '_id': ObjectId(userId) })


        if (action._id) {
            const actionIdx = user.data.actions.findIndex((currAction: IAction) => action._id === currAction._id)
            user.data.actions[actionIdx] = action
        } else {
            action._id = utilService.makeId()
            user.data.actions.push(action)
        }

        await collection.updateOne({ "_id": ObjectId(userId) }, { $set: { "data": user.data } })

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

        await collection.updateOne({ "_id": ObjectId(userId) }, { $set: { "data": user.data } })

        return user.data
    } catch (err) {
        console.log('could not delete action', err)
        throw err
    }
}

// Todo: use regex to compare, uppercase the categorie's first chart (check if front end does so?)

async function addCategory(category: ICategory, userId: string) {
    try {
        const collection = await dbService.getCollection('users')
        const user = await collection.findOne({ '_id': ObjectId(userId) })

        // Checks if the category already exists
        const existingCategory = user.data.categories.find((cat: ICategory) => cat.title.toLowerCase() === category.title.toLowerCase())
        // Cannot have same category title duplicates
        if(existingCategory && existingCategory.bgColor === category.bgColor && existingCategory.icon === category.bgColor){
            return user.data
        }

        // Update
        if(category._id){
            const categoryIdx = user.data.categories.findIndex((cat: ICategory) => cat._id === category._id)
            const oldCategoryTitle = user.data.categories[categoryIdx].title
            user.data.categories[categoryIdx] = category

            user.data.actions = user.data.actions.map((action: IAction) => {
                if(action.category === oldCategoryTitle){
                    action.category = category.title
                }
                return action
            })
        // Add
        } else {
            category._id = utilService.makeId()
            user.data.categories.push(category)
        }

        await collection.updateOne({ "_id": ObjectId(userId) }, { $set: { "data": user.data } })

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

        const isLabelExist = user.data.labels.some((lab: ILabel) => lab.labelName === label.labelName)
        // Cannot have same label name duplicates
        if(isLabelExist){
            return user.data
        }

        // Update
        if(label._id){
            const labelIdx = user.data.labels.findIndex((lab: ILabel) => lab._id === label._id)
            const oldLabelName = user.data.labels[labelIdx].labelName
            user.data.labels[labelIdx] = label

            user.data.actions = user.data.actions.map((action: IAction) => {
                if(action.labels.includes(oldLabelName)){
                    const idx = action.labels.findIndex((lab: string) => lab === oldLabelName)
                    action.labels[idx] = label.labelName
                }
                return action
            })
        // Add
        } else {
            label._id = utilService.makeId()
            user.data.labels.push(label)
        }

        await collection.updateOne({ "_id": ObjectId(userId) }, { $set: { "data": user.data } })

        return user.data
    } catch (err) {
        console.log('could not add label', err)
        throw err
    }
}