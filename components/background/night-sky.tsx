'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useMemo } from 'react'
import { seededRandom } from '@/lib/seeded-random'

export function NightSky() {
  const { scrollYProgress } = useScroll()
  const starsY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const moonY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])

  const stars = useMemo(() => {
    const rand = seededRandom(11)
    return Array.from({ length: 140 }, (_, i) => ({
      id: i,
      x: rand() * 100,
      y: rand() * 100,
      size: 0.8 + rand() * 1.8,
      delay: rand() * 4,
      duration: 2 + rand() * 3,
    }))
  }, [])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-30 overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 50% 120%, #1b2a5e 0%, #0a0f26 45%, #04071a 100%)',
      }}
    >
      <motion.div style={{ y: starsY }} className="absolute inset-0">
        {stars.map((s) => (
          <motion.span
            key={s.id}
            className="absolute rounded-full bg-parchment"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              boxShadow: '0 0 4px rgba(245,215,122,0.8)',
            }}
            animate={{ opacity: [0.2, 1, 0.3] }}
            transition={{
              duration: s.duration,
              delay: s.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      <motion.div
        style={{ y: moonY }}
        className="absolute right-[8%] top-[6%] h-28 w-28 rounded-full md:h-40 md:w-40"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              'radial-gradient(circle at 38% 35%, #fff7dc 0%, #efe0b0 40%, #c9b58a 75%, #a89466 100%)',
            boxShadow:
              '0 0 40px 12px rgba(245,215,122,0.25), 0 0 120px 40px rgba(201,162,39,0.12)',
          }}
        />
        <div className="absolute left-[30%] top-[45%] h-4 w-4 rounded-full bg-parchment-dark/60" />
        <div className="absolute left-[60%] top-[30%] h-2.5 w-2.5 rounded-full bg-parchment-dark/50" />
        <div className="absolute left-[55%] top-[65%] h-3 w-3 rounded-full bg-parchment-dark/40" />
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-midnight-deep/80 via-transparent to-transparent" />
    </div>
  )
}
