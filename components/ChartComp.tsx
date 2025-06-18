'use client'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { RecordType } from '../types'
import dayjs from 'dayjs'

ChartJS.register(BarElement, CategoryScale, LinearScale)

export default function ChartComp({ data }: { data: RecordType[] }) {
  const grouped: { [date: string]: number } = {}

  data.forEach(r => {
    const d = r.date
    grouped[d] = (grouped[d] || 0) + (r.type === 'income' ? r.amount : -r.amount)
  })

  const labels = Object.keys(grouped).sort()
  const values = labels.map(d => grouped[d])

  return (
    <div className="bg-white p-4 rounded border mb-4">
      <h2 className="font-semibold mb-2">日別収支グラフ</h2>
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: '収支合計',
              data: values,
              backgroundColor: values.map(v => v >= 0 ? 'rgba(34,197,94,0.6)' : 'rgba(239,68,68,0.6)'),
            }
          ]
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: { beginAtZero: true }
          }
        }}
      />
    </div>
  )
}
