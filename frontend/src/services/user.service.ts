import { localStorageService } from "./local-storage.service"
import { storageService as asyncLocalStorage } from '../services/async-storage.service'
import { IAction, IUser } from "../interfaces/dataInterfaces"

export const userService = {
    getLoggedInUser,
    getData,
    addAction
}

function getLoggedInUser() {
    const loggedInUser = localStorageService.load('loggedInUser')
    return loggedInUser
}

async function getData(filterBy = {}) {
    const loggedInUser = getLoggedInUser()
    
    const user = await asyncLocalStorage.get('users', loggedInUser)
    return user.data
}

async function addAction(action: IAction) {
    const loggedInUser = getLoggedInUser()
    const users = localStorageService.load('users')

    const userIdx = users.findIndex((user: IUser) => user.userName === loggedInUser)
    users[userIdx].data.actions.push(action)
    localStorageService.save('users', users)

    return users[userIdx].data
}

// _loadToStorage()

function _loadToStorage() {

    const users = [
        {
            userName: 'razAbk',
            password: '1234',
            name: 'Raz Abekasis',
            createdAt: 1635498520000,
            picture: 'https://scontent.ftlv18-1.fna.fbcdn.net/v/t1.6435-9/91491076_3070598229650212_2525597600778813440_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=VaKsHQVKdcEAX9REcAS&_nc_ht=scontent.ftlv18-1.fna&oh=a1f38be9e9c18267c4e8ca66d32b999d&oe=61C39FC9',
            data: {
                currencySign: '₪',
                currency: 'nis',
                labels: [
                    {
                        title: 'Household',
                        labelName: '#household',
                    },
                    {
                        title: 'Technology',
                        labelName: '#technology',
                    },
                    {
                        title: 'Transportation',
                        labelName: '#transportation',
                    },
                    {
                        title: 'Motorcycle',
                        labelName: '#motorcycle',
                    },
                    {
                        title: 'Fuel',
                        labelName: '#fuel',
                    },
                    {
                        title: 'Food',
                        labelName: '#food',
                    },
                    {
                        title: 'Coffee',
                        labelName: '#coffee',
                    },
                    {
                        title: 'Beer',
                        labelName: '#beer',
                    },
                    {
                        title: 'Hangout',
                        labelName: '#hangout',
                    },
                    {
                        title: 'Salary',
                        labelName: '#salary',
                    },
                    {
                        title: 'Some Company',
                        labelName: '#somecompany',
                    },
                    {
                        title: 'My Business',
                        labelName: '#mybusiness',
                    },
                ],
                categories: [
                    {
                        title: 'Shopping',
                        icon: 'HiShoppingCart',
                        bgColor: '#E9BC66'
                    },
                    {
                        title: 'Car',
                        icon: 'MdDirectionsCar',
                        bgColor: '#5BB859'
                    },
                    {
                        title: 'Motorcycle',
                        icon: 'FaMotorcycle',
                        bgColor: '#4486AB'
                    },
                    {
                        title: 'Food',
                        icon: 'MdFastfood',
                        bgColor: '#784AB2'
                    },
                    {
                        title: 'Hangout',
                        icon: 'FaBeer',
                        bgColor: '#C28173'
                    },
                    {
                        title: 'Household',
                        icon: 'BsFillHouseDoorFill',
                        bgColor: '#BB9274'
                    },
                    {
                        title: 'Salary',
                        icon: 'GiMoneyStack',
                        bgColor: '#5BB859'
                    },
                    {
                        title: 'My business',
                        icon: 'GiMoneyStack',
                        bgColor: '#73A5C2'
                    },
                ],
                actions: [
                    {
                        type: 'expense',
                        labels: ['#motorcycle', '#transportation'],
                        category: 'Motorcycle',
                        description: 'אגרה לטסט השנתי',
                        amount: 303,
                        createdAt: 1635851700000
                    },
                    {
                        type: 'expense',
                        labels: ['#coffee'],
                        category: 'Food',
                        description: 'קפה',
                        amount: 7,
                        createdAt: 1635930900000
                    },
                    {
                        type: 'expense',
                        labels: ['#food', '#coffee'],
                        category: 'Food',
                        description: 'קפה ומאפה',
                        amount: 24,
                        createdAt: 1635938100000
                    },
                    {
                        type: 'expense',
                        labels: ['#food', '#restaurant'],
                        category: 'Food',
                        description: 'מסעדה',
                        amount: 180,
                        createdAt: 1635948900000
                    },
                    {
                        type: 'expense',
                        labels: ['#beer', '#hangout'],
                        category: 'Hangout',
                        description: 'בירה עם חברים',
                        amount: 70,
                        createdAt: 1635981300000
                    },
                    {
                        type: 'expense',
                        labels: ['#motorcycle', '#fuel'],
                        category: 'Motorcycle',
                        description: 'דלק',
                        amount: 61,
                        createdAt: 1636197300000
                    },
                    {
                        type: 'expense',
                        labels: ['#motorcycle', '#fuel'],
                        category: 'Motorcycle',
                        description: 'דלק',
                        amount: 54,
                        createdAt: 1636215300000
                    },
                    {
                        type: 'expense',
                        labels: ['#motorcycle'],
                        category: 'Motorcycle',
                        description: 'טסט',
                        amount: 35,
                        createdAt: 1636647300000
                    },
                    {
                        type: 'expense',
                        labels: ['#household'],
                        category: 'Shopping',
                        description: 'קניות לבית',
                        amount: 80,
                        createdAt: 1636733700000
                    },
                    {
                        type: 'expense',
                        labels: ['#household'],
                        category: 'Shopping',
                        description: 'קניות לבית',
                        amount: 27,
                        createdAt: 1637406669000
                    },
                    {
                        type: 'expense',
                        labels: ['#beer', '#hangout'],
                        category: 'Hangout',
                        description: 'בירה עם חברים',
                        amount: 85,
                        createdAt: 1637485869000
                    },
                    {
                        type: 'income',
                        labels: ['#salary', '#somecompany'],
                        category: 'Salary',
                        description: 'משכורת',
                        amount: 12000,
                        createdAt: 1636543200000
                    },
                    {
                        type: 'income',
                        labels: ['#mybusiness'],
                        category: 'My business',
                        description: 'הכנסות מהעסק שלי',
                        amount: 750,
                        createdAt: 1636888800000
                    },
                ]
            }
        }
    ]

    const loggedInUser = 'razAbk'

    localStorageService.save('users', users)
    localStorageService.save('loggedInUser', loggedInUser)
}
