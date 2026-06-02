import { useState } from 'react'
import { useAuth } from '../../AuthContext'
import { computeSegmentResult } from '../../i18n/segmentScoring'
import { getTop5Schools } from '../../i18n/schoolsDB'
import AuthModal from '../Auth/AuthModal'
import { saveResultToDb } from '../../supabase'

export default function SegmentResultPage({ answers, segment, city, userInfo, onRestart, onDashboard }) {
  const { user } = useAuth()
  const [showAuth, setShowAuth] = useState(false)
  const [saved, setSaved] = useState(false)
  const result = computeSegmentResult(answers, segment)

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#080810' }}>
        <div className="text-center">
          <p className="text-white/40 mb-4">Nešto nije u redu sa rezultatima.</p>
          <button onClick={onRestart} className="text-violet-400 hover:text-white transition-colors">Pokušaj ponovo</button>
        </div>
      </div>
    )
  }

  const { primary, alternatives, scores } = result
  const top5 = getTop5Schools(segment, city, scores)

  const saveResults = async () => {
    if (!user) return
    try {
      await saveResultToDb({
        userId: user.id,
        segment,
        city,
        answers,
        resultLabel: primary?.name || null,
        userInfo,
      })
      setSaved(true)
      setTimeout(() => onDashboard?.(), 800)
    } catch {}
  }

  const handleSaveClick = () => {
    if (user) { saveResults() } else { setShowAuth(true) }
  }

  const handleAuthSuccess = () => {
    setShowAuth(false)
    saveResults()
  }
  const typeLabel = segment === 'srednja'
    ? 'Koji tip srednje škole bi ti odgovarao'
    : 'Koji tip fakulteta bi ti odgovarao'
  const recLabel = segment === 'srednja'
    ? `Preporučujemo u ${city}:`
    : `Preporučujemo u ${city}:`

  return (
    <div className="min-h-screen" style={{ background: '#080810' }}>
      {/* Top nav */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="w-6 h-6" />
          <span className="text-white/50 text-sm">Pronađi Sebe</span>
        </div>
        <button onClick={onDashboard}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm bg-violet-600 hover:bg-violet-500 transition-all">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          Moj profil
        </button>
      </div>

      <div className="px-6 py-16 max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/10 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-violet-300 text-xs font-medium tracking-wide uppercase">Tvoj rezultat je spreman</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Evo šta smo otkrili</h1>
          <p className="text-white/40">Na osnovu tvojih odgovora, ovo ti najviše odgovara.</p>
        </div>

        {/* Tip škole/fakulteta */}
        <div className="rounded-3xl overflow-hidden border border-white/8 mb-8"
          style={{ background: 'linear-gradient(145deg, #0f0f1e 0%, #0a0a18 100%)' }}>
          <div className="p-6 border-b border-white/5"
            style={{ background: `linear-gradient(135deg, ${primary.color}22 0%, transparent 100%)` }}>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-2">{typeLabel}</p>
            <h2 className="text-white font-bold text-2xl mb-1">{primary.name}</h2>
            <p style={{ color: primary.color }} className="text-sm font-medium">{primary.smer}</p>
          </div>
          <div className="p-6">
            <p className="text-white/55 text-sm leading-relaxed">{primary.desc}</p>
          </div>
        </div>

        {/* Top 5 preporuke */}
        {top5.length > 0 && (
          <div className="mb-8">
            <p className="text-white/50 text-sm font-medium mb-4">{recLabel}</p>
            <div className="space-y-2">
              {top5.map((school, i) => (
                <div key={school}
                  className={`flex items-center gap-4 rounded-2xl px-5 py-4 border transition-all ${
                    i === 0
                      ? 'border-violet-500/30 bg-violet-500/8'
                      : 'border-white/5 bg-white/[0.02]'
                  }`}>
                  <span className="text-xl font-black tabular-nums flex-shrink-0 w-6 text-center"
                    style={{ color: i === 0 ? primary.color : 'rgba(255,255,255,0.15)' }}>
                    {i + 1}
                  </span>
                  <p className={`text-sm leading-snug ${i === 0 ? 'text-white font-medium' : 'text-white/50'}`}>
                    {school}
                  </p>
                  {i === 0 && (
                    <span className="ml-auto text-xs px-2.5 py-1 rounded-full flex-shrink-0 font-medium"
                      style={{ color: primary.color, background: `${primary.color}18` }}>
                      #1
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Alternative */}
        {alternatives.length > 0 && (
          <div className="mb-10">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Takođe odgovaraju</p>
            <div className="space-y-3">
              {alternatives.map((alt) => (
                <div key={alt.name} className="glass rounded-2xl p-5 border border-white/5">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: alt.color }} />
                    <h3 className="text-white font-semibold text-sm">{alt.name}</h3>
                    <span className="text-white/25 text-xs">{alt.smer}</span>
                  </div>
                  <p className="text-white/35 text-sm leading-relaxed pl-5">{alt.desc.split('.')[0]}.</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sačuvaj */}
        <div className="mb-4">
          {saved ? (
            <div className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-medium">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Rezultat je sačuvan
            </div>
          ) : (
            <button onClick={handleSaveClick}
              className="w-full px-6 py-3.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/20 text-sm">
              Sačuvaj rezultat
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={onRestart}
            className="flex-1 px-6 py-3.5 glass glass-hover text-white/50 hover:text-white font-medium rounded-xl text-sm border border-white/10">
            Počni ispočetka
          </button>
          <button onClick={() => { localStorage.removeItem('fy_results'); localStorage.removeItem('fy_progress'); onRestart() }}
            className="flex-1 px-6 py-3.5 glass glass-hover text-white/50 hover:text-white font-medium rounded-xl text-sm border border-white/10">
            Promeni segment
          </button>
        </div>
      </div>

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSuccess={handleAuthSuccess}
          context="Napravi nalog da sačuvaš svoje rezultate i pristupiš im kad god hoćeš."
        />
      )}
    </div>
  )
}
