import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IActionsData, IDataMap, IDataObject, IPieData } from '../../interfaces/dataInterfaces'
import { RootState } from '../../store/store'
import { Pie } from 'react-chartjs-2';
import { ActionPreview } from '../ActionPreview';
import { utilService } from '../../services/util.service';
import { dateService } from '../../services/date.service';
import { Loader } from '../Loader';

interface ISummeryBlockProps {
    type: string;
    setActionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const options = {
    maintainAspectRatio: true,
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

export const SummeryBlock = ({ type, setActionModalOpen }: ISummeryBlockProps) => {

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
                if (filterBy.category && action.category !== filterBy.category) return dataMap
                if (filterBy.label && !action.labels.includes(filterBy.label)) return dataMap
                if (!action.description.includes(filterBy.searchTxt)) return dataMap

                if (dataMap[action.category]) {
                    dataMap[action.category].sum += +action.amount
                } else {
                    dataMap[action.category] = {
                        sum: +action.amount,
                        color: rawData.categories.find(category => category.title === action.category)?.bgColor || "#ffffff"
                    }
                }

                return dataMap
            }, acc))


            const actionsObj: any = {}

            rawData.actions.filter(action => {
                if (action.type !== type) return false
                if (filterBy.category && action.category !== filterBy.category) return false
                if (filterBy.label && !action.labels.includes(filterBy.label)) return false
                if (!action.description.includes(filterBy.searchTxt)) return false
                return true
            }).sort((a, b) => b.createdAt - a.createdAt).forEach(action => {
                const date = new Date(action.createdAt)
                const dateStr = `${utilService.getFormatedDigits(date.getMonth() + 1)}/${dateService.getShortYear(date.getFullYear())}`
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
            const labels = Object.entries(dataMap).sort((a,b) => b[1].sum - a[1].sum).map((data: any) => data[0])
            const data = Object.entries(dataMap).sort((a,b) => b[1].sum - a[1].sum).map((data: any) => data[1].sum)
            const backgroundColors = Object.entries(dataMap).sort((a,b) => b[1].sum - a[1].sum).map((data: any) => data[1].color)
            
            setPieData({
                labels: labels,
                datasets: [
                    {
                        label: '',
                        data: data,
                        backgroundColor: backgroundColors,
                        borderColor: Object.values(dataMap).map(() => 'rgba(0, 0, 0, 1)'),
                        borderWidth: 1,
                    },
                ],
            })
        }
    }, [dataMap])

    if (!rawData) return <Loader />

    return (
        <div className="summery-blocks">
            {currentViewMode === 'Summery' &&
                <div className="summery-block">
                    <h2 className="summery-block-title">{type === 'expense' ? 'Expenses' : 'Incomes'}</h2>
                    {(pieData && pieData.labels.length === 0) && <h2 className="no-data-title">No data to display</h2>}
                    {pieData && <div className="pie"><Pie data={pieData} options={options} /></div> }

                    <div className="summery-block-details">
                        {dataMap && Object.entries(dataMap).sort((a, b) => b[1].sum - a[1].sum).map(action => {
                            return <div key={action[0] + action[1].sum + Math.random()} className="action-details">
                                <div className="action-color-dot" style={{ backgroundColor: action[1].color }}></div>
                                <h2 className="category">{action[0]}</h2>
                                <div className="sum"><h2>{Math.round(action[1].sum).toLocaleString()}{rawData.currency.sign}</h2></div>
                            </div>
                        })}
                    </div>
                    {pieData && <h2 className="summery-block-total" style={{ color: type === 'expense' ? '#8A0000' : '#00600F' }}>
                        {Math.round(pieData?.datasets[0].data.reduce((sum, expense) => {
                            sum += expense
                            return sum
                        }, 0)).toLocaleString()}{rawData.currency.sign}
                    </h2>
                    }
                </div>
            }
            <div className="actions-block">
                {(actionsData && Object.entries(actionsData).length === 0) && <h2 className="no-data-title">No data to display</h2>}
                {actionsData && Object.entries(actionsData).map(month => {
                    return (
                        <React.Fragment key={`${month[0]}-${type}`}>
                            <h3 className="actions-month">{`${month[0]} - ${Math.round(month[1].reduce((sum, action) => { sum += +action.amount; return sum }, 0)).toLocaleString()}${rawData.currency.sign}`}</h3>
                            {
                                month[1].sort((a, b) => b.createdAt - a.createdAt).map(action => <ActionPreview key={action._id} action={action} setActionModalOpen={setActionModalOpen} />)
                            }
                        </React.Fragment>
                    )
                })}
            </div>
        </div>
    )
}
