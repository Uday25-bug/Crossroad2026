'use client'

import { motion } from 'framer-motion'
import { SparkleLink } from '@/components/magic/sparkle-link'

const links = [
  { href: '#details', label: 'The Gala' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#dresscode', label: 'Dress Code' },
  { href: '#rsvp', label: 'RSVP' },
]

export function SiteHeader() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-40"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
        <a href="#top" className="flex items-center gap-2 font-serif text-gold text-sm tracking-[0.25em] uppercase">
          <span className="inline-block h-6 w-6 rounded-full border border-gold/60 bg-gradient-to-br from-gold-bright to-crimson shadow-[0_0_14px_rgba(245,215,122,0.5)]" />
          GECR
        </a>
        <nav aria-label="Main" className="hidden items-center gap-1 rounded-full border border-gold/20 bg-midnight/60 px-2 py-1 backdrop-blur-md md:flex">
          {links.map((l) => (
            <SparkleLink key={l.href} href={l.href}>
              {l.label}
            </SparkleLink>
          ))}
        </nav>
        <a
          href="#rsvp"
          className="rounded-sm border border-gold/60 bg-crimson px-4 py-2 font-serif text-xs uppercase tracking-[0.2em] text-parchment shadow-[0_0_18px_rgba(122,28,34,0.6)] transition hover:bg-gold hover:text-ink md:hidden"
        >
          RSVP
        </a>
      </div>
      <div className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
    </motion.header>
  )
}
