import { Line } from 'react-chartjs-2';
import EachPrice from '../interfaces/EachPrice';
import { getLabels, dataSet } from '../helper/helper';
import { Chart, CategoryScale, LineElement, PointElement, LinearScale, Tooltip, Legend } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(CategoryScale, LineElement, PointElement, LinearScale, Tooltip, Legend, zoomPlugin);

const LineChart = ({prices}: {prices: EachPrice[]}) => {

    const data = {
        labels: getLabels(prices),
        datasets: [{
            label: 'Price of Stock',
            data: dataSet(prices),
            backgroundColor: 'black',
            pointBorderColor: 'aqua',
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
        <Line className="chart" data={data} options={chartOptions} />
    )
}

export default LineChart;