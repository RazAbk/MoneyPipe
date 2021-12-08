import { IAction, ICategory, ILabel, IDateFilterBy } from "../interfaces/dataInterfaces"
import Axios from "axios"
import { sessionStorageService } from "./session-storage.service"

const axios = Axios.create({
    withCredentials: true
})

export const userService = {
    signup,
    login,
    logout,
    getData,
    addAction,
    deleteAction,
    addCategory,
    addLabel,
    uploadImg
}

const BASE_URL = process.env.NODE_ENV === 'production' ? '' : '//localhost:3030'

interface ICredentials {
    userName: string,
    password: string,
    firstName?: string,
    lastName?: string
}

// User Functions

async function signup(credentials: ICredentials) {
    const res = await axios.post(`${BASE_URL}/api/auth/signup`, credentials)
    sessionStorageService.save('loggedInUser', res.data)
    return res.data
}

async function login(credentials: ICredentials) {
    const res = await axios.post(`${BASE_URL}/api/auth/login`, credentials)
    sessionStorageService.save('loggedInUser', res.data)
    return res.data
}

async function logout() {
    await axios.post(`${BASE_URL}/api/auth/logout`)
    sessionStorageService.remove('loggedInUser')
}

// CURD Functions

async function getData(filterBy: IDateFilterBy) {
    try {
        const res = await axios.get(`${BASE_URL}/api/user/data?startDate=${filterBy.startDate}&endDate=${filterBy.endDate}`)
        return res.data
    } catch (err) {
        console.log(err)
    }
}

async function addAction(action: IAction) {
    try {
        const res = await axios.post(`${BASE_URL}/api/user/action`, action)
        sessionStorageService.save('loggedInUser', res.data)
        return res.data
    } catch (err) {
        console.log(err)
    }
}

async function deleteAction(actionId: string) {
    try {
        const res = await axios.delete(`${BASE_URL}/api/user/action/${actionId}`)
        sessionStorageService.save('loggedInUser', res.data)
        return res.data
    } catch (err) {
        console.log(err)
    }
}

async function addCategory(category: ICategory) {
    try {
        const res = await axios.post(`${BASE_URL}/api/user/category`, category)
        sessionStorageService.save('loggedInUser', res.data)
        return res.data
    } catch (err) {
        console.log(err)
    }
}

async function addLabel(label: ILabel) {
    try {
        const res = await axios.post(`${BASE_URL}/api/user/label`, label)
        sessionStorageService.save('loggedInUser', res.data)
        return res.data
    } catch (err) {
        console.log(err)
    }
}

async function uploadImg(file: File) {
    try {
        const CLOUD_NAME = 'dfj4zd14o'
        const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

        const formData = new FormData();
        formData.append('file', file)
        formData.append('upload_preset', 'k1qiifqe');

        return fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(res => {
                return res.url
            })
            .catch(err => console.error(err))
    } catch (err) {
        console.log(err)
    }
}