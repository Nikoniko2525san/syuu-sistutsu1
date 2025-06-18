'use client'
import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import Form from '../components/Form'
import List from '../components/List'
import Filter from '../components/Filter'
import ChartComp from '../components/ChartComp'

export default function Home() {
  const [records, setRecords] = useState<RecordType[]>([])
  const [filter, setFilter] = useState<FilterType>({ mode: 'all', start: '', end: '' })

  useEffect(() => {
    const saved = localStorage.getItem('records')
    if (saved) setRecords(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('records', JSON.stringify(records))
  }, [records])

  const addRecord = (rec: Omit<RecordType, 'id'>) => {
    setRecords(prev => [...prev, { ...rec, id: Date.now() }])
  }

  const updateRecord = (updated: RecordType) => {
    setRecords(prev => prev.map(r => (r.id === updated.id ? updated : r)))
  }

  const deleteRecord = (id: number) => {
    setRecords(prev => prev.filter(r => r.id !== id))
  }

  const clearRange = () => {
    const filtered = applyFilter().filter(r => false)
    setRecords(prev => prev.filter(r => !applyFilter().find(x => x)))
  }

  const applyFilter = () => {
    let arr = [...records]
    const now = dayjs()
    if (filter.mode === '1week') arr = arr.filter(r => dayjs(r.date).isAfter(now.subtract(7, 'day')))
    else if (filter.mode === '1month') arr = arr.filter(r => dayjs(r.date).isAfter(now.subtract(1, 'month')))
    else if (filter.mode === 'custom' && filter.start && filter.end)
      arr = arr.filter(r => dayjs(r.date).isBetween(filter.start, filter.end, null, '[]'))
    return arr
  }

  const visible = applyFilter()
  const incomeSum = visible.filter(r => r.type === 'income').reduce((a,b)=>a+b.amount, 0)
  const expenseSum = visible.filter(r => r.type === 'expense').reduce((a,b)=>a+b.amount, 0)

  return (
    <div className="relative min-h-screen overflow-hidden">
      <iframe className="absolute inset-0 w-full h-full pointer-events-none" src="https://www.youtube.com/embed/FtutLA63Cp8?autoplay=1&mute=1&loop=1&playlist=FtutLA63Cp8&controls=0&showinfo=0&disablekb=1&modestbranding=1"></iframe>
      <div className="relative p-4 bg-white/80">
        <h1 className="text-xl font-bold mb-4">収支出表</h1>
        <Form onAdd={addRecord} />
        <Filter filter={filter} setFilter={setFilter} incomeSum={incomeSum} expenseSum={expenseSum} onClear={clearRange} />
        <ChartComp data={visible} />
        <List records={visible} onDelete={deleteRecord} onUpdate={updateRecord} />
      </div>
    </div>
  )
}
