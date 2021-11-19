export interface ILabel {
    title: string;
    labelName: string;
}

export interface ICategory {
    title: string;
    icon: string;
}

export interface IAction {
    type: string;
    labels: string[];
    category: string;
    description: string;
    amount: string;
    currencySign: string;
    currency: string;
    createdAt: any;
}

export interface IDataObject {
    labels: ILabel[];
    categories: ICategory[];
    actions: IAction[];
}

export interface IFilterBy {
    searchTxt: string,
    startDate: number,
    endDate: number,
    label: string,
    category: string
}