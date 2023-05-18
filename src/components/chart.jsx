import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Title,
    Legend
} from 'chart.js';
import { Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from 'react-redux'
import { attempts_Number, earnPoints_Number, flagResult, earnPoints_Percent } from '../helper/helper'

import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
    ArcElement,
    Tooltip,
    Title,
    Legend
);

export default function chart() {

    const dispatch = useDispatch()
    const { questions: { queue, answers }, result: { result, userId } } = useSelector(state => state)

    const totalPoints = queue.length /* Possible earn points */
    const earnPoints = earnPoints_Number(result, answers, 1) /* Number of earned points */

    const [chartData, setChartData] = useState({
        datasets: [],
    })

    const [chartOptions, setChartOptions] = useState({})

    useEffect(() => {
        setChartData({
            labels: ["YES", "NO"],
            datasets: [
                {
                    label: "Count",
                    data: [earnPoints, totalPoints - earnPoints],
                    borderColor: ["rgb(22, 163, 74)", "rgb(220, 38, 38)"],
                    backgroundColor: ["rgb(34, 197, 94)", "rgb(239, 68, 68)"],
                    hoverOffset: 25,
                }
            ]
        });
        setChartOptions({
            responsive: true,
            layout: {
                padding: 55,
            },
            plugins: {
                legend: {
                    display: false
                },
                datalabels: {
                    display: true,
                    align: 'end',
                    anchor: 'end',
                    backgroundColor: function (context) {
                        return context.dataset.backgroundColor;
                    },
                    formatter: (value, ctx) => {
                        let sum = 0;
                        let dataArr = ctx.chart.data.datasets[0].data;
                        dataArr.map(data => {
                            sum += data;
                        });
                        let percentage = ctx.chart.data.labels[ctx.dataIndex] + " " + (value * 100 / sum).toFixed(2) + "%";
                        return percentage;
                    },
                    borderRadius: 4,
                    color: 'white',
                    font: {
                        size: 12,
                        weight: 'bold',
                    },
                    padding: 6,
                    offset: 20,
                }
            }
        })
    }, [])

    return (
        <Pie className=' max-h-[450px]' options={chartOptions} data={chartData} plugins={[ChartDataLabels]} />
    )
}
