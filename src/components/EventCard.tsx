import { Laptop, Sparkles, Code2, Gamepad2, Music, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Event } from '@/data/events';

interface EventCardProps {
  event: Event;
  onViewDetails: (event: Event) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Laptop,
  Sparkles,
  Code2,
  Gamepad2,
  Music,
  FileText,
};

const EventCard = ({ event, onViewDetails }: EventCardProps) => {
  const IconComponent = iconMap[event.icon] || Code2;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Tech':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'Non-Tech':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'Both':
        return 'bg-accent text-accent-foreground border-accent-foreground/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <article className="group bg-card rounded-lg border border-border p-5 md:p-6 card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
          <IconComponent className="w-6 h-6 text-accent-foreground group-hover:text-primary-foreground" aria-hidden="true" />
        </div>
        <Badge variant="outline" className={getCategoryColor(event.category)}>
          {event.category}
        </Badge>
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
        {event.name}
      </h3>
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {event.description}
      </p>

      {/* Sub-events preview */}
      {event.subEvents && event.subEvents.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {event.subEvents.slice(0, 3).map((subEvent) => (
            <span
              key={subEvent}
              className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground"
            >
              {subEvent}
            </span>
          ))}
          {event.subEvents.length > 3 && (
            <span className="text-xs px-2 py-1 text-muted-foreground">
              +{event.subEvents.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Price & CTA */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div>
          <span className="text-2xl font-bold text-foreground">₹{event.price}</span>
          {event.teamSize && (
            <span className="text-xs text-muted-foreground block mt-0.5">{event.teamSize}</span>
          )}
        </div>
        <Button
          variant="default"
          onClick={() => onViewDetails(event)}
          aria-label={`View details for ${event.name}`}
        >
          Register
        </Button>
      </div>
    </article>
  );
};

export default EventCard;
