'use client'

import { motion } from 'framer-motion'

const cards = [
  {
    title: 'The Sorting',
    body: 'Every fresher is sorted into a house on arrival. Your house earns points all day, and the House Cup is awarded at dusk.',
    glyph: 'ᛝ',
  },
  {
    title: 'The Great Feast',
    body: 'Long tables, golden goblets, and a menu that would make the Hogwarts kitchens proud. Butterbeer is on the house.',
    glyph: 'ᛟ',
  },
  {
    title: 'The Yule Ball',
    body: 'As the candles dim, the floor opens. Bring your best robes and your worst dance moves. Both are welcome.',
    glyph: 'ᛉ',
  },
]

export function EventDetails() {
  return (
    <section id="details" className="relative mx-auto max-w-6xl scroll-mt-24 px-4 py-24 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="mb-14 text-center"
      >
        <p className="font-serif text-xs uppercase tracking-[0.4em] text-gold">A day of enchantment</p>
        <h2 className="text-gold-glow mt-3 text-balance font-serif text-3xl text-parchment md:text-5xl">
          What Awaits Beyond the Gates
        </h2>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((c, i) => (
          <motion.article
            key={c.title}
            initial={{ opacity: 0, y: 40, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            whileHover={{ y: -8 }}
            className="gold-frame relative rounded-sm bg-midnight/70 p-8 backdrop-blur-md"
          >
            <span aria-hidden className="absolute -top-5 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-gold bg-midnight-deep font-sans text-xl text-gold-bright shadow-[0_0_18px_rgba(245,215,122,0.5)]">
              {c.glyph}
            </span>
            <h3 className="mt-4 font-serif text-xl text-gold-bright">{c.title}</h3>
            <p className="mt-3 leading-relaxed text-parchment/85">{c.body}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
