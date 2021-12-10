import { IAction, ICategory, ILabel, IDateFilterBy, IDataObject } from "../../interfaces/dataInterfaces"
import { ICredentials, IUser } from "../../interfaces/userInterfaces"
import { alertTitleMessage } from "../../services/alert.service"
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
            console.error(err);
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
            console.error(err);
        }
    }
}

export const logout = () => {
    return async (dispatch: AppDispatch) => {
        await userService.logout()
        try {
            dispatch({
                type: "SET_USER",
                user: null
            })
        } catch (err) {
            console.error(err)
        }
    }
}

export const setUser = (user: IUser) => {
    return (dispatch: AppDispatch) => {
        try {
            dispatch({
                type: "SET_USER",
                user
            })
        } catch (err) {
            console.error(err)
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
            console.error(err)
        }
    }
}

export const setData = (data: IDataObject) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch({
                type: "SET_DATA",
                data
            })
            return data
        } catch (err) {
            console.error(err)
        }
    }
}

export const addAction = (action: IAction) => {
    return async (dispatch: AppDispatch) => {
        try {
            const data = await userService.addAction(action)
            if (!data.msg) {
                dispatch({
                    type: "SET_DATA",
                    data
                })
            } else {
                alertTitleMessage(data.title, data.msg, data.type, 3500)
            }
            return data
        } catch (err) {
            console.error(err)
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
            console.error(err)
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
            console.error(err)
        }
    }
}

export const deleteCategory = (categoryId: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const data = await userService.deleteCategory(categoryId)
            if (data) {
                dispatch({
                    type: "SET_DATA",
                    data
                })
            }
            return data
        } catch (err) {
            console.error(err)
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
            console.error(err)
        }
    }
}

export const deleteLabel = (labelId: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const data = await userService.deleteLabel(labelId)
            dispatch({
                type: "SET_DATA",
                data
            })
            return data
        } catch (err) {
            console.error(err)
        }
    }
}