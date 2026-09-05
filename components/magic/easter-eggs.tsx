'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { GoldenSnitch } from '@/components/magic/golden-snitch'

type Found = { snitch: boolean; footprints: boolean; crest: boolean }

function Toast({ message }: { message: string }) {
  return (
    <motion.div
      role="status"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10 }}
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-sm border border-gold bg-midnight-deep/95 px-5 py-3 font-serif text-sm tracking-wider text-gold-bright shadow-[0_0_30px_rgba(245,215,122,0.35)] backdrop-blur"
    >
      {message}
    </motion.div>
  )
}

/** Easter egg 1: a tiny snitch that darts across the screen. */
function FlyingSnitch({ onCatch, caught }: { onCatch: () => void; caught: boolean }) {
  return (
    <motion.button
      type="button"
      aria-label="Catch the flying snitch"
      onClick={onCatch}
      className="fixed top-[38%] z-30 cursor-pointer md:top-[30%]"
      animate={{
        x: ['-10vw', '30vw', '55vw', '80vw', '110vw'],
        y: [0, -50, 30, -40, 10],
        opacity: caught ? [0, 0] : [0, 1, 1, 1, 0],
      }}
      transition={{ duration: 14, repeat: Infinity, repeatDelay: 6, ease: 'easeInOut', times: [0, 0.2, 0.5, 0.8, 1] }}
      whileHover={{ scale: 1.3 }}
      disabled={caught}
    >
      <GoldenSnitch size={22} />
    </motion.button>
  )
}

/** Easter egg 2: Marauder's Map footprints near the castle (bottom right). */
function Footprints({ onFind, found }: { onFind: () => void; found: boolean }) {
  return (
    <button
      type="button"
      aria-label="Discover the Marauder's footprints"
      onClick={onFind}
      className="group fixed bottom-[9%] right-[8%] z-30 rotate-[-25deg] opacity-40 transition hover:opacity-100 md:right-[18%]"
    >
      <svg width="46" height="60" viewBox="0 0 46 60" aria-hidden>
        {[
          { x: 6, y: 30, r: 0 },
          { x: 26, y: 8, r: 10 },
        ].map((f, i) => (
          <motion.g
            key={i}
            transform={`translate(${f.x} ${f.y}) rotate(${f.r})`}
            fill={found ? '#f5d77a' : '#c9b58a'}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, delay: i * 0.8, repeat: Infinity }}
          >
            <ellipse cx={8} cy={16} rx={5.5} ry={9} />
            <circle cx={3} cy={3} r={2} />
            <circle cx={7.5} cy={1} r={2.2} />
            <circle cx={12.5} cy={2} r={2} />
            <circle cx={16} cy={5} r={1.6} />
          </motion.g>
        ))}
      </svg>
      <span className="sr-only">Footprints</span>
    </button>
  )
}

/** Easter egg 3: hidden GECR crest that glows when clicked. */
function Crest({ onFind, found }: { onFind: () => void; found: boolean }) {
  return (
    <button
      type="button"
      aria-label="Reveal the GECR crest"
      onClick={onFind}
      className={`fixed left-[4%] top-[58%] z-30 transition duration-700 ${found ? 'opacity-100' : 'opacity-[0.12] hover:opacity-50'}`}
    >
      <motion.svg
        width="64"
        height="76"
        viewBox="0 0 64 76"
        aria-hidden
        animate={found ? { filter: ['drop-shadow(0 0 0px #f5d77a)', 'drop-shadow(0 0 22px #f5d77a)', 'drop-shadow(0 0 8px #f5d77a)'] } : {}}
        transition={{ duration: 1.6, repeat: found ? Infinity : 0, repeatType: 'reverse' }}
      >
        <path d="M32 2 L60 12 L60 42 C60 58 46 70 32 74 C18 70 4 58 4 42 L4 12 Z" fill={found ? '#c9a227' : '#2b1d0e'} stroke="#f5d77a" strokeWidth="2" />
        <path d="M32 10 L52 17 L52 42 C52 53 42 62 32 66 C22 62 12 53 12 42 L12 17 Z" fill={found ? '#7a1c22' : '#10173a'} stroke="#f5d77a" strokeWidth="1" />
        <line x1="32" y1="10" x2="32" y2="66" stroke="#f5d77a" strokeWidth="1" />
        <line x1="12" y1="38" x2="52" y2="38" stroke="#f5d77a" strokeWidth="1" />
        <text x="32" y="32" textAnchor="middle" fontSize="12" fontFamily="var(--font-cinzel)" fontWeight="700" fill="#f5d77a">
          GE
        </text>
        <text x="32" y="56" textAnchor="middle" fontSize="12" fontFamily="var(--font-cinzel)" fontWeight="700" fill="#f5d77a">
          CR
        </text>
      </motion.svg>
    </button>
  )
}

export function EasterEggs() {
  const [found, setFound] = useState<Found>({ snitch: false, footprints: false, crest: false })
  const [toast, setToast] = useState<string | null>(null)

  const announce = (key: keyof Found, message: string) => {
    if (found[key]) return
    const next = { ...found, [key]: true }
    setFound(next)
    const total = Object.values(next).filter(Boolean).length
    setToast(total === 3 ? 'All three secrets found. Mischief managed!' : `${message} (${total}/3)`)
    window.setTimeout(() => setToast(null), 3200)
  }

  return (
    <>
      <FlyingSnitch caught={found.snitch} onCatch={() => announce('snitch', 'You caught the Snitch! 150 points.')} />
      <Footprints found={found.footprints} onFind={() => announce('footprints', "Messrs. Moony, Wormtail, Padfoot & Prongs say hello.")} />
      <Crest found={found.crest} onFind={() => announce('crest', 'The GECR crest glows with pride.')} />
      <AnimatePresence>{toast && <Toast message={toast} />}</AnimatePresence>
    </>
  )
}
