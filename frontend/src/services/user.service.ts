import { localStorageService } from "./local-storage.service"
import { IAction, ICategory, ILabel } from "../interfaces/dataInterfaces"
import Axios from "axios"
import { sessionStorageService } from "./session-storage.service"

const axios = Axios.create({
    withCredentials: true
})

export const userService = {
    signup,
    login,
    logout,
    addAction,
    deleteAction,
    addCategory,
    addLabel
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
    try{
        const res = await axios.delete(`${BASE_URL}/api/user/action/${actionId}`)
        sessionStorageService.save('loggedInUser', res.data)
        return res.data
    } catch(err) {
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

// _loadToStorage()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// function _loadToStorage() {

//     const loggedInUser = 'YossiCo'

//     const users = [
//         {
//             userName: 'YossiCo',
//             password: '1234',
//             name: 'Yossi Cohen',
//             createdAt: 1635498520000,
//             picture: '',
//             data: {
//                 currencySign: '₪',
//                 currency: 'nis',
//                 labels: [
//                     {
//                         title: 'Household',
//                         labelName: '#household',
//                     },
//                     {
//                         title: 'Rent',
//                         labelName: '#rent',
//                     },
//                     {
//                         title: 'Technology',
//                         labelName: '#technology',
//                     },
//                     {
//                         title: 'Transportation',
//                         labelName: '#transportation',
//                     },
//                     {
//                         title: 'Motorcycle',
//                         labelName: '#motorcycle',
//                     },
//                     {
//                         title: 'Car',
//                         labelName: '#car',
//                     },
//                     {
//                         title: 'Fuel',
//                         labelName: '#fuel',
//                     },
//                     {
//                         title: 'Food',
//                         labelName: '#food',
//                     },
//                     {
//                         title: 'Coffee',
//                         labelName: '#coffee',
//                     },
//                     {
//                         title: 'Beer',
//                         labelName: '#beer',
//                     },
//                     {
//                         title: 'Hangout',
//                         labelName: '#hangout',
//                     },
//                     {
//                         title: 'Salary',
//                         labelName: '#salary',
//                     },
//                     {
//                         title: 'Some Company',
//                         labelName: '#somecompany',
//                     },
//                     {
//                         title: 'My Business',
//                         labelName: '#mybusiness',
//                     },
//                     {
//                         title: 'Groceries',
//                         labelName: '#groceries',
//                     },
//                 ],
//                 categories: [
//                     {
//                         title: 'Shopping',
//                         icon: 'shopping-cart',
//                         bgColor: '#E9BC66'
//                     },
//                     {
//                         title: 'Car',
//                         icon: 'car',
//                         bgColor: '#5BB859'
//                     },
//                     {
//                         title: 'Motorcycle',
//                         icon: 'motorcycle',
//                         bgColor: '#4486AB'
//                     },
//                     {
//                         title: 'Food',
//                         icon: 'food',
//                         bgColor: '#784AB2'
//                     },
//                     {
//                         title: 'Hangout',
//                         icon: 'beer',
//                         bgColor: '#C28173'
//                     },
//                     {
//                         title: 'Household',
//                         icon: 'home',
//                         bgColor: '#BB9274'
//                     },
//                     {
//                         title: 'Salary',
//                         icon: 'money',
//                         bgColor: '#5BB859'
//                     },
//                     {
//                         title: 'My business',
//                         icon: 'money',
//                         bgColor: '#73A5C2'
//                     },
//                 ],
//                 actions: [
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#car', '#fuel'],
//                         category: 'Car',
//                         description: 'דלק',
//                         amount: 122,
//                         createdAt: 1638348467000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#coffee'],
//                         category: 'Food',
//                         description: 'קפה',
//                         amount: 12,
//                         createdAt: 1638446507000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#car', '#transportation'],
//                         category: 'Car',
//                         description: 'אגרה לטסט השנתי',
//                         amount: 303,
//                         createdAt: 1635851700000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#coffee'],
//                         category: 'Food',
//                         description: 'קפה',
//                         amount: 7,
//                         createdAt: 1635930900000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#food', '#coffee'],
//                         category: 'Food',
//                         description: 'קפה ומאפה',
//                         amount: 24,
//                         createdAt: 1635938100000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#food', '#restaurant'],
//                         category: 'Food',
//                         description: 'מסעדה עם חברים',
//                         amount: 180,
//                         createdAt: 1635948900000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#beer', '#hangout'],
//                         category: 'Hangout',
//                         description: 'בירה עם חברים',
//                         amount: 70,
//                         createdAt: 1635981300000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#car', '#fuel'],
//                         category: 'Car',
//                         description: 'דלק',
//                         amount: 61,
//                         createdAt: 1636197300000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#car'],
//                         category: 'Car',
//                         description: 'טסט',
//                         amount: 35,
//                         createdAt: 1636647300000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#food'],
//                         category: 'Shopping',
//                         description: 'ירקות מהשוק',
//                         amount: 80,
//                         createdAt: 1636733700000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#food'],
//                         category: 'Shopping',
//                         description: 'לחמניות מהמאפייה',
//                         amount: 27,
//                         createdAt: 1637406669000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 1252,
//                         createdAt: 1636056000000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 1350,
//                         createdAt: 1636660800000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 927,
//                         createdAt: 1637265600000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 1320,
//                         createdAt: 1637870400000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#beer', '#hangout'],
//                         category: 'Hangout',
//                         description: 'בירה עם חברים',
//                         amount: 85,
//                         createdAt: 1637485869000
//                     },





//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#car', '#fuel'],
//                         category: 'Car',
//                         description: 'דלק',
//                         amount: 186,
//                         createdAt: 1633433520000 - 2629800000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#coffee'],
//                         category: 'Food',
//                         description: 'קפה',
//                         amount: 12,
//                         createdAt: 1633339920000 - 2629800000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#food'],
//                         category: 'Food',
//                         description: 'ארוחת צהריים בחוץ',
//                         amount: 52,
//                         createdAt: 1633357920000 - 2629800000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#coffee'],
//                         category: 'Food',
//                         description: 'קפה',
//                         amount: 15,
//                         createdAt: 1633249920000 - 2629800000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#food', '#restaurant'],
//                         category: 'Food',
//                         description: 'מסעדה בערב',
//                         amount: 115,
//                         createdAt: 1634077920000 - 2629800000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#beer', '#hangout'],
//                         category: 'Hangout',
//                         description: 'בירה עם חברים',
//                         amount: 70,
//                         createdAt: 1634167920000 - 2629800000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#car', '#fuel'],
//                         category: 'Car',
//                         description: 'דלק',
//                         amount: 153,
//                         createdAt: 1634200320000 - 2629800000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#food'],
//                         category: 'Shopping',
//                         description: 'ירקות מהשוק',
//                         amount: 52,
//                         createdAt: 1634371920000 - 2629800000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 926,
//                         createdAt: 1636056000000 - 2629800000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 1060,
//                         createdAt: 1634631120000 - 2629800000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 831,
//                         createdAt: 1635279120000 - 2629800000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 1401,
//                         createdAt: 1634069520000 - 2629800000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#beer', '#hangout'],
//                         category: 'Hangout',
//                         description: 'בירה עם חברים',
//                         amount: 115,
//                         createdAt: 1635538320000 - 2629800000
//                     },


//                     // Aug
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#car', '#fuel'],
//                         category: 'Car',
//                         description: 'דלק',
//                         amount: 226,
//                         createdAt: 1633433520000 - (2 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#coffee'],
//                         category: 'Food',
//                         description: 'קפה',
//                         amount: 12,
//                         createdAt: 1633339920000 - (2 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#food'],
//                         category: 'Food',
//                         description: 'ארוחת צהריים בחוץ',
//                         amount: 62,
//                         createdAt: 1633357920000 - (2 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#coffee'],
//                         category: 'Food',
//                         description: 'קפה',
//                         amount: 15,
//                         createdAt: 1633249920000 - (2 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#food', '#restaurant'],
//                         category: 'Food',
//                         description: 'מסעדה בערב',
//                         amount: 180,
//                         createdAt: 1634077920000 - (2 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#beer', '#hangout'],
//                         category: 'Hangout',
//                         description: 'בירה עם חברים',
//                         amount: 70,
//                         createdAt: 1634167920000 - (2 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#car', '#fuel'],
//                         category: 'Car',
//                         description: 'דלק',
//                         amount: 221,
//                         createdAt: 1634200320000 - (2 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#food'],
//                         category: 'Shopping',
//                         description: 'ירקות מהשוק',
//                         amount: 52,
//                         createdAt: 1634371920000 - (2 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 1026,
//                         createdAt: 1636056000000 - (2 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 1221,
//                         createdAt: 1634631120000 - (2 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 1421,
//                         createdAt: 1635279120000 - (2 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 1201,
//                         createdAt: 1634069520000 - (2 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#beer', '#hangout'],
//                         category: 'Hangout',
//                         description: 'בירה עם חברים',
//                         amount: 121,
//                         createdAt: 1635538320000 - (2 * 2629800000)
//                     },
//                     // 

//                     // JUL
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#car', '#fuel'],
//                         category: 'Car',
//                         description: 'דלק',
//                         amount: 196,
//                         createdAt: 1633433520000 - (3 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#coffee'],
//                         category: 'Food',
//                         description: 'קפה',
//                         amount: 15,
//                         createdAt: 1633339920000 - (3 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#food'],
//                         category: 'Food',
//                         description: 'ארוחת צהריים בחוץ',
//                         amount: 48,
//                         createdAt: 1633357920000 - (3 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#coffee'],
//                         category: 'Food',
//                         description: 'קפה',
//                         amount: 11,
//                         createdAt: 1633249920000 - (3 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#food', '#restaurant'],
//                         category: 'Food',
//                         description: 'מסעדה בערב',
//                         amount: 125,
//                         createdAt: 1634077920000 - (3 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#beer', '#hangout'],
//                         category: 'Hangout',
//                         description: 'בירה עם חברים',
//                         amount: 80,
//                         createdAt: 1634167920000 - (3 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#car', '#fuel'],
//                         category: 'Car',
//                         description: 'דלק',
//                         amount: 183,
//                         createdAt: 1634200320000 - (3 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#food'],
//                         category: 'Shopping',
//                         description: 'ירקות מהשוק',
//                         amount: 22,
//                         createdAt: 1634371920000 - (3 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 1126,
//                         createdAt: 1636056000000 - (3 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 1260,
//                         createdAt: 1634631120000 - (3 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 931,
//                         createdAt: 1635279120000 - (3 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 1101,
//                         createdAt: 1634069520000 - (3 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#beer', '#hangout'],
//                         category: 'Hangout',
//                         description: 'בירה עם חברים',
//                         amount: 75,
//                         createdAt: 1635538320000 - (3 * 2629800000)
//                     },
//                     // 

//                     // JUN
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#car', '#fuel'],
//                         category: 'Car',
//                         description: 'דלק',
//                         amount: 187,
//                         createdAt: 1633433520000 - (4 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#coffee'],
//                         category: 'Food',
//                         description: 'קפה',
//                         amount: 15,
//                         createdAt: 1633339920000 - (4 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#food'],
//                         category: 'Food',
//                         description: 'ארוחת צהריים בחוץ',
//                         amount: 42,
//                         createdAt: 1633357920000 - (4 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#coffee'],
//                         category: 'Food',
//                         description: 'קפה',
//                         amount: 11,
//                         createdAt: 1633249920000 - (4 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#food', '#restaurant'],
//                         category: 'Food',
//                         description: 'מסעדה בערב',
//                         amount: 80,
//                         createdAt: 1634077920000 - (4 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#beer', '#hangout'],
//                         category: 'Hangout',
//                         description: 'בירה עם חברים',
//                         amount: 60,
//                         createdAt: 1634167920000 - (4 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#car', '#fuel'],
//                         category: 'Car',
//                         description: 'דלק',
//                         amount: 183,
//                         createdAt: 1634200320000 - (4 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#food'],
//                         category: 'Shopping',
//                         description: 'ירקות מהשוק',
//                         amount: 30,
//                         createdAt: 1634371920000 - (4 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 815,
//                         createdAt: 1636056000000 - (4 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 523,
//                         createdAt: 1634631120000 - (4 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 656,
//                         createdAt: 1635279120000 - (4 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 1231,
//                         createdAt: 1634069520000 - (4 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#beer', '#hangout'],
//                         category: 'Hangout',
//                         description: 'בירה עם חברים',
//                         amount: 43,
//                         createdAt: 1635538320000 - (4 * 2629800000)
//                     },
//                     // 

//                     // MAY
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#car', '#fuel'],
//                         category: 'Car',
//                         description: 'דלק',
//                         amount: 131,
//                         createdAt: 1633433520000 - (5 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#coffee'],
//                         category: 'Food',
//                         description: 'קפה',
//                         amount: 15,
//                         createdAt: 1633339920000 - (5 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#food'],
//                         category: 'Food',
//                         description: 'ארוחת צהריים בחוץ',
//                         amount: 22,
//                         createdAt: 1633357920000 - (5 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#beer', '#hangout'],
//                         category: 'Hangout',
//                         description: 'בירה עם חברים',
//                         amount: 60,
//                         createdAt: 1634167920000 - (5 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#car', '#fuel'],
//                         category: 'Car',
//                         description: 'דלק',
//                         amount: 132,
//                         createdAt: 1634200320000 - (5 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#food'],
//                         category: 'Shopping',
//                         description: 'ירקות מהשוק',
//                         amount: 22,
//                         createdAt: 1634371920000 - (5 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 876,
//                         createdAt: 1636056000000 - (5 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 558,
//                         createdAt: 1634631120000 - (5 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 667,
//                         createdAt: 1635279120000 - (5 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 887,
//                         createdAt: 1634069520000 - (5 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#beer', '#hangout'],
//                         category: 'Hangout',
//                         description: 'בירה עם חברים',
//                         amount: 75,
//                         createdAt: 1635538320000 - (5 * 2629800000)
//                     },
//                     // 

//                     // APR
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#car', '#fuel'],
//                         category: 'Car',
//                         description: 'דלק',
//                         amount: 121,
//                         createdAt: 1633433520000 - (6 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#coffee'],
//                         category: 'Food',
//                         description: 'קפה',
//                         amount: 12,
//                         createdAt: 1633339920000 - (6 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#food'],
//                         category: 'Food',
//                         description: 'ארוחת צהריים בחוץ',
//                         amount: 56,
//                         createdAt: 1633357920000 - (6 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#coffee'],
//                         category: 'Food',
//                         description: 'קפה',
//                         amount: 12,
//                         createdAt: 1633249920000 - (6 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#food', '#restaurant'],
//                         category: 'Food',
//                         description: 'מסעדה בערב',
//                         amount: 123,
//                         createdAt: 1634077920000 - (6 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#beer', '#hangout'],
//                         category: 'Hangout',
//                         description: 'בירה עם חברים',
//                         amount: 70,
//                         createdAt: 1634167920000 - (6 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#car', '#fuel'],
//                         category: 'Car',
//                         description: 'דלק',
//                         amount: 121,
//                         createdAt: 1634200320000 - (6 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#food'],
//                         category: 'Shopping',
//                         description: 'ירקות מהשוק',
//                         amount: 67,
//                         createdAt: 1634371920000 - (6 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 815,
//                         createdAt: 1636056000000 - (6 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 1390,
//                         createdAt: 1634631120000 - (6 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 1212,
//                         createdAt: 1635279120000 - (6 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 412,
//                         createdAt: 1634069520000 - (6 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#beer', '#hangout'],
//                         category: 'Hangout',
//                         description: 'בירה עם חברים',
//                         amount: 75,
//                         createdAt: 1635538320000 - (6 * 2629800000)
//                     },
//                     // 

//                     // MAR
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#car', '#fuel'],
//                         category: 'Car',
//                         description: 'דלק',
//                         amount: 221,
//                         createdAt: 1633433520000 - (7 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#coffee'],
//                         category: 'Food',
//                         description: 'קפה',
//                         amount: 12,
//                         createdAt: 1633339920000 - (7 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#food'],
//                         category: 'Food',
//                         description: 'ארוחת צהריים בחוץ',
//                         amount: 42,
//                         createdAt: 1633357920000 - (7 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#coffee'],
//                         category: 'Food',
//                         description: 'קפה',
//                         amount: 51,
//                         createdAt: 1633249920000 - (7 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#food', '#restaurant'],
//                         category: 'Food',
//                         description: 'מסעדה בערב',
//                         amount: 220,
//                         createdAt: 1634077920000 - (7 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#beer', '#hangout'],
//                         category: 'Hangout',
//                         description: 'בירה עם חברים',
//                         amount: 75,
//                         createdAt: 1634167920000 - (7 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#car', '#fuel'],
//                         category: 'Car',
//                         description: 'דלק',
//                         amount: 123,
//                         createdAt: 1634200320000 - (7 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#food'],
//                         category: 'Shopping',
//                         description: 'ירקות מהשוק',
//                         amount: 80,
//                         createdAt: 1634371920000 - (7 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 1231,
//                         createdAt: 1636056000000 - (7 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 1254,
//                         createdAt: 1634631120000 - (7 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 653,
//                         createdAt: 1635279120000 - (7 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 871,
//                         createdAt: 1634069520000 - (7 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#beer', '#hangout'],
//                         category: 'Hangout',
//                         description: 'בירה עם חברים',
//                         amount: 95,
//                         createdAt: 1635538320000 - (7 * 2629800000)
//                     },
//                     // 

//                     // FEB
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#car', '#fuel'],
//                         category: 'Car',
//                         description: 'דלק',
//                         amount: 214,
//                         createdAt: 1633433520000 - (8 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#coffee'],
//                         category: 'Food',
//                         description: 'קפה',
//                         amount: 12,
//                         createdAt: 1633339920000 - (8 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#food'],
//                         category: 'Food',
//                         description: 'ארוחת צהריים בחוץ',
//                         amount: 67,
//                         createdAt: 1633357920000 - (8 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#coffee'],
//                         category: 'Food',
//                         description: 'קפה',
//                         amount: 15,
//                         createdAt: 1633249920000 - (8 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#food', '#restaurant'],
//                         category: 'Food',
//                         description: 'מסעדה בערב',
//                         amount: 85,
//                         createdAt: 1634077920000 - (8 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#beer', '#hangout'],
//                         category: 'Hangout',
//                         description: 'בירה עם חברים',
//                         amount: 120,
//                         createdAt: 1634167920000 - (8 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#car', '#fuel'],
//                         category: 'Car',
//                         description: 'דלק',
//                         amount: 123,
//                         createdAt: 1634200320000 - (8 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#food'],
//                         category: 'Shopping',
//                         description: 'ירקות מהשוק',
//                         amount: 32,
//                         createdAt: 1634371920000 - (8 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 1226,
//                         createdAt: 1636056000000 - (8 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 1160,
//                         createdAt: 1634631120000 - (8 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 631,
//                         createdAt: 1635279120000 - (8 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 860,
//                         createdAt: 1634069520000 - (8 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#beer', '#hangout'],
//                         category: 'Hangout',
//                         description: 'בירה עם חברים',
//                         amount: 90,
//                         createdAt: 1635538320000 - (8 * 2629800000)
//                     },
//                     // 

//                     // JAN
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#car', '#fuel'],
//                         category: 'Car',
//                         description: 'דלק',
//                         amount: 196,
//                         createdAt: 1633433520000 - (9 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#coffee'],
//                         category: 'Food',
//                         description: 'קפה',
//                         amount: 12,
//                         createdAt: 1633339920000 - (9 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#food'],
//                         category: 'Food',
//                         description: 'ארוחת צהריים בחוץ',
//                         amount: 78,
//                         createdAt: 1633357920000 - (9 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#coffee'],
//                         category: 'Food',
//                         description: 'קפה',
//                         amount: 15,
//                         createdAt: 1633249920000 - (9 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#food', '#restaurant'],
//                         category: 'Food',
//                         description: 'מסעדה בערב',
//                         amount: 185,
//                         createdAt: 1634077920000 - (9 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#beer', '#hangout'],
//                         category: 'Hangout',
//                         description: 'בירה עם חברים',
//                         amount: 122,
//                         createdAt: 1634167920000 - (9 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#car', '#fuel'],
//                         category: 'Car',
//                         description: 'דלק',
//                         amount: 232,
//                         createdAt: 1634200320000 - (9 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#food'],
//                         category: 'Shopping',
//                         description: 'ירקות מהשוק',
//                         amount: 32,
//                         createdAt: 1634371920000 - (9 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 1126,
//                         createdAt: 1636056000000 - (9 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 1231,
//                         createdAt: 1634631120000 - (9 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 513,
//                         createdAt: 1635279120000 - (9 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 862,
//                         createdAt: 1634069520000 - (9 * 2629800000)
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#beer', '#hangout'],
//                         category: 'Hangout',
//                         description: 'בירה עם חברים',
//                         amount: 68,
//                         createdAt: 1635538320000 - (9 * 2629800000)
//                     },
//                     // 


//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#car', '#fuel'],
//                         category: 'Car',
//                         description: 'דלק',
//                         amount: 250,
//                         createdAt: 1633433520000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#coffee'],
//                         category: 'Food',
//                         description: 'קפה',
//                         amount: 12,
//                         createdAt: 1633339920000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#food'],
//                         category: 'Food',
//                         description: 'ארוחת צהריים בחוץ',
//                         amount: 42,
//                         createdAt: 1633357920000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#coffee'],
//                         category: 'Food',
//                         description: 'קפה',
//                         amount: 15,
//                         createdAt: 1633249920000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#technology'],
//                         category: 'Shopping',
//                         description: 'מסך טלוויזיה 52 אינץ',
//                         amount: 4200,
//                         createdAt: 1633721520000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#food', '#restaurant'],
//                         category: 'Food',
//                         description: 'מסעדה בערב',
//                         amount: 120,
//                         createdAt: 1634077920000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#beer', '#hangout'],
//                         category: 'Hangout',
//                         description: 'בירה עם חברים',
//                         amount: 95,
//                         createdAt: 1634167920000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#car', '#fuel'],
//                         category: 'Car',
//                         description: 'דלק',
//                         amount: 216,
//                         createdAt: 1634200320000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#food'],
//                         category: 'Shopping',
//                         description: 'ירקות מהשוק',
//                         amount: 67,
//                         createdAt: 1634371920000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 1126,
//                         createdAt: 1636056000000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 1260,
//                         createdAt: 1634631120000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 1031,
//                         createdAt: 1635279120000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#household', '#groceries'],
//                         category: 'Shopping',
//                         description: 'קניות שבועיות',
//                         amount: 1201,
//                         createdAt: 1634069520000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#beer', '#hangout'],
//                         category: 'Hangout',
//                         description: 'בירה עם חברים',
//                         amount: 85,
//                         createdAt: 1635538320000
//                     },







//                     {
//                         _id: utilService.makeId(),
//                         type: 'income',
//                         labels: ['#salary', '#somecompany'],
//                         category: 'Salary',
//                         description: 'משכורת',
//                         amount: 12570,
//                         createdAt: 1636531200000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'income',
//                         labels: ['#mybusiness'],
//                         category: 'My business',
//                         description: 'הכנסות מהעסק שלי',
//                         amount: 840,
//                         createdAt: 1636704000000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'income',
//                         labels: ['#mybusiness'],
//                         category: 'My business',
//                         description: 'הכנסות מהעסק שלי',
//                         amount: 942,
//                         createdAt: 1638462720000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'income',
//                         labels: ['#salary', '#somecompany'],
//                         category: 'Salary',
//                         description: 'משכורת',
//                         amount: 12310,
//                         createdAt: 1633852800000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'income',
//                         labels: ['#mybusiness'],
//                         category: 'My business',
//                         description: 'הכנסות מהעסק שלי',
//                         amount: 1025,
//                         createdAt: 1634371200000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'income',
//                         labels: ['#salary', '#somecompany'],
//                         category: 'Salary',
//                         description: 'משכורת',
//                         amount: 11400,
//                         createdAt: 1631260800000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'income',
//                         labels: ['#mybusiness'],
//                         category: 'My business',
//                         description: 'הכנסות מהעסק שלי',
//                         amount: 427,
//                         createdAt: 1630828800000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'income',
//                         labels: ['#salary', '#somecompany'],
//                         category: 'Salary',
//                         description: 'משכורת',
//                         amount: 13412,
//                         createdAt: 1628582400000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'income',
//                         labels: ['#mybusiness'],
//                         category: 'My business',
//                         description: 'הכנסות מהעסק שלי',
//                         amount: 1623,
//                         createdAt: 1628841600000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'income',
//                         labels: ['#salary', '#somecompany'],
//                         category: 'Salary',
//                         description: 'משכורת',
//                         amount: 10800,
//                         createdAt: 1625904000000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'income',
//                         labels: ['#mybusiness'],
//                         category: 'My business',
//                         description: 'הכנסות מהעסק שלי',
//                         amount: 412,
//                         createdAt: 1626076800000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'income',
//                         labels: ['#salary', '#somecompany'],
//                         category: 'Salary',
//                         description: 'משכורת',
//                         amount: 11750,
//                         createdAt: 1623312000000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'income',
//                         labels: ['#mybusiness'],
//                         category: 'My business',
//                         description: 'הכנסות מהעסק שלי',
//                         amount: 814,
//                         createdAt: 1624608000000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'income',
//                         labels: ['#salary', '#somecompany'],
//                         category: 'Salary',
//                         description: 'משכורת',
//                         amount: 12250,
//                         createdAt: 1620633600000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'income',
//                         labels: ['#mybusiness'],
//                         category: 'My business',
//                         description: 'הכנסות מהעסק שלי',
//                         amount: 640,
//                         createdAt: 1621929600000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'income',
//                         labels: ['#salary', '#somecompany'],
//                         category: 'Salary',
//                         description: 'משכורת',
//                         amount: 9500,
//                         createdAt: 1618041600000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'income',
//                         labels: ['#mybusiness'],
//                         category: 'My business',
//                         description: 'הכנסות מהעסק שלי',
//                         amount: 1100,
//                         createdAt: 1619337600000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'income',
//                         labels: ['#salary', '#somecompany'],
//                         category: 'Salary',
//                         description: 'משכורת',
//                         amount: 11500,
//                         createdAt: 1615363200000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'income',
//                         labels: ['#mybusiness'],
//                         category: 'My business',
//                         description: 'הכנסות מהעסק שלי',
//                         amount: 750,
//                         createdAt: 1615190400000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'income',
//                         labels: ['#salary', '#somecompany'],
//                         category: 'Salary',
//                         description: 'משכורת',
//                         amount: 13250,
//                         createdAt: 1612944000000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'income',
//                         labels: ['#mybusiness'],
//                         category: 'My business',
//                         description: 'הכנסות מהעסק שלי',
//                         amount: 415,
//                         createdAt: 1612512000000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'income',
//                         labels: ['#salary', '#somecompany'],
//                         category: 'Salary',
//                         description: 'משכורת',
//                         amount: 10750,
//                         createdAt: 1610265600000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'income',
//                         labels: ['#mybusiness'],
//                         category: 'My business',
//                         description: 'הכנסות מהעסק שלי',
//                         amount: 1321,
//                         createdAt: 1610870400000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#rent', '#household'],
//                         category: 'Household',
//                         description: 'שכר דירה',
//                         amount: 3500,
//                         createdAt: 1636977707000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#rent', '#household'],
//                         category: 'Household',
//                         description: 'שכר דירה',
//                         amount: 3500,
//                         createdAt: 1634289347000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#rent', '#household'],
//                         category: 'Household',
//                         description: 'שכר דירה',
//                         amount: 3500,
//                         createdAt: 1631697347000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#rent', '#household'],
//                         category: 'Household',
//                         description: 'שכר דירה',
//                         amount: 3500,
//                         createdAt: 1629018947000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#rent', '#household'],
//                         category: 'Household',
//                         description: 'שכר דירה',
//                         amount: 3500,
//                         createdAt: 1626340547000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#rent', '#household'],
//                         category: 'Household',
//                         description: 'שכר דירה',
//                         amount: 3500,
//                         createdAt: 1623748547000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#rent', '#household'],
//                         category: 'Household',
//                         description: 'שכר דירה',
//                         amount: 3500,
//                         createdAt: 1621070147000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#rent', '#household'],
//                         category: 'Household',
//                         description: 'שכר דירה',
//                         amount: 3500,
//                         createdAt: 1618478147000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#rent', '#household'],
//                         category: 'Household',
//                         description: 'שכר דירה',
//                         amount: 3500,
//                         createdAt: 1615799747000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#rent', '#household'],
//                         category: 'Household',
//                         description: 'שכר דירה',
//                         amount: 3500,
//                         createdAt: 1613380547000
//                     },
//                     {
//                         _id: utilService.makeId(),
//                         type: 'expense',
//                         labels: ['#rent', '#household'],
//                         category: 'Household',
//                         description: 'שכר דירה',
//                         amount: 3500,
//                         createdAt: 1610702147000
//                     },
//                 ]
//             }
//         }
//     ]


//     const usersFromStorage = localStorageService.load('users')
//     const loggedInUserFromStorage = localStorageService.load('loggedInUser')

//     if (!usersFromStorage) {
//         localStorageService.save('users', users)
//     }

//     if (!loggedInUserFromStorage) {
//         localStorageService.save('loggedInUser', loggedInUser)
//     }
// }
