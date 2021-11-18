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
            }

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
                title: 'Household',
                icon: 'BsFillHouseDoorFill',
                bgColor: '#BB9274'
            }
        ],
        actions: [
            {
                type: 'expense',
                labels: ['#household'],
                category: 'Shopping',
                description: 'Set of towels',
                amount: '120',
                currencySign: '₪',
                currency: 'nis',
                createdAt: 1637154111022
            },
            {
                type: 'expense',
                labels: ['#household'],
                category: 'Shopping',
                description: 'Set of cups',
                amount: '60',
                currencySign: '₪',
                currency: 'nis',
                createdAt: 1637154110022
            },
            {
                type: 'expense',
                labels: ['#technology'],
                category: 'Shopping',
                description: 'New keyboard',
                amount: '220',
                currencySign: '₪',
                currency: 'nis',
                createdAt: 1637154110022
            },
            {
                type: 'income',
                labels: ['#salary', '#amazon'],
                category: 'Salary',
                description: 'Salary',
                amount: '13500',
                currencySign: '₪',
                currency: 'nis',
                createdAt: 1637154110022
            },
        ]
    }


}