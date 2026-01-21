import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import EventCard from '@/components/EventCard';
import EventModal from '@/components/EventModal';
import { events, techEvents, nonTechEvents, type Event } from '@/data/events';

type FilterType = 'All' | 'Tech' | 'Non-Tech';

const EventsSection = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesFilter =
        activeFilter === 'All' ||
        event.category === activeFilter ||
        (activeFilter === 'Tech' && event.category === 'Both') ||
        (activeFilter === 'Non-Tech' && event.category === 'Both');

      const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const filterTabs: FilterType[] = ['All', 'Tech', 'Non-Tech'];

  return (
    <section id="events" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Events
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our exciting lineup of technical and non-technical events. 
            Something for everyone!
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">
          {/* Filter Tabs */}
          <div className="flex gap-2 justify-center md:justify-start" role="tablist" aria-label="Event categories">
            {filterTabs.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 focus-ring tap-target ${
                  activeFilter === filter
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                }`}
                role="tab"
                aria-selected={activeFilter === filter}
                aria-controls="events-grid"
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-md mx-auto md:mx-0 md:ml-auto">
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

        {/* Event Type Lists */}
        <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="bg-card rounded-lg p-5 border border-border">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Tech Events
            </h3>
            <ul className="space-y-2">
              {techEvents.map((event) => (
                <li key={event} className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                  {event}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card rounded-lg p-5 border border-border">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              Non-Tech Events
            </h3>
            <ul className="space-y-2">
              {nonTechEvents.map((event) => (
                <li key={event} className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                  {event}
                </li>
              ))}
            </ul>
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
