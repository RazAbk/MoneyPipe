import { userService } from "../../services/user.service"
import { AppUserDispatch } from "../store"

export const setUser = () => {
    return async (dispatch: AppUserDispatch) => {
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
    return async (dispatch: AppUserDispatch) => {
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

export const setViewMode = (viewMode: string) => {
    return (dispatch: AppUserDispatch) => {
        dispatch({
            type: "SET_VIEWMODE",
            viewMode
        })
    }
}



