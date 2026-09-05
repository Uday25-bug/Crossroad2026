'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'

type Sparkle = { id: number; x: number; y: number; size: number; hue: number }

export function SparkleLink({
  href,
  children,
  className = '',
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])
  const idRef = useRef(0)
  const lastRef = useRef(0)

  const spawn = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const now = performance.now()
    if (now - lastRef.current < 28) return
    lastRef.current = now
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const burst: Sparkle[] = Array.from({ length: 3 }, () => ({
      id: idRef.current++,
      x: x + (Math.random() - 0.5) * 14,
      y: y + (Math.random() - 0.5) * 14,
      size: 3 + Math.random() * 5,
      hue: 40 + Math.random() * 12,
    }))
    setSparkles((prev) => [...prev.slice(-30), ...burst])
    window.setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => !burst.some((b) => b.id === s.id)))
    }, 800)
  }, [])

  return (
    <a
      href={href}
      onMouseMove={spawn}
      onMouseEnter={spawn}
      className={`group relative inline-block px-3 py-2 font-serif text-sm tracking-[0.18em] uppercase text-parchment/85 transition-colors duration-300 hover:text-gold-bright ${className}`}
    >
      <span className="relative z-10 transition-[text-shadow] duration-300 group-hover:[text-shadow:0_0_12px_rgba(245,215,122,0.8)]">
        {children}
      </span>
      <span className="pointer-events-none absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-gold-bright to-transparent transition-transform duration-500 group-hover:scale-x-100" />
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.span
            key={s.id}
            className="pointer-events-none absolute z-20"
            style={{ left: s.x, top: s.y, width: s.size, height: s.size }}
            initial={{ opacity: 1, scale: 0, rotate: 0 }}
            animate={{ opacity: 0, scale: 1.6, rotate: 180, y: -12 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
          >
            <svg viewBox="0 0 10 10" className="h-full w-full">
              <path
                d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z"
                fill={`hsl(${s.hue} 90% 70%)`}
                style={{ filter: 'drop-shadow(0 0 3px rgba(245,215,122,0.9))' }}
              />
            </svg>
          </motion.span>
        ))}
      </AnimatePresence>
    </a>
  )
}
