import { IAction, ICategory, ILabel, IDateFilterBy } from "../../interfaces/dataInterfaces"
import { ICredentials, IUser } from "../../interfaces/userInterfaces"
import { userService } from "../../services/user.service"
import { AppDispatch } from "../store"

export const signup = (credentials: ICredentials) => {
    return async (dispatch: AppDispatch) => {
        const user = await userService.signup(credentials)
        try {
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

export const login = (credentials: ICredentials) => {
    return async (dispatch: AppDispatch) => {
        const user = await userService.login(credentials)
        try {
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

export const logout = () => {
    return async (dispatch: AppDispatch) => {
        await userService.logout()
        try{
            dispatch({
                type: "SET_USER",
                user: null
            })
        } catch (err){
            console.log(err)
        }
    }
}

export const setUser = (user: IUser) => {
    return (dispatch: AppDispatch) => {
        try{
            dispatch({
                type: "SET_USER",
                user
            })
        } catch(err) {
            console.log(err)
        }
    }
}

export const getData = (filterBy: IDateFilterBy) => {
    return async (dispatch: AppDispatch) => {
        try {
            const data = await userService.getData(filterBy)
            dispatch({
                type: "SET_DATA",
                data
            })
            return data
        } catch (err) {
            console.log(err)
        }
    }
}

export const addAction = (action: IAction) => {
    return async (dispatch: AppDispatch) => {
        try {
            const data = await userService.addAction(action)
            dispatch({
                type: "SET_DATA",
                data
            })
            return data
        } catch (err) {
            console.log(err)
        }
    }
}

export const deleteAction = (actionId: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const data = await userService.deleteAction(actionId)
            dispatch({
                type: "SET_DATA",
                data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const addCategory = (category: ICategory) => {
    return async (dispatch: AppDispatch) => {
        try {
            const data = await userService.addCategory(category)
            dispatch({
                type: "SET_DATA",
                data
            })
            return data
        } catch (err) {
            console.log(err)
        }
    }
}

export const addLabel = (label: ILabel) => {
    return async (dispatch: AppDispatch) => {
        try {
            const data = await userService.addLabel(label)
            dispatch({
                type: "SET_DATA",
                data
            })
            return data
        } catch (err) {
            console.log(err)
        }
    }
}