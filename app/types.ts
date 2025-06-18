export type RecordType = {
  id: number
  date: string
  type: 'income' | 'expense'
  amount: number
  purpose: string
  place?: string
}

export type FilterType = {
  mode: 'all' | '1week' | '1month' | 'custom'
  start: string
  end: string
}
