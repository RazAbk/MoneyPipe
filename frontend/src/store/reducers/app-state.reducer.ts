const initialState: IState = {
    currentViewMode: 'Summery',
    currentLabel: null,
    filterBy: null
}

interface IState  {
    currentViewMode: string
    currentLabel: string | null,
    filterBy: any
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