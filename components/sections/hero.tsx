'use client'

import { motion } from 'framer-motion'
import { GoldenSnitch } from '@/components/magic/golden-snitch'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
}
const rise = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: 'easeOut' as const } },
}

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-24 pb-32 text-center">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[14%] -translate-x-1/2 md:left-[68%] md:top-[18%]"
        animate={{ x: [0, 60, -40, 30, 0], y: [0, -30, 20, -15, 0], rotate: [0, 8, -6, 4, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      >
        <GoldenSnitch size={64} />
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="relative z-10 flex max-w-5xl flex-col items-center gap-6">
        <motion.p variants={rise} className="font-serif text-xs tracking-[0.5em] text-gold uppercase md:text-sm">
          Government Engineering College (Ec and Ai&Ds)Presents
        </motion.p>

        <motion.div variants={rise} className="flex items-center gap-4 text-gold/70">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold md:w-32" />
          <svg width="18" height="18" viewBox="0 0 10 10" aria-hidden className="text-gold-bright">
            <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" fill="currentColor" />
          </svg>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold md:w-32" />
        </motion.div>

        <motion.h1 variants={rise} className="text-balance font-serif leading-[1.05]">
          <span className="block text-2xl text-parchment/90 md:text-4xl">GECR Presents</span>
          <span className="text-illuminated mt-3 block text-4xl font-black uppercase sm:text-5xl md:text-7xl lg:text-8xl">
            The Grand Freshers and Farewell Wizarding Gala
          </span>
          <span className="text-illuminated block text-4xl font-black uppercase sm:text-5xl md:text-7xl lg:text-8xl">
        
          </span>
        </motion.h1>

        <motion.p variants={rise} className="max-w-2xl text-pretty text-lg italic leading-relaxed text-parchment/80 md:text-2xl">
          The Great Hall awaits. Floating candles, the Hogwarts Express on the horizon, and a
          Sorting worthy of legend. Your letter has arrived.
        </motion.p>

        <motion.div
          variants={rise}
          className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:gap-8"
        >
          <div className="flex items-center gap-3 rounded-sm border border-gold/40 bg-midnight/60 px-5 py-3 backdrop-blur-sm">
            <ClockIcon />
            <div className="text-left">
              <p className="font-serif text-[10px] uppercase tracking-[0.3em] text-gold">Event Hours</p>
              <p className="text-xl font-semibold text-parchment md:text-2xl">10:00 AM – 7:00 PM</p>
            </div>
          </div>
          <a
            href="#rsvp"
            className="group relative overflow-hidden rounded-sm border border-gold bg-gold px-8 py-4 font-serif text-sm font-bold uppercase tracking-[0.25em] text-ink shadow-[0_0_30px_rgba(245,215,122,0.35)] transition hover:shadow-[0_0_50px_rgba(245,215,122,0.6)]"
          >
            <span className="relative z-10">Claim Your Seat</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-parchment/70 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold/60"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg width="24" height="36" viewBox="0 0 24 36" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="1" y="1" width="22" height="34" rx="11" />
          <circle cx="12" cy="10" r="2" fill="currentColor" />
        </svg>
      </motion.div>
    </section>
  )
}

function ClockIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f5d77a" strokeWidth="1.5" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" />
    </svg>
  )
}
