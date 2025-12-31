import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import MissionSection from "@/components/mission-section"
import ShoeTechSection from "@/components/rider-tech-section"
import BikeShowcase from "@/components/bike-showcase"
import HelmetHall from "@/components/helmet-hall"
import StoreSection from "@/components/store-section"
import SocialSection from "@/components/social-section"
import Footer from "@/components/footer"
import { RaceDayCountdown } from "@/components/race-day-countdown"
import { InteractiveSchedule } from "@/components/interactive-schedule"
import { ShoePrintDivider } from "@/components/shoe-print-track"

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <HeroSection />
      <div className="relative z-10">
        <MissionSection />
        <ShoeTechSection />
        <ShoePrintDivider />
        <HelmetHall />
        <ShoePrintDivider />
        <BikeShowcase />
        <RaceDayCountdown />
        <ShoePrintDivider />
        <InteractiveSchedule />
        <StoreSection />
        <SocialSection />
        <Footer />
      </div>
    </main>
  )
}
