import { IAction, ICategory, ILabel, IDateFilterBy, IDataUpdateForm } from "../interfaces/dataInterfaces"
import Axios from "axios"
import { sessionStorageService } from "./session-storage.service"
import { IUpdateForm } from "../interfaces/userInterfaces"
import { alertTitleMessage } from "./alert.service"

const axios = Axios.create({
    withCredentials: true
})

export const userService = {
    signup,
    login,
    logout,
    updateUser,
    updateData,
    getData,
    getUser,
    addAction,
    deleteAction,
    addCategory,
    deleteCategory,
    addLabel,
    deleteLabel,
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
    try {
        const res = await axios.post(`${BASE_URL}/api/auth/signup`, credentials)
        if (!res.data.msg) {
            sessionStorageService.save('loggedInUser', res.data)
        }
        return res.data
    } catch (err) {
        console.error(err)
    }
}

async function login(credentials: ICredentials) {
    try {
        const res = await axios.post(`${BASE_URL}/api/auth/login`, credentials)
        if (!res.data.msg) {
            sessionStorageService.save('loggedInUser', res.data)
        }
        return res.data
    } catch (err) {
        console.error(err)
    }
}

async function logout() {
    try {
        await axios.post(`${BASE_URL}/api/auth/logout`)
        sessionStorageService.remove('loggedInUser')
    } catch (err) {
        console.error(err)
    }
}

async function updateUser(data: IUpdateForm) {
    try {
        const res = await axios.put(`${BASE_URL}/api/user/user`, data)
        if (!res.data.msg) {
            sessionStorageService.save('loggedInUser', res.data)
        }
        return res.data
    } catch (err) {
        console.error(err)
    }
}

async function updateData(data: IDataUpdateForm) {
    try {
        const res = await axios.put(`${BASE_URL}/api/user/data`, data)
        return res.data
    } catch (err) {
        console.error(err)
    }
}

// CURD Functions

async function getData(filterBy: IDateFilterBy) {
    try {
        const res = await axios.get(`${BASE_URL}/api/user/data?startDate=${filterBy.startDate}&endDate=${filterBy.endDate}`)
        return res.data
    } catch (err) {
        console.error(err)
    }
}

async function getUser() {
    try {
        const res = await axios.get(`${BASE_URL}/api/user/user`)
        return res.data
    } catch (err) {
        console.error(err)
    }
}


async function addAction(action: IAction) {
    try {
        const res = await axios.post(`${BASE_URL}/api/user/action`, action)
        return res.data
    } catch (err) {
        console.error(err)
    }
}

async function deleteAction(actionId: string) {
    try {
        const res = await axios.delete(`${BASE_URL}/api/user/action/${actionId}`)
        return res.data
    } catch (err) {
        console.error(err)
    }
}

async function addCategory(category: ICategory) {
    try {
        const res = await axios.post(`${BASE_URL}/api/user/category`, category)
        return res.data
    } catch (err) {
        console.error(err)
    }
}

async function deleteCategory(categoryId: string) {
    try {
        const res = await axios.delete(`${BASE_URL}/api/user/category/${categoryId}`)
        return res.data
    } catch (err) {
        console.error(err)
    }
}

async function addLabel(label: ILabel) {
    try {
        const res = await axios.post(`${BASE_URL}/api/user/label`, label)
        return res.data
    } catch (err) {
        console.error(err)
    }
}

async function deleteLabel(labelId: string) {
    try {
        const res = await axios.delete(`${BASE_URL}/api/user/label/${labelId}`)
        return res.data
    } catch (err) {
        console.error(err)
    }
}

async function uploadImg(file: File) {
    try {
        const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME
        const UPLOAD_PRESET: any = process.env.REACT_APP_UPLOAD_PRESET
        const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

        const formData = new FormData();
        formData.append('file', file)
        formData.append('upload_preset', UPLOAD_PRESET);

        return fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(res => {
                return res.url
            })
            .catch(err => {
                console.error(err)
                alertTitleMessage('Opps, an error occurred', 'Could not upload image, try again later', 'danger', 3500)
                return null
            })
    } catch (err) {
        console.error(err)
    }
}