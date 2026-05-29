import { useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { useLenis } from './hooks/useLenis'
import LandingPage from './components/Landing/LandingPage'
import OnboardingTest from './components/Onboarding/OnboardingTest'
import ResultPage from './components/Results/ResultPage'
import Dashboard from './components/Dashboard/Dashboard'

export default function App() {
  const { user } = useAuth()
  useLenis()
  const [page, setPage] = useState('landing') // 'landing' | 'onboarding' | 'results' | 'dashboard'
  const [answers, setAnswers] = useState([])
  const [resumeFrom, setResumeFrom] = useState(null) // za "nastavi" test

  // Kad se korisnik odjavi dok je na dashboardu — vrati na landing
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
    // Ako ima sačuvan napredak, nastavi odakle je stao
    try {
      const raw = localStorage.getItem('fy_progress')
      if (raw) {
        const { answers: saved, current } = JSON.parse(raw)
        setAnswers(saved || [])
        setResumeFrom(current || 0)
      } else {
        setAnswers([])
        setResumeFrom(null)
      }
    } catch {
      setAnswers([])
      setResumeFrom(null)
    }
    setPage('onboarding')
  }

  const handleComplete = (finalAnswers) => {
    setAnswers(finalAnswers)
    // Sačuvaj rezultate u localStorage
    localStorage.setItem('fy_results', JSON.stringify(finalAnswers))
    localStorage.removeItem('fy_progress')
    setResumeFrom(null)
    window.scrollTo({ top: 0, behavior: 'instant' })
    setPage('results')
  }

  const handleRestart = () => {
    setAnswers([])
    setResumeFrom(null)
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
    setPage('onboarding')
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
      {page === 'onboarding' && (
        <OnboardingTest
          onComplete={handleComplete}
          onBack={() => setPage('landing')}
          initialAnswers={answers}
          initialCurrent={resumeFrom || 0}
        />
      )}
      {page === 'results' && (
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
