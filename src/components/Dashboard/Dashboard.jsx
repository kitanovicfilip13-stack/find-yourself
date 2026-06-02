import { useMemo, useState, useEffect } from 'react'
import { useLanguage } from '../../LanguageContext'
import { useAuth } from '../../AuthContext'
import { getUserResults, deleteResult } from '../../supabase'
import { getRecommendations } from '../../i18n/recommendations'
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
  const [activeTab, setActiveTab] = useState('profil')
  const [savedResults, setSavedResults] = useState([])
  const [loadingResults, setLoadingResults] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [planHovered, setPlanHovered] = useState(false)
  const [checkedItems, setCheckedItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('fy_checked') || '{}') } catch { return {} }
  })

  const toggleCheck = (id) => {
    const updated = { ...checkedItems, [id]: !checkedItems[id] }
    setCheckedItems(updated)
    localStorage.setItem('fy_checked', JSON.stringify(updated))
  }

  const getVisibleItems = (allItems) => {
    const visible = []
    let replaced = 0
    for (const item of allItems) {
      if (visible.length >= 5) break
      if (!checkedItems[item.id]) {
        visible.push({ ...item, checked: false })
      } else {
        replaced++
      }
    }
    // Dopuni do 5 sa checkiranim ako nema dovoljno
    if (visible.length < 5) {
      for (const item of allItems) {
        if (visible.length >= 5) break
        if (checkedItems[item.id]) visible.push({ ...item, checked: true })
      }
    }
    return visible
  }

  useEffect(() => {
    if (user && activeTab === 'rezultati') {
      setLoadingResults(true)
      getUserResults(user.id).then(({ data }) => {
        setSavedResults(data || [])
        setLoadingResults(false)
      })
    }
  }, [user, activeTab])

  const { savedAnswers, savedSegment } = useMemo(() => {
    try {
      const raw = localStorage.getItem('fy_results')
      if (!raw) return { savedAnswers: [], savedSegment: 'posao' }
      const parsed = JSON.parse(raw)
      if (parsed && typeof parsed === 'object' && Array.isArray(parsed.answers)) {
        return { savedAnswers: parsed.answers, savedSegment: parsed.segment || 'posao' }
      }
      if (Array.isArray(parsed)) return { savedAnswers: parsed, savedSegment: 'posao' }
      return { savedAnswers: [], savedSegment: 'posao' }
    } catch { return { savedAnswers: [], savedSegment: 'posao' } }
  }, [])

  const scores    = useMemo(() => calculateScores(savedAnswers), [savedAnswers])
  const type      = useMemo(() => getPersonalityType(scores, lang), [scores, lang])
  const careers   = useMemo(() => getCareerPaths(scores, lang), [scores, lang])
  const strengths = useMemo(() => getStrengths(scores, lang), [scores, lang])
  const weaknesses = useMemo(() => getWeaknesses(scores, lang), [scores, lang])
  const skills    = useMemo(() => getSkillsToLearn(scores, lang), [scores, lang])
  const plan      = useMemo(() => getActionPlan(scores, type, lang), [scores, type, lang])
  const firstPath = useMemo(() => getFirstPath(scores, type, lang), [scores, type, lang])

  const recommendations = useMemo(() => getRecommendations(scores), [scores])
  const isPosaoSegment = savedSegment === 'posao'

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
            ? 'Uradi test od 20 pitanja i dobij personalizovani profil sa karijernim pravcima, potencijalima i planom.'
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
          <img src="/logo.png" alt="logo" className="w-6 h-6" />
          <span className="text-white/60 text-sm font-medium">{t.nav.brand}</span>
        </button>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-[10px] font-bold text-white">
            {shortEmail?.[0]?.toUpperCase()}
          </div>
          <span className="text-white/50 text-sm hidden md:block">{shortEmail}</span>
        </div>
      </div>

      {/* Layout */}
      <div className="flex min-h-[calc(100vh-73px)] relative">

        {/* Overlay kad je sidebar otvoren na mobilnom */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-30 md:hidden bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <div className={`fixed md:static top-[73px] left-0 bottom-0 z-40 flex flex-col border-r border-white/5 px-4 py-8 flex-shrink-0 transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'w-56 translate-x-0' : 'w-56 -translate-x-full md:translate-x-0 md:w-14'}
        `} style={{ background: 'rgba(8,8,16,0.98)', backdropFilter: 'blur(20px)' }}>

          {/* Toggle dugme */}
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/10 hover:border-violet-500/30 hover:bg-white/5 transition-all mb-6 self-end text-white/40 hover:text-white/70">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={sidebarOpen ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
            </svg>
          </button>

          {/* Nav stavke */}
          <div className="space-y-1 flex-1">
            {[
              { id: 'profil', label: 'Pregled profila', icon: <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg> },
              { id: 'rezultati', label: 'Istorija rezultata', icon: <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" /></svg> },
            ].map(item => (
              <button key={item.id} onClick={() => { setActiveTab(item.id); if(window.innerWidth < 768) setSidebarOpen(false) }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 w-full text-left overflow-hidden ${
                  activeTab === item.id ? 'bg-violet-500/15 text-white border border-violet-500/20' : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                }`}>
                <span className={`flex-shrink-0 ${activeTab === item.id ? 'text-violet-400' : ''}`}>{item.icon}</span>
                {sidebarOpen && <span className="truncate">{item.label}</span>}
              </button>
            ))}

            {/* Plan razvoja sa hover sub-menijem */}
            <div className="relative" onMouseEnter={() => setPlanHovered(true)} onMouseLeave={() => setPlanHovered(false)}>
              <button onClick={() => { setActiveTab('zadaci'); if(window.innerWidth < 768) setSidebarOpen(false) }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 w-full text-left overflow-hidden ${
                  ['zadaci','preporuke'].includes(activeTab) ? 'bg-violet-500/15 text-white border border-violet-500/20' : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                }`}>
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                {sidebarOpen && <span className="truncate flex-1">Plan razvoja</span>}
                {sidebarOpen && <svg className={`w-3 h-3 flex-shrink-0 transition-transform ${planHovered ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>}
              </button>

              {/* Sub-meni na hover */}
              {planHovered && sidebarOpen && (
                <div className="ml-4 mt-1 space-y-1 border-l border-white/5 pl-3">
                  {[
                    { id: 'zadaci', label: 'Moji zadaci' },
                    { id: 'preporuke', label: 'Preporuke' },
                  ].map(sub => (
                    <button key={sub.id} onClick={() => { setActiveTab(sub.id); if(window.innerWidth < 768) setSidebarOpen(false) }}
                      className={`w-full text-left px-2 py-2 rounded-lg text-xs transition-all ${
                        activeTab === sub.id ? 'text-violet-400 font-medium' : 'text-white/35 hover:text-white/70'
                      }`}>
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Dno sidebar */}
          <div className="pt-6 border-t border-white/5 space-y-1">
            <button onClick={() => { setActiveTab('podesavanja'); if(window.innerWidth < 768) setSidebarOpen(false) }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all w-full text-left overflow-hidden ${
                activeTab === 'podesavanja' ? 'text-white bg-violet-500/10' : 'text-white/30 hover:text-white/60 hover:bg-white/5'
              }`}>
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
              {sidebarOpen && <span className="truncate">Podešavanja</span>}
            </button>
            <button onClick={onRetake}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/30 hover:text-white/60 hover:bg-white/5 transition-all w-full text-left overflow-hidden">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
              {sidebarOpen && <span className="truncate">Uradi test ponovo</span>}
            </button>
            <button onClick={() => { signOut(); onGoToLanding() }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/30 hover:text-red-400 hover:bg-red-500/5 transition-all w-full text-left overflow-hidden">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" /></svg>
              {sidebarOpen && <span className="truncate">Odjava</span>}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 md:px-10 py-10">

        {/* TAB: Moji rezultati */}
        {activeTab === 'rezultati' && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Istorija rezultata</h2>
            {loadingResults ? (
              <p className="text-white/30 text-sm">Učitavanje...</p>
            ) : savedResults.length === 0 ? (
              <div className="glass rounded-2xl p-8 text-center border border-white/5">
                <p className="text-white/40 text-sm mb-4">Još nemaš sačuvanih rezultata.</p>
                <button onClick={onRetake}
                  className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl transition-all">
                  Uradi test
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {savedResults.map((res) => {
                  const segmentLabel = res.segment === 'srednja' ? 'Srednja škola' : res.segment === 'fakultet' ? 'Fakultet' : 'Posao i karijera'
                  const date = new Date(res.created_at).toLocaleDateString('sr-RS', { day: '2-digit', month: '2-digit', year: 'numeric' })
                  return (
                    <div key={res.id} className="glass rounded-2xl p-5 border border-white/5 flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-violet-400 border border-violet-500/20 bg-violet-500/10 rounded-full px-2.5 py-0.5 font-medium">{segmentLabel}</span>
                          {res.city && <span className="text-white/25 text-xs">{res.city}</span>}
                        </div>
                        <p className="text-white font-medium text-sm">{res.result_label || 'Rezultat'}</p>
                        <p className="text-white/30 text-xs mt-1">{date}</p>
                      </div>
                      <button
                        onClick={async () => {
                          await deleteResult(res.id)
                          setSavedResults(prev => prev.filter(r => r.id !== res.id))
                        }}
                        className="text-white/20 hover:text-red-400 transition-colors flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB: Preporuke */}
        {activeTab === 'preporuke' && (
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Preporuke</h2>
            <p className="text-white/30 text-sm mb-8">Knjige i podkasti odabrani prema tvom tipu ličnosti.</p>

            {!recommendations ? (
              <div className="glass rounded-2xl p-8 text-center border border-white/5">
                <p className="text-white/40 text-sm mb-4">Uradi test da bi dobio/la personalizovane preporuke.</p>
                <button onClick={onRetake} className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl transition-all">Uradi test</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-5">
                {/* Knjige */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>
                    <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Knjige</h3>
                  </div>
                  <div className="space-y-3">
                    {getVisibleItems(recommendations.books).map((book, i) => (
                      <div key={book.id} className={`rounded-xl p-4 border transition-all duration-200 ${book.checked ? 'border-white/5 bg-white/[0.01] opacity-50' : 'glass border-white/5'}`}>
                        <div className="flex items-start gap-3">
                          <button onClick={() => toggleCheck(book.id)}
                            className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center mt-0.5 transition-all ${book.checked ? 'bg-violet-500 border-violet-400' : 'border-white/20 hover:border-violet-400'}`}>
                            {book.checked && <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                          </button>
                          <div className="flex-1">
                            <p className={`font-medium text-sm leading-snug ${book.checked ? 'line-through text-white/30' : 'text-white'}`}>{book.title} <span className="text-violet-400/60 font-normal">· {book.author}</span></p>
                            <p className="text-white/35 text-xs leading-relaxed mt-1">{book.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Podkasti */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" /></svg>
                    <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Podkasti</h3>
                  </div>
                  <div className="space-y-3">
                    {getVisibleItems(recommendations.podcasts).map((pod, i) => (
                      <div key={pod.id} className={`rounded-xl p-4 border transition-all duration-200 ${pod.checked ? 'border-white/5 bg-white/[0.01] opacity-50' : 'glass border-white/5'}`}>
                        <div className="flex items-start gap-3">
                          <button onClick={() => toggleCheck(pod.id)}
                            className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center mt-0.5 transition-all ${pod.checked ? 'bg-violet-500 border-violet-400' : 'border-white/20 hover:border-violet-400'}`}>
                            {pod.checked && <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                          </button>
                          <div className="flex-1">
                            <p className={`font-medium text-sm leading-snug ${pod.checked ? 'line-through text-white/30' : 'text-white'}`}>{pod.title}</p>
                            <p className="text-white/35 text-xs leading-relaxed mt-1">{pod.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB: Plan razvoja */}
        {activeTab === 'zadaci' && (
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Plan razvoja</h2>
            <p className="text-white/30 text-sm mb-8">Konkretni koraci prilagođeni tvom karijernom profilu.</p>

            {!isPosaoSegment ? (
              <div className="glass rounded-2xl p-8 text-center border border-violet-500/20 bg-violet-500/5">
                <div className="w-12 h-12 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                </div>
                <p className="text-white font-semibold text-sm mb-2">Plan razvoja je dostupan samo za segment Posao i karijera</p>
                <p className="text-white/40 text-xs mb-5">Uradi test za karijeru da bi dobio/la personalizovani 7-dnevni plan razvoja.</p>
                <button onClick={onRetake} className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl transition-all">
                  Uradi karijerski test
                </button>
              </div>
            ) : plan && plan.length > 0 ? (() => {
              const completedCount = plan.filter((_, i) => checkedItems[`plan-${i}`]).length
              const progress = Math.round((completedCount / plan.length) * 100)
              return (
                <div>
                  {/* Progress bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-white/40 text-xs">{completedCount} / {plan.length} zadataka završeno</p>
                      <p className="text-violet-400 text-xs font-medium">{progress}%</p>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #7c3aed, #2563eb)' }} />
                    </div>
                  </div>

                  {/* Zadaci */}
                  <div className="space-y-3">
                    {plan.map((task, i) => {
                      const isDone = checkedItems[`plan-${i}`]
                      return (
                        <div key={i} className={`rounded-2xl p-5 border transition-all duration-200 ${isDone ? 'border-white/5 bg-white/[0.01] opacity-60' : 'glass border-white/5'}`}>
                          <div className="flex items-start gap-4">
                            <button onClick={() => toggleCheck(`plan-${i}`)}
                              className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center mt-0.5 transition-all ${isDone ? 'bg-violet-500 border-violet-400' : 'border-white/20 hover:border-violet-400'}`}>
                              {isDone && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                            </button>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">{task.day}</span>
                              </div>
                              <p className={`text-sm leading-relaxed ${isDone ? 'line-through text-white/30' : 'text-white/80'}`}>{task.action}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {completedCount === plan.length && (
                    <div className="mt-6 p-4 rounded-2xl border border-green-500/20 bg-green-500/5 text-center">
                      <p className="text-green-400 font-semibold text-sm mb-1">🎉 Završio/la si ceo plan!</p>
                      <p className="text-white/40 text-xs">Uradi test ponovo da dobiš novi plan razvoja.</p>
                    </div>
                  )}
                </div>
              )
            })() : (
              <div className="glass rounded-2xl p-8 text-center border border-white/5">
                <p className="text-white/40 text-sm mb-4">Uradi test da bi dobio/la personalizovane zadatke.</p>
                <button onClick={onRetake}
                  className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl transition-all">
                  Uradi test
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB: Podešavanja */}
        {activeTab === 'podesavanja' && (
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Podešavanja</h2>
            <p className="text-white/30 text-sm mb-8">Upravljaj svojim nalogom.</p>
            <div className="space-y-4">
              <div className="glass rounded-2xl p-6 border border-white/5">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Email</p>
                <p className="text-white text-sm">{user?.email}</p>
              </div>
              <div className="glass rounded-2xl p-6 border border-white/5">
                <p className="text-white font-medium text-sm mb-1">Uradi test ponovo</p>
                <p className="text-white/40 text-xs mb-4">Počni novi test i ažuriraj svoj profil.</p>
                <button onClick={onRetake}
                  className="px-5 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl transition-all">
                  Uradi test
                </button>
              </div>
              <div className="glass rounded-2xl p-6 border border-white/5">
                <p className="text-white font-medium text-sm mb-1">Odjava</p>
                <p className="text-white/40 text-xs mb-4">Odjavi se sa svog naloga.</p>
                <button onClick={() => { signOut(); onGoToLanding() }}
                  className="px-5 py-2 text-red-400 border border-red-500/20 hover:bg-red-500/10 text-sm font-medium rounded-xl transition-all">
                  Odjavi se
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB: Moj profil */}
        {activeTab === 'profil' && <>

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


        {/* Retake */}
        <div className="text-center pb-12">
          <p className="text-white/20 text-sm mb-4">{r.notSatisfied}</p>
          <button onClick={onRetake} className="text-violet-400 hover:text-violet-300 text-sm underline underline-offset-4 transition-colors">
            {r.retakeLink}
          </button>
        </div>

        </> }

        </div> {/* end content */}
      </div> {/* end layout */}

      {showPremiumModal && <PremiumModal lang={lang} onClose={() => setShowPremiumModal(false)} />}
    </div>
  )
}
