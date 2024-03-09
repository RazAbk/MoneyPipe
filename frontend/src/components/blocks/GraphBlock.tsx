import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { IDataObject, IFilterBy } from '../../interfaces/dataInterfaces';
import { dateService } from '../../services/date.service';

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

export const GraphBlock = () => {

    const rawData: IDataObject = useSelector((state: RootState) => state.userModule.data)
    const filterBy: IFilterBy = useSelector((state: RootState) => state.appStateModule.filterBy)

    const [graphData, setGraphData] = useState<any>(null)

    useEffect(() => {
        if (!rawData) return

        // Get the amount of days => endDate - startDate
        const daysPeriod = dateService.calculatePeriodDays(filterBy.startDate, filterBy.endDate)

        // Initializing the graph's Data
        const expensesDataset: any = {
            data: [],
            borderColor: '#c41f02',
            backgroundColor: '#eb2300',
        }

        const incomesDataset: any = {
            data: [],
            borderColor: '#18b50d',
            backgroundColor: '#0ecf00',
        }

        const investmentsDataset: any = {
            data: [],
            borderColor: '#f78b08',
            backgroundColor: '#f78b08',
        }

        let timePoints: string[] = []
        let timeStamps: number[] = []

        // Calculating the graph's timePoints (X axis) and timeStamps according to them
        // For different days periods, the calculations and data is shown differently
        if (daysPeriod <= 1) {
            timePoints = ['00:00', '06:00', '12:00', '18:00', '23:59']
            timeStamps = timePoints.map(timePoint => dateService.getDayTimestampByHour(filterBy.startDate, timePoint))

        } else if (daysPeriod <= 31) {
            const timeData = dateService.getDaysTimeData(daysPeriod, filterBy)
            timePoints = timeData.timePoints
            timeStamps = timeData.timeStamps

        } else if (daysPeriod <= 3650) {
            const timeData = dateService.getMonthsTimeData(filterBy)
            timePoints = timeData.timePoints
            timeStamps = timeData.timeStamps

        } else if (daysPeriod > 3650) {
            const timeData = dateService.getYearsTimeData(filterBy)
            timePoints = timeData.timePoints
            timeStamps = timeData.timeStamps

        }

        // No Data
        if (timePoints.length === 0) {
            setGraphData(null)
        } else {
            // Initialize with amounts of 0 for each time point in the graph
            expensesDataset.data = timeStamps.map(timeStamp => 0)
            incomesDataset.data = [...expensesDataset.data]
            investmentsDataset.data = [...expensesDataset.data]

            rawData.actions.filter(action => {
                if (!!filterBy.categories?.length && filterBy.categories.every((category: string) => category !== action.category)) return false
                if (!!filterBy.labels?.length && !action.labels.some((label: string) => filterBy.labels.includes(label))) return false
                if (!action.description.includes(filterBy.searchTxt)) return false
                return true
            }).forEach(action => {
                timeStamps.forEach((timeStamp, idx, timeStamps) => {
                    if (action.createdAt >= timeStamp) {
                        if (idx === timeStamps.length - 1) {
                            if (action.createdAt <= Date.now()) {
                                switch (action.type) {
                                    case 'expense':
                                        expensesDataset.data[idx] += +action.amount
                                        break;
                                    case 'income':
                                        incomesDataset.data[idx] += +action.amount
                                        break;
                                    case 'investment':
                                        investmentsDataset.data[idx] += +action.amount
                                        break;
                                }
                            }
                        } else if (action.createdAt <= (timeStamps[idx + 1])) {
                            switch (action.type) {
                                case 'expense':
                                    expensesDataset.data[idx] += +action.amount
                                    break;
                                case 'income':
                                    incomesDataset.data[idx] += +action.amount
                                    break;
                                case 'investment':
                                    investmentsDataset.data[idx] += +action.amount
                                    break;
                            }
                        }
                    }
                })
            })

            setGraphData({
                labels: timePoints,
                datasets: [expensesDataset, incomesDataset, investmentsDataset]
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
