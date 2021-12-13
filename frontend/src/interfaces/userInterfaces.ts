import { IDataObject } from "./dataInterfaces";

export interface IUser {
    _id: string,
    userName: string;
    firstName: string;
    lastName: string;
    password?: string;
    createdAt: number;
    picture: string;
    isGoogle: boolean;
    data?: IDataObject;
}

export interface ICredentials {
    userName: string,
    password: string,
    firstName?: string,
    lastName?: string,
    picture?: string,
    isGoogle: boolean
}

export interface IUpdateForm {
    firstName?: string,
    lastName?: string,
    password?: string,
    picture?: string
}