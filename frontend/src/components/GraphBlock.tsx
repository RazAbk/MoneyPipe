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

const returnDayTimestampByHour = (date: number, hour: string) => {
    const now = new Date(date)

    return new Date(`${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} ${hour}`).getTime()
}


export const GraphBlock = () => {

    const rawData: IDataObject = useSelector((state: RootState) => state.userModule.data)
    const filterBy: IFilterBy = useSelector((state: RootState) => state.appStateModule.filterBy)

    const [graphData, setGraphData] = useState<any>(null)


    useEffect(() => {
        if (!rawData) return

        // Get the amount of days => endDate - startDate
        const daysPeriod = utilService.calculatePeriodDays(filterBy.startDate, filterBy.endDate)
        
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

        if (daysPeriod <= 1) {
            timePoints = ['00:00', '06:00', '12:00', '18:00', '23:59']
            const timeStamps = timePoints.map(timePoint => returnDayTimestampByHour(filterBy.startDate, timePoint))

            expensesDataset.data = timeStamps.map(timeStamp => 0)
            incomesDataset.data = [...expensesDataset.data]

            rawData.actions.forEach(action => {
                timeStamps.forEach((timeStamp, idx, timeStamps) => {
                    if (idx === timeStamps.length - 1) return
                    if (action.createdAt >= timeStamp && action.createdAt <= (timeStamps[idx + 1])) {
                        if (action.type === 'expense') {
                            expensesDataset.data[idx] += +action.amount
                        } else {
                            incomesDataset.data[idx] += +action.amount
                        }
                    }
                })
            })

        } else if (daysPeriod <= 14) {
            console.log('show each day, up to 14 days')
            timePoints = ['01/12', '02/12', '03/12', '04/12', '05/12....']
        } else if (daysPeriod <= 31) {
            console.log('show weeks of month')
        } else if (daysPeriod <= 365) {
            console.log('show months of year')
        } else if (daysPeriod > 365) {
            console.log('show years')
        }

        if(timePoints.length === 0){
            setGraphData(null)
        } else {
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
