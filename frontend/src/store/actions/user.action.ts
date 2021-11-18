import { userService } from "../../services/user.service"
import { AppDispatch } from "../store"

export const setUser = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const user = await userService.getLoggedInUser()
            dispatch({
                type: "SET_USER",
                user
            })
            return user
        } catch (err) {
            console.log(err);
        }
    }
}

export const getData = (filterBy = {}) => {
    return async (dispatch: AppDispatch) => {
        try{
            const data = await userService.getData(filterBy)
            dispatch({
                type: "SET_DATA",
                data
            })
            return data

        } catch (err){
            console.log(err)
        }
    }
}

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



