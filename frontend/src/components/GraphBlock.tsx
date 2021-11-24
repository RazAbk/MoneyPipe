import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IDataMap, IDataObject, IPieData } from '../interfaces/dataInterfaces'
import { RootState } from '../store/store'
import { Line } from 'react-chartjs-2'

const options: any = {
    legend: {
        display: true,
        position: "right"
    },
    scales: {
        yAxes: [
            {
                scaleLabel: {
                    display: true
                },
                ticks: {
                    display: true,
                    minRotation: 0
                }
            }
        ],
        xAxes: [
            {
                gridLines: {
                    display: false
                },
                scaleLabel: {
                    display: true
                },
                ticks: {
                    display: true,
                    minRotation: 90
                }
            }
        ]
    }
};

export const GraphBlock = () => {

    const rawData: IDataObject = useSelector((state: RootState) => state.userModule.data)

    // const data = {
    //     labels: 
    // }
    
    return (
        <div className="graph-block">
            Graph:
            {/* <Line data={dataMap} options={options}/> */}
        </div>
    )
}
