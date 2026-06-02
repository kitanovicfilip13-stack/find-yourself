import { useState, useEffect } from 'react'
import { getGoals, upsertGoal, deleteGoal, toggleGoal } from '../../supabase'
import { generateGoalBreakdown } from '../../i18n/goalTemplates'

export default function GoalsTab({ userId, isPosao }) {
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [newMainGoal, setNewMainGoal] = useState('')
  const [generating, setGenerating] = useState(false)
  const [addingSmall, setAddingSmall] = useState(null)
  const [newSmallText, setNewSmallText] = useState('')
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
  const completedTasks = [...allSmall, ...allMedium].filter(g => g.completed).length
  const totalTasks = allSmall.length + allMedium.length
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const handleAddMainGoal = async () => {
    if (!newMainGoal.trim()) return
    setGenerating(true)

    // Sačuvaj glavni cilj
    const { data: mainData } = await upsertGoal({
      user_id: userId, title: newMainGoal.trim(), level: 0, completed: false, order_index: mainGoals.length,
    })
    if (!mainData) { setGenerating(false); return }

    // Generiši breakdown
    const breakdown = generateGoalBreakdown(newMainGoal)
    const newGoals = [mainData]

    for (let mi = 0; mi < breakdown.length; mi++) {
      const med = breakdown[mi]
      const { data: medData } = await upsertGoal({
        user_id: userId, title: med.title, level: 1, parent_id: mainData.id, completed: false, order_index: mi,
      })
      if (medData) {
        newGoals.push(medData)
        for (let si = 0; si < med.tasks.length; si++) {
          const { data: smallData } = await upsertGoal({
            user_id: userId, title: med.tasks[si], level: 2, parent_id: medData.id, completed: false, order_index: si,
          })
          if (smallData) newGoals.push(smallData)
        }
      }
    }

    setGoals(prev => [...prev, ...newGoals])
    setNewMainGoal('')
    setGenerating(false)
  }

  const handleToggle = async (id, completed) => {
    await toggleGoal(id, !completed)
    setGoals(prev => prev.map(g => g.id === id ? { ...g, completed: !completed } : g))
  }

  const handleDelete = async (id) => {
    const level1Children = goals.filter(g => g.parent_id === id).map(g => g.id)
    const level2Children = goals.filter(g => level1Children.includes(g.parent_id)).map(g => g.id)
    const allToDelete = [id, ...level1Children, ...level2Children]
    for (const did of allToDelete) await deleteGoal(did)
    setGoals(prev => prev.filter(g => !allToDelete.includes(g.id)))
  }

  const addSmallTask = async (parentId) => {
    if (!newSmallText.trim()) return
    const { data } = await upsertGoal({
      user_id: userId, title: newSmallText.trim(), level: 2, parent_id: parentId, completed: false,
      order_index: smallGoals(parentId).length,
    })
    if (data) setGoals(prev => [...prev, data])
    setNewSmallText('')
    setAddingSmall(null)
  }

  const saveReason = async (goalId) => {
    await upsertGoal({ id: goalId, user_id: userId, reason: reasonText })
    setGoals(prev => prev.map(g => g.id === goalId ? { ...g, reason: reasonText } : g))
    setEditingReason(null)
  }

  if (!isPosao) {
    return (
      <div className="glass rounded-2xl p-8 text-center border border-white/5">
        <p className="text-white/40 text-sm mb-3">Plan razvoja je dostupan samo za segment Posao i karijera.</p>
        <p className="text-white/25 text-xs">Uradi karijerski test da bi otključao/la ovu funkciju.</p>
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
            <p className="text-white font-semibold text-sm">Ukupan napredak</p>
            <p className="text-white/30 text-xs">{completedTasks}/{totalTasks} zadataka završeno</p>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-1.5">
            <div className="h-full rounded-full transition-all duration-700"
              style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #7c3aed, #2563eb)' }} />
          </div>
          <p className="text-violet-400 text-xs font-medium">{progress}%</p>
        </div>
      )}

      {/* Unos novog cilja */}
      <div className="mb-6">
        <div className="flex gap-3">
          <input
            value={newMainGoal}
            onChange={e => setNewMainGoal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAddMainGoal()}
            placeholder="Napiši svoj glavni cilj... (npr. Postati marketing menadžer)"
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm outline-none focus:border-violet-500/50 transition-all placeholder-white/20"
            disabled={generating}
          />
          <button onClick={handleAddMainGoal} disabled={!newMainGoal.trim() || generating}
            className={`px-5 py-3.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
              newMainGoal.trim() && !generating
                ? 'bg-violet-600 hover:bg-violet-500 text-white'
                : 'bg-white/5 text-white/20 cursor-not-allowed'
            }`}>
            {generating ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                Generišem plan...
              </>
            ) : 'Napravi plan'}
          </button>
        </div>
        {generating && (
          <p className="text-violet-400/60 text-xs mt-2 px-1">Razlažem cilj na korake...</p>
        )}
      </div>

      {/* Lista ciljeva */}
      <div className="space-y-5">
        {mainGoals.map(main => {
          const meds = mediumGoals(main.id)
          const totalMain = meds.reduce((acc, m) => acc + smallGoals(m.id).length, 0) + meds.length
          const doneMain = meds.filter(m => m.completed).length + meds.reduce((acc, m) => acc + smallGoals(m.id).filter(s => s.completed).length, 0)
          const mainPct = totalMain > 0 ? Math.round((doneMain / totalMain) * 100) : 0

          return (
            <div key={main.id} className={`rounded-2xl border overflow-hidden ${main.completed ? 'border-green-500/20' : 'glass border-white/8'}`}>

              {/* Glavni cilj */}
              <div className="p-5 pb-3">
                <div className="flex items-start gap-3 mb-3">
                  <button onClick={() => handleToggle(main.id, main.completed)}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 transition-all ${main.completed ? 'bg-green-500 border-green-400' : 'border-white/25 hover:border-violet-400'}`}>
                    {main.completed && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                  </button>
                  <div className="flex-1">
                    <p className={`font-bold text-base leading-snug ${main.completed ? 'line-through text-white/40' : 'text-white'}`}>{main.title}</p>
                    {/* Razlog */}
                    {editingReason === main.id ? (
                      <div className="mt-2 flex gap-2">
                        <input autoFocus value={reasonText} onChange={e => setReasonText(e.target.value)}
                          onKeyDown={e => { if (e.key === 'Enter') saveReason(main.id); if (e.key === 'Escape') setEditingReason(null) }}
                          placeholder="Zašto ti je ovo važno?"
                          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs outline-none focus:border-violet-500/50 placeholder-white/20" />
                        <button onClick={() => saveReason(main.id)} className="text-violet-400 text-xs">Sačuvaj</button>
                        <button onClick={() => setEditingReason(null)} className="text-white/20 text-xs">✕</button>
                      </div>
                    ) : (
                      <button onClick={() => { setEditingReason(main.id); setReasonText(main.reason || '') }}
                        className="text-white/25 text-xs mt-1 hover:text-violet-400 transition-colors text-left">
                        {main.reason ? `Razlog: ${main.reason}` : '+ Zašto ti je ovo važno?'}
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-white/30 text-xs">{mainPct}%</span>
                    <button onClick={() => handleDelete(main.id)} className="text-white/15 hover:text-red-400 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>

                {/* Mini progress bar */}
                {totalMain > 0 && (
                  <div className="ml-9 h-1 bg-white/5 rounded-full overflow-hidden mb-4">
                    <div className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${mainPct}%`, background: 'linear-gradient(90deg, #7c3aed, #2563eb)' }} />
                  </div>
                )}
              </div>

              {/* Srednji ciljevi */}
              <div className="px-5 pb-5 space-y-4">
                {meds.map(med => (
                  <div key={med.id} className={`rounded-xl p-4 border ${med.completed ? 'border-violet-500/15 bg-violet-500/5' : 'border-white/5 bg-white/[0.02]'}`}>
                    <div className="flex items-start gap-2.5 mb-3">
                      <button onClick={() => handleToggle(med.id, med.completed)}
                        className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center mt-0.5 transition-all ${med.completed ? 'bg-violet-500 border-violet-400' : 'border-white/20 hover:border-violet-400'}`}>
                        {med.completed && <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                      </button>
                      <p className={`flex-1 text-sm font-medium leading-snug ${med.completed ? 'line-through text-white/30' : 'text-white/80'}`}>{med.title}</p>
                      <button onClick={() => handleDelete(med.id)} className="text-white/10 hover:text-red-400 transition-colors flex-shrink-0">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>

                    {/* Mali zadaci */}
                    <div className="ml-7 space-y-2">
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
                        <div className="flex gap-2 mt-1">
                          <input autoFocus value={newSmallText} onChange={e => setNewSmallText(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') addSmallTask(med.id); if (e.key === 'Escape') { setAddingSmall(null); setNewSmallText('') } }}
                            placeholder="Dodaj zadatak..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs outline-none focus:border-violet-500/50 placeholder-white/20" />
                          <button onClick={() => addSmallTask(med.id)} className="text-blue-400 text-xs hover:text-blue-300">Dodaj</button>
                          <button onClick={() => { setAddingSmall(null); setNewSmallText('') }} className="text-white/20 text-xs">✕</button>
                        </div>
                      ) : (
                        <button onClick={() => setAddingSmall(med.id)} className="text-white/20 text-xs hover:text-blue-400 transition-colors mt-1">
                          + dodaj zadatak
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {mainGoals.length === 0 && !generating && (
          <div className="glass rounded-2xl p-8 text-center border border-white/5">
            <p className="text-white/40 text-sm mb-2">Još nemaš postavljenih ciljeva.</p>
            <p className="text-white/20 text-xs">Napiši svoj glavni cilj gore i mi ćemo ti automatski napraviti plan.</p>
          </div>
        )}
      </div>
    </div>
  )
}
