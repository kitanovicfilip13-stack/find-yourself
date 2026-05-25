import { useState } from 'react'
import { useAuth } from '../../AuthContext'
import { useLanguage } from '../../LanguageContext'

export default function AuthModal({ onClose }) {
  const { signIn, signUp } = useAuth()
  const { lang } = useLanguage()
  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const text = {
    en: {
      signin: 'Sign in',
      signup: 'Create account',
      email: 'Email',
      password: 'Password',
      noAccount: "Don't have an account?",
      hasAccount: 'Already have an account?',
      createLink: 'Create one',
      signinLink: 'Sign in',
      confirm: 'Check your email to confirm your account.',
      errors: {
        'Invalid login credentials': 'Wrong email or password.',
        'User already registered': 'This email is already registered.',
        'Password should be at least 6 characters': 'Password must be at least 6 characters.',
      },
    },
    sr: {
      signin: 'Prijava',
      signup: 'Napravi nalog',
      email: 'Email',
      password: 'Lozinka',
      noAccount: 'Nemaš nalog?',
      hasAccount: 'Već imaš nalog?',
      createLink: 'Napravi',
      signinLink: 'Prijavi se',
      confirm: 'Proveri email da potvrdiš nalog.',
      errors: {
        'Invalid login credentials': 'Pogrešan email ili lozinka.',
        'User already registered': 'Ovaj email je već registrovan.',
        'Password should be at least 6 characters': 'Lozinka mora imati najmanje 6 karaktera.',
      },
    },
  }

  const t = text[lang] || text.en

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { data, error: authError } = mode === 'signin'
      ? await signIn(email, password)
      : await signUp(email, password)

    setLoading(false)

    if (authError) {
      setError(t.errors[authError.message] || authError.message)
      return
    }

    if (mode === 'signup') {
      setSuccess(true)
    } else {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md glass rounded-3xl border border-white/10 p-8 shadow-2xl shadow-black/50">
        {/* Close */}
        <button onClick={onClose} className="absolute top-5 right-5 text-white/30 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <img src="/logo.png" alt="logo" className="w-8 h-8" />
          <span className="text-white font-semibold">{lang === 'sr' ? 'Pronađi Sebe' : 'Find Yourself'}</span>
        </div>

        {success ? (
          <div className="text-center py-6">
            <div className="text-4xl mb-4">📬</div>
            <p className="text-white font-semibold text-lg mb-2">{t.confirm}</p>
            <button onClick={onClose} className="mt-4 text-violet-400 text-sm hover:text-violet-300 transition-colors">
              {lang === 'sr' ? 'Zatvori' : 'Close'}
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-white mb-6">
              {mode === 'signin' ? t.signin : t.signup}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-white/50 text-xs uppercase tracking-widest mb-2 block">{t.email}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="text-white/50 text-xs uppercase tracking-widest mb-2 block">{t.password}</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm px-1">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-violet-600 hover:bg-violet-500 disabled:bg-violet-600/50 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/20 text-sm mt-2"
              >
                {loading ? '...' : (mode === 'signin' ? t.signin : t.signup)}
              </button>
            </form>

            <p className="text-white/30 text-sm text-center mt-6">
              {mode === 'signin' ? t.noAccount : t.hasAccount}{' '}
              <button
                onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError('') }}
                className="text-violet-400 hover:text-violet-300 transition-colors"
              >
                {mode === 'signin' ? t.createLink : t.signinLink}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
