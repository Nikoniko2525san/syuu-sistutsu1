'use client'
import { FilterType } from '../types'
import dayjs from 'dayjs'

export default function Filter({
  filter,
  setFilter,
  incomeSum,
  expenseSum,
  onClear
}: {
  filter: FilterType
  setFilter: (f: FilterType) => void
  incomeSum: number
  expenseSum: number
  onClear: () => void
}) {
  return (
    <div className="bg-white p-4 mb-4 rounded border space-y-2">
      <div className="flex flex-wrap gap-2 items-center">
        <label>表示範囲:</label>
        <select value={filter.mode} onChange={e => setFilter({ ...filter, mode: e.target.value as any })} className="border px-2 py-1">
          <option value="all">全て</option>
          <option value="1week">1週間</option>
          <option value="1month">1ヶ月</option>
          <option value="custom">任意の期間</option>
        </select>

        {filter.mode === 'custom' && (
          <>
            <input type="date" value={filter.start} onChange={e => setFilter({ ...filter, start: e.target.value })} className="border px-2 py-1" />
            <span>〜</span>
            <input type="date" value={filter.end} onChange={e => setFilter({ ...filter, end: e.target.value })} className="border px-2 py-1" />
          </>
        )}

        <button onClick={onClear} className="bg-red-500 text-white px-3 py-1 rounded ml-auto">選択範囲を削除</button>
      </div>

      <div className="flex flex-wrap gap-4 text-sm mt-2">
        <div>収入合計: <span className="text-green-700 font-bold">{incomeSum.toLocaleString()}円</span></div>
        <div>支出合計: <span className="text-red-700 font-bold">{expenseSum.toLocaleString()}円</span></div>
        <div>差額: <span className="font-bold">{(incomeSum - expenseSum).toLocaleString()}円</span></div>
      </div>
    </div>
  )
}
