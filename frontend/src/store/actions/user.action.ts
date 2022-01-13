import { IAction, ICategory, ILabel, IDateFilterBy, IDataUpdateForm, IFilterBy } from "../../interfaces/dataInterfaces"
import { ICredentials, IUpdateForm } from "../../interfaces/userInterfaces"
import { alertTitleMessage } from "../../services/alert.service"
import { userService } from "../../services/user.service"
import { AppDispatch } from "../store"

export const signup = (credentials: ICredentials) => {
    return async (dispatch: AppDispatch) => {
        try {
            const user = await userService.signup(credentials)
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
        try {
            const user = await userService.login(credentials)
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
        try {
            await userService.logout()
            dispatch({
                type: "SET_USER",
                user: null
            })
        } catch (err) {
            console.error(err)
        }
    }
}

export const deleteUser = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const data = await userService.deleteUser()
            if (data) {
                if (!data.msg) {
                    dispatch({
                        type: "SET_USER",
                        user: null
                    })
                } else {
                    alertTitleMessage(data.title, data.msg, data.type, 3500)
                }
            } else {
                alertTitleMessage('Opps, an error occurred', 'Could not delete your account, try again later', 'danger', 3500)
            }
            return data
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

export const getUser = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const data = await userService.getUser()
            if (!data?.msg) {
                dispatch({
                    type: "SET_USER",
                    user: data
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

export const updateData = (updatedData: IDataUpdateForm, filterBy: IFilterBy) => {
    return async (dispatch: AppDispatch) => {
        try {
            const data = await userService.updateData(updatedData, filterBy)
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


export const addAction = (action: IAction, filterBy: IFilterBy) => {
    return async (dispatch: AppDispatch) => {
        try {
            const data = await userService.addAction(action, filterBy)
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

export const deleteAction = (actionId: string, filterBy: IFilterBy) => {
    return async (dispatch: AppDispatch) => {
        try {
            const data = await userService.deleteAction(actionId, filterBy)
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

export const addCategory = (category: ICategory, filterBy: IFilterBy) => {
    return async (dispatch: AppDispatch) => {
        try {
            const data = await userService.addCategory(category, filterBy)
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

export const deleteCategory = (categoryId: string, filterBy: IFilterBy) => {
    return async (dispatch: AppDispatch) => {
        try {
            const data = await userService.deleteCategory(categoryId, filterBy)
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

export const addLabel = (label: ILabel, filterBy: IFilterBy) => {
    return async (dispatch: AppDispatch) => {
        try {
            const data = await userService.addLabel(label, filterBy)
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

export const deleteLabel = (labelId: string, filterBy: IFilterBy) => {
    return async (dispatch: AppDispatch) => {
        try {
            const data = await userService.deleteLabel(labelId, filterBy)
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