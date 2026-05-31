import React, { useState } from 'react'

export default function LensCategoryManager({ initialTypes = [], onAdd }) {
  const [types, setTypes] = useState(Array.from(new Set(initialTypes)))
  const [input, setInput] = useState('')

  const addType = () => {
    const v = input.trim()
    if (!v) return
    if (!types.includes(v)) setTypes((t) => [...t, v])
    setInput('')
    onAdd && onAdd(v)
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add lens type" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
        <button onClick={addType} className="rounded-3xl bg-primary px-4 py-2 text-sm font-semibold text-white">Add</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {types.map((t) => (
          <span key={t} className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">{t}</span>
        ))}
      </div>
    </div>
  )
}
