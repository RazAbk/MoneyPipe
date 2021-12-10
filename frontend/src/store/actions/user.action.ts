import { IAction, ICategory, ILabel, IDateFilterBy, IDataUpdateForm } from "../../interfaces/dataInterfaces"
import { ICredentials, IUpdateForm } from "../../interfaces/userInterfaces"
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


export const getData = (filterBy: IDateFilterBy) => {
    return async (dispatch: AppDispatch) => {
        try {
            const data = await userService.getData(filterBy)
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

export const updateUser = (updatedUser: IUpdateForm) => {
    return async (dispatch: AppDispatch) => {
        try {
            const data = await userService.updateUser(updatedUser)
            if (!data.msg) {
                dispatch({
                    type: "SET_USER",
                    data
                })
            } else {
                alertTitleMessage(data.title, data.msg, data.type, 3500)
            }
        } catch (err) {
            console.error(err)
        }
    }
}

export const updateData = (updatedData: IDataUpdateForm) => {
    return async (dispatch: AppDispatch) => {
        try {
            const data = await userService.updateData(updatedData)
            if(!data.msg){

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
            if (!data.msg) {
                dispatch({
                    type: "SET_DATA",
                    data
                })
            } else {
                alertTitleMessage(data.title, data.msg, data.type, 3500)
            }
        } catch (err) {
            console.error(err)
        }
    }
}

export const addCategory = (category: ICategory) => {
    return async (dispatch: AppDispatch) => {
        try {
            const data = await userService.addCategory(category)
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

export const deleteCategory = (categoryId: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const data = await userService.deleteCategory(categoryId)
            if (data) {
                if (!data.msg) {
                    dispatch({
                        type: "SET_DATA",
                        data
                    })
                } else {
                    alertTitleMessage(data.title, data.msg, data.type, 3500)
                }
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
            if (!data.msg) {
                dispatch({
                    type: "SET_DATA",
                    data
                })
                return data
            } else {
                alertTitleMessage(data.title, data.msg, data.type, 3500)
                return null
            }
        } catch (err) {
            console.error(err)
        }
    }
}

export const deleteLabel = (labelId: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const data = await userService.deleteLabel(labelId)
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