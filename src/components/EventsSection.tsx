import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import EventCard from '@/components/EventCard';
import EventModal from '@/components/EventModal';
import { events, type Event } from '@/data/events';

const EventsSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    });
  }, [searchQuery]);

  return (
    <section id="events" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Events
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our exciting lineup of events.
            Something for everyone!
          </p>
        </div>

        {/* Search */}
        <div className="flex justify-center mb-8 max-w-md mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
            <Input
              type="search"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
              aria-label="Search events"
            />
          </div>
        </div>

        {/* Events Grid */}
        <div
          id="events-grid"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="tabpanel"
        >
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onViewDetails={setSelectedEvent}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No events found matching your criteria.</p>
          </div>
        )}

        {/* Event Modal */}
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      </div>
    </section>
  );
};

export default EventsSection;
