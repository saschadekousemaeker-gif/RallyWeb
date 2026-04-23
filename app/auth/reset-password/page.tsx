'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

type Step = 'verifying' | 'form' | 'success' | 'error'

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [step, setStep] = useState<Step>('verifying')
  const [errorMsg, setErrorMsg] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type')

    if (!token_hash || type !== 'recovery') {
      setErrorMsg('Invalid or missing reset link.')
      setStep('error')
      return
    }

    supabase.auth
      .verifyOtp({ token_hash, type: 'recovery' })
      .then(({ error }) => {
        if (error) {
          setErrorMsg(error.message)
          setStep('error')
        } else {
          setStep('form')
        }
      })
  }, [searchParams])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (password !== confirm) {
      setErrorMsg('Passwords do not match.')
      return
    }
    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters.')
      return
    }

    setErrorMsg('')
    setSubmitting(true)

    const { error } = await supabase.auth.updateUser({ password })

    setSubmitting(false)

    if (error) {
      setErrorMsg(error.message)
    } else {
      setStep('success')
    }
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col">
      <header className="max-w-[480px] w-full mx-auto px-5 pt-6 pb-2">
        <a href="https://rallyrating.app" className="text-2xl font-black tracking-tight">
          <span className="text-white">RALL</span>
          <span className="text-[#CCFF00]">Y</span>
        </a>
      </header>

      <main className="max-w-[480px] w-full mx-auto px-5 pt-12 pb-10 flex flex-col gap-6">
        {step === 'verifying' && (
          <p className="text-[#888888] text-sm text-center">Verifying your link…</p>
        )}

        {step === 'error' && (
          <div className="flex flex-col gap-4 items-center text-center">
            <h1 className="text-white text-2xl font-bold">Link expired</h1>
            <p className="text-[#888888] text-sm">{errorMsg}</p>
            <a
              href="/"
              className="text-[#CCFF00] text-sm font-semibold hover:opacity-80 transition-opacity"
            >
              Back to Rally
            </a>
          </div>
        )}

        {step === 'form' && (
          <>
            <div className="flex flex-col gap-1">
              <h1 className="text-white text-2xl font-bold">Set new password</h1>
              <p className="text-[#888888] text-sm">Choose a password you haven't used before.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#888888] text-xs font-semibold tracking-widest uppercase">
                  New password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  placeholder="Min. 8 characters"
                  className="bg-[#1A1A1A] text-white text-sm px-4 py-3 rounded-xl border border-[#2A2A2A] focus:outline-none focus:border-[#CCFF00] placeholder:text-[#444444] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#888888] text-xs font-semibold tracking-widest uppercase">
                  Confirm password
                </label>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => {
                    setConfirm(e.target.value)
                    setErrorMsg('')
                  }}
                  required
                  autoComplete="new-password"
                  placeholder="Repeat password"
                  className="bg-[#1A1A1A] text-white text-sm px-4 py-3 rounded-xl border border-[#2A2A2A] focus:outline-none focus:border-[#CCFF00] placeholder:text-[#444444] transition-colors"
                />
              </div>

              {errorMsg && (
                <p className="text-[#888888] text-sm">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="bg-[#CCFF00] text-black font-bold text-sm px-8 py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
              >
                {submitting ? 'Updating…' : 'Update password'}
              </button>
            </form>
          </>
        )}

        {step === 'success' && (
          <div className="flex flex-col gap-4 items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#1A1A1A] border-2 border-[#CCFF00] flex items-center justify-center">
              <span className="text-[#CCFF00] text-2xl font-bold">✓</span>
            </div>
            <h1 className="text-white text-2xl font-bold">Password updated</h1>
            <p className="text-[#888888] text-sm">Open the Rally app to sign in with your new password.</p>
          </div>
        )}
      </main>
    </div>
  )
}
