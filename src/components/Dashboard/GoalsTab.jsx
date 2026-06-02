import { useState, useEffect } from 'react'
import { getGoals, upsertGoal, deleteGoal, toggleGoal } from '../../supabase'

function AddForm({ onSave, onCancel, placeholder = 'Upiši cilj...' }) {
  const [title, setTitle] = useState('')
  return (
    <div className="flex gap-2 mt-2">
      <input
        autoFocus
        value={title}
        onChange={e => setTitle(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter' && title.trim()) { onSave(title.trim()); setTitle('') } if (e.key === 'Escape') onCancel() }}
        placeholder={placeholder}
        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-violet-500/50 transition-all placeholder-white/25"
      />
      <button onClick={() => { if (title.trim()) { onSave(title.trim()); setTitle('') } }}
        className="px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm rounded-xl transition-all">
        Dodaj
      </button>
      <button onClick={onCancel} className="px-3 py-2.5 text-white/30 hover:text-white transition-colors text-sm">
        ✕
      </button>
    </div>
  )
}

export default function GoalsTab({ userId, isPosao }) {
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [addingMain, setAddingMain] = useState(false)
  const [addingMedium, setAddingMedium] = useState(null)
  const [addingSmall, setAddingSmall] = useState(null)
  const [editingReason, setEditingReason] = useState(null)
  const [reasonText, setReasonText] = useState('')

  useEffect(() => {
    if (userId) {
      getGoals(userId).then(({ data }) => {
        setGoals(data || [])
        setLoading(false)
      })
    }
  }, [userId])

  const mainGoals = goals.filter(g => g.level === 0)
  const mediumGoals = (parentId) => goals.filter(g => g.level === 1 && g.parent_id === parentId)
  const smallGoals = (parentId) => goals.filter(g => g.level === 2 && g.parent_id === parentId)

  // Napredak
  const allSmall = goals.filter(g => g.level === 2)
  const allMedium = goals.filter(g => g.level === 1)
  const completedSmall = allSmall.filter(g => g.completed).length
  const completedMedium = allMedium.filter(g => g.completed).length
  const totalTasks = allSmall.length + allMedium.length
  const completedTasks = completedSmall + completedMedium
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
  const completedMain = mainGoals.filter(g => g.completed).length

  const addGoal = async (title, level, parentId = null) => {
    const newGoal = {
      user_id: userId,
      title,
      level,
      parent_id: parentId,
      completed: false,
      order_index: goals.filter(g => g.level === level && g.parent_id === parentId).length,
    }
    const { data } = await upsertGoal(newGoal)
    if (data) setGoals(prev => [...prev, data])
  }

  const handleToggle = async (id, completed) => {
    await toggleGoal(id, !completed)
    setGoals(prev => prev.map(g => g.id === id ? { ...g, completed: !completed } : g))
  }

  const handleDelete = async (id) => {
    const toDelete = [id, ...goals.filter(g => g.parent_id === id).map(g => g.id)]
    // Brisi i decu
    const childrenOfChildren = goals.filter(g => toDelete.includes(g.parent_id)).map(g => g.id)
    const allToDelete = [...new Set([...toDelete, ...childrenOfChildren])]
    for (const did of allToDelete) await deleteGoal(did)
    setGoals(prev => prev.filter(g => !allToDelete.includes(g.id)))
  }

  const saveReason = async (goalId) => {
    await upsertGoal({ id: goalId, user_id: userId, reason: reasonText })
    setGoals(prev => prev.map(g => g.id === goalId ? { ...g, reason: reasonText } : g))
    setEditingReason(null)
  }

  if (!isPosao) {
    return (
      <div className="glass rounded-2xl p-8 text-center border border-white/5">
        <p className="text-white/40 text-sm">Moji ciljevi su dostupni samo za segment Posao i karijera.</p>
      </div>
    )
  }

  if (loading) return <p className="text-white/30 text-sm">Učitavanje...</p>

  return (
    <div>
      {/* Napredak */}
      {totalTasks > 0 && (
        <div className="glass rounded-2xl p-5 border border-white/5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-white font-semibold text-sm">Napredak</p>
            <div className="flex items-center gap-4 text-xs text-white/30">
              <span>{completedTasks}/{totalTasks} zadataka</span>
              {completedMain > 0 && <span className="text-green-400">{completedMain} cilj završen</span>}
            </div>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-2">
            <div className="h-full rounded-full transition-all duration-700"
              style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #7c3aed, #2563eb)' }} />
          </div>
          <p className="text-violet-400 text-xs font-medium">{progress}%</p>
        </div>
      )}

      {/* Glavni ciljevi */}
      <div className="space-y-4">
        {mainGoals.map(main => (
          <div key={main.id} className={`rounded-2xl border overflow-hidden transition-all ${main.completed ? 'border-green-500/20 bg-green-500/5' : 'glass border-white/8'}`}>

            {/* Glavni cilj header */}
            <div className="p-5">
              <div className="flex items-start gap-3">
                <button onClick={() => handleToggle(main.id, main.completed)}
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 transition-all ${main.completed ? 'bg-green-500 border-green-400' : 'border-white/25 hover:border-violet-400'}`}>
                  {main.completed && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                </button>
                <div className="flex-1">
                  <p className={`font-semibold text-base leading-snug ${main.completed ? 'line-through text-white/40' : 'text-white'}`}>{main.title}</p>

                  {/* Razlog */}
                  {main.reason && editingReason !== main.id && (
                    <button onClick={() => { setEditingReason(main.id); setReasonText(main.reason) }}
                      className="text-white/30 text-xs mt-1 hover:text-white/60 transition-colors text-left">
                      Razlog: {main.reason}
                    </button>
                  )}
                  {!main.reason && editingReason !== main.id && (
                    <button onClick={() => { setEditingReason(main.id); setReasonText('') }}
                      className="text-white/20 text-xs mt-1 hover:text-violet-400 transition-colors">
                      + Dodaj razlog zašto
                    </button>
                  )}
                  {editingReason === main.id && (
                    <div className="mt-2 flex gap-2">
                      <input autoFocus value={reasonText} onChange={e => setReasonText(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') saveReason(main.id); if (e.key === 'Escape') setEditingReason(null) }}
                        placeholder="Zašto je ovo važno tebi?"
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs outline-none focus:border-violet-500/50 transition-all placeholder-white/20" />
                      <button onClick={() => saveReason(main.id)} className="text-violet-400 text-xs hover:text-violet-300 transition-colors">Sačuvaj</button>
                    </div>
                  )}
                </div>
                <button onClick={() => handleDelete(main.id)} className="text-white/15 hover:text-red-400 transition-colors flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>

              {/* Srednji ciljevi */}
              <div className="mt-4 ml-9 space-y-3">
                {mediumGoals(main.id).map(med => (
                  <div key={med.id}>
                    <div className="flex items-start gap-2.5">
                      <button onClick={() => handleToggle(med.id, med.completed)}
                        className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center mt-0.5 transition-all ${med.completed ? 'bg-violet-500 border-violet-400' : 'border-white/20 hover:border-violet-400'}`}>
                        {med.completed && <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                      </button>
                      <p className={`flex-1 text-sm leading-snug ${med.completed ? 'line-through text-white/30' : 'text-white/70'}`}>{med.title}</p>
                      <button onClick={() => handleDelete(med.id)} className="text-white/10 hover:text-red-400 transition-colors flex-shrink-0">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>

                    {/* Mali zadaci */}
                    <div className="ml-7 mt-2 space-y-1.5">
                      {smallGoals(med.id).map(small => (
                        <div key={small.id} className="flex items-center gap-2">
                          <button onClick={() => handleToggle(small.id, small.completed)}
                            className={`flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${small.completed ? 'bg-blue-500 border-blue-400' : 'border-white/15 hover:border-blue-400'}`}>
                            {small.completed && <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                          </button>
                          <p className={`flex-1 text-xs leading-snug ${small.completed ? 'line-through text-white/25' : 'text-white/50'}`}>{small.title}</p>
                          <button onClick={() => handleDelete(small.id)} className="text-white/10 hover:text-red-400 transition-colors">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </div>
                      ))}

                      {addingSmall === med.id ? (
                        <AddForm placeholder="Mali zadatak..." onSave={t => { addGoal(t, 2, med.id); setAddingSmall(null) }} onCancel={() => setAddingSmall(null)} />
                      ) : (
                        <button onClick={() => setAddingSmall(med.id)} className="text-white/20 text-xs hover:text-blue-400 transition-colors">+ mali zadatak</button>
                      )}
                    </div>

                    {addingSmall !== med.id && smallGoals(med.id).length === 0 && null}
                  </div>
                ))}

                {addingMedium === main.id ? (
                  <AddForm placeholder="Srednji cilj..." onSave={t => { addGoal(t, 1, main.id); setAddingMedium(null) }} onCancel={() => setAddingMedium(null)} />
                ) : (
                  <button onClick={() => setAddingMedium(main.id)} className="text-white/20 text-xs hover:text-violet-400 transition-colors">+ srednji cilj</button>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Dodaj glavni cilj */}
        {addingMain ? (
          <AddForm placeholder="Tvoj glavni cilj..." onSave={t => { addGoal(t, 0); setAddingMain(false) }} onCancel={() => setAddingMain(false)} />
        ) : (
          <button onClick={() => setAddingMain(true)}
            className="w-full py-3.5 rounded-2xl border border-dashed border-white/15 text-white/30 hover:border-violet-500/40 hover:text-violet-400 transition-all text-sm">
            + Dodaj glavni cilj
          </button>
        )}
      </div>
    </div>
  )
}
