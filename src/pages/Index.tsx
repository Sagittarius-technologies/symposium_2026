import Header from '@/components/Header';
import Hero from '@/components/Hero';
import EventsSection from '@/components/EventsSection';
import RegistrationSection from '@/components/RegistrationSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <EventsSection />
        
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
