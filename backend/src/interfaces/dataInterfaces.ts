export interface ILabel {
    _id: string,
    title: string,
    labelName: string
}

export interface ICategory {
    _id: string,
    title: string,
    icon: string,
    bgColor: string
}

export interface IAction {
    _id: string,
    type: string,
    labels: string[],
    category: string,
    description: string,
    amount: number,
    createdAt: number
}

export interface IDateFilterBy {
    startDate: number,
    endDate: number
}

export interface IErrorMsg {
    title?: string;
    msg: string;
    type: string;
}