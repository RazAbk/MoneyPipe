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
    password?: string,
    firstName: string,
    lastName: string,
    createdAt: number,
    picture: string,
    data: {
        currency: ICurrency,
        labels: ILabel[],
        categories: ICategory[],
        actions: IAction[]
    }
}

export interface ICurrency {
    sign: string;
    code: string;
}

export interface IUserUpdateForm {
    firstName?: string,
    lastName?: string,
    password?: string,
    picture?: string
}

export interface IDataUpdateForm {
    currency?: ICurrency;
    labels?: ILabel[];
    categories?: ICategory[];
}