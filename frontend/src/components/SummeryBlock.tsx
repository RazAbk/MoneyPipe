import React, { SetStateAction, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IActionsData, IDataMap, IDataObject, IPieData } from '../interfaces/dataInterfaces'
import { RootState } from '../store/store'
import { Pie } from 'react-chartjs-2';
import { BsFillSquareFill } from 'react-icons/bs'
import { ActionPreview } from './ActionPreview';

interface ISummeryBlockProps {
    type: string;
    setActionAddEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const options = {
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        }
    },
    scale: {
        ticks: {
            precision: 0
        },
    },
    aspectRatio: 1,
}

export const SummeryBlock = ({ type, setActionAddEditModalOpen }: ISummeryBlockProps) => {

    const rawData: IDataObject = useSelector((state: RootState) => state.userModule.data)
    const currentViewMode = useSelector((state: RootState) => state.appStateModule.currentViewMode)
    const filterBy = useSelector((state: RootState) => state.appStateModule.filterBy)

    const [dataMap, setDataMap] = useState<IDataMap | null>(null)
    const [pieData, setPieData] = useState<IPieData | null>(null)
    const [actionsData, setActionsData] = useState<IActionsData | null>(null)

    useEffect(() => {
        if (rawData) {
            let acc: IDataMap = {}

            setDataMap(rawData.actions.reduce((dataMap, action) => {
                if (action.type !== type) return dataMap
                if (action.createdAt < filterBy.startDate || action.createdAt > filterBy.endDate) return dataMap
                if (filterBy.category && action.category !== filterBy.category) return dataMap
                if (filterBy.label && !action.labels.includes(filterBy.label)) return dataMap
                if (!action.description.includes(filterBy.searchTxt)) return dataMap

                if (dataMap[action.category]) {
                    dataMap[action.category].sum += +action.amount
                } else {
                    dataMap[action.category] = {
                        sum: +action.amount,
                        color: rawData.categories.find(category => category.title === action.category)?.bgColor || "#white"
                    }
                }

                return dataMap
            }, acc))


            const actionsObj: any = {}

            rawData.actions.filter(action => {
                if (action.type !== type) return false
                if (action.createdAt < filterBy.startDate || action.createdAt > filterBy.endDate) {console.log(filterBy.endDate - action.createdAt); return false}
                if (filterBy.category && action.category !== filterBy.category) return false
                if (filterBy.label && !action.labels.includes(filterBy.label)) return false
                if (!action.description.includes(filterBy.searchTxt)) return false
                return true
            }).forEach(action => {
                const date = new Date(action.createdAt)
                const dateStr = `${date.getMonth() + 1}/${date.getFullYear()}`
                if (actionsObj[dateStr]) actionsObj[dateStr].push(action)
                else {
                    actionsObj[dateStr] = [action]
                }
            })
            setActionsData(actionsObj)
        }
    }, [rawData, filterBy, type])

    useEffect(() => {
        if (dataMap) {
            setPieData({
                labels: Object.keys(dataMap),
                datasets: [
                    {
                        label: '',
                        data: Object.values(dataMap).map((action: any) => action.sum),
                        backgroundColor: Object.values(dataMap).map((action: any) => action.color),
                        borderColor: Object.values(dataMap).map(() => 'rgba(0, 0, 0, 1)'),
                        borderWidth: 1,
                    },
                ],
            })
        }
    }, [dataMap])

    return (
        <div className="summery-blocks keen-slider__slide">
            {currentViewMode === 'Summery' &&
                <div className="summery-block">
                    <h2 className="summery-block-title">{type === 'expense' ? 'Expenses' : 'Incomes'}</h2>
                    {(pieData && pieData.labels.length === 0) && <h2 className="no-data-title">No data to display</h2>}
                    {pieData && <Pie data={pieData} options={options} className="pie" />}

                    <div className="summery-block-details">
                        {dataMap && Object.entries(dataMap).map(action => {
                            return <div key={action[0] + action[1].sum + Math.random()} className="action-details">
                                <div className="left-side">
                                    <div className="action-color-dot" style={{ backgroundColor: action[1].color }}></div>
                                    <h2>{action[0]}</h2>
                                </div>
                                <div className="right-side">
                                    <h2>{action[1].sum}{rawData.currencySign}</h2>
                                </div>
                            </div>
                        })}
                    </div>
                    {pieData && <h2 className="summery-block-total" style={{color: type === 'expense' ? '#8A0000' : '#00600F'}}>
                                    {pieData?.datasets[0].data.reduce((sum, expense) => {
                                        sum += expense
                                        return sum
                                    }, 0).toLocaleString()}{rawData.currencySign}
                                </h2>
                    }
                </div>
            }
            <div className="actions-block">
                {(actionsData && Object.entries(actionsData).length === 0) && <h2 className="no-data-title">No data to display</h2>}
                {actionsData && Object.entries(actionsData).map(month => {
                    return (
                        <React.Fragment key={`${month[0]}-${type}`}>
                            <h3 className="actions-month">{month[0]}</h3>
                            {
                                month[1].sort((a, b) => b.createdAt - a.createdAt).map(action => <ActionPreview key={action._id} action={action} setActionAddEditModalOpen={setActionAddEditModalOpen} />)
                            }
                        </React.Fragment>
                    )
                })}
            </div>
        </div>
    )
}
