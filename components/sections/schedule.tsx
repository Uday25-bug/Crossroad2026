'use client'

import { motion } from 'framer-motion'

const timeline = [
  { time: '10:00 AM', title: 'Platform 9¾ Opens', body: 'Registration, wristbands, and your very own house scarf.' },
  { time: '11:00 AM', title: 'The Sorting Ceremony', body: 'Freshers meet the Hat. Houses are assigned. Rivalries begin.' },
  { time: '12:30 PM', title: 'Triwizard Games', body: 'House competitions, quidditch-lite, and the trivia gauntlet.' },
  { time: '02:00 PM', title: 'The Great Feast', body: 'Lunch in the Great Hall beneath the floating candles.' },
  { time: '03:30 PM', title: 'Talent of the Wizarding World', body: 'Open stage for music, dance, spells, and stand-up.' },
  { time: '05:30 PM', title: 'The House Cup', body: 'Points are tallied. One house rises. Prizes for all champions.' },
  { time: '06:00 PM', title: 'The Yule Ball', body: 'Lights dim, music rises. Dance until the candles burn low.' },
  { time: '07:00 PM', title: 'Mischief Managed', body: 'Farewell, and safe travels back to the Muggle world.' },
]

export function Schedule() {
  return (
    <section id="schedule" className="relative mx-auto max-w-5xl scroll-mt-24 px-4 py-24 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <p className="font-serif text-xs uppercase tracking-[0.4em] text-gold">10:00 AM – 7:00 PM</p>
        <h2 className="text-gold-glow mt-3 text-balance font-serif text-3xl text-parchment md:text-5xl">
          The Order of the Day
        </h2>
      </motion.div>

      <ol className="relative">
        <motion.span
          aria-hidden
          className="absolute left-4 top-0 w-px bg-gradient-to-b from-gold via-gold/60 to-transparent md:left-1/2"
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
        {timeline.map((item, i) => {
          const left = i % 2 === 0
          return (
            <motion.li
              key={item.time}
              initial={{ opacity: 0, x: left ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className={`relative mb-10 pl-12 md:w-1/2 md:pl-0 ${left ? 'md:pr-14 md:text-right' : 'md:ml-auto md:pl-14'}`}
            >
              <span
                aria-hidden
                className={`absolute top-2 left-4 h-3 w-3 -translate-x-1/2 rounded-full bg-gold-bright shadow-[0_0_14px_rgba(245,215,122,0.9)] ${left ? 'md:left-auto md:right-0 md:translate-x-1/2' : 'md:left-0 md:-translate-x-1/2'}`}
              />
              <p className="font-serif text-sm tracking-[0.2em] text-gold">{item.time}</p>
              <h3 className="mt-1 font-serif text-lg text-parchment md:text-xl">{item.title}</h3>
              <p className="mt-1 leading-relaxed text-parchment/75">{item.body}</p>
            </motion.li>
          )
        })}
      </ol>
    </section>
  )
}
