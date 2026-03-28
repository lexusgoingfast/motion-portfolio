import HeroSection from './HeroSection'
import WorkList from './WorkList'
import AboutSection from './AboutSection'
import ServicesSection from './ServicesSection'
import ExperienceSection from './ExperienceSection'
import ContactSection from './ContactSection'

export default function Main() {
  return (
    <main style={{ minHeight: '100vh' }}>
      <HeroSection />
      <WorkList />
      <AboutSection />
      <ServicesSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  )
}
