'use client'
import { useState } from 'react'
import { RecordType } from '../types'

export default function List({
  records,
  onDelete,
  onUpdate
}: {
  records: RecordType[]
  onDelete: (id: number) => void
  onUpdate: (r: RecordType) => void
}) {
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState<Partial<RecordType>>({})

  const startEdit = (r: RecordType) => {
    setEditId(r.id)
    setForm({ ...r })
  }

  const saveEdit = () => {
    if (!form || !form.date || !form.purpose || form.amount == null) return
    onUpdate(form as RecordType)
    setEditId(null)
  }

  return (
    <table className="w-full text-sm bg-white mt-4">
      <thead>
        <tr className="bg-gray-200">
          <th>日付</th><th>収支</th><th>金額</th><th>用途</th><th>場所</th><th>操作</th>
        </tr>
      </thead>
      <tbody>
        {records.map(r => (
          <tr key={r.id} className="border-t">
            {editId === r.id ? (
              <>
                <td><input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} /></td>
                <td>
                  <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as any }))}>
                    <option value="income">収入</option>
                    <option value="expense">支出</option>
                  </select>
                </td>
                <td><input type="number" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: Number(e.target.value) }))} /></td>
                <td><input value={form.purpose} onChange={e => setForm(f => ({ ...f, purpose: e.target.value }))} /></td>
                <td><input value={form.place} onChange={e => setForm(f => ({ ...f, place: e.target.value }))} /></td>
                <td>
                  <button onClick={saveEdit} className="text-green-500">保存</button>
                  <button onClick={() => setEditId(null)} className="text-gray-500 ml-2">取消</button>
                </td>
              </>
            ) : (
              <>
                <td>{r.date}</td>
                <td>{r.type === 'income' ? '収入' : '支出'}</td>
                <td>{r.amount.toLocaleString()}</td>
                <td>{r.purpose}</td>
                <td>{r.place || '-'}</td>
                <td>
                  <button onClick={() => startEdit(r)} className="text-blue-500">編集</button>
                  <button onClick={() => onDelete(r.id)} className="text-red-500 ml-2">削除</button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
