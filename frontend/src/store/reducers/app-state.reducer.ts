import { IAction, IFilterBy } from "../../interfaces/dataInterfaces"
import { dateService } from "../../services/date.service"

interface IState {
    blocksIdx: number,
    isPaginationDots: boolean,
    loaderState: boolean;
    currentViewMode: string;
    currentLabels: string[];
    selectedAction: IAction | null;
    filterBy: IFilterBy;
}

interface IReducerAction {
    type: string;
    [key: string]: any;
}

const initialState: IState = {
    blocksIdx: 0,
    isPaginationDots: false,
    loaderState: false,
    currentViewMode: 'Summery',
    currentLabels: [],
    selectedAction: null,
    filterBy: {
        searchTxt: '',
        startDate: dateService.getMonthStartTimeStamp(),
        endDate: dateService.getDayMaxHour(Date.now()),
        labels: [],
        categories: []
    }
}

export const appStateReducer = (state = initialState, action: IReducerAction) => {
    switch (action.type) {
        case 'SET_BLOCKS_IDX':
            return state = { ...state, blocksIdx: action.blocksIdx }
        case 'SET_PAGINATION_DOTS':
            return state = { ...state, isPaginationDots: action.isPaginationDots }
        case 'SET_LOADER':
            return state = { ...state, loaderState: action.loaderState }
        case 'SET_VIEWMODE':
            return state = { ...state, currentViewMode: action.viewMode }
        case 'SET_LABELS':
            return state = { ...state, currentLabels: action.labels }
        case 'SET_SELECTED_ACTION':
            return state = { ...state, selectedAction: action.action }
        case 'SET_FILTERBY':
            return state = { ...state, filterBy: action.filterBy }
        default:
            return state
    }
}