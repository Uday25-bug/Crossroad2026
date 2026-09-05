'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useMemo } from 'react'
import { seededRandom } from '@/lib/seeded-random'

type Candle = {
  id: number
  x: number
  y: number
  scale: number
  drift: number
  duration: number
  delay: number
  layer: 0 | 1 | 2
}

function CandleGraphic({ scale }: { scale: number }) {
  const w = 10 * scale
  const h = 48 * scale
  return (
    <div className="relative flex flex-col items-center" style={{ width: w * 3 }}>
      <div
        className="candle-flame relative rounded-full"
        style={{
          width: w * 0.9,
          height: w * 1.6,
          background:
            'radial-gradient(ellipse at 50% 80%, #fff6d0 0%, #f5d77a 35%, #e8871a 70%, rgba(200,80,20,0) 100%)',
          boxShadow: `0 0 ${w * 1.5}px ${w * 0.6}px rgba(245,215,122,0.45), 0 0 ${w * 4}px ${w * 1.5}px rgba(232,135,26,0.2)`,
          filter: 'blur(0.3px)',
        }}
      />
      <div
        className="rounded-[2px]"
        style={{
          width: w,
          height: h,
          background:
            'linear-gradient(90deg, #d9c9a3 0%, #f3e8cc 30%, #e6d7b1 60%, #b8a67c 100%)',
          boxShadow: `inset 0 -${h * 0.1}px ${w}px rgba(120,90,40,0.4), 0 ${h * 0.2}px ${h * 0.4}px rgba(0,0,0,0.5)`,
        }}
      />
    </div>
  )
}

export function FloatingCandles() {
  const { scrollYProgress } = useScroll()
  const nearY = useTransform(scrollYProgress, [0, 1], ['0%', '-35%'])
  const midY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
  const farY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])

  const candles = useMemo<Candle[]>(() => {
    const rand = seededRandom(42)
    return Array.from({ length: 38 }, (_, i) => {
      const layer = (i % 3) as 0 | 1 | 2
      return {
        id: i,
        x: rand() * 100,
        y: 5 + rand() * 170,
        scale: layer === 0 ? 0.5 + rand() * 0.3 : layer === 1 ? 0.8 + rand() * 0.4 : 1.2 + rand() * 0.6,
        drift: 6 + rand() * 10,
        duration: 4 + rand() * 4,
        delay: rand() * 5,
        layer,
      }
    })
  }, [])

  const layers = [
    { y: farY, opacity: 0.45, blur: 1.5, items: candles.filter((c) => c.layer === 0) },
    { y: midY, opacity: 0.75, blur: 0.5, items: candles.filter((c) => c.layer === 1) },
    { y: nearY, opacity: 1, blur: 0, items: candles.filter((c) => c.layer === 2) },
  ]

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {layers.map((layer, li) => (
        <motion.div
          key={li}
          style={{ y: layer.y, opacity: layer.opacity, filter: `blur(${layer.blur}px)` }}
          className="absolute inset-0"
        >
          {layer.items.map((c) => (
            <motion.div
              key={c.id}
              className="absolute"
              style={{ left: `${c.x}%`, top: `${c.y}vh` }}
              animate={{
                y: [0, -c.drift, 0, c.drift * 0.6, 0],
                rotate: [0, 1.5, 0, -1.5, 0],
              }}
              transition={{
                duration: c.duration,
                delay: c.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <CandleGraphic scale={c.scale} />
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  )
}
