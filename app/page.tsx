import { NightSky } from '@/components/background/night-sky'
import { HogwartsScene } from '@/components/background/hogwarts-scene'
import { FloatingCandles } from '@/components/background/floating-candles'
import { EasterEggs } from '@/components/magic/easter-eggs'
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/sections/hero'
 import { EventDetails } from '@/components/sections/event-details'
import { Schedule } from '@/components/sections/schedule'
import { DressCode } from '@/components/sections/dress-code'
import { RsvpSection } from '@/components/rsvp/rsvp-section'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <>
      <NightSky />
      <HogwartsScene />
      <FloatingCandles />
      <SiteHeader />
      <main className="relative z-10">
        <Hero />
        <EventDetails />
        <Schedule />
        <DressCode />
        <RsvpSection />
      </main>
      <SiteFooter />
      <EasterEggs />
    </>
  )
}
