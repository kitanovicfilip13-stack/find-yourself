import { useMemo, useState } from 'react'
import { useLanguage } from '../../LanguageContext'
import { useAuth } from '../../AuthContext'
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

function PremiumLock({ lang, onUpgrade }) {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl"
      style={{ backdropFilter: 'blur(6px)', background: 'rgba(8,8,16,0.75)' }}>
      <div className="w-10 h-10 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mb-3">
        <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <p className="text-white font-semibold text-sm mb-1">
        {lang === 'sr' ? 'Premium funkcija' : 'Premium feature'}
      </p>
      <p className="text-white/40 text-xs mb-4 text-center px-6">
        {lang === 'sr' ? 'Otključaj za kompletan pristup' : 'Unlock for full access'}
      </p>
      <button
        onClick={onUpgrade}
        className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-violet-600 hover:bg-violet-500 transition-all hover:shadow-lg hover:shadow-violet-500/25">
        {lang === 'sr' ? '🔓 Otključaj Premium' : '🔓 Unlock Premium'}
      </button>
    </div>
  )
}

function PremiumModal({ lang, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm glass rounded-3xl border border-white/10 p-8 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <div className="text-4xl mb-3">⚡</div>
          <h2 className="text-2xl font-black text-white mb-2">
            {lang === 'sr' ? 'Find Yourself Premium' : 'Find Yourself Premium'}
          </h2>
          <p className="text-white/40 text-sm">
            {lang === 'sr' ? 'Otključaj sve funkcije i počni da gradiš svoju budućnost.' : 'Unlock everything and start building your future.'}
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {[
            { icon: '📅', text: lang === 'sr' ? '7-dnevni akcioni plan' : '7-day action plan' },
            { icon: '🎯', text: lang === 'sr' ? 'Tvoj predloženi prvi put' : 'Your suggested first path' },
            { icon: '💬', text: lang === 'sr' ? 'AI Chat mentor (uskoro)' : 'AI Chat mentor (soon)' },
            { icon: '🏢', text: lang === 'sr' ? 'Partnerske kompanije (uskoro)' : 'Partner companies (soon)' },
            { icon: '📚', text: lang === 'sr' ? 'Personalizovani kursevi (uskoro)' : 'Personalized courses (soon)' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/8">
              <span className="text-lg">{item.icon}</span>
              <span className="text-white/70 text-sm">{item.text}</span>
              <svg className="w-4 h-4 text-emerald-400 ml-auto flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          ))}
        </div>

        <div className="text-center mb-4">
          <div className="text-3xl font-black text-white">4.99€ <span className="text-white/30 text-base font-normal">/ {lang === 'sr' ? 'mesec' : 'month'}</span></div>
        </div>

        <button className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-violet-500/25 text-sm">
          {lang === 'sr' ? 'Počni 7-dnevni trial' : 'Start 7-day free trial'}
        </button>
        <p className="text-white/20 text-xs text-center mt-3">
          {lang === 'sr' ? 'Otkaži bilo kad. Bez skrivenih troškova.' : 'Cancel anytime. No hidden fees.'}
        </p>
      </div>
    </div>
  )
}

export default function Dashboard({ onRetake, onGoToLanding }) {
  const { t, lang } = useLanguage()
  const { user, signOut } = useAuth()
  const r = t.result
  const d = t.dashboard

  const [showPremiumModal, setShowPremiumModal] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const savedAnswers = useMemo(() => {
    try {
      const raw = localStorage.getItem('fy_results')
      return raw ? JSON.parse(raw) : []
    } catch { return [] }
  }, [])

  const scores    = useMemo(() => calculateScores(savedAnswers), [savedAnswers])
  const type      = useMemo(() => getPersonalityType(scores, lang), [scores, lang])
  const careers   = useMemo(() => getCareerPaths(scores, lang), [scores, lang])
  const strengths = useMemo(() => getStrengths(scores, lang), [scores, lang])
  const weaknesses = useMemo(() => getWeaknesses(scores, lang), [scores, lang])
  const skills    = useMemo(() => getSkillsToLearn(scores, lang), [scores, lang])
  const plan      = useMemo(() => getActionPlan(scores, type, lang), [scores, type, lang])
  const firstPath = useMemo(() => getFirstPath(scores, type, lang), [scores, type, lang])

  const dimColors = { C: '#8b5cf6', T: '#3b82f6', P: '#ec4899', B: '#f59e0b', O: '#06b6d4', N: '#10b981' }
  const topDims = type.dims.slice(0, 6)
  const maxDimVal = Math.max(...topDims.map(d => d.val), 1)

  const shortEmail = user?.email?.split('@')[0]
  const hasResults = savedAnswers.length > 0

  if (!hasResults) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: '#080810' }}>
        <div className="text-5xl mb-6">🧭</div>
        <h1 className="text-2xl font-black text-white mb-3 text-center">
          {lang === 'sr' ? 'Još nemaš profil' : "You don't have a profile yet"}
        </h1>
        <p className="text-white/40 text-sm mb-8 text-center max-w-sm">
          {lang === 'sr'
            ? 'Uradi test od 20 pitanja i dobij personalizovani profil sa karijernim pravcima, snagama i planom.'
            : 'Take the 20-question test and get your personalized profile with career paths, strengths and action plan.'}
        </p>
        <button
          onClick={onRetake}
          className="px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all hover:shadow-2xl hover:shadow-violet-500/30">
          {lang === 'sr' ? 'Počni test →' : 'Start test →'}
        </button>
        <button onClick={onGoToLanding} className="mt-4 text-white/30 hover:text-white text-sm transition-colors">
          {lang === 'sr' ? '← Nazad na početnu' : '← Back to home'}
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: '#080810' }}>

      {/* Navbar */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 sticky top-0 z-40" style={{ background: 'rgba(8,8,16,0.95)', backdropFilter: 'blur(20px)' }}>
        <button onClick={onGoToLanding} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
          <img src="/logo.svg" alt="logo" className="w-6 h-6" />
          <span className="text-white/60 text-sm font-medium">{t.nav.brand}</span>
        </button>

        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 hover:border-violet-500/30 transition-all">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-[10px] font-bold text-white">
              {shortEmail?.[0]?.toUpperCase()}
            </div>
            <span className="text-white/70 text-sm hidden md:block">{shortEmail}</span>
            <svg className="w-3 h-3 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showUserMenu && (
            <div className="absolute right-0 top-10 w-48 glass rounded-xl border border-white/10 py-2 shadow-xl shadow-black/30 z-50">
              <div className="px-3 py-2 border-b border-white/5">
                <p className="text-white/30 text-xs truncate">{user?.email}</p>
              </div>
              <button
                onClick={onRetake}
                className="w-full text-left px-3 py-2 text-white/60 hover:text-white text-sm transition-colors">
                {lang === 'sr' ? 'Uradi test ponovo' : 'Retake test'}
              </button>
              <button
                onClick={() => { signOut(); onGoToLanding() }}
                className="w-full text-left px-3 py-2 text-white/60 hover:text-white text-sm transition-colors">
                {lang === 'sr' ? 'Odjava' : 'Sign out'}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* Welcome */}
        <div className="mb-8">
          <p className="text-white/30 text-sm mb-1">{d.welcome}, <span className="text-white/60 font-medium">{shortEmail}</span> 👋</p>
          <h1 className="text-2xl md:text-3xl font-black text-white">{d.title}</h1>
        </div>

        {/* Hero card */}
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
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">{type.name}</h2>
              </div>
            </div>
            <p className="text-lg font-medium mb-4" style={{ color: type.color }}>{type.tagline}</p>
            <p className="text-white/50 text-sm leading-relaxed">
              {r.profileDesc(r.dimNames[type.primary], r.dimNames[type.secondary], type.isIntrovert, type.isRiskTaker)}
            </p>
          </div>
        </div>

        {/* Dimensions */}
        <div className="glass rounded-2xl p-6 mb-6">
          <h2 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest opacity-60">{r.dimensionsLabel}</h2>
          <div className="space-y-3">
            {topDims.map((dim) => (
              <div key={dim.key} className="flex items-center gap-3">
                <span className="text-white/60 text-sm w-32 flex-shrink-0">{r.dimNames[dim.key]}</span>
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${Math.round((dim.val / maxDimVal) * 100)}%`, background: `linear-gradient(90deg, ${dimColors[dim.key]}, ${dimColors[dim.key]}88)` }} />
                </div>
                <span className="text-white/30 text-xs w-8 text-right">{Math.round((dim.val / maxDimVal) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths & Weaknesses */}
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

        {/* Career paths */}
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

        {/* Skills */}
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

        {/* 7-Day Plan — PREMIUM LOCKED */}
        <div className="relative glass rounded-2xl p-6 mb-6 overflow-hidden">
          <PremiumLock lang={lang} onUpgrade={() => setShowPremiumModal(true)} />
          <div className="flex items-center gap-2 mb-5" style={{ filter: 'blur(3px)' }}>
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
            <h2 className="text-white font-semibold text-sm uppercase tracking-widest opacity-60">{r.planLabel}</h2>
          </div>
          <div className="space-y-3" style={{ filter: 'blur(3px)' }}>
            {plan.slice(0, 3).map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03]">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold"
                  style={{ background: `${type.color}15`, color: type.color }}>
                  {i + 1}
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1 uppercase tracking-wide">{item.day}</p>
                  <p className="text-white/75 text-sm leading-relaxed">{item.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* First Path — PREMIUM LOCKED */}
        <div className="relative rounded-3xl overflow-hidden p-8 mb-8"
          style={{ background: `linear-gradient(135deg, ${type.color}18 0%, rgba(37,99,235,0.08) 100%)`, border: `1px solid ${type.color}30` }}>
          <PremiumLock lang={lang} onUpgrade={() => setShowPremiumModal(true)} />
          <div className="flex items-start gap-4" style={{ filter: 'blur(4px)' }}>
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: `${type.color}20` }}>🎯</div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-2">{r.firstPathLabel}</p>
              <p className="text-white font-semibold text-lg leading-snug mb-2">{firstPath}</p>
              <p className="text-white/40 text-sm">{r.firstPathSub}</p>
            </div>
          </div>
        </div>

        {/* Coming soon features */}
        <div className="glass rounded-2xl p-6 mb-8">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-4">{r.comingSoon}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {r.upcoming.map((item) => (
              <div key={item.label}
                onClick={() => setShowPremiumModal(true)}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/5 opacity-60 hover:opacity-90 hover:border-violet-500/20 transition-all cursor-pointer">
                <div className="text-xl mb-2">{item.icon}</div>
                <p className="text-white/70 text-xs font-medium mb-1">{item.label}</p>
                <p className="text-white/30 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Retake */}
        <div className="text-center pb-12">
          <p className="text-white/20 text-sm mb-4">{r.notSatisfied}</p>
          <button onClick={onRetake} className="text-violet-400 hover:text-violet-300 text-sm underline underline-offset-4 transition-colors">
            {r.retakeLink}
          </button>
        </div>
      </div>

      {showPremiumModal && <PremiumModal lang={lang} onClose={() => setShowPremiumModal(false)} />}
    </div>
  )
}
