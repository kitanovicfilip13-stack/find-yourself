import { useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { useLenis } from './hooks/useLenis'
import LandingPage from './components/Landing/LandingPage'
import SegmentSelector from './components/Onboarding/SegmentSelector'
import OnboardingSetup from './components/Onboarding/OnboardingSetup'
import OnboardingTest from './components/Onboarding/OnboardingTest'
import ResultPage from './components/Results/ResultPage'
import SegmentResultPage from './components/Results/SegmentResultPage'
import Dashboard from './components/Dashboard/Dashboard'

export default function App() {
  const { user } = useAuth()
  useLenis()
  const [page, setPage] = useState('landing')
  const [segment, setSegment] = useState('posao')
  const [userInfo, setUserInfo] = useState(null)
  const [answers, setAnswers] = useState([])
  const [resumeFrom, setResumeFrom] = useState(null)

  useEffect(() => {
    if (!user && page === 'dashboard') setPage('landing')
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
    if (user) {
      // Već ulogovan — idi direktno na segment ili nastavi
      try {
        const raw = localStorage.getItem('fy_progress')
        if (raw) {
          const parsed = JSON.parse(raw)
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
    } else {
      setPage('segment-select')
    }
  }

  const handleSelectSegment = (selectedSegment) => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setSegment(selectedSegment)
    setAnswers([])
    setResumeFrom(null)
    if (user) {
      // Već ulogovan — preskoči setup
      setPage('onboarding')
    } else {
      setPage('setup')
    }
  }

  const handleSetupDone = (info) => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setUserInfo(info)
    setPage('onboarding')
  }

  const handleComplete = (finalAnswers) => {
    setAnswers(finalAnswers)
    localStorage.setItem('fy_results', JSON.stringify({
      answers: finalAnswers, segment,
      city: userInfo?.city || null,
      userInfo,
    }))
    localStorage.removeItem('fy_progress')
    setResumeFrom(null)
    window.scrollTo({ top: 0, behavior: 'instant' })
    setPage('results')
  }

  const handleRestart = () => {
    setAnswers([])
    setResumeFrom(null)
    setSegment('posao')
    setUserInfo(null)
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
      {page === 'setup' && (
        <OnboardingSetup
          segment={segment}
          onNext={handleSetupDone}
          onBack={() => setPage('segment-select')}
        />
      )}
      {page === 'onboarding' && (
        <OnboardingTest
          onComplete={handleComplete}
          onBack={() => user ? setPage('segment-select') : setPage('setup')}
          initialAnswers={answers}
          initialCurrent={resumeFrom || 0}
          segment={segment}
        />
      )}
      {page === 'results' && segment !== 'posao' && (
        <SegmentResultPage
          answers={answers}
          segment={segment}
          city={userInfo?.city || null}
          userInfo={userInfo}
          onRestart={handleRestart}
          onDashboard={handleGoToDashboard}
        />
      )}
      {page === 'results' && segment === 'posao' && (
        <ResultPage
          answers={answers}
          userInfo={userInfo}
          onRestart={handleRestart}
          onDashboard={handleGoToDashboard}
        />
      )}
      {page === 'dashboard' && (
        <Dashboard
          onRetake={handleRetake}
          onGoToLanding={() => {
            window.scrollTo({ top: 0, behavior: 'instant' })
            setPage('landing')
          }}
          onViewResult={(savedAnswers, savedSegment) => {
            setAnswers(savedAnswers)
            setSegment(savedSegment || 'posao')
            window.scrollTo({ top: 0, behavior: 'instant' })
            setPage('results')
          }}
        />
      )}
    </div>
  )
}
