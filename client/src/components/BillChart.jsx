import React from 'react'
import {Paper, Grid} from '@mui/material'
import * as utils from '../middleware/utils'
import {
    Chart as ChartJS, CategoryScale,
    LinearScale, BarElement, LineElement,
    Title, Tooltip, Legend
} from 'chart.js'

import {Bar} from 'react-chartjs-2';

ChartJS.register(
    BarElement, LineElement,
    CategoryScale, LinearScale,
    Title, Tooltip, Legend
)
export default function BillChart({bill}) {

    const DailyCost = () => {
        return {
            labels: bill?.dailyUsage.map(b => utils.shortDate(b.date)),
            datasets: [
                {
                    type: 'bar',
                    label: 'Daily Cost',
                    backgroundColor: '#00bcd4',
                    data:  bill?.dailyUsage.map(d => d.dailyCost)
                }
            ]
        }
    }

    const DailyKwUsed = () => {
        return {
            labels: bill?.dailyUsage.map(b => utils.shortDate(b.date)),
            datasets: [
                {
                    type: 'bar',
                    label: 'Daily Kw Used',
                    backgroundColor: '#ff1744',
                    data:  bill?.dailyUsage.map(d => d.kwhUsed)
                }
            ]
        }
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {position:'top'},
            title: {
                display: 'true',
                text: `${utils.getMonthYear(bill.billingEnd)}`
            }
        }
    }

    console.log(bill)
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
                <Paper sx={{p:2, height: '100%'}}>
                    <Bar data={DailyCost()} options={options}/>
                </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
                <Paper sx={{p:2, height: '100%'}}>
                    <Bar data={DailyKwUsed()} options={options}/>
                </Paper>
            </Grid>
        </Grid>
    )
}
