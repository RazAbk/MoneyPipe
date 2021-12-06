import { ICredentials } from "../../interfaces/userInterfaces"

const bcrypt = require('bcrypt')
const userService = require('../user/user.service')


async function signup(userName: string, password: string, firstName: string, lastName: string) {
    const saltRound = 10

    if (!userName || !password || !firstName || !lastName) return Promise.reject('fullname, username and password are required!')

    const hash = await bcrypt.hash(password, saltRound)
    
    return await userService.add(userName, hash, firstName, lastName)
}

async function login(userName: string, password: string) {
    const user = await userService.getByUsername(userName)
    if (!user) return Promise.reject('Invalid username or password')
    
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid username or password')

    delete user.password
    return user
}

module.exports = {
    signup,
    login
}