import Header from '@/components/Header';
import Hero from '@/components/Hero';
import EventCategoriesSection from '@/components/EventCategoriesSection';
import ScheduleSection from '@/components/ScheduleSection';
import RegistrationSection from '@/components/RegistrationSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { Scroll } from 'lucide-react';
import ScrollingTicker from '@/components/ScrollingAnimation';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
        <ScrollingTicker />
      <main>
        <Hero />
        <EventCategoriesSection />
        <ScheduleSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
