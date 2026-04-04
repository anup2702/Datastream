import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export default function LogChart({ logs }) {
    const chartData = {
        labels: ['Errors', 'Info'],
        datasets: [
            {
                label: 'Log Counts by Level',
                data: [
                    logs.filter((log) => log.level === 'error').length,
                    logs.filter((log) => log.level === 'info').length,
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'
                ],
            },
        ],
    }

    return (
        <div style={{ maxWidth: '600px', margin: '20px 0' }}>
            <Bar data={chartData} options={{ responsive: true }} />
        </div>
    )
}