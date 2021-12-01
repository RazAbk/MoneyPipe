import { IAction, IFilterBy } from "../../interfaces/dataInterfaces"
import { utilService } from "../../services/util.service"

interface IState {
    currentViewMode: string;
    currentLabel: string | null;
    selectedAction: IAction | null;
    filterBy: IFilterBy;
}

interface IReducerAction {
    type: string;
    [key: string]: any;
}

const initialState: IState = {
    currentViewMode: 'Graph',
    currentLabel: null,
    selectedAction: null,
    filterBy: {
        searchTxt: '',
        startDate: utilService.getCurrMonthStartTimeStamp(),
        endDate: utilService.getDayMaxHour(Date.now()),
        label: '',
        category: ''
    }
}

export const appStateReducer = (state = initialState, action: IReducerAction) => {
    switch (action.type) {
        case 'SET_VIEWMODE':
            return state = { ...state, currentViewMode: action.viewMode }
        case 'SET_LABEL':
            return state = { ...state, currentLabel: action.label }
        case 'SET_SELECTED_ACTION':
            return state = { ...state, selectedAction: action.action }
        case 'SET_FILTERBY':
            return state = { ...state, filterBy: action.filterBy }
        default:
            return state
    }
}