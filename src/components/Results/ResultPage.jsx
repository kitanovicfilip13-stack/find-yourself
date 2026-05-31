import { useMemo, useState } from 'react'
import { useLanguage } from '../../LanguageContext'
import { useAuth } from '../../AuthContext'
import AuthModal from '../Auth/AuthModal'
import {
  calculateScores,
  getPersonalityType,
  getCareerPaths,
  getStrengths,
  getWeaknesses,
  getSkillsToLearn,
  getActionPlan,
  getFirstPath,
} from '../../i18n/scoring'

export default function ResultPage({ answers, onRestart, onDashboard }) {
  const { t, lang } = useLanguage()
  const { user } = useAuth()
  const [showAuth, setShowAuth] = useState(false)
  const [saved, setSaved] = useState(false)

  const saveResults = () => {
    try {
      const raw = localStorage.getItem('fy_results')
      const existing = raw ? JSON.parse(raw) : {}
      const base = Array.isArray(existing) ? { answers: existing } : existing
      localStorage.setItem('fy_results', JSON.stringify({ ...base, savedAt: Date.now(), userId: user?.id }))
      setSaved(true)
      setTimeout(() => onDashboard?.(), 800)
    } catch {}
  }

  const handleSaveClick = () => {
    if (user) { saveResults() } else { setShowAuth(true) }
  }

  const handleAuthSuccess = () => { setShowAuth(false); saveResults() }
  const r = t.result

  const scores = useMemo(() => calculateScores(answers), [answers])
  const type   = useMemo(() => getPersonalityType(scores, lang), [scores, lang])
  const careers = useMemo(() => getCareerPaths(scores, lang), [scores, lang])
  const strengths = useMemo(() => getStrengths(scores, lang), [scores, lang])
  const weaknesses = useMemo(() => getWeaknesses(scores, lang), [scores, lang])
  const skills = useMemo(() => getSkillsToLearn(scores, lang), [scores, lang])
  const plan = useMemo(() => getActionPlan(scores, type, lang), [scores, type, lang])
  const firstPath = useMemo(() => getFirstPath(scores, type, lang), [scores, type, lang])

  const dimColors = { C: '#8b5cf6', T: '#3b82f6', P: '#ec4899', B: '#f59e0b', O: '#06b6d4', N: '#10b981' }
  const topDims = type.dims.slice(0, 6)
  const maxDimVal = Math.max(...topDims.map(d => d.val), 1)

  return (
    <div className="min-h-screen" style={{ background: '#080810' }}>
      {/* Top nav */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="w-6 h-6" />
          <span className="text-white/50 text-sm">{t.nav.brand}</span>
        </div>
        <div className="flex gap-3">
          {saved ? (
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-green-500/30 bg-green-500/10 text-green-400 text-sm">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              Sačuvano
            </div>
          ) : (
            <button onClick={handleSaveClick}
              className="px-4 py-2 rounded-lg text-white/70 hover:text-white text-sm border border-white/10 hover:border-violet-500/40 hover:bg-violet-500/10 transition-all">
              Sačuvaj rezultat
            </button>
          )}
          {onDashboard && (
            <button onClick={onDashboard}
              className="px-4 py-2 rounded-lg text-white text-sm bg-violet-600 hover:bg-violet-500 transition-all">
              {lang === 'sr' ? 'Moj profil →' : 'My profile →'}
            </button>
          )}
          {!onDashboard && (
            <button onClick={onRestart}
              className="px-4 py-2 rounded-lg text-white text-sm bg-violet-600 hover:bg-violet-500 transition-all">
              {r.retake}
            </button>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* ── HERO CARD ── */}
        <div className="relative rounded-3xl overflow-hidden mb-6 p-8 md:p-10"
          style={{ background: `linear-gradient(135deg, ${type.color}22 0%, rgba(8,8,16,0.95) 60%)`, border: `1px solid ${type.color}33` }}>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${type.color}25 0%, transparent 70%)`, filter: 'blur(30px)', transform: 'translate(20%, -20%)' }} />
          <div className="relative">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                style={{ background: `${type.color}22`, border: `1px solid ${type.color}33` }}>
                {type.emoji}
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">{r.personalityLabel}</p>
                <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">{type.name}</h1>
              </div>
            </div>
            <p className="text-lg md:text-xl font-medium mb-4" style={{ color: type.color }}>{type.tagline}</p>
            <p className="text-white/50 text-sm leading-relaxed">
              {r.profileDesc(r.dimNames[type.primary], r.dimNames[type.secondary], type.isIntrovert, type.isRiskTaker)}
            </p>
          </div>
        </div>

        {/* ── DIMENSIONS ── */}
        <div className="glass rounded-2xl p-6 mb-6">
          <h2 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest opacity-60">{r.dimensionsLabel}</h2>
          <div className="space-y-3">
            {topDims.map((d) => (
              <div key={d.key} className="flex items-center gap-3">
                <span className="text-white/60 text-sm w-32 flex-shrink-0">{r.dimNames[d.key]}</span>
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${Math.round((d.val / maxDimVal) * 100)}%`, background: `linear-gradient(90deg, ${dimColors[d.key]}, ${dimColors[d.key]}88)` }} />
                </div>
                <span className="text-white/30 text-xs w-8 text-right">{Math.round((d.val / maxDimVal) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── STRENGTHS & WATCH ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <h2 className="text-white font-semibold text-sm uppercase tracking-widest opacity-60">{r.strengthsLabel}</h2>
            </div>
            <div className="space-y-2">
              {strengths.map((s, i) => (
                <div key={i} className="flex items-center gap-3 py-1">
                  <span className="text-emerald-400/60 text-xs">✦</span>
                  <span className="text-white/80 text-sm">{s}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <h2 className="text-white font-semibold text-sm uppercase tracking-widest opacity-60">{r.watchLabel}</h2>
            </div>
            <div className="space-y-2">
              {weaknesses.map((w, i) => (
                <div key={i} className="flex items-start gap-3 py-1">
                  <span className="text-amber-400/60 text-xs mt-0.5">▲</span>
                  <span className="text-white/80 text-sm">{w}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CAREER PATHS ── */}
        <div className="glass rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-2 h-2 rounded-full bg-violet-400" />
            <h2 className="text-white font-semibold text-sm uppercase tracking-widest opacity-60">{r.careersLabel}</h2>
          </div>
          <div className="space-y-4">
            {careers.map((c, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    {i === 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium text-violet-300 bg-violet-500/15 border border-violet-500/20">
                        {r.topMatch}
                      </span>
                    )}
                    <span className="text-white/80 text-sm font-medium">{c.label}</span>
                  </div>
                  <span className="text-white/30 text-xs">{c.percent}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full"
                    style={{ width: `${c.percent}%`, background: i === 0 ? 'linear-gradient(90deg, #7c3aed, #2563eb)' : `linear-gradient(90deg, ${type.color}99, ${type.color}44)` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SKILLS ── */}
        <div className="glass rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <h2 className="text-white font-semibold text-sm uppercase tracking-widest opacity-60">{r.skillsLabel}</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <span key={i} className="px-3 py-2 rounded-xl text-sm font-medium border"
                style={{
                  color: i === 0 ? type.color : 'rgba(255,255,255,0.6)',
                  borderColor: i === 0 ? `${type.color}40` : 'rgba(255,255,255,0.08)',
                  background: i === 0 ? `${type.color}12` : 'rgba(255,255,255,0.02)',
                }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* ── 7-DAY PLAN ── */}
        <div className="glass rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
            <h2 className="text-white font-semibold text-sm uppercase tracking-widest opacity-60">{r.planLabel}</h2>
          </div>
          <div className="space-y-3">
            {plan.map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/[0.03] transition-colors group">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold"
                  style={{ background: `${type.color}15`, color: type.color, border: `1px solid ${type.color}25` }}>
                  {i + 1}
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1 font-medium uppercase tracking-wide">{item.day}</p>
                  <p className="text-white/75 text-sm leading-relaxed group-hover:text-white/90 transition-colors">{item.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FIRST PATH ── */}
        <div className="relative rounded-3xl overflow-hidden p-8 mb-10"
          style={{ background: `linear-gradient(135deg, ${type.color}18 0%, rgba(37,99,235,0.08) 100%)`, border: `1px solid ${type.color}30` }}>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: `${type.color}20` }}>🎯</div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-2">{r.firstPathLabel}</p>
              <p className="text-white font-semibold text-lg leading-snug mb-2">{firstPath}</p>
              <p className="text-white/40 text-sm">{r.firstPathSub}</p>
            </div>
          </div>
        </div>

        {/* ── COMING SOON ── */}
        <div className="glass rounded-2xl p-6 mb-8">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-4">{r.comingSoon}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {r.upcoming.map((item) => (
              <div key={item.label} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 opacity-60">
                <div className="text-xl mb-2">{item.icon}</div>
                <p className="text-white/70 text-xs font-medium mb-1">{item.label}</p>
                <p className="text-white/30 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RESTART ── */}
        <div className="text-center pb-12">
          <p className="text-white/20 text-sm mb-4">{r.notSatisfied}</p>
          <button onClick={onRestart} className="text-violet-400 hover:text-violet-300 text-sm underline underline-offset-4 transition-colors">
            {r.retakeLink}
          </button>
        </div>
      </div>

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSuccess={handleAuthSuccess}
          context="Napravi nalog da sačuvaš rezultate i pristupiš im kad god hoćeš."
        />
      )}
    </div>
  )
}
