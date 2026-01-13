import { Users, IndianRupee } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { Event } from '@/data/events'

interface EventModalProps {
  event: Event | null
  onClose: () => void
}

const EventModal = ({ event, onClose }: EventModalProps) => {
  if (!event) return null

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Tech':
        return 'bg-primary/10 text-primary border-primary/20'
      case 'Non-Tech':
        return 'bg-secondary/10 text-secondary border-secondary/20'
      case 'Both':
        return 'bg-accent text-accent-foreground border-accent-foreground/20'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <Dialog open={!!event} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div>
            <Badge variant="outline" className={`mb-2 ${getCategoryColor(event.category)}`}>
              {event.category}
            </Badge>
            <DialogTitle className="text-2xl font-bold">
              {event.name}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {event.fullDescription}
          </p>

          {/* Details */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-foreground">
              <IndianRupee className="w-5 h-5 text-primary" />
              <span className="font-semibold">₹{event.price}</span>
            </div>

            {event.teamSize && (
              <div className="flex items-center gap-2 text-foreground">
                <Users className="w-5 h-5 text-primary" />
                <span>{event.teamSize}</span>
              </div>
            )}
          </div>

          {/* Sub-events */}
          {event.subEvents && event.subEvents.length > 0 && (
            <div>
              <h4 className="font-semibold text-foreground mb-2">Includes</h4>
              <div className="flex flex-wrap gap-2">
                {event.subEvents.map((subEvent) => (
                  <span
                    key={subEvent}
                    className="text-sm px-3 py-1.5 bg-muted rounded-md text-muted-foreground"
                  >
                    {subEvent}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Rules */}
          <div>
            <h4 className="font-semibold text-foreground mb-2">Rules & Guidelines</h4>
            <ul className="space-y-2">
              {event.rules.map((rule, index) => (
                <li
                  key={index}
                  className="text-sm text-muted-foreground flex items-start gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          {/* Registration Info */}
          <div className="bg-muted/50 rounded-lg p-4 border border-border">
            <h4 className="font-semibold text-foreground mb-2">
              Registration & Payment
            </h4>
            <p className="text-sm text-muted-foreground">
              Registration, pass selection, and payment are handled through our
              official Google Form. A confirmation email will be sent after
              successful submission.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-border">
          <Button variant="cta" className="w-full" asChild>
            <a href={event.paymentLink} target='blank'>
              Register via Google Form
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EventModal
