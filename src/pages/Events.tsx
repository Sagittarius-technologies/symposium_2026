import Header from '@/components/Header';
import EventsSection from '@/components/EventsSection';
import Footer from '@/components/Footer';

const Events = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <EventsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Events;
