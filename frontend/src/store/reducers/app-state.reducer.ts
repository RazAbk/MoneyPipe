import { IFilterBy } from "../../interfaces/dataInterfaces"
import { utilService } from "../../services/util.service"

interface IState {
    currentViewMode: string
    currentLabel: string | null,
    filterBy: IFilterBy
}

interface IAction {
    type: string,
    [key: string]: any
}

const initialState: IState = {
    currentViewMode: 'Summery',
    currentLabel: null,
    filterBy: {
        searchTxt: '',
        startDate: utilService.getCurrMonthStartTimeStamp(),
        endDate: utilService.getDayMaxHour(Date.now()),
        label: '',
        category: ''
    }
}

export const appStateReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case 'SET_VIEWMODE':
            return state = { ...state, currentViewMode: action.viewMode }
        case 'SET_LABEL':
            return state = { ...state, currentLabel: action.label }
        case 'SET_FILTERBY':
            return state = { ...state, filterBy: action.filterBy }
        default:
            return state
    }
}