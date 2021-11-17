
const initialState = {
    loggedInUser:  null,
    currentViewMode: 'summery',
    currentLabel: null,
    data: null
}

interface IAction {
    type: string,
    [key: string]: any
}

export const userReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case 'SET_USER':
            return state = { ...state, loggedInUser: action.user }
        case 'SET_DATA':
            return state = { ...state, data: action.data }
        default:
            return state
    }
}