import { useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { useLenis } from './hooks/useLenis'
import LandingPage from './components/Landing/LandingPage'
import SegmentSelector from './components/Onboarding/SegmentSelector'
import CitySelector from './components/Onboarding/CitySelector'
import OnboardingTest from './components/Onboarding/OnboardingTest'
import ResultPage from './components/Results/ResultPage'
import SegmentResultPage from './components/Results/SegmentResultPage'
import Dashboard from './components/Dashboard/Dashboard'

export default function App() {
  const { user } = useAuth()
  useLenis()
  const [page, setPage] = useState('landing')
  const [segment, setSegment] = useState('posao')
  const [city, setCity] = useState('Beograd')
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
    try {
      const raw = localStorage.getItem('fy_progress')
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed.answers?.length > 0) {
          setAnswers(parsed.answers || [])
          setResumeFrom(parsed.current || 0)
          setSegment(parsed.segment || 'posao')
          setCity(parsed.city || 'Beograd')
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
    if (selectedSegment === 'posao') {
      setPage('onboarding')
    } else {
      setPage('city-select')
    }
  }

  const handleSelectCity = (selectedCity) => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setCity(selectedCity)
    setPage('onboarding')
  }

  const handleComplete = (finalAnswers) => {
    setAnswers(finalAnswers)
    localStorage.setItem('fy_results', JSON.stringify({ answers: finalAnswers, segment, city }))
    localStorage.removeItem('fy_progress')
    setResumeFrom(null)
    window.scrollTo({ top: 0, behavior: 'instant' })
    setPage('results')
  }

  const handleRestart = () => {
    setAnswers([])
    setResumeFrom(null)
    setSegment('posao')
    setCity('Beograd')
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
      {page === 'city-select' && (
        <CitySelector
          segment={segment}
          onSelect={handleSelectCity}
          onBack={() => setPage('segment-select')}
        />
      )}
      {page === 'onboarding' && (
        <OnboardingTest
          onComplete={handleComplete}
          onBack={() => segment === 'posao' ? setPage('segment-select') : setPage('city-select')}
          initialAnswers={answers}
          initialCurrent={resumeFrom || 0}
          segment={segment}
        />
      )}
      {page === 'results' && segment !== 'posao' && (
        <SegmentResultPage
          answers={answers}
          segment={segment}
          city={city}
          onRestart={handleRestart}
          onDashboard={user ? handleGoToDashboard : null}
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
