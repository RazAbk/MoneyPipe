import { IAction, ICategory, ILabel, IDateFilterBy } from "../../interfaces/dataInterfaces"
import { IUserUpdateForm, IDataUpdateForm } from "../../interfaces/userInterfaces"

const { ObjectId } = require('mongodb')
const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt')
const dbService = require('../../services/db.service')
const utilService = require('../../services/util.service')
const { Logger } = require('../../logger');

module.exports = {
    getById,
    getByUsername,
    addUser,
    updateUser,
    updateData,
    addAction,
    deleteAction,
    duplicateAction,
    addCategory,
    deleteCategory,
    addLabel,
    deleteLabel,
    deleteUser
}

async function getById(userId: string) {
    try {
        const collection = await dbService.getCollection('users')
        const user = await collection.findOne({ '_id': ObjectId(userId) })
        delete user.password

        return user
    } catch (err) {
        Logger.error('could not get user by id', err)
        throw err
    }
}

async function getByUsername(userName: string) {
    try {
        const collection = await dbService.getCollection('users')
        const user = await collection.findOne({ userName: userName })
        return user
    } catch (err) {
        Logger.error(`error accrued while finding user ${userName}`, err)
        throw err
    }
}

async function addUser(userName: string, password: string, firstName: string, lastName: string, picture: string | undefined, isGoogle: boolean) {
    try {
        const newUser = {
            userName,
            password,
            firstName,
            lastName,
            createdAt: Date.now(),
            picture: picture || '',
            isGoogle,
            data: {
                currency: {
                    sign: "₪",
                    code: "ILS"
                },
                labels: [],
                categories: [],
                actions: []
            }
        }

        const collection = await dbService.getCollection('users')
        await collection.insertOne(newUser)
        Logger.success(`User ${userName} - ${firstName} ${lastName}, added successfully`);
        return newUser
    } catch (err) {
        Logger.error(`Error occurred while adding user - userName: '${userName}'`, err)
        throw err
    }
}

async function updateUser(data: IUserUpdateForm, userId: string) {
    try {
        const collection = await dbService.getCollection('users')

        if (data.password) {
            const saltRound = 10
            const hash = await bcrypt.hash(data.password, saltRound)
            data.password = hash
        }

        await collection.updateOne({ "_id": ObjectId(userId) }, { $set: data })
        const user = await collection.findOne({ "_id": ObjectId(userId) })
        Logger.success(`User ${user?.userName} updated successfully, userId: '${userId}'`);
        return user
    } catch (err) {
        Logger.error(`Error occurred while updating user - userId: '${userId}'`, err)
        throw err
    }
}

async function updateData(data: IDataUpdateForm, userId: string) {
    try {
        const fieldToUpdate = Object.keys(data)[0]

        const $setObj = { $set: { [`data.${fieldToUpdate}`]: data[fieldToUpdate as keyof IDataUpdateForm] } }

        const collection = await dbService.getCollection('users')

        await collection.updateOne({ "_id": ObjectId(userId) }, $setObj)

        const user = await collection.findOne({ "_id": ObjectId(userId) });
        Logger.success(`Data updated successfully for user: '${user?.userId}'`);
        return user
    } catch (err) {
        Logger.error(`err occurred white updating data - userId: '${userId}'`, err)
        throw err
    }
}

async function addAction(action: IAction, userId: string) {
    try {
        const collection = await dbService.getCollection('users')
        const user = await collection.findOne({ '_id': ObjectId(userId) });

        const userCurrency = user.data.currency.code;

        const convertedAmount = await utilService.convertCurrency(`${action.amount}`, userCurrency, userCurrency);

        if(!convertedAmount) {
            Logger.error('Error while converting currency', action.amount);
            throw new Error('Error while converting currency');
        }

        const createdAt = action?.createdAt ? new Date(action.createdAt).getTime() : Date.now();

        const modifiedAction = {
            ...action,
            createdAt,
            amount: convertedAmount
        }

        if (action._id) {
            const actionIdx = user.data.actions.findIndex((currAction: IAction) => action._id === currAction._id)
            user.data.actions[actionIdx] = modifiedAction
        } else {
            modifiedAction._id = utilService.makeId()
            user.data.actions.push(modifiedAction)
        }

        await collection.updateOne({ "_id": ObjectId(userId) }, { $set: { "data": user.data } })

        Logger.success(`Action ${action?._id ? 'updated' : 'added'} to userId: '${userId}':`, modifiedAction);

        return user.data
    } catch (err) {
        Logger.error(`Could not add action to userId: '${userId}':`, err);
        Logger.info('Failed action:', action);
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
        Logger.success(`Action deleted, actionId: '${actionId}', userId: '${userId}'`);
        return user.data
    } catch (err) {
        Logger.error(`Could not delete action, actionId: '${actionId}', userId: '${userId}'`, err)
        throw err
    }
}

async function duplicateAction(actionId: string, userId: string) {
    try {
        const collection = await dbService.getCollection('users')
        const user = await collection.findOne({ '_id': ObjectId(userId) })

        const actionIdx = user.data.actions.findIndex((currAction: IAction) => currAction._id === actionId)
        const newAction: IAction = JSON.parse(JSON.stringify(user.data.actions[actionIdx]))
        newAction._id = uuid()
        
        user.data.actions.splice(actionIdx, 0, newAction)

        await collection.updateOne({ "_id": ObjectId(userId) }, { $set: { "data": user.data } })
        Logger.success(`Action duplicated, actionId: '${actionId}', userId: '${userId}'`);
        return user.data
    } catch (err) {
        Logger.error(`Could not duplicate action, actionId: '${actionId}', userId: '${userId}'`, err);
        throw err
    }
}

