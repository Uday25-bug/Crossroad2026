'use client'

import { motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { MagicModal } from '@/components/rsvp/magic-modal'

// ---------------------------------------------------------------------------
// PASTE YOUR ACTUAL GOOGLE FORM URL HERE.
// After the popup shows for 3 seconds, the browser redirects to this address.
// ---------------------------------------------------------------------------
const googleFormUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLSc-wcS9YutRWdg0h1zPaHpxl-YghXDZzoNHpeCujt-WtaiPdg/viewform?pli=1'

const REDIRECT_DELAY_MS = 3000

const YEARS = ['1st Year (Fresher)', '2nd Year', '3rd Year', 'Final Year'] as const
type Year = (typeof YEARS)[number]

const MESSAGES: Record<Year, string> = {
  '1st Year (Fresher)': 'CONGRATULATIONS! Now you can enter to the magical world of GECR',
  'Final Year': "Congratulations now your farewell would me more magical than you wouldve thought",
  '2nd Year': "Welcome the party where youll know who will be your juniors and who will say goodbye to you",
  '3rd Year': "Welcome the party where youll know who will be your juniors and who will say goodbye to you",
}

export function RsvpSection() {
  const [fullName, setFullName] = useState('')
  const [year, setYear] = useState<Year | ''>('')
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const timerRef = useRef<number | null>(null)

  const cancelRedirect = useCallback(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current)
    timerRef.current = null
    setOpen(false)
  }, [])

  useEffect(() => () => cancelRedirect(), [cancelRedirect])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!fullName.trim()) return setError('The Sorting Hat needs your name.')
    if (!year) return setError('Please choose your current year.')
    setError(null)
    setOpen(true)
    timerRef.current = window.setTimeout(() => {
      window.location.href = googleFormUrl
    }, REDIRECT_DELAY_MS)
  }

  return (
    <section id="rsvp" className="relative mx-auto max-w-3xl scroll-mt-24 px-4 py-24 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="mb-12 text-center"
      >
        <p className="font-serif text-xs uppercase tracking-[0.4em] text-gold">Your letter awaits</p>
        <h2 className="text-gold-glow mt-3 text-balance font-serif text-3xl text-parchment md:text-5xl">
          Sign the Register
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-parchment/75">
          Tell us who you are and which year you belong to. The rest is magic.
        </p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        noValidate
        initial={{ opacity: 0, rotateX: -12, y: 40 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, type: 'spring', stiffness: 90 }}
        className="parchment-surface relative rounded-sm px-6 py-10 text-ink md:px-12 md:py-12"
      >
        <span aria-hidden className="absolute inset-3 rounded-sm border border-ink/25" />
        <span aria-hidden className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/30 bg-crimson px-4 py-1 font-serif text-[10px] uppercase tracking-[0.3em] text-parchment shadow-lg">
          Hogwarts Register
        </span>

        <div className="relative flex flex-col gap-7">
          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="font-serif text-xs font-bold uppercase tracking-[0.25em]">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              placeholder="e.g. Hermione Granger"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border-0 border-b-2 border-ink/40 bg-transparent px-1 py-2 font-sans text-xl italic text-ink placeholder:text-ink/40 focus:border-crimson focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="year" className="font-serif text-xs font-bold uppercase tracking-[0.25em]">
              Current Year
            </label>
            <div className="relative">
              <select
                id="year"
                name="year"
                value={year}
                onChange={(e) => setYear(e.target.value as Year)}
                className="w-full appearance-none border-0 border-b-2 border-ink/40 bg-transparent px-1 py-2 pr-8 font-sans text-xl text-ink focus:border-crimson focus:outline-none"
              >
                <option value="" disabled>
                  Choose your year
                </option>
                {YEARS.map((y) => (
                  <option key={y} value={y} className="bg-parchment text-ink">
                    {y}
                  </option>
                ))}
              </select>
              <svg
                aria-hidden
                width="14"
                height="14"
                viewBox="0 0 12 12"
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-crimson"
              >
                <path d="M1 3.5 L6 9 L11 3.5 Z" fill="currentColor" />
              </svg>
            </div>
          </div>

          {error && (
            <p role="alert" className="font-serif text-sm text-crimson">
              {error}
            </p>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group relative mx-auto mt-2 overflow-hidden rounded-sm border-2 border-gold bg-gradient-to-b from-crimson to-[#4a1014] px-10 py-4 font-serif text-sm font-bold uppercase tracking-[0.3em] text-parchment"
          >
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-sm"
              animate={{ boxShadow: ['0 0 12px rgba(245,215,122,0.4)', '0 0 34px rgba(245,215,122,0.85)', '0 0 12px rgba(245,215,122,0.4)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span aria-hidden className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold-bright/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative z-10">Enter the Magic</span>
          </motion.button>
        </div>
      </motion.form>

      <MagicModal open={open} name={fullName.trim()} message={year ? MESSAGES[year] : ''} onClose={cancelRedirect} />
    </section>
  )
}
