import { useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { useLenis } from './hooks/useLenis'
import LandingPage from './components/Landing/LandingPage'
import SegmentSelector from './components/Onboarding/SegmentSelector'
import OnboardingTest from './components/Onboarding/OnboardingTest'
import ResultPage from './components/Results/ResultPage'
import SegmentResultPage from './components/Results/SegmentResultPage'
import Dashboard from './components/Dashboard/Dashboard'

export default function App() {
  const { user } = useAuth()
  useLenis()
  const [page, setPage] = useState('landing') // 'landing' | 'segment-select' | 'onboarding' | 'results' | 'dashboard'
  const [segment, setSegment] = useState('posao') // 'posao' | 'srednja' | 'fakultet'
  const [answers, setAnswers] = useState([])
  const [resumeFrom, setResumeFrom] = useState(null)

  useEffect(() => {
    if (!user && page === 'dashboard') {
      setPage('landing')
    }
  }, [user])

  const hasProgress = () => {
    try {
      const raw = localStorage.getItem('fy_progress')
      if (!raw) return false
      const { answers: saved } = JSON.parse(raw)
      return saved && saved.length > 0
    } catch { return false }
  }

  const handleStartJourney = () => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    // Ako ima sačuvan napredak za posao segment, nastavi
    try {
      const raw = localStorage.getItem('fy_progress')
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed.segment && parsed.segment !== 'posao') {
          // Ima napredak za drugi segment — idi na selektor
          setPage('segment-select')
          return
        }
        if (parsed.answers?.length > 0) {
          setAnswers(parsed.answers || [])
          setResumeFrom(parsed.current || 0)
          setSegment(parsed.segment || 'posao')
          setPage('onboarding')
          return
        }
      }
    } catch {}
    setPage('segment-select')
  }

  const handleSelectSegment = (selectedSegment) => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setSegment(selectedSegment)
    setAnswers([])
    setResumeFrom(null)
    setPage('onboarding')
  }

  const handleComplete = (finalAnswers) => {
    setAnswers(finalAnswers)
    localStorage.setItem('fy_results', JSON.stringify({ answers: finalAnswers, segment }))
    localStorage.removeItem('fy_progress')
    setResumeFrom(null)
    window.scrollTo({ top: 0, behavior: 'instant' })
    setPage('results')
  }

  const handleRestart = () => {
    setAnswers([])
    setResumeFrom(null)
    setSegment('posao')
    localStorage.removeItem('fy_results')
    localStorage.removeItem('fy_progress')
    window.scrollTo({ top: 0, behavior: 'instant' })
    setPage('landing')
  }

  const handleRetake = () => {
    setAnswers([])
    setResumeFrom(null)
    localStorage.removeItem('fy_results')
    localStorage.removeItem('fy_progress')
    window.scrollTo({ top: 0, behavior: 'instant' })
    setPage('segment-select')
  }

  const handleGoToDashboard = () => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setPage('dashboard')
  }

  const saveProgress = (currentIdx, currentAnswers) => {
    try {
      localStorage.setItem('fy_progress', JSON.stringify({
        current: currentIdx,
        answers: currentAnswers,
        segment,
      }))
    } catch {}
  }

  return (
    <div className="min-h-screen bg-[#080810]">
      {page === 'landing' && (
        <LandingPage
          onStart={handleStartJourney}
          hasProgress={hasProgress()}
          onDashboard={user ? handleGoToDashboard : null}
        />
      )}
      {page === 'segment-select' && (
        <SegmentSelector
          onSelect={handleSelectSegment}
          onBack={() => setPage('landing')}
        />
      )}
      {page === 'onboarding' && (
        <OnboardingTest
          onComplete={handleComplete}
          onBack={() => setPage('segment-select')}
          initialAnswers={answers}
          initialCurrent={resumeFrom || 0}
          segment={segment}
        />
      )}
      {page === 'results' && segment !== 'posao' && (
        <SegmentResultPage
          answers={answers}
          segment={segment}
          onRestart={handleRestart}
        />
      )}
      {page === 'results' && segment === 'posao' && (
        <ResultPage
          answers={answers}
          onRestart={handleRestart}
          onDashboard={user ? handleGoToDashboard : null}
        />
      )}
      {page === 'dashboard' && (
        <Dashboard
          onRetake={handleRetake}
          onGoToLanding={() => {
            window.scrollTo({ top: 0, behavior: 'instant' })
            setPage('landing')
          }}
        />
      )}
    </div>
  )
}
