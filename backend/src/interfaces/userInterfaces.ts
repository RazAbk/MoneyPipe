import { IAction, ICategory, ILabel } from "./dataInterfaces";

export interface ICredentials {
    userName: string,
    password: string,
    firstName?: string,
    lastName?: string
}

export interface IUser {
        _id: string,
        userName: string,
        password: string,
        firstName: string,
        lastName: string,
        createdAt: number,
        picture: string,
        data: {
            currencySign: string,
            labels: ILabel[],
            categories: ICategory[],
            actions: IAction[]
        }
}