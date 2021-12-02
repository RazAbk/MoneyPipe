import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { IDataObject, IFilterBy } from '../interfaces/dataInterfaces';
import { utilService } from '../services/util.service';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        }
    }
};

const _returnDayTimestampByHour = (date: number, hour: string) => {
    const now = new Date(date)

    return new Date(`${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} ${hour}`).getTime()
}

const _returnDaysTimeData = (days: number, filterBy: IFilterBy) => {
    let timePoints: string[] = []
    let timeStamps: number[] = []

    for (let i = 0; i < days; i++) {
        const date = new Date(filterBy.startDate + (86400000 * i))
        timePoints.push(`${date.getDate()}/${date.getMonth() + 1}`)
        timeStamps.push(date.getTime())
    }

    return { timePoints, timeStamps }
}

const _returnMonthsTimeData = (filterBy: IFilterBy) => {
    const firstDate = new Date(filterBy.startDate)

    let monthIdx = firstDate.getMonth() + 1
    let yearIdx = firstDate.getFullYear()

    const firstTimePoint = `${monthIdx}/${yearIdx}`

    let timePoints: string[] = [firstTimePoint]
    let timeStamps: number[] = [filterBy.startDate]

    let dateIdx = _getNextMonth(monthIdx, yearIdx)

    while (dateIdx < filterBy.endDate) {
        const date = new Date(dateIdx)
        monthIdx = date.getMonth() + 1
        yearIdx = date.getFullYear()

        timePoints.push(`${monthIdx}/${yearIdx}`)
        timeStamps.push(date.getTime() - 1000)

        dateIdx = _getNextMonth(monthIdx, yearIdx)
    }

    timeStamps.push(filterBy.endDate)

    return { timePoints, timeStamps }
}

const _getNextMonth = (month: number, year: number) => {
    month++
    if (month > 12) {
        month = 1
        year++
    }

    return utilService.getMonthStartTimeStamp(new Date(`${month}/01/${year}`))
}


export const GraphBlock = () => {

    const rawData: IDataObject = useSelector((state: RootState) => state.userModule.data)
    const filterBy: IFilterBy = useSelector((state: RootState) => state.appStateModule.filterBy)

    const [graphData, setGraphData] = useState<any>(null)


    useEffect(() => {
        if (!rawData) return

        // Get the amount of days => endDate - startDate
        const daysPeriod = utilService.calculatePeriodDays(filterBy.startDate, filterBy.endDate)

        // Initializing the graph's Data
        let expensesDataset: any = {
            data: [],
            borderColor: '#8A0000',
            backgroundColor: '#BD5D5D',
        }

        let incomesDataset: any = {
            data: [],
            borderColor: '#00600A',
            backgroundColor: '#5EAE6B',
        }

        let timePoints: string[] = []
        let timeStamps: number[] = []

        // Calculating the graph's timePoints (X axis) and timeStamps according to them
        // For different days periods, the calculations and data is shown differently
        if (daysPeriod <= 1) {
            timePoints = ['00:00', '06:00', '12:00', '18:00', '23:59']
            timeStamps = timePoints.map(timePoint => _returnDayTimestampByHour(filterBy.startDate, timePoint))

        } else if (daysPeriod <= 31) {
            const timeData = _returnDaysTimeData(daysPeriod, filterBy)
            timePoints = timeData.timePoints
            timeStamps = timeData.timeStamps
            
        } else if (daysPeriod <= 365) {
            const timeData = _returnMonthsTimeData(filterBy)
            timePoints = timeData.timePoints
            timeStamps = timeData.timeStamps

        } else if (daysPeriod > 365) {
            console.log('show years')
        }

        // No Data
        if (timePoints.length === 0) {
            setGraphData(null)
        } else {
            // Initialize with amounts of 0
            expensesDataset.data = timeStamps.map(timeStamp => 0)
            incomesDataset.data = [...expensesDataset.data]

            rawData.actions.forEach(action => {
                timeStamps.forEach((timeStamp, idx, timeStamps) => {
                    if (action.createdAt >= timeStamp) {
                        if (idx === timeStamps.length - 1) {
                            if (action.createdAt <= Date.now()) {
                                if (action.type === 'expense') {
                                    expensesDataset.data[idx] += +action.amount
                                } else {
                                    incomesDataset.data[idx] += +action.amount
                                }
                            }
                        } else if (action.createdAt <= (timeStamps[idx + 1])) {
                            if (action.type === 'expense') {
                                expensesDataset.data[idx] += +action.amount
                            } else {
                                incomesDataset.data[idx] += +action.amount
                            }
                        }
                    }
                })
            })

            setGraphData({
                labels: timePoints,
                datasets: [expensesDataset, incomesDataset]
            })
        }

    }, [rawData, filterBy])

    return (
        <div className="graph-block" style={{ justifyContent: !graphData ? 'center' : '' }}>
            {graphData && <Line redraw className="graph" options={options} data={graphData} />}
            {!graphData && <h2>No data to display</h2>}
        </div>
    )

}
