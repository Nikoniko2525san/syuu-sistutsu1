'use client'
import { useState } from 'react'
import dayjs from 'dayjs'
import { RecordType } from '../types'

export default function Form({ onAdd }: { onAdd: (r: Omit<RecordType, 'id'>) => void }) {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [type, setType] = useState<'income' | 'expense'>('expense')
  const [amount, setAmount] = useState('')
  const [purpose, setPurpose] = useState('')
  const [place, setPlace] = useState('')

  const handleSubmit = () => {
    if (!amount || !purpose) return
    onAdd({ date, type, amount: Number(amount), purpose, place })
    setAmount('')
    setPurpose('')
    setPlace('')
  }

  return (
    <div className="mb-4 space-y-2">
      <input type="date" value={date} onChange={e => setDate(e.target.value)} className="border px-2 py-1" />
      <select value={type} onChange={e => setType(e.target.value as any)} className="border px-2 py-1">
        <option value="income">収入</option>
        <option value="expense">支出</option>
      </select>
      <input type="number" placeholder="金額" value={amount} onChange={e => setAmount(e.target.value)} className="border px-2 py-1" />
      <input type="text" placeholder="用途" value={purpose} onChange={e => setPurpose(e.target.value)} className="border px-2 py-1" />
      <input type="text" placeholder="購入場所（任意）" value={place} onChange={e => setPlace(e.target.value)} className="border px-2 py-1" />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-1 rounded">追加</button>
    </div>
  )
}
