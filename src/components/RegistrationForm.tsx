import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Check, ExternalLink, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { events } from '@/data/events';

const formSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email').max(255),
  phone: z.string().min(10, 'Please enter a valid phone number').max(15),
  college: z.string().min(2, 'Please enter your college name').max(200),
  department: z.string().min(2, 'Please enter your department').max(100),
  year: z.string().min(1, 'Please select your year'),
  event: z.string().min(1, 'Please select an event'),
  teamMembers: z.string().max(500).optional(),
  participants: z.string().optional(),
  paymentMethod: z.string().min(1, 'Please select a payment method'),
  promoCode: z.string().max(20).optional(),
  terms: z.boolean().refine((val) => val === true, 'You must accept the terms'),
});

type FormData = z.infer<typeof formSchema>;

const RegistrationForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      terms: false,
    },
  });

  const selectedEvent = watch('event');
  const eventDetails = events.find((e) => e.id === selectedEvent);

  const onSubmit = async (data: FormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmittedData(data);
    setIsSubmitted(true);
  };

  if (isSubmitted && submittedData) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 md:p-8 text-center animate-scale-in">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Registration Received!</h3>
        <p className="text-muted-foreground mb-6">
          Thanks, {submittedData.fullName}! You've registered for{' '}
          <strong>{events.find((e) => e.id === submittedData.event)?.name}</strong>.
          Please complete payment to confirm your seat.
        </p>
        <div className="bg-muted/50 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm text-muted-foreground">
            We've sent confirmation details to <strong>{submittedData.email}</strong>.
            <br />
            Contact: <a href="mailto:organizer@csesymposium.com" className="text-primary hover:underline">organizer@csesymposium.com</a>
          </p>
        </div>
        <Button variant="cta" size="lg" asChild>
          <a href={eventDetails?.paymentLink || '#'} target="_blank" rel="noopener noreferrer">
            Pay Now - ₹{eventDetails?.price}
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-card rounded-lg border border-border p-6 md:p-8">
      <div className="grid gap-6">
        {/* Personal Info */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              {...register('fullName')}
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            />
            {errors.fullName && (
              <p id="fullName-error" className="text-sm text-destructive">{errors.fullName.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@college.edu"
              {...register('email')}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+91 9876543210"
              {...register('phone')}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {errors.phone && (
              <p id="phone-error" className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="year">Year *</Label>
            <Select onValueChange={(value) => setValue('year', value)}>
              <SelectTrigger id="year" aria-label="Select year">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1st">1st Year</SelectItem>
                <SelectItem value="2nd">2nd Year</SelectItem>
                <SelectItem value="3rd">3rd Year</SelectItem>
                <SelectItem value="4th">4th Year</SelectItem>
              </SelectContent>
            </Select>
            {errors.year && (
              <p className="text-sm text-destructive">{errors.year.message}</p>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="college">College *</Label>
            <Input
              id="college"
              placeholder="ABC Engineering College"
              {...register('college')}
              aria-invalid={!!errors.college}
            />
            {errors.college && (
              <p className="text-sm text-destructive">{errors.college.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department *</Label>
            <Input
              id="department"
              placeholder="Computer Science"
              {...register('department')}
              aria-invalid={!!errors.department}
            />
            {errors.department && (
              <p className="text-sm text-destructive">{errors.department.message}</p>
            )}
          </div>
        </div>

        {/* Event Selection */}
        <div className="space-y-2">
          <Label htmlFor="event">Select Event *</Label>
          <Select onValueChange={(value) => setValue('event', value)}>
            <SelectTrigger id="event" aria-label="Select event">
              <SelectValue placeholder="Choose an event" />
            </SelectTrigger>
            <SelectContent>
              {events.map((event) => (
                <SelectItem key={event.id} value={event.id}>
                  {event.name} — ₹{event.price}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.event && (
            <p className="text-sm text-destructive">{errors.event.message}</p>
          )}
          {eventDetails && (
            <p className="text-sm text-muted-foreground">
              {eventDetails.description} • {eventDetails.teamSize}
            </p>
          )}
        </div>

        {/* Team Members */}
        <div className="space-y-2">
          <Label htmlFor="teamMembers">Team Member Names (if applicable)</Label>
          <Textarea
            id="teamMembers"
            placeholder="Enter team member names, one per line"
            {...register('teamMembers')}
            rows={3}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="participants">Number of Participants</Label>
            <Input
              id="participants"
              type="number"
              min="1"
              max="10"
              placeholder="1"
              {...register('participants')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="promoCode">Promo Code</Label>
            <Input
              id="promoCode"
              placeholder="EARLYBIRD"
              {...register('promoCode')}
            />
          </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-2">
          <Label htmlFor="paymentMethod">Payment Method *</Label>
          <Select onValueChange={(value) => setValue('paymentMethod', value)}>
            <SelectTrigger id="paymentMethod" aria-label="Select payment method">
              <SelectValue placeholder="How will you pay?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="stripe">Stripe (Card)</SelectItem>
              <SelectItem value="paypal">PayPal</SelectItem>
              <SelectItem value="upi">UPI / Paytm</SelectItem>
              <SelectItem value="offline">Offline / Cash</SelectItem>
            </SelectContent>
          </Select>
          {errors.paymentMethod && (
            <p className="text-sm text-destructive">{errors.paymentMethod.message}</p>
          )}
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3">
          <Checkbox
            id="terms"
            onCheckedChange={(checked) => setValue('terms', checked === true)}
            aria-describedby={errors.terms ? 'terms-error' : undefined}
          />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="terms" className="text-sm font-normal cursor-pointer">
              I accept the{' '}
              <a href="#" className="text-primary hover:underline">
                terms and conditions
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary hover:underline">
                refund policy
              </a>{' '}
              *
            </Label>
            {errors.terms && (
              <p id="terms-error" className="text-sm text-destructive">{errors.terms.message}</p>
            )}
          </div>
        </div>

        {/* Submit */}
        <Button type="submit" variant="cta" size="lg" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Register Now
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default RegistrationForm;
