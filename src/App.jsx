import { useState } from 'react'
import LandingPage from './components/Landing/LandingPage'
import OnboardingTest from './components/Onboarding/OnboardingTest'
import ResultPage from './components/Results/ResultPage'

export default function App() {
  const [page, setPage] = useState('landing') // 'landing' | 'onboarding' | 'results'
  const [answers, setAnswers] = useState([])

  const handleStartJourney = () => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setPage('onboarding')
  }

  const handleComplete = (finalAnswers) => {
    setAnswers(finalAnswers)
    window.scrollTo({ top: 0, behavior: 'instant' })
    setPage('results')
  }

  const handleRestart = () => {
    setAnswers([])
    window.scrollTo({ top: 0, behavior: 'instant' })
    setPage('landing')
  }

  return (
    <div className="min-h-screen bg-[#080810]">
      {page === 'landing' && (
        <LandingPage onStart={handleStartJourney} />
      )}
      {page === 'onboarding' && (
        <OnboardingTest onComplete={handleComplete} onBack={() => setPage('landing')} />
      )}
      {page === 'results' && (
        <ResultPage answers={answers} onRestart={handleRestart} />
      )}
    </div>
  )
}
