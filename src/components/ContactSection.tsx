import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, MapPin, Send, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import emailjs from '@emailjs/browser';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email').max(255),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const organizers = [
  // {
  //   name: 'Dr. Priya Sharma',
  //   role: 'Faculty Coordinator',
  //   phone: '+91 98765 43210',
  //   email: 'priya.sharma@college.edu',
  // },
  {
    name: 'Arun Kumar',
    role: 'Student Coordinator',
    phone: '+91 84284 90019',
    email: '720723104022@hicet.ac.in',
  },
];

const ContactSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    setIsSubmitted(true);
    reset();

    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  } catch (error) {
    console.error('EmailJS Error:', error);
    alert('Failed to send message. Please try again.');
  }
};


  return (
    <section id="contact" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get in Touch
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have questions? Our organizing team is here to help. 
            Reach out to us and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div>
            {/* Venue */}
            <div className="bg-card rounded-lg border border-border p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Venue</h3>
                  <p className="text-muted-foreground">
                    Kalam Auditorium,Near Main Block<br />
                    Hindusthan College Of Engineering and Technology<br />
                    Coimbatore, Tamil Nadu - 641032
                  </p>
                </div>
              </div>
            </div>

            {/* Organizers */}
            <h3 className="font-semibold text-foreground mb-4">Organizers</h3>
            <div className="space-y-4">
              {organizers.map((organizer) => (
                <div
                  key={organizer.email}
                  className="bg-card rounded-lg border border-border p-4 flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <span className="font-semibold text-accent-foreground">
                      {organizer.name.split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground">{organizer.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{organizer.role}</p>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <a
                        href={`tel:${organizer.phone.replace(/\s/g, '')}`}
                        className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        {organizer.phone}
                      </a>
                      <a
                        href={`mailto:${organizer.email}`}
                        className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors truncate"
                      >
                        <Mail className="w-4 h-4 shrink-0" />
                        {organizer.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-lg border border-border p-6 md:p-8">
            <h3 className="font-semibold text-foreground mb-6">Send us a message</h3>

            {isSubmitted ? (
              <div className="text-center py-8 animate-scale-in">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-foreground font-medium">Message sent successfully!</p>
                <p className="text-sm text-muted-foreground mt-1">We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Name *</Label>
                    <Input
                      id="contact-name"
                      placeholder="Your name"
                      {...register('name')}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email *</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="your@email.com"
                      {...register('email')}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-subject">Subject *</Label>
                  <Input
                    id="contact-subject"
                    placeholder="How can we help?"
                    {...register('subject')}
                    aria-invalid={!!errors.subject}
                  />
                  {errors.subject && (
                    <p className="text-sm text-destructive">{errors.subject.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-message">Message *</Label>
                  <Textarea
                    id="contact-message"
                    placeholder="Your message..."
                    rows={5}
                    {...register('message')}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive">{errors.message.message}</p>
                  )}
                </div>

                <Button type="submit" variant="default" size="lg" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}

            <p className="text-xs text-muted-foreground mt-4 text-center">
              Admin: Connect this form to Formspree or Google Forms webhook for email delivery.
            </p>
          </div>
        </div>
      </div>
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
      <iframe
        title="map"
        className="w-full h-80 border-0 rounded"
        src="https://www.google.com/maps?q=Hindusthan+College+of+Engineering+and+Technology,+Coimbatore&output=embed"></iframe>
    <div className="flex justify-center mt-6">
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=Hindusthan+College+of+Engineering+and+Technology,+Coimbatore"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-xl font-semibold text-white
                     bg-gradient-to-r from-blue-600 to-purple-600
                     hover:from-blue-500 hover:to-purple-500
                     transition-all duration-300 shadow-lg"
        >
          📍 Get Directions
        </a>
      </div>
    </section>

    </section>
  );
};

export default ContactSection;
