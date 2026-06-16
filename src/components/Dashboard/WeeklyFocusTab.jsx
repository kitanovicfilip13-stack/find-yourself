import { useState, useEffect } from 'react'
import { getGoals, toggleGoal } from '../../supabase'

function getMonday(d = new Date()) {
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(new Date(d).setDate(diff))
  return monday.toISOString().split('T')[0]
}

function formatWeek(weekStart) {
  const d = new Date(weekStart)
  const end = new Date(weekStart)
  end.setDate(end.getDate() + 6)
  const s = d.toLocaleDateString('sr-RS', { day: '2-digit', month: '2-digit' })
  const e = end.toLocaleDateString('sr-RS', { day: '2-digit', month: '2-digit' })
  return `${s} do ${e}`
}

export default function WeeklyFocusTab({ userId }) {
  const weekStart = getMonday()
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userId) {
      getGoals(userId).then(({ data }) => {
        setGoals(data || [])
        setLoading(false)
      })
    }
  }, [userId])

  // Automatski biramo 3 zadatka: prioritet mali nedovršeni, pa srednji nedovršeni
  const pickFocus = () => {
    const small = goals.filter(g => g.level === 2 && !g.completed)
    const medium = goals.filter(g => g.level === 1 && !g.completed)
    const pool = [...small, ...medium]

    // Ako ima rok, prioritet njima
    const withDeadline = pool.filter(g => g.deadline).sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    const withoutDeadline = pool.filter(g => !g.deadline)

    return [...withDeadline, ...withoutDeadline].slice(0, 3)
  }

  const focus = pickFocus()
  const completed = focus.filter(g => g.completed).length
  const progress = focus.length > 0 ? Math.round((completed / focus.length) * 100) : 0

  // Pronađi roditeljski cilj za kontekst
  const getParentTitle = (task) => {
    if (task.level === 2) {
      const parent = goals.find(g => g.id === task.parent_id)
      const grandParent = parent ? goals.find(g => g.id === parent.parent_id) : null
      return grandParent?.title || parent?.title || null
    }
    if (task.level === 1) {
      return goals.find(g => g.id === task.parent_id)?.title || null
    }
    return null
  }

  const handleToggle = async (id, completed) => {
    await toggleGoal(id, !completed)
    setGoals(prev => prev.map(g => g.id === id ? { ...g, completed: !completed } : g))
  }

  if (loading) return <p className="text-white/30 text-sm">Učitavanje...</p>

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-white">Nedeljni fokus</h2>
        {focus.length > 0 && <p className="text-violet-400 text-sm font-semibold">{progress}%</p>}
      </div>
      <p className="text-white/30 text-sm mb-6">Nedelja: {formatWeek(weekStart)}</p>

      {focus.length > 0 && (
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-8">
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #7c3aed, #2563eb)' }} />
        </div>
      )}

      {focus.length === 0 ? (
        <div className="glass rounded-2xl p-8 text-center border border-white/5">
          <p className="text-white/40 text-sm mb-2">Nema aktivnih zadataka.</p>
          <p className="text-white/20 text-xs">Dodaj ciljeve u sekciji "Moji ciljevi" i mi ćemo automatski odabrati šta da radiš ove nedelje.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {focus.map((task, i) => {
            const parentTitle = getParentTitle(task)
            return (
              <div key={task.id}
                className={`rounded-2xl p-5 border transition-all ${task.completed ? 'border-green-500/20 bg-green-500/5' : 'glass border-white/8'}`}>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5"
                    style={{ background: task.completed ? '#10b98120' : 'rgba(124,58,237,0.15)', color: task.completed ? '#10b981' : '#8b5cf6' }}>
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    {parentTitle && (
                      <p className="text-white/25 text-xs mb-1 uppercase tracking-wide">{parentTitle}</p>
                    )}
                    <p className={`text-sm font-medium leading-snug ${task.completed ? 'line-through text-white/30' : 'text-white'}`}>
                      {task.title}
                    </p>
                    {task.deadline && (
                      <p className="text-white/25 text-xs mt-1">
                        Rok: {new Date(task.deadline).toLocaleDateString('sr-RS', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                      </p>
                    )}
                  </div>
                  <button onClick={() => handleToggle(task.id, task.completed)}
                    className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center mt-0.5 transition-all ${task.completed ? 'bg-green-500 border-green-400' : 'border-white/25 hover:border-violet-400'}`}>
                    {task.completed && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {completed === focus.length && focus.length > 0 && (
        <div className="mt-6 p-5 rounded-2xl border border-green-500/20 bg-green-500/5 text-center">
          <p className="text-green-400 font-semibold text-sm mb-1">Odlično, završio/la si sve ovonedeljne zadatke</p>
          <p className="text-white/30 text-xs">Nova selekcija sledeći ponedeljak.</p>
        </div>
      )}

      <p className="text-white/15 text-xs text-center mt-6">
        Zadaci su automatski odabrani na osnovu tvojih ciljeva i rokova.
      </p>
    </div>
  )
}
