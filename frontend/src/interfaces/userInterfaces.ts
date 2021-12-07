import { IDataObject } from "./dataInterfaces";

export interface IUser {
    _id: string,
    userName: string;
    firstName: string;
    lastName: string;
    password?: string;
    createdAt: number;
    picture: string;
    data: IDataObject;
}

export interface ICredentials {
    userName: string,
    password: string,
    firstName?: string,
    lastName?: string
}