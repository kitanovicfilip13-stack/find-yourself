import { useState } from 'react'
import { useLanguage } from '../../LanguageContext'
import { getQuestions } from '../../i18n/questions'
import { scoreFromText } from '../../i18n/keywordScoring'

export default function OnboardingTest({ onComplete, onBack, initialAnswers = [], initialCurrent = 0, segment = 'posao' }) {
  const { t, lang } = useLanguage()
  const questions = getQuestions(lang, segment)
  const ui = t.onboarding

  const [current, setCurrent] = useState(initialCurrent)
  const [answers, setAnswers] = useState(initialAnswers)
  const [selected, setSelected] = useState(initialAnswers[initialCurrent]?.selectedOptions ?? [])
  const [customText, setCustomText] = useState(initialAnswers[initialCurrent]?.customText || '')
  const [direction, setDirection] = useState(1)
  const [animating, setAnimating] = useState(false)

  const question = questions[current]
  const progress = (current / questions.length) * 100

  const canContinue = selected.length > 0 || customText.trim().length >= 3

  const handleSelect = (optionIndex) => {
    if (animating) return
    setSelected(prev =>
      prev.includes(optionIndex)
        ? prev.filter(i => i !== optionIndex)
        : [...prev, optionIndex]
    )
  }

  const buildAnswer = () => {
    let scores = {}

    // Akumuliraj skorove iz svih odabranih opcija
    selected.forEach(idx => {
      const optionScores = question.options[idx].scores
      Object.entries(optionScores).forEach(([k, v]) => {
        scores[k] = (scores[k] || 0) + v
      })
    })

    // Score iz slobodnog teksta
    if (customText.trim().length >= 3) {
      const textScores = scoreFromText(customText)
      if (textScores) {
        Object.entries(textScores).forEach(([k, v]) => {
          scores[k] = (scores[k] || 0) + v
        })
      }
    }

    return {
      questionId: question.id,
      selectedOptions: selected,
      selectedOption: selected[0] ?? null, // backwards compat
      customText: customText.trim() || null,
      scores,
    }
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

  const handleNext = () => {
    if (!canContinue || animating) return
    const newAnswer = buildAnswer()
    const newAnswers = [...answers, newAnswer]

    if (current === questions.length - 1) {
      onComplete(newAnswers)
      return
    }

    setAnimating(true)
    setDirection(1)
    setTimeout(() => {
      setAnswers(newAnswers)
      const nextIdx = current + 1
      setCurrent(nextIdx)
      setSelected([])
      setCustomText('')
      setAnimating(false)
      saveProgress(nextIdx, newAnswers)
    }, 250)
  }

  const handleBack = () => {
    if (current === 0) { onBack(); return }
    if (animating) return
    setAnimating(true)
    setDirection(-1)
    setTimeout(() => {
      setCurrent((c) => c - 1)
      const prev = answers[current - 1]
      setSelected(prev?.selectedOptions ?? (prev?.selectedOption != null ? [prev.selectedOption] : []))
      setCustomText(prev?.customText || '')
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
          <img src="/logo.png" alt="logo" className="w-5 h-5" />
          <span className="text-white/50 text-sm">{ui.brand}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-white/30 text-sm font-mono">{current + 1} / {questions.length}</span>
          <button
            onClick={() => {
              const dummyAnswers = questions.map(q => ({
                questionId: q.id,
                selectedOptions: [0],
                selectedOption: 0,
                customText: null,
                scores: q.options[0].scores,
              }))
              onComplete(dummyAnswers)
            }}
            className="text-white/15 hover:text-white/40 text-xs transition-colors border border-white/10 rounded-lg px-2 py-1"
          >
            skip
          </button>
        </div>
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

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-snug">
            {question.question}
          </h2>
          <p className="text-white/30 text-xs mb-6">Možeš odabrati više odgovora</p>

          {/* Opcije (checkboxovi) */}
          <div className="space-y-3">
            {question.options.map((option, i) => {
              const isSelected = selected.includes(i)
              return (
                <button key={i} onClick={() => handleSelect(i)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 ${
                    isSelected
                      ? 'border-violet-500/60 bg-violet-500/15 text-white shadow-lg shadow-violet-500/10'
                      : 'border-white/8 bg-white/[0.03] text-white/60 hover:border-white/20 hover:bg-white/[0.05] hover:text-white/90'
                  }`}>
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center mt-0.5 transition-all duration-200 ${
                      isSelected ? 'border-violet-400 bg-violet-500' : 'border-white/20'
                    }`}>
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm md:text-base leading-relaxed">{option.text}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Slobodan odgovor */}
          <div className="mt-4 relative">
            <div className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              customText.trim().length >= 3
                ? 'border-violet-500/40 bg-violet-500/8'
                : 'border-white/8 bg-white/[0.02]'
            }`}>
              <div className="flex items-center gap-3 px-5 pt-4 pb-1">
                <div className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                  customText.trim().length >= 3
                    ? 'border-violet-400 bg-violet-500'
                    : 'border-white/20'
                }`}>
                  {customText.trim().length >= 3 && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className="text-white/30 text-xs uppercase tracking-widest">{ui.customLabel}</span>
              </div>
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder={ui.customPlaceholder}
                rows={2}
                className="w-full bg-transparent px-5 pb-4 pt-2 text-sm text-white/70 placeholder-white/20 resize-none outline-none leading-relaxed"
              />
            </div>
            {customText.trim().length >= 3 && (
              <p className="text-white/25 text-xs mt-2 px-1">{ui.customHint}</p>
            )}
          </div>

          {/* Continue dugme */}
          <div className="mt-6 flex justify-end">
            <button onClick={handleNext} disabled={!canContinue}
              className={`flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                canContinue
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
