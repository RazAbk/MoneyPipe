import { IFilterBy } from "../../interfaces/dataInterfaces"
import { utilService } from "../../services/util.service"

const initialState: IState = {
    currentViewMode: 'Summery',
    currentLabel: null,
    filterBy: {
        searchTxt: '',
        startDate: utilService.getCurrMonthStartTimeStamp(),
        endDate: Date.now(),
        label: '',
        category: ''
    }
}

interface IState  {
    currentViewMode: string
    currentLabel: string | null,
    filterBy: IFilterBy
}

interface IAction {
    type: string,
    [key: string]: any
}

export const appStateReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case 'SET_VIEWMODE':
            return state = { ...state, currentViewMode: action.viewMode }
        case 'SET_LABEL':
            return state = { ...state, currentLabel: action.label }
        default:
            return state
    }
}