async function addCategory(category: ICategory, userId: string) {
    try {
        const collection = await dbService.getCollection('users')
        const user = await collection.findOne({ '_id': ObjectId(userId) })

        // Checks if the category already exists
        const existingCategory = user.data.categories.find((cat: ICategory) => cat.title.toLowerCase() === category.title.toLowerCase())
        // Cannot have same category title duplicates
        if (existingCategory && existingCategory.bgColor === category.bgColor && existingCategory.icon === category.bgColor) {
            return user.data
        }

        // Update
        if (category._id) {
            const categoryIdx = user.data.categories.findIndex((cat: ICategory) => cat._id === category._id)
            const oldCategoryTitle = user.data.categories[categoryIdx].title
            user.data.categories[categoryIdx] = category

            user.data.actions = user.data.actions.map((action: IAction) => {
                if (action.category === oldCategoryTitle) {
                    action.category = category.title
                }
                return action
            })
            // Add
        } else {
            category._id = utilService.makeId()
            user.data.categories.push(category)

            user.data.categories.sort((a: ICategory, b: ICategory) => {
                if (a.title > b.title) return 1
                if (a.title < b.title) return -1
                return 0
            })
        }

        await collection.updateOne({ "_id": ObjectId(userId) }, { $set: { "data": user.data } })

        Logger.success(`Category added / updated: '${category.title}', userId: '${userId}'`);

        return user.data
    } catch (err) {
        console.error(`Could not add / update category: '${category.title}', userId: '${userId}'`, err);
        throw err
    }
}

async function deleteCategory(categoryId: string, userId: string) {
    try {
        const collection = await dbService.getCollection('users')
        const user = await collection.findOne({ '_id': ObjectId(userId) })

        const categoryIdx = user.data.categories.findIndex((category: ICategory) => category._id === categoryId)

        if (categoryIdx !== -1) {
            const isCategoryUsed = user.data.actions.some((action: IAction) => action.category === user.data.categories[categoryIdx].title)
            // Do not allow to delete category if it's in use!
            if (isCategoryUsed) {
                Logger.warning(`Category '${categoryId}' is in use and cannot be deleted, userId: '${userId}'`);
                return null
            } else {
                user.data.categories.splice(categoryIdx, 1)
                await collection.updateOne({ "_id": ObjectId(userId) }, { $set: { "data.categories": user.data.categories } })
                Logger.success(`Category deleted: '${categoryId}', userId: '${userId}'`);
                return user.data
            }
        }
    } catch (err) {
        Logger.error(`Could not delete category: '${categoryId}', userId: '${userId}'`, err);
        throw err;
    }
}

async function addLabel(label: ILabel, userId: string) {
    try {
        const collection = await dbService.getCollection('users')
        const user = await collection.findOne({ '_id': ObjectId(userId) })

        const isLabelExist = user.data.labels.some((lab: ILabel) => lab.labelName === label.labelName)
        // Cannot have same label name duplicates
        if (isLabelExist) {
            Logger.warning(`Label '${label.title}' already exists, userId: '${userId}'`);
            return user.data
        }

        // Update
        if (label._id) {
            const labelIdx = user.data.labels.findIndex((lab: ILabel) => lab._id === label._id)
            const oldLabelName = user.data.labels[labelIdx].labelName
            user.data.labels[labelIdx] = label

            user.data.actions = user.data.actions.map((action: IAction) => {
                if (action.labels.includes(oldLabelName)) {
                    const idx = action.labels.findIndex((lab: string) => lab === oldLabelName)
                    action.labels[idx] = label.labelName
                }
                return action
            })
            // Add
        } else {
            label._id = utilService.makeId()
            user.data.labels.push(label)

            user.data.labels.sort((a: ILabel, b: ILabel) => {
                if (a.labelName > b.labelName) return 1
                if (a.labelName < b.labelName) return -1
                return 0
            })
        }

        await collection.updateOne({ "_id": ObjectId(userId) }, { $set: { "data": user.data } })

        Logger.success(`Label added / updated: '${label.title}', userId: '${userId}'`);

        return user.data
    } catch (err) {
        Logger.error(`Could not add / update label: '${label.title}', userId: '${userId}'`, err);
        throw err
    }
}

async function deleteLabel(labelId: string, userId: string) {
    try {
        const collection = await dbService.getCollection('users')
        const user = await collection.findOne({ '_id': ObjectId(userId) })

        const labelIdx = user.data.labels.findIndex((label: ILabel) => label._id === labelId)

        // Remove label from labels, and from any action including it
        if (labelIdx !== -1) {
            const deletedLabel: ILabel = user.data.labels.splice(labelIdx, 1)[0]
            user.data.actions = user.data.actions.map((action: IAction) => {
                if (action.labels.includes(deletedLabel.labelName)) {
                    const labelIdx = action.labels.findIndex((label: string) => label === deletedLabel.labelName)
                    action.labels.splice(labelIdx, 1)
                }
                return action
            })
            await collection.updateOne({ "_id": ObjectId(userId) }, { $set: { "data": user.data } })

            Logger.success(`Label deleted: '${labelId}', userId: '${userId}'`);
            return user.data
        }
    } catch (err) {
        Logger.error(`Could not delete label: '${labelId}', userId: '${userId}'`, err);
        throw err
    }
}


async function deleteUser(userId: string) {
    try {
        const collection = await dbService.getCollection('users')
        const result = await collection.deleteOne({ '_id': ObjectId(userId) })
        Logger.success(`User deleted: '${userId}'`);
        return result.deletedCount
    } catch (err) {
        Logger.error(`Could not delete user: '${userId}'`, err);
        throw err
    }
}
