'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo } from 'react'
import { seededRandom } from '@/lib/seeded-random'
import { GoldenSnitch } from '@/components/magic/golden-snitch'

export function MagicModal({
  open,
  message,
  name,
  onClose,
}: {
  open: boolean
  message: string
  name: string
  onClose: () => void
}) {
  const sparks = useMemo(() => {
    const rand = seededRandom(7)
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: rand() * 100,
      y: rand() * 100,
      size: 2 + rand() * 5,
      delay: rand() * 1.5,
    }))
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="magic-modal-title"
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden bg-midnight-deep/90 px-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {sparks.map((s) => (
            <motion.span
              key={s.id}
              aria-hidden
              className="pointer-events-none absolute rounded-full bg-gold-bright"
              style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, boxShadow: '0 0 8px #f5d77a' }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.4, 0], y: [-10, -60] }}
              transition={{ duration: 2.2, delay: s.delay, repeat: Infinity }}
            />
          ))}

          <motion.div
            aria-hidden
            className="pointer-events-none absolute h-[70vmin] w-[70vmin] rounded-full border border-gold/30"
            initial={{ scale: 0.4, opacity: 0, rotate: 0 }}
            animate={{ scale: 1.3, opacity: [0, 0.6, 0], rotate: 180 }}
            transition={{ duration: 2.4, ease: 'easeOut' }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute h-[50vmin] w-[50vmin] rounded-full border-2 border-dashed border-gold/40"
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />

          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 40, rotateX: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 160, damping: 18, delay: 0.1 }}
            className="parchment-surface gold-frame relative w-full max-w-xl rounded-sm px-6 py-10 text-center text-ink md:px-12 md:py-14"
          >
            <motion.div
              aria-hidden
              className="absolute -top-8 left-1/2 -translate-x-1/2"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            >
              <GoldenSnitch size={44} />
            </motion.div>

            <p className="mt-4 font-serif text-xs uppercase tracking-[0.4em] text-crimson">
              {name ? `Dear ${name},` : 'Dear Witch or Wizard,'}
            </p>

            <motion.h2
              id="magic-modal-title"
              className="mt-4 text-balance font-serif text-2xl font-bold leading-snug md:text-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {message}
            </motion.h2>

            <motion.div
              className="mt-10 flex flex-col items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <span className="relative flex h-12 w-12 items-center justify-center">
                <span className="absolute inset-0 animate-spin rounded-full border-2 border-ink/20 border-t-crimson" />
                <span className="absolute inset-2 animate-[spin_1.6s_linear_infinite_reverse] rounded-full border-2 border-ink/10 border-b-gold" />
                <svg width="14" height="14" viewBox="0 0 10 10" aria-hidden className="text-crimson">
                  <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" fill="currentColor" />
                </svg>
              </span>
              <p className="font-serif text-sm tracking-[0.3em] uppercase text-ink/70">Redirecting...</p>
              <p className="text-sm italic text-ink/60">Apparating you to the registration form</p>
            </motion.div>

            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 rounded-sm px-2 py-1 font-serif text-xs uppercase tracking-widest text-ink/60 hover:text-crimson"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
