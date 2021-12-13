import { IDateFilterBy } from "../../interfaces/dataInterfaces"

const bcrypt = require('bcrypt')
const userService = require('../user/user.service')

module.exports = {
    signup,
    login
}

async function signup(userName: string, password: string, firstName: string, lastName: string, picture: string | undefined, isGoogle: boolean) {
    const saltRound = 10

    if (!userName || !password || !firstName || !lastName) return Promise.reject('fullname, username and password are required!')

    const hash = await bcrypt.hash(password, saltRound)

    return await userService.addUser(userName, hash, firstName, lastName, picture, isGoogle)
}

async function login(userName: string, password: string, filterBy: IDateFilterBy) {
    const user = await userService.getByUsername(userName, filterBy)
    if (!user) return Promise.reject('Invalid username or password')

    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid username or password')

    delete user.password
    delete user.data
    return user
}