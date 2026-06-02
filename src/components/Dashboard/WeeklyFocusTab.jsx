import { useState, useEffect } from 'react'
import { getWeeklyFocus, upsertWeeklyFocus, deleteWeeklyFocus, toggleWeeklyFocus } from '../../supabase'

function getMonday(d = new Date()) {
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(d.setDate(diff))
  return monday.toISOString().split('T')[0]
}

function getSunday(weekStart) {
  const d = new Date(weekStart)
  d.setDate(d.getDate() + 6)
  return d.toLocaleDateString('sr-RS', { day: '2-digit', month: '2-digit' })
}

function formatWeek(weekStart) {
  const d = new Date(weekStart)
  const start = d.toLocaleDateString('sr-RS', { day: '2-digit', month: '2-digit' })
  const end = getSunday(weekStart)
  return `${start} — ${end}`
}

export default function WeeklyFocusTab({ userId }) {
  const weekStart = getMonday()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [newText, setNewText] = useState('')
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    if (userId) {
      getWeeklyFocus(userId, weekStart).then(({ data }) => {
        setItems(data || [])
        setLoading(false)
      })
    }
  }, [userId])

  const completed = items.filter(i => i.completed).length
  const progress = items.length > 0 ? Math.round((completed / items.length) * 100) : 0

  const addItem = async () => {
    if (!newText.trim() || items.length >= 3) return
    const { data } = await upsertWeeklyFocus({
      user_id: userId,
      title: newText.trim(),
      completed: false,
      week_start: weekStart,
    })
    if (data) setItems(prev => [...prev, data])
    setNewText('')
    setAdding(false)
  }

  const handleToggle = async (id, completed) => {
    await toggleWeeklyFocus(id, !completed)
    setItems(prev => prev.map(i => i.id === id ? { ...i, completed: !completed } : i))
  }

  const handleDelete = async (id) => {
    await deleteWeeklyFocus(id)
    setItems(prev => prev.filter(i => i.id !== id))
  }

  if (loading) return <p className="text-white/30 text-sm">Učitavanje...</p>

  return (
    <div>
      {/* Header nedelje */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Nedeljni fokus</h2>
          <p className="text-white/30 text-sm">Nedelja: {formatWeek(weekStart)}</p>
        </div>
        {items.length > 0 && (
          <div className="text-right">
            <p className="text-violet-400 text-sm font-semibold">{progress}%</p>
            <p className="text-white/25 text-xs">{completed}/{items.length} završeno</p>
          </div>
        )}
      </div>

      {/* Progress */}
      {items.length > 0 && (
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-6">
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #7c3aed, #2563eb)' }} />
        </div>
      )}

      {/* Opis */}
      <p className="text-white/30 text-sm mb-6">
        Odaberi do <span className="text-white/50 font-medium">3 zadatka</span> na kojima ćeš se fokusirati ove nedelje. Manje je više.
      </p>

      {/* Lista */}
      <div className="space-y-3 mb-4">
        {items.map((item, i) => (
          <div key={item.id} className={`flex items-center gap-4 rounded-2xl p-5 border transition-all ${item.completed ? 'border-green-500/20 bg-green-500/5' : 'glass border-white/8'}`}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
              style={{ background: item.completed ? '#10b98120' : 'rgba(124,58,237,0.15)', color: item.completed ? '#10b981' : '#8b5cf6' }}>
              {i + 1}
            </div>
            <button onClick={() => handleToggle(item.id, item.completed)}
              className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${item.completed ? 'bg-green-500 border-green-400' : 'border-white/25 hover:border-violet-400'}`}>
              {item.completed && <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
            </button>
            <p className={`flex-1 text-sm font-medium ${item.completed ? 'line-through text-white/30' : 'text-white'}`}>{item.title}</p>
            <button onClick={() => handleDelete(item.id)} className="text-white/15 hover:text-red-400 transition-colors flex-shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        ))}
      </div>

      {/* Dodaj fokus */}
      {items.length < 3 && (
        adding ? (
          <div className="flex gap-3">
            <input autoFocus value={newText} onChange={e => setNewText(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') addItem(); if (e.key === 'Escape') { setAdding(false); setNewText('') } }}
              placeholder="Na čemu ćeš se fokusirati?"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-violet-500/50 placeholder-white/20" />
            <button onClick={addItem} disabled={!newText.trim()}
              className="px-5 py-3 bg-violet-600 hover:bg-violet-500 text-white text-sm rounded-xl transition-all disabled:opacity-30">
              Dodaj
            </button>
            <button onClick={() => { setAdding(false); setNewText('') }} className="text-white/30 hover:text-white text-sm transition-colors">✕</button>
          </div>
        ) : (
          <button onClick={() => setAdding(true)}
            className="w-full py-3.5 rounded-2xl border border-dashed border-white/15 text-white/30 hover:border-violet-500/40 hover:text-violet-400 transition-all text-sm">
            + Dodaj fokus ({3 - items.length} preostalo)
          </button>
        )
      )}

      {items.length === 3 && (
        <p className="text-white/20 text-xs text-center mt-2">Maksimum 3 fokusa nedeljno. Fokus znači birati.</p>
      )}

      {completed === items.length && items.length > 0 && (
        <div className="mt-6 p-4 rounded-2xl border border-green-500/20 bg-green-500/5 text-center">
          <p className="text-green-400 font-semibold text-sm">Odlično! Završio/la si sve fokuse ove nedelje.</p>
          <p className="text-white/30 text-xs mt-1">Nova nedelja počinje u ponedeljak.</p>
        </div>
      )}
    </div>
  )
}
