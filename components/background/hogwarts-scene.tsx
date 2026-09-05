'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

function SteamPuffs() {
  return (
    <g>
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.circle
          key={i}
          cx={0}
          cy={0}
          r={4}
          fill="rgba(233,216,180,0.55)"
          initial={{ opacity: 0 }}
          animate={{
            x: [0, -18 - i * 6, -40 - i * 10],
            y: [0, -14 - i * 4, -30 - i * 6],
            scale: [0.6, 1.4, 2.2],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: 2.4,
            delay: i * 0.4,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </g>
  )
}

function Train() {
  return (
    <g>
      {/* Locomotive */}
      <rect x={0} y={-22} width={46} height={22} rx={2} fill="#3a0d10" />
      <rect x={4} y={-30} width={14} height={10} rx={1} fill="#2a0a0c" />
      <rect x={30} y={-34} width={14} height={14} rx={1} fill="#3a0d10" />
      <rect x={33} y={-31} width={8} height={6} fill="#f5d77a" opacity={0.9} />
      <rect x={6} y={-38} width={6} height={10} fill="#1a1a1a" />
      <g transform="translate(9,-38)">
        <SteamPuffs />
      </g>
      <circle cx={2} cy={-11} r={2.5} fill="#f5d77a">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="1.2s" repeatCount="indefinite" />
      </circle>
      {/* Wheels */}
      {[8, 20, 34].map((x) => (
        <g key={x}>
          <circle cx={x} cy={2} r={4.5} fill="#111" stroke="#c9a227" strokeWidth={0.8} />
          <motion.line
            x1={x}
            y1={-2}
            x2={x}
            y2={6}
            stroke="#c9a227"
            strokeWidth={0.8}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
            style={{ originX: `${x}px`, originY: '2px' }}
          />
        </g>
      ))}
      {/* Carriages */}
      {[0, 1, 2, 3].map((i) => {
        const x = 52 + i * 44
        return (
          <g key={i} transform={`translate(${x},0)`}>
            <rect x={0} y={-24} width={40} height={24} rx={2} fill="#4a1014" />
            <rect x={0} y={-26} width={40} height={3} fill="#2a0a0c" />
            {[5, 15, 25].map((wx) => (
              <rect key={wx} x={wx} y={-19} width={7} height={8} rx={0.8} fill="#f5d77a" opacity={0.85}>
                <animate
                  attributeName="opacity"
                  values="0.65;0.95;0.65"
                  dur={`${1.4 + wx * 0.05}s`}
                  repeatCount="indefinite"
                />
              </rect>
            ))}
            <circle cx={8} cy={2} r={3.5} fill="#111" />
            <circle cx={32} cy={2} r={3.5} fill="#111" />
          </g>
        )
      })}
    </g>
  )
}

export function HogwartsScene() {
  const { scrollYProgress } = useScroll()
  const sceneY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.7, 0.35])

  return (
    <motion.div
      aria-hidden
      style={{ y: sceneY, opacity: sceneOpacity }}
      className="pointer-events-none fixed inset-x-0 bottom-0 -z-20 h-[46vh] min-h-[280px]"
    >
      <svg
        viewBox="0 0 1200 400"
        preserveAspectRatio="xMidYMax slice"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="fog" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0a0f26" stopOpacity="0" />
            <stop offset="1" stopColor="#04071a" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="hill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0d1533" />
            <stop offset="1" stopColor="#04071a" />
          </linearGradient>
        </defs>

        {/* Far mountains */}
        <path
          d="M0 260 L120 190 L220 230 L340 150 L460 220 L560 170 L640 210 L760 140 L860 200 L980 160 L1100 210 L1200 170 L1200 400 L0 400 Z"
          fill="#0b1230"
          opacity={0.9}
        />

        {/* Castle silhouette */}
        <g transform="translate(760,60)" fill="#050814">
          <rect x={0} y={130} width={260} height={110} />
          <rect x={20} y={60} width={28} height={90} />
          <polygon points="20,60 34,20 48,60" />
          <rect x={70} y={90} width={22} height={60} />
          <polygon points="70,90 81,62 92,90" />
          <rect x={110} y={30} width={40} height={130} />
          <polygon points="110,30 130,-20 150,30" />
          <rect x={170} y={80} width={24} height={70} />
          <polygon points="170,80 182,48 194,80" />
          <rect x={215} y={50} width={30} height={100} />
          <polygon points="215,50 230,5 245,50" />
          {/* Battlements */}
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x={i * 22} y={122} width={11} height={10} />
          ))}
          {/* Lit windows */}
          {[
            [126, 60],
            [134, 90],
            [126, 120],
            [30, 100],
            [226, 80],
            [226, 110],
            [80, 110],
            [180, 105],
            [60, 170],
            [100, 180],
            [150, 175],
            [200, 185],
          ].map(([x, y], i) => (
            <rect key={i} x={x} y={y} width={5} height={8} fill="#f5d77a" opacity={0.8}>
              <animate
                attributeName="opacity"
                values="0.5;0.95;0.5"
                dur={`${1.8 + (i % 4) * 0.5}s`}
                repeatCount="indefinite"
              />
            </rect>
          ))}
        </g>

        {/* Near hill */}
        <path
          d="M0 320 C150 280 300 300 450 270 C600 240 700 290 850 260 C1000 230 1100 280 1200 250 L1200 400 L0 400 Z"
          fill="url(#hill)"
        />

        {/* Viaduct bridge */}
        <g fill="#050814">
          <rect x={0} y={296} width={1200} height={10} />
          {Array.from({ length: 16 }).map((_, i) => {
            const x = i * 80
            return (
              <g key={i}>
                <rect x={x} y={296} width={80} height={60} />
                <path
                  d={`M${x + 10} 356 L${x + 10} 330 A30 30 0 0 1 ${x + 70} 330 L${x + 70} 356 Z`}
                  fill="#0a0f26"
                />
              </g>
            )
          })}
        </g>

        {/* Train crossing the bridge */}
        <motion.g
          initial={{ x: -260 }}
          animate={{ x: 1300 }}
          transition={{ duration: 34, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
          style={{ y: 296 }}
        >
          <g transform="scale(-1,1)">
            <Train />
          </g>
        </motion.g>

        {/* Ground fog */}
        <rect x={0} y={330} width={1200} height={70} fill="url(#fog)" />
      </svg>
    </motion.div>
  )
}
