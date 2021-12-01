import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { IDataObject } from '../interfaces/dataInterfaces';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        }
    }
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
    labels,
    datasets: [
        {
            data: labels.map(() => Math.random()),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            data: labels.map(() => Math.random()),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

interface IGraphBlockProps {
}

export const GraphBlock = ({}: IGraphBlockProps) => {

    const rawData: IDataObject = useSelector((state: RootState) => state.userModule.data)

    // const data = {
    //     labels: 
    // }

    return (
        <div className="graph-block">
            {/* <Line data={dataMap} options={options}/> */}
            <Line options={options} data={data} className="graph"/>
        </div>
    )
}
