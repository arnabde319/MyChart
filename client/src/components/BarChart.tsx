import { Bar } from 'react-chartjs-2';
import EachPrice from '../interfaces/EachPrice';
import { getLabels, dataSet } from '../helper/helper';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, zoomPlugin);

const BarChart = ({prices}: {prices: EachPrice[]}) => {

    const data = {
        labels: getLabels(prices),
        datasets: [{
            label: 'Price of Stock',
            data: dataSet(prices),
            backgroundColor: 'aqua',
            borderColor: 'black',
            borderWidth: 1,
        }]
    }
    const chartOptions = {
        plugins: {
            zoom: {
                zoom: {
                    wheel: {
                    enabled: true,
                    },
                    pinch: {
                    enabled: true
                    },
                    mode: 'xy',
                },
                pan: {
                    enabled: true,
                    mode: 'xy',
                }
            }
        },
        legend: {
            display: true,
        },
        responsive: true,
    };

    return (
        //@ts-ignore
        <Bar data={data} options={chartOptions} />
    )
}

export default BarChart;