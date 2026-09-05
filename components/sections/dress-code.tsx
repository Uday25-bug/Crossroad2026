'use client'

import { motion } from 'framer-motion'

const houses = [
  { name: 'Gryffindor', colors: ['#7a1c22', '#c9a227'] },
  { name: 'Slytherin', colors: ['#1a472a', '#aaaaaa'] },
  { name: 'Ravenclaw', colors: ['#0e1a40', '#946b2d'] },
  { name: 'Hufflepuff', colors: ['#ecb939', '#372e29'] },
]

export function DressCode() {
  return (
    <section id="dresscode" className="relative mx-auto max-w-5xl scroll-mt-24 px-4 py-24 md:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="parchment-surface relative rounded-sm px-6 py-12 text-ink md:px-16 md:py-16"
      >
        <span aria-hidden className="absolute inset-3 rounded-sm border border-ink/25" />
        <span aria-hidden className="absolute inset-5 rounded-sm border border-ink/10" />

        <div className="relative text-center">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-crimson">Ministry Decree No. 1</p>
          <h2 className="mt-3 text-balance font-serif text-3xl font-bold md:text-5xl">Dress Code</h2>
          <p className="mt-2 font-serif text-lg tracking-[0.3em] uppercase text-crimson">Harry Potter</p>

          <div className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-relaxed">
            <p>
              The theme is <strong>Harry Potter</strong>, but you may wear whatever suits you best.
              If it is possible, come in something related to the wizarding world or in your finest
              partywear. It would be wonderful, and it means you can feel right at home with
              everyone else in the room.
            </p>
            <p className="mt-4 italic text-ink/75">
              Robes, scarves, ties, round glasses, a lightning scar, or a sharp dress and a
              confident smile. All are welcome. Nobody gets turned away at the gate.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {houses.map((h, i) => (
              <motion.div
                key={h.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center gap-3"
              >
                <div
                  className="h-20 w-full rounded-sm border border-ink/30 shadow-md"
                  style={{
                    background: `repeating-linear-gradient(135deg, ${h.colors[0]} 0 14px, ${h.colors[1]} 14px 28px)`,
                  }}
                />
                <p className="font-serif text-sm font-bold tracking-wider">{h.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
