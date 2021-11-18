import { userService } from "../../services/user.service"
import { AppDispatch } from "../store"

export const setCurrentViewMode = (viewMode: string) => {
    return (dispatch: AppDispatch) => {
        dispatch({
            type: "SET_VIEWMODE",
            viewMode
        })
    }
}

export const setCurrentLabel = (label: string | null) => {
    return (dispatch: AppDispatch) => {
        dispatch({
            type: "SET_LABEL",
            label
        })
    }
}

export const setFilterBy = (filterBy: any) => {
    return (dispatch: AppDispatch) => {
        dispatch({
            type: "SET_FILTERBY",
            filterBy
        })
    }
}



