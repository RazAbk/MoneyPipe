import { IAction, IFilterBy } from "../../interfaces/dataInterfaces"
import { dateService } from "../../services/date.service"

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
    currentViewMode: 'Summery',
    currentLabel: null,
    selectedAction: null,
    filterBy: {
        searchTxt: '',
        startDate: dateService.getMonthStartTimeStamp(),
        // startDate: new Date('01/01/2021'),
        endDate: dateService.getDayMaxHour(Date.now()),
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