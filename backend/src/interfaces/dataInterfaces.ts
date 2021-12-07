export interface ILabel {
    title: string,
    labelName: string
}

export interface ICategory {
    title: string,
    icon: string,
    bgColor: string
}

export interface IAction {
    _id: string,
    type: string,
    labels: ILabel[],
    category: string,
    description: string,
    amount: number,
    createdAt: number
}

export interface IDateFilterBy {
    startDate: number,
    endDate: number
}
