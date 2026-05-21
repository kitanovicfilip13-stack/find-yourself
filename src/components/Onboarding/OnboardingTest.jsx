import { useState } from 'react'
import { useLanguage } from '../../LanguageContext'
import { getQuestions } from '../../i18n/questions'

export default function OnboardingTest({ onComplete, onBack }) {
  const { t, lang } = useLanguage()
  const questions = getQuestions(lang)
  const ui = t.onboarding

  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState([])
  const [selected, setSelected] = useState(null)
  const [direction, setDirection] = useState(1)
  const [animating, setAnimating] = useState(false)

  const question = questions[current]
  const progress = (current / questions.length) * 100

  const handleSelect = (optionIndex) => {
    if (animating) return
    setSelected(optionIndex)
  }

  const handleNext = () => {
    if (selected === null || animating) return
    const newAnswers = [...answers, {
      questionId: question.id,
      selectedOption: selected,
      scores: question.options[selected].scores,
    }]
    if (current === questions.length - 1) {
      onComplete(newAnswers)
      return
    }
    setAnimating(true)
    setDirection(1)
    setTimeout(() => {
      setAnswers(newAnswers)
      setCurrent((c) => c + 1)
      setSelected(null)
      setAnimating(false)
    }, 250)
  }

  const handleBack = () => {
    if (current === 0) { onBack(); return }
    if (animating) return
    setAnimating(true)
    setDirection(-1)
    setTimeout(() => {
      setCurrent((c) => c - 1)
      setSelected(answers[current - 1]?.selectedOption ?? null)
      setAnswers((a) => a.slice(0, -1))
      setAnimating(false)
    }, 250)
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#080810' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
        <button onClick={handleBack} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          {ui.back}
        </button>

        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">{lang === 'sr' ? 'P' : 'F'}</span>
          </div>
          <span className="text-white/50 text-sm">{ui.brand}</span>
        </div>

        <span className="text-white/30 text-sm font-mono">{current + 1} / {questions.length}</span>
      </div>

      {/* Progress bar */}
      <div className="h-[2px] bg-white/5">
        <div className="h-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #7c3aed, #2563eb)' }} />
      </div>

      {/* Question area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl transition-all duration-250"
          style={{ opacity: animating ? 0 : 1, transform: animating ? `translateX(${direction * -20}px)` : 'translateX(0)' }}>

          {/* Category badge + dots */}
          <div className="mb-6 flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-medium text-violet-300 border border-violet-500/20 bg-violet-500/10 uppercase tracking-widest">
              {question.category}
            </span>
            <div className="flex gap-1">
              {questions.map((_, i) => (
                <div key={i} className="h-1 rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? '16px' : '4px',
                    background: i < current ? '#7c3aed' : i === current ? 'linear-gradient(90deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.1)',
                  }} />
              ))}
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-snug">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, i) => (
              <button key={i} onClick={() => handleSelect(i)}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 group ${
                  selected === i
                    ? 'border-violet-500/60 bg-violet-500/15 text-white shadow-lg shadow-violet-500/10'
                    : 'border-white/8 bg-white/[0.03] text-white/60 hover:border-white/20 hover:bg-white/[0.05] hover:text-white/90'
                }`}>
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 transition-all duration-200 ${
                    selected === i ? 'border-violet-400 bg-violet-500' : 'border-white/20'
                  }`}>
                    {selected === i && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm md:text-base leading-relaxed">{option.text}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button onClick={handleNext} disabled={selected === null}
              className={`flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                selected !== null
                  ? 'bg-violet-600 hover:bg-violet-500 text-white hover:shadow-lg hover:shadow-violet-500/25 hover:-translate-y-0.5'
                  : 'bg-white/5 text-white/20 cursor-not-allowed'
              }`}>
              {current === questions.length - 1 ? ui.seeResults : ui.continue}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
