import { IAction, ICategory, ILabel } from "../../interfaces/dataInterfaces"
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

export const addAction = (action: IAction) => {
    return async (dispatch: AppDispatch) => {
        try{
            const data = await userService.addAction(action)
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

export const addCategory = (category: ICategory) => {
    return async (dispatch: AppDispatch) => {
        try{
            const data = await userService.addCategory(category)
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

export const addLabel = (label: ILabel) => {
    return async (dispatch: AppDispatch) => {
        try{
            const data = await userService.addLabel(label)
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