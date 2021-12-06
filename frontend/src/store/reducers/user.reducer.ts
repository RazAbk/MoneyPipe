import { IDataObject } from "../../interfaces/dataInterfaces"
import { IUser } from "../../interfaces/userInterfaces"

interface IState {
    loggedInUser: IUser | null,
    currentViewMode: string
    currentLabel: string | null
    data: IDataObject | null
}

interface IAction {
    type: string,
    [key: string]: any
}

const initialState: IState = {
    loggedInUser: null,
    currentViewMode: 'Summery',
    currentLabel: null,
    data: null
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