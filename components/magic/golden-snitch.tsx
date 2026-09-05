'use client'

import { motion } from 'framer-motion'

export function GoldenSnitch({ size = 56, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 120 60"
      width={size * 2}
      height={size}
      className={className}
      aria-hidden
    >
      <defs>
        <radialGradient id="snitchBody" cx="40%" cy="35%" r="65%">
          <stop offset="0" stopColor="#fff3c4" />
          <stop offset="0.4" stopColor="#f5d77a" />
          <stop offset="0.8" stopColor="#c9a227" />
          <stop offset="1" stopColor="#6b4f0a" />
        </radialGradient>
        <linearGradient id="snitchWing" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f5d77a" stopOpacity="0.95" />
          <stop offset="1" stopColor="#c9a227" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* Left wing */}
      <g className="snitch-wing" style={{ transformBox: 'fill-box', transformOrigin: '100% 50%' }}>
        <path
          d="M46 30 C30 12, 8 8, 2 14 C10 22, 22 26, 46 30 C22 30, 10 34, 4 44 C14 44, 30 42, 46 30 Z"
          fill="url(#snitchWing)"
          stroke="#f5d77a"
          strokeWidth="0.8"
        />
        {[18, 24, 30].map((x, i) => (
          <line key={i} x1={46} y1={30} x2={x} y2={14 + i * 6} stroke="#fff3c4" strokeWidth="0.6" opacity={0.7} />
        ))}
      </g>
      {/* Right wing */}
      <g
        className="snitch-wing"
        style={{ transformBox: 'fill-box', transformOrigin: '0% 50%', animationDirection: 'alternate-reverse' }}
      >
        <path
          d="M74 30 C90 12, 112 8, 118 14 C110 22, 98 26, 74 30 C98 30, 110 34, 116 44 C106 44, 90 42, 74 30 Z"
          fill="url(#snitchWing)"
          stroke="#f5d77a"
          strokeWidth="0.8"
        />
        {[102, 96, 90].map((x, i) => (
          <line key={i} x1={74} y1={30} x2={x} y2={14 + i * 6} stroke="#fff3c4" strokeWidth="0.6" opacity={0.7} />
        ))}
      </g>
      {/* Body */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      >
        <circle cx={60} cy={30} r={14} fill="url(#snitchBody)" />
        <ellipse cx={60} cy={30} rx={14} ry={5} fill="none" stroke="#8a6a12" strokeWidth="0.9" opacity={0.7} />
        <ellipse cx={60} cy={30} rx={5} ry={14} fill="none" stroke="#8a6a12" strokeWidth="0.9" opacity={0.7} />
        <circle cx={55} cy={25} r={3} fill="#fff8e0" opacity={0.8} />
      </motion.g>
    </svg>
  )
}
