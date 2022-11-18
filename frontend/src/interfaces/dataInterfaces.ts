export interface ILabel {
    _id: string;
    title: string;
    labelName: string;
}

export interface ICategory {
    _id: string;
    title: string;
    icon: string;
    bgColor: string;
}

export interface IAction {
    _id: string;
    type: string;
    labels: string[];
    category: string;
    description: string;
    amount: number;
    createdAt: number;
}

export interface ICurrency {
    sign: string;
    code: string;
}

export interface IDataObject {
    currency: ICurrency;
    labels: ILabel[];
    categories: ICategory[];
    actions: IAction[];
}

export interface IDataUpdateForm {
    currency?: ICurrency;
    labels?: ILabel[];
    categories?: ICategory[];
}

export interface IFilterBy {
    searchTxt: string,
    startDate: number,
    endDate: number,
    labels: string[],
    categories: string[]
}

export interface IDateFilterBy {
    startDate: number,
    endDate: number
}


export interface IDataMap {
    [key: string]: {
        sum: number,
        color: string
    }
}

export interface IPieData {
    labels: string[],
    datasets: [
        {
            label: string,
            data: number[],
            backgroundColor: string[],
            borderColor: string[],
            borderWidth: number,
        },
    ],
}

export interface IActionsData {
    [key: string]: IAction[]
}

export interface IErrorMsg {
    title?: string;
    msg: string;
    type: string;
}