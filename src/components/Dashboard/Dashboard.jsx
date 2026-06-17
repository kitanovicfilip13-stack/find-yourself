import { useMemo, useState, useEffect } from 'react'
import { useLanguage } from '../../LanguageContext'
import { useAuth } from '../../AuthContext'
import { getUserResults, deleteResult, getProfile, upsertProfile } from '../../supabase'
import { getRecommendations } from '../../i18n/recommendations'
import GoalsTab from './GoalsTab'
import WeeklyFocusTab from './WeeklyFocusTab'
import { dimDescriptions } from '../../i18n/scoring'
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

export default function Dashboard({ onRetake, onGoToLanding, onViewResult }) {
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
  const [mapPos, setMapPos] = useState(() => {
    try { const v = localStorage.getItem('fy_map_pos'); return v == null ? 0 : JSON.parse(v) } catch { return 0 }
  })
  const [activeDim, setActiveDim] = useState(null)
  const [activeCareer, setActiveCareer] = useState(null)
  const [expandedResult, setExpandedResult] = useState(null)
  const [profile, setProfile] = useState(null)
  const [profileForm, setProfileForm] = useState(null)
  const [profileSaving, setProfileSaving] = useState(false)
  const [profileSaved, setProfileSaved] = useState(false)

  useEffect(() => {
    if (user) {
      getProfile(user.id).then(({ data }) => {
        setProfile(data || null)
        setProfileForm({
          fullName: data?.full_name || '',
          age: data?.age || '',
          phone: data?.phone || '',
          city: data?.city || '',
          comment: data?.comment || '',
        })
      })
    }
  }, [user])
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

  const [mainResult, setMainResult] = useState(null)
  const [mainResultLoading, setMainResultLoading] = useState(true)
  const [calMonth, setCalMonth] = useState(() => new Date())
  const [calDay, setCalDay] = useState(null)
  const [calData, setCalData] = useState(() => {
    try { return JSON.parse(localStorage.getItem('fy_calendar') || '{}') } catch { return {} }
  })

  useEffect(() => {
    if (user) {
      setMainResultLoading(true)
      getUserResults(user.id).then(({ data }) => {
        if (data && data.length > 0) {
          const posaoResult = data.find(r => r.segment === 'posao')
          if (posaoResult && Array.isArray(posaoResult.answers)) {
            setMainResult(posaoResult)
          }
        }
        setMainResultLoading(false)
      })
    }
  }, [user])

  const { savedAnswers, savedSegment } = useMemo(() => {
    if (mainResult && Array.isArray(mainResult.answers)) {
      return { savedAnswers: mainResult.answers, savedSegment: 'posao' }
    }
    // Fallback na localStorage
    try {
      const raw = localStorage.getItem('fy_results')
      if (!raw) return { savedAnswers: [], savedSegment: 'posao' }
      const parsed = JSON.parse(raw)
      if (parsed && typeof parsed === 'object' && Array.isArray(parsed.answers) && parsed.segment === 'posao') {
        return { savedAnswers: parsed.answers, savedSegment: 'posao' }
      }
      if (Array.isArray(parsed)) return { savedAnswers: parsed, savedSegment: 'posao' }
      return { savedAnswers: [], savedSegment: 'posao' }
    } catch { return { savedAnswers: [], savedSegment: 'posao' } }
  }, [mainResult])

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

  if (mainResultLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#080810' }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-violet-500/30 border-t-violet-500 animate-spin" />
          <p className="text-white/30 text-sm">Učitavanje profila...</p>
        </div>
      </div>
    )
  }

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
        <div className={`fixed top-[73px] left-0 bottom-0 z-40 flex flex-col border-r border-white/5 py-8 flex-shrink-0 transition-all duration-300 ease-in-out overflow-y-auto
          ${sidebarOpen ? 'w-56 px-4 translate-x-0' : 'w-56 px-2 -translate-x-full md:translate-x-0 md:w-14'}
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
            ].map(item => (
              <button key={item.id} onClick={() => { setActiveTab(item.id); if(window.innerWidth < 768) setSidebarOpen(false) }}
                className={`flex items-center gap-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 w-full overflow-hidden
                  ${sidebarOpen ? 'px-3 text-left' : 'px-0 justify-center'}
                  ${activeTab === item.id ? 'bg-violet-500/15 text-white border border-violet-500/20' : 'text-white/35 hover:text-white hover:bg-white/8 border border-transparent'}`}>
                <span className={`flex-shrink-0 ${activeTab === item.id ? 'text-violet-400' : ''}`}>{item.icon}</span>
                {sidebarOpen && <span className="truncate">{item.label}</span>}
              </button>
            ))}

            {/* Plan razvoja sa hover sub-menijem */}
            <div className="relative" onMouseEnter={() => setPlanHovered(true)} onMouseLeave={() => setPlanHovered(false)}>
              <button onClick={() => { setActiveTab('plan'); if(window.innerWidth < 768) setSidebarOpen(false) }}
                className={`flex items-center gap-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 w-full overflow-hidden
                  ${sidebarOpen ? 'px-3 text-left' : 'px-0 justify-center'}
                  ${['plan','ciljevi','preporuke','mapa','fokus','kalendar'].includes(activeTab) ? 'bg-violet-500/15 text-white border border-violet-500/20' : 'text-white/35 hover:text-white hover:bg-white/8 border border-transparent'}`}>
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                {sidebarOpen && <span className="truncate flex-1">Plan razvoja</span>}
                {sidebarOpen && <svg className={`w-3 h-3 flex-shrink-0 transition-transform ${planHovered ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>}
              </button>

              {/* Sub-meni na hover */}
              {planHovered && sidebarOpen && (
                <div className="ml-4 mt-1 space-y-1 border-l border-white/5 pl-3">
                  {[
                    { id: 'ciljevi', label: 'Moji ciljevi' },
                    { id: 'preporuke', label: 'Preporuke' },
                    { id: 'mapa', label: 'Mapa' },
                    { id: 'fokus', label: 'Nedeljni fokus' },
                    { id: 'kalendar', label: 'Kalendar' },
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

            {/* Kursevi */}
            <button onClick={() => { setActiveTab('kursevi'); if(window.innerWidth < 768) setSidebarOpen(false) }}
              className={`flex items-center gap-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 w-full overflow-hidden
                ${sidebarOpen ? 'px-3 text-left' : 'px-0 justify-center'}
                ${activeTab === 'kursevi' ? 'bg-violet-500/15 text-white border border-violet-500/20' : 'text-white/35 hover:text-white hover:bg-white/8 border border-transparent'}`}>
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-1.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" /></svg>
              {sidebarOpen && <span className="truncate flex-1">Kursevi</span>}
              {sidebarOpen && <span className="text-[10px] text-white/20 border border-white/10 rounded-full px-1.5 py-0.5 flex-shrink-0">uskoro</span>}
            </button>

            {/* Istorija rezultata */}
            <button onClick={() => { setActiveTab('rezultati'); if(window.innerWidth < 768) setSidebarOpen(false) }}
              className={`flex items-center gap-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 w-full overflow-hidden
                ${sidebarOpen ? 'px-3 text-left' : 'px-0 justify-center'}
                ${activeTab === 'rezultati' ? 'bg-violet-500/15 text-white border border-violet-500/20' : 'text-white/35 hover:text-white hover:bg-white/8 border border-transparent'}`}>
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" /></svg>
              {sidebarOpen && <span className="truncate">Istorija rezultata</span>}
            </button>

          </div>

          {/* Dno sidebar */}
          <div className="pt-6 border-t border-white/5 space-y-1">
            <button onClick={() => { setActiveTab('podesavanja'); if(window.innerWidth < 768) setSidebarOpen(false) }}
              className={`flex items-center gap-3 py-2.5 rounded-xl text-sm transition-all w-full overflow-hidden
                ${sidebarOpen ? 'px-3 text-left' : 'px-0 justify-center'}
                ${activeTab === 'podesavanja' ? 'text-white bg-violet-500/10 border border-violet-500/20' : 'text-white/30 hover:text-white hover:bg-white/8 border border-transparent'}`}>
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
              {sidebarOpen && <span className="truncate">Podešavanja</span>}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className={`flex-1 px-6 md:px-10 py-10 transition-all duration-300 ${sidebarOpen ? 'md:ml-56' : 'md:ml-14'}`}>

        {/* TAB: Moji ciljevi (Plan razvoja) */}
        {activeTab === 'ciljevi' && (
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Moji ciljevi</h2>
            <p className="text-white/30 text-sm mb-8">Napiši svoj glavni cilj i mi ćemo ga automatski podeliti na korake. Svaki mali zadatak te vodi ka velikom cilju.</p>
            <GoalsTab userId={user?.id} isPosao={isPosaoSegment} />
          </div>
        )}

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
                  const segmentIcon = res.segment === 'srednja' ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>
                  ) : res.segment === 'fakultet' ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-1.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" /></svg>
                  )
                  const date = new Date(res.created_at).toLocaleDateString('sr-RS', { day: '2-digit', month: '2-digit', year: 'numeric' })
                  const isExpanded = expandedResult === res.id

                  // Izračunaj preview za posao segment
                  let preview = null
                  if (isExpanded && res.segment === 'posao' && Array.isArray(res.answers)) {
                    const sc = calculateScores(res.answers)
                    const tp = getPersonalityType(sc, 'sr')
                    const cr = getCareerPaths(sc, 'sr').slice(0, 3)
                    preview = { type: tp, careers: cr }
                  }

                  return (
                    <div key={res.id} className={`glass rounded-2xl border transition-all duration-200 overflow-hidden ${isExpanded ? 'border-violet-500/20' : 'border-white/5'}`}>
                      {/* Header (uvek vidljiv) */}
                      <button
                        onClick={() => setExpandedResult(isExpanded ? null : res.id)}
                        className="w-full flex items-center justify-between p-5 text-left">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {(() => {
                              const sc = res.segment === 'srednja' ? '#8b5cf6' : res.segment === 'fakultet' ? '#3b82f6' : '#06b6d4'
                              return (
                                <span className="text-xs rounded-full px-2.5 py-0.5 font-medium flex items-center gap-1.5"
                                  style={{ color: sc, background: `${sc}18`, border: `1px solid ${sc}35` }}>
                                  {segmentIcon}
                                  {segmentLabel}
                                </span>
                              )
                            })()}
                            {res.city && <span className="text-white/25 text-xs">{res.city}</span>}
                          </div>
                          <p className="text-white font-medium text-sm">{res.result_label || 'Rezultat'}</p>
                          <p className="text-white/30 text-xs mt-1">{date}</p>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <svg className={`w-4 h-4 text-white/30 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                          <button
                            onClick={async (e) => {
                              e.stopPropagation()
                              await deleteResult(res.id)
                              setSavedResults(prev => prev.filter(r => r.id !== res.id))
                            }}
                            className="text-white/20 hover:text-red-400 transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </button>

                      {/* Expand sadržaj */}
                      {isExpanded && (
                        <div className="px-5 pb-5 border-t border-white/5 pt-4">
                          {preview ? (
                            <div className="space-y-4">
                              {/* Tip */}
                              <div className="p-4 rounded-xl" style={{ background: `${preview.type.color}10`, border: `1px solid ${preview.type.color}25` }}>
                                <p className="text-white/40 text-xs mb-0.5">Radni stil</p>
                                <p className="text-white font-semibold text-sm">{preview.type.name}</p>
                                <p className="text-white/50 text-xs leading-relaxed mt-1">{preview.type.tagline.split('.')[0]}.</p>
                              </div>

                              {/* Top 3 karijere */}
                              <div>
                                <p className="text-white/30 text-xs uppercase tracking-widest mb-2">Karijerni pravci</p>
                                <div className="space-y-1.5">
                                  {preview.careers.map((c, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                      <span className="text-white/60 text-xs">{c.label}</span>
                                      <span className="text-white/30 text-xs">{c.percent}%</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Vidi ceo rezultat */}
                              {onViewResult && (
                                <button
                                  onClick={() => onViewResult(res.answers, res.segment)}
                                  className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl transition-all">
                                  Vidi ceo rezultat
                                </button>
                              )}
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <p className="text-white/40 text-xs">Segment: {segmentLabel}{res.city ? `, ${res.city}` : ''}</p>
                              {onViewResult && (
                                <button
                                  onClick={() => onViewResult(res.answers, res.segment)}
                                  className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl transition-all">
                                  Vidi ceo rezultat
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB: Nedeljni fokus */}
        {activeTab === 'fokus' && (
          <WeeklyFocusTab userId={user?.id} />
        )}

        {/* TAB: Kalendar */}
        {activeTab === 'kalendar' && (() => {
          const yr = calMonth.getFullYear()
          const mo = calMonth.getMonth()
          const monthNames = ['Januar','Februar','Mart','April','Maj','Jun','Jul','Avgust','Septembar','Oktobar','Novembar','Decembar']
          const dayNames = ['Pon','Uto','Sre','Čet','Pet','Sub','Ned']
          const firstDow = (new Date(yr, mo, 1).getDay() + 6) % 7
          const daysInMo = new Date(yr, mo + 1, 0).getDate()
          const todayD = new Date()
          const todayStr = `${todayD.getFullYear()}-${String(todayD.getMonth()+1).padStart(2,'0')}-${String(todayD.getDate()).padStart(2,'0')}`
          const cells = Array(firstDow).fill(null).concat(Array.from({ length: daysInMo }, (_, i) => i + 1))
          const toDayStr = (d) => `${yr}-${String(mo+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`
          const selectedData = calDay ? (calData[calDay] || {}) : null
          const durOptions = ['Nisam radio/la', 'Do 30 minuta', '1 sat', '2 sata', '3 sata', '4+ sata']

          const saveField = (field, value) => {
            const updated = { ...(calData[calDay] || {}), [field]: value }
            const newData = { ...calData, [calDay]: updated }
            setCalData(newData)
            try { localStorage.setItem('fy_calendar', JSON.stringify(newData)) } catch {}
          }

          return (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Kalendar</h2>
                <div className="flex items-center gap-2">
                  <button onClick={() => setCalMonth(new Date(yr, mo - 1, 1))}
                    className="w-8 h-8 rounded-lg border border-white/10 hover:border-white/25 flex items-center justify-center text-white/40 hover:text-white transition-all">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <span className="text-white font-medium text-sm min-w-[160px] text-center">{monthNames[mo]} {yr}</span>
                  <button onClick={() => setCalMonth(new Date(yr, mo + 1, 1))}
                    className="w-8 h-8 rounded-lg border border-white/10 hover:border-white/25 flex items-center justify-center text-white/40 hover:text-white transition-all">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="grid grid-cols-7 gap-1 mb-1">
                    {dayNames.map(d => (
                      <div key={d} className="text-center text-white/25 text-xs font-medium py-2">{d}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {cells.map((day, i) => {
                      if (!day) return <div key={`e-${i}`} />
                      const ds = toDayStr(day)
                      const isToday = ds === todayStr
                      const isSelected = ds === calDay
                      const hasData = !!(calData[ds]?.q1 || calData[ds]?.q2)
                      return (
                        <button key={ds} onClick={() => setCalDay(ds)}
                          className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all border text-sm font-medium
                            ${isSelected
                              ? 'bg-violet-500/25 border-violet-500/60 text-white'
                              : isToday
                              ? 'border-violet-500/40 text-violet-300 bg-violet-500/10'
                              : 'border-white/5 text-white/50 hover:border-white/20 hover:text-white/80 bg-white/[0.02]'}`}>
                          {day}
                          {hasData && <div className="w-1 h-1 rounded-full bg-violet-400" />}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {calDay ? (
                  <div className="lg:w-72 glass rounded-2xl p-5 border border-white/5 self-start">
                    <p className="text-white font-semibold mb-5 text-sm">
                      {new Date(calDay + 'T12:00:00').toLocaleDateString('sr-Latn', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </p>
                    <div className="space-y-5">
                      <div>
                        <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Šta si uradio danas?</p>
                        <textarea
                          value={selectedData?.q1 || ''}
                          onChange={(e) => saveField('q1', e.target.value)}
                          placeholder="Napiši šta si radio..."
                          rows={3}
                          className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white/70 placeholder-white/20 resize-none outline-none focus:border-violet-500/40 transition-colors leading-relaxed"
                        />
                      </div>
                      <div>
                        <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Koliko dugo si radio?</p>
                        <div className="grid grid-cols-2 gap-1.5">
                          {durOptions.map(opt => (
                            <button key={opt} onClick={() => saveField('q2', opt)}
                              className={`px-3 py-2 rounded-lg text-xs transition-all text-left border ${
                                selectedData?.q2 === opt
                                  ? 'bg-violet-500/20 border-violet-500/40 text-violet-300'
                                  : 'border-white/8 text-white/40 hover:border-white/20 hover:text-white/70'
                              }`}>
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="lg:w-72 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-center p-10">
                    <p className="text-white/20 text-sm text-center">Klikni na dan da upišeš beleške</p>
                  </div>
                )}
              </div>
            </div>
          )
        })()}

        {/* TAB: Kursevi */}
        {activeTab === 'kursevi' && (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-bold text-white">Kursevi</h2>
              <span className="text-xs text-white/30 border border-white/10 rounded-full px-2.5 py-1">uskoro</span>
            </div>
            <p className="text-white/30 text-sm">Kursevi prilagođeni tvom profilu koji ti pomažu da napraviš prvi korak ka karijeri. Uskoro dostupno.</p>
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

        {/* TAB: Plan razvoja (objasnjenje) */}
        {activeTab === 'plan' && (
          <div>
            <div className="relative rounded-3xl overflow-hidden mb-8 p-8 md:p-10"
              style={{ background: 'linear-gradient(135deg, #7c3aed22 0%, rgba(8,8,16,0.95) 60%)', border: '1px solid #7c3aed33' }}>
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, #7c3aed25 0%, transparent 70%)', filter: 'blur(30px)', transform: 'translate(20%, -20%)' }} />
              <div className="relative">
                <h3 className="text-xl md:text-2xl font-black text-white mb-3">Šta je Plan razvoja?</h3>
                <p className="text-white/55 text-sm leading-relaxed max-w-xl">
                  Nakon rezultata, većina ljudi i dalje ne zna odakle da krene. Plan razvoja pretvara tvoje rezultate u konkretne korake. Dobijaš zadatke, preporuke i izazove koje možeš da pratiš narednih dana i nedelja kako bi konačno znao kojim putem da kreneš i napravio prvi korak.
                </p>
              </div>
            </div>

            <div className="mb-2">
              <p className="text-white/30 text-xs uppercase tracking-widest mb-4">Odaberi plan</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="rounded-2xl p-6 border border-white/10 bg-white/[0.03]">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <p className="text-white/35 text-xs uppercase tracking-widest mb-1.5">Starter</p>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl font-black text-white">4.99€</span>
                        <span className="text-white/30 text-sm">/ mesec</span>
                      </div>
                    </div>
                    <div className="relative group">
                      <button className="w-7 h-7 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white/40 hover:text-white/70 hover:border-white/30 transition-all">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
                      </button>
                      <div className="absolute right-0 top-9 w-56 rounded-2xl p-4 border border-white/10 bg-[#0f0f1a] shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-20">
                        <p className="text-white/35 text-[10px] uppercase tracking-widest mb-3">Šta dobijaš</p>
                        <ul className="space-y-2">
                          {['7-dnevni akcioni plan', 'Personalizovani profil', 'Mapa napretka', 'Preporuke knjiga i podkasta'].map((f) => (
                            <li key={f} className="flex items-center gap-2 text-xs text-white/60">
                              <svg className="w-3 h-3 text-violet-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowPremiumModal(true)}
                    className="w-full py-3 rounded-xl font-semibold text-sm border border-violet-500/30 text-violet-300 hover:bg-violet-500/10 transition-all">
                    Odaberi
                  </button>
                </div>

                <div className="rounded-2xl p-6 border border-violet-500/30" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(37,99,235,0.08))' }}>
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <p className="text-violet-400 text-xs uppercase tracking-widest mb-1.5">Pro</p>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl font-black text-white">8.99€</span>
                        <span className="text-white/30 text-sm">/ mesec</span>
                      </div>
                    </div>
                    <div className="relative group">
                      <button className="w-7 h-7 rounded-full border border-violet-500/30 bg-violet-500/10 flex items-center justify-center text-violet-400 hover:text-violet-300 hover:border-violet-400/50 transition-all">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
                      </button>
                      <div className="absolute right-0 top-9 w-56 rounded-2xl p-4 border border-violet-500/20 bg-[#0f0f1a] shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-20">
                        <p className="text-violet-400/60 text-[10px] uppercase tracking-widest mb-3">Šta dobijaš</p>
                        <ul className="space-y-2">
                          {['Sve iz Starter plana', 'AI Chat mentor 24/7', 'Partnerske kompanije', 'Personalizovani kursevi', 'Praćenje napretka'].map((f) => (
                            <li key={f} className="flex items-center gap-2 text-xs text-white/60">
                              <svg className="w-3 h-3 text-violet-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowPremiumModal(true)}
                    className="w-full py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white transition-all shadow-lg shadow-violet-500/20">
                    Odaberi
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* TAB: Plan razvoja (mapa) */}
        {activeTab === 'mapa' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-black text-white mb-2">Mapa</h2>
              <p className="text-white/30 text-sm">Tvoja mapa puta kroz plan razvoja. Prati kuda ideš i uvek vidi gde si stao.</p>
            </div>

            {!isPosaoSegment ? (
              <div className="glass rounded-2xl p-8 text-center border border-violet-500/20 bg-violet-500/5">
                <div className="w-12 h-12 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" /></svg>
                </div>
                <p className="text-white font-semibold text-sm mb-2">Mapa je dostupna za segment Posao i karijera</p>
                <p className="text-white/40 text-xs mb-5">Uradi karijerski test da bi dobio/la svoju personalizovanu mapu puta.</p>
                <button onClick={onRetake} className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl transition-all">Uradi karijerski test</button>
              </div>
            ) : plan && plan.length > 0 ? (() => {
              const stops = [
                { chip: 'Polazna tačka', detail: `${type.name}. ${(type.tagline || '').split('.')[0]}.` },
                ...plan.map((t) => ({ chip: t.day, detail: t.action })),
                { chip: 'Cilj', detail: firstPath },
              ]
              const N = stops.length
              const cur = Math.max(0, Math.min(typeof mapPos === 'number' ? mapPos : 0, N - 1))
              const progress = Math.round((cur / (N - 1)) * 100)
              const setPos = (i) => { setMapPos(i); try { localStorage.setItem('fy_map_pos', JSON.stringify(i)) } catch {} }

              const leftX = 76, rightX = 284, topY = 62, gapY = 92
              const pts = stops.map((_, i) => ({ x: i % 2 === 0 ? leftX : rightX, y: topY + i * gapY }))
              const W = 360, H = topY + (N - 1) * gapY + 72
              let d = `M ${pts[0].x} ${pts[0].y}`
              for (let i = 1; i < N; i++) {
                const a = pts[i - 1], b = pts[i], my = (a.y + b.y) / 2
                d += ` C ${a.x} ${my}, ${b.x} ${my}, ${b.x} ${b.y}`
              }
              const clipH = pts[cur].y + 2
              const waves = [[58, 118], [300, 250], [50, 360], [312, 452], [60, 562], [300, 654], [150, 800]]

              return (
                <div className="relative">
                  <div className="flex items-center justify-between mb-3 max-w-md mx-auto">
                    <span className="text-white/50 text-xs">Dokle si stigao: <span className="text-white/80 font-medium">{stops[cur].chip}</span></span>
                    <span className="text-violet-400 text-xs font-semibold">{progress}%</span>
                  </div>

                  <div className="relative rounded-3xl overflow-hidden border border-white/8 mx-auto max-w-md"
                    style={{ background: 'radial-gradient(120% 80% at 50% 0%, rgba(124,58,237,0.12), rgba(8,8,16,0) 55%), #0a0a14' }}>
                    <svg viewBox={`0 0 ${W} ${H}`} className="w-full block">
                      <defs>
                        <clipPath id="fy-map-clip"><rect x="0" y="0" width={W} height={clipH} /></clipPath>
                      </defs>

                      {waves.map(([wx, wy], i) => (
                        <path key={`w${i}`} d={`M ${wx - 12} ${wy} q 6 -6 12 0 q 6 6 12 0`} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" strokeLinecap="round" />
                      ))}

                      {pts.map((p, i) => (
                        <ellipse key={`is${i}`} cx={p.x} cy={p.y + 21} rx="31" ry="8" fill="rgba(255,255,255,0.03)" />
                      ))}

                      <path d={d} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 13" />
                      <path d={d} fill="none" stroke="#a78bfa" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="2 13" clipPath="url(#fy-map-clip)" />

                      {(() => { const g = pts[N - 1]; return (
                        <g stroke={cur === N - 1 ? '#f59e0b' : 'rgba(255,255,255,0.28)'} strokeWidth="3" strokeLinecap="round">
                          <line x1={g.x + 30} y1={g.y - 11} x2={g.x + 43} y2={g.y + 2} />
                          <line x1={g.x + 43} y1={g.y - 11} x2={g.x + 30} y2={g.y + 2} />
                        </g>
                      ) })()}

                      {pts.map((p, i) => {
                        const isStart = i === 0, isGoal = i === N - 1
                        const visited = i < cur, isCur = i === cur
                        const goalReached = cur === N - 1
                        let fill = 'rgba(255,255,255,0.05)', stroke = 'rgba(255,255,255,0.14)', strokeW = 1
                        if (isGoal) { fill = goalReached ? '#f59e0b' : 'rgba(255,255,255,0.05)'; stroke = goalReached ? '#f59e0b' : 'rgba(255,255,255,0.16)' }
                        else if (isStart || visited) { fill = '#7c3aed'; stroke = '#7c3aed' }
                        else if (isCur) { fill = '#12121f'; stroke = '#a78bfa'; strokeW = 2 }
                        const r = isStart || isGoal ? 19 : 16
                        return (
                          <g key={`n${i}`} onClick={() => setPos(i)} style={{ cursor: 'pointer' }}>
                            {isCur && <circle cx={p.x} cy={p.y} r={r + 7} fill="none" stroke="#a78bfa" strokeWidth="1.5" opacity="0.5" className="animate-pulse" />}
                            <circle cx={p.x} cy={p.y} r={r} fill={fill} stroke={stroke} strokeWidth={strokeW} />
                            {isStart ? (
                              <path d={`M ${p.x - 5} ${p.y - 8} l 0 16 M ${p.x - 5} ${p.y - 8} l 11 3.5 l -11 4`} fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                            ) : isGoal ? (
                              <g fill="none" stroke={goalReached ? '#fff' : 'rgba(255,255,255,0.45)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x={p.x - 9} y={p.y - 2} width="18" height="11" rx="1.5" />
                                <path d={`M ${p.x - 9} ${p.y - 2} q 9 -8 18 0`} />
                                <line x1={p.x} y1={p.y - 1} x2={p.x} y2={p.y + 9} />
                              </g>
                            ) : (
                              <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="13" fontWeight="700" fill={visited ? '#fff' : isCur ? '#c4b5fd' : 'rgba(255,255,255,0.35)'}>{i}</text>
                            )}
                            {isCur && (
                              <g>
                                <rect x={p.x - 35} y={p.y - r - 31} width="70" height="20" rx="10" fill="#7c3aed" />
                                <text x={p.x} y={p.y - r - 17} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">Ti si ovde</text>
                                <path d={`M ${p.x - 4} ${p.y - r - 11} l 4 5 l 4 -5`} fill="#7c3aed" />
                              </g>
                            )}
                          </g>
                        )
                      })}

                      <g transform={`translate(${W - 46} ${H - 46})`} opacity="0.55">
                        <circle cx="0" cy="0" r="21" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                        <path d="M 0 -15 L 4 0 L 0 15 L -4 0 Z" fill="#a78bfa" />
                        <path d="M -15 0 L 0 -4 L 15 0 L 0 4 Z" fill="rgba(255,255,255,0.3)" />
                        <text x="0" y="-23" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.55)">S</text>
                        <text x="0" y="30" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.4)">J</text>
                        <text x="26" y="3" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.4)">I</text>
                        <text x="-26" y="3" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.4)">Z</text>
                      </g>
                    </svg>
                  </div>

                  <div className="mt-4 max-w-md mx-auto rounded-2xl border border-violet-500/20 p-4" style={{ background: 'rgba(124,58,237,0.06)' }}>
                    <span className="text-violet-400 text-[10px] font-bold uppercase tracking-widest">{stops[cur].chip}</span>
                    <p className="text-white/70 text-sm leading-relaxed mt-1">{stops[cur].detail}</p>
                  </div>
                  <p className="text-white/25 text-xs text-center mt-3">Tapni stanicu na mapi da označiš dokle si stigao.</p>
                </div>
              )
            })() : (
              <div className="glass rounded-2xl p-8 text-center border border-white/5">
                <p className="text-white/40 text-sm mb-4">Uradi test da bi dobio/la svoju mapu puta.</p>
                <button onClick={onRetake} className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl transition-all">Uradi test</button>
              </div>
            )}
          </div>
        )}

        {/* TAB: Plan razvoja (zadaci) */}
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

              {/* Moji podaci */}
              {profileForm && (
                <div className="glass rounded-2xl p-6 border border-white/5">
                  <p className="text-white font-medium text-sm mb-4">Moji podaci</p>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-white/30 text-xs uppercase tracking-widest mb-1.5 block">Ime i prezime</label>
                        <input value={profileForm.fullName} onChange={e => setProfileForm(p => ({ ...p, fullName: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-violet-500/50 transition-all" />
                      </div>
                      <div>
                        <label className="text-white/30 text-xs uppercase tracking-widest mb-1.5 block">Broj godina</label>
                        <input type="number" value={profileForm.age} onChange={e => setProfileForm(p => ({ ...p, age: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-violet-500/50 transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="text-white/30 text-xs uppercase tracking-widest mb-1.5 block">Grad</label>
                      <input value={profileForm.city} onChange={e => setProfileForm(p => ({ ...p, city: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-violet-500/50 transition-all" />
                    </div>
                    <div>
                      <label className="text-white/30 text-xs uppercase tracking-widest mb-1.5 block">Broj telefona</label>
                      <input value={profileForm.phone} onChange={e => setProfileForm(p => ({ ...p, phone: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-violet-500/50 transition-all" />
                    </div>
                    <div>
                      <label className="text-white/30 text-xs uppercase tracking-widest mb-1.5 block">Email</label>
                      <div className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-3 text-white/35 text-sm flex items-center justify-between">
                        <span>{user?.email}</span>
                        <span className="text-white/15 text-xs">nije moguće menjati</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-white/30 text-xs uppercase tracking-widest mb-1.5 block">Zašto si došao/la na naš sajt?</label>
                      <textarea value={profileForm.comment} onChange={e => setProfileForm(p => ({ ...p, comment: e.target.value }))}
                        rows={2} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-violet-500/50 transition-all resize-none" />
                    </div>
                    {profileSaved ? (
                      <div className="flex items-center gap-2 text-green-400 text-sm">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        Sačuvano
                      </div>
                    ) : (
                      <button disabled={profileSaving} onClick={async () => {
                        setProfileSaving(true)
                        await upsertProfile(user.id, profileForm)
                        setProfile(prev => ({ ...prev, full_name: profileForm.fullName, age: profileForm.age, phone: profileForm.phone, city: profileForm.city, comment: profileForm.comment }))
                        setProfileSaving(false)
                        setProfileSaved(true)
                        setTimeout(() => setProfileSaved(false), 3000)
                      }}
                        className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl transition-all">
                        {profileSaving ? 'Čuvanje...' : 'Sačuvaj izmene'}
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div className="glass rounded-2xl p-6 border border-white/5">
                <p className="text-white font-medium text-sm mb-1">Uradi test ponovo</p>
                <p className="text-white/40 text-xs mb-4">Počni novi test i dobij ažurirane rezultate.</p>
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
          <p className="text-white/30 text-sm mb-1">{d.welcome}, <span className="text-white/60 font-medium">{profile?.full_name?.split(' ')[0] || shortEmail}</span></p>
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
            <p className="text-white/55 text-sm leading-relaxed mb-4">{type.tagline}</p>
            {type.jobs && type.jobs.length > 0 && (
              <div>
                <p className="text-white/30 text-xs uppercase tracking-widest mb-2">Možeš da radiš kao</p>
                <div className="flex flex-wrap gap-2">
                  {type.jobs.map(job => (
                    <span key={job} className="px-3 py-1 rounded-lg text-xs font-medium border"
                      style={{ color: type.color, borderColor: `${type.color}30`, background: `${type.color}10` }}>
                      {job}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dimensions */}
        <div className="glass rounded-2xl p-6 mb-6">
          <h2 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest opacity-60">{r.dimensionsLabel}</h2>
          <div className="space-y-4">
            {topDims.map((dim) => (
              <div key={dim.key}>
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="text-white/70 text-sm w-32 flex-shrink-0">{r.dimNames[dim.key]}</span>
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${Math.round((dim.val / maxDimVal) * 100)}%`, background: `linear-gradient(90deg, ${dimColors[dim.key]}, ${dimColors[dim.key]}88)` }} />
                  </div>
                  <span className="text-white/40 text-xs w-8 text-right">{Math.round((dim.val / maxDimVal) * 100)}%</span>
                </div>
                {dimDescriptions?.sr?.[dim.key] && (
                  <p className="text-white/35 text-xs leading-relaxed pl-[9.5rem]">{dimDescriptions.sr[dim.key]}</p>
                )}
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
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-1.5">
                  <div className="h-full rounded-full"
                    style={{ width: `${c.percent}%`, background: i === 0 ? 'linear-gradient(90deg, #7c3aed, #2563eb)' : `linear-gradient(90deg, ${type.color}99, ${type.color}44)` }} />
                </div>
                {c.desc && <p className="text-white/35 text-xs leading-relaxed">{c.desc}</p>}
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

    </div>
  )
}
