export const userService = {
    getData,
    getLoggedInUser
}

function getLoggedInUser() {
    return null
}

async function getData(filterBy = {}){
    return await {
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
                bgColor: '#FDA810'
            },
            {
                title: 'Food',
                icon: 'MdFastfood',
                bgColor: '#AFA810'
            },
            {
                title: 'Hangout',
                icon: 'IoBeer',
                bgColor: '#FAC110'
            },
            {
                title: 'Household',
                icon: 'BsFillHouseDoorFill',
                bgColor: '#BB9274'
            },
            {
                title: 'Salary',
                icon: 'GiMoneyStack',
                bgColor: '#AF1350'
            },
            {
                title: 'My business',
                icon: 'GiMoneyStack',
                bgColor: '#FF9050'
            },
        ],
        actions: [
            {
                type: 'expense',
                labels: ['#motorcycle', '#transportation'],
                category: 'Motorcycle',
                description: 'אגרה לטסט השנתי',
                amount: '303',
                currencySign: '₪',
                currency: 'nis',
                createdAt: 1635851700
            },
            {
                type: 'expense',
                labels: ['#coffee'],
                category: 'Food',
                description: 'קפה',
                amount: '7',
                currencySign: '₪',
                currency: 'nis',
                createdAt: 1635930900
            },
            {
                type: 'expense',
                labels: ['#food', '#coffee'],
                category: 'Food',
                description: 'קפה ומאפה',
                amount: '24',
                currencySign: '₪',
                currency: 'nis',
                createdAt: 1635938100
            },
            {
                type: 'expense',
                labels: ['#food', '#restaurant'],
                category: 'Food',
                description: 'מסעדה',
                amount: '180',
                currencySign: '₪',
                currency: 'nis',
                createdAt: 1635948900
            },
            {
                type: 'expense',
                labels: ['#beer', '#hangout'],
                category: 'Hangout',
                description: 'בירה עם חברים',
                amount: '70',
                currencySign: '₪',
                currency: 'nis',
                createdAt: 1635981300
            },
            {
                type: 'expense',
                labels: ['#motorcycle', '#fuel'],
                category: 'Motorcycle',
                description: 'דלק',
                amount: '61',
                currencySign: '₪',
                currency: 'nis',
                createdAt: 1636197300
            },
            {
                type: 'expense',
                labels: ['#motorcycle', '#fuel'],
                category: 'Motorcycle',
                description: 'דלק',
                amount: '54',
                currencySign: '₪',
                currency: 'nis',
                createdAt: 1636215300
            },
            {
                type: 'expense',
                labels: ['#motorcycle'],
                category: 'Motorcycle',
                description: 'טסט',
                amount: '35',
                currencySign: '₪',
                currency: 'nis',
                createdAt: 1636647300
            },
            {
                type: 'expense',
                labels: ['#household'],
                category: 'Shopping',
                description: 'קניות לבית',
                amount: '80',
                currencySign: '₪',
                currency: 'nis',
                createdAt: 1636733700
            },
            {
                type: 'expense',
                labels: ['#household'],
                category: 'Shopping',
                description: 'קניות לבית',
                amount: '27',
                currencySign: '₪',
                currency: 'nis',
                createdAt: 1636734000
            },
            {
                type: 'expense',
                labels: ['#beer', '#hangout'],
                category: 'Hangout',
                description: 'בירה עם חברים',
                amount: '85',
                currencySign: '₪',
                currency: 'nis',
                createdAt: 1636759200
            },
            {
                type: 'income',
                labels: ['#salary', '#somecompany'],
                category: 'Salary',
                description: 'משכורת',
                amount: '12000',
                currencySign: '₪',
                currency: 'nis',
                createdAt: 1636543200
            },
            {
                type: 'income',
                labels: ['#mybusiness'],
                category: 'My business',
                description: 'הכנסות מהעסק שלי',
                amount: '750',
                currencySign: '₪',
                currency: 'nis',
                createdAt: 1636888800
            },
        ]
    }


}