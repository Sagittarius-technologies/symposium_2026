import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What is the refund policy?',
    answer: 'Registrations are non-refundable once payment is confirmed. However, you may transfer your registration to another participant by contacting us at least 48 hours before the event. In case of event cancellation by organizers, full refunds will be processed within 7-10 business days.',
  },
  {
    question: 'Can I register for multiple events?',
    answer: 'Yes! You can register for multiple individual events or purchase combo passes (Tech + Non-Tech) for the best value. Each event requires a separate registration unless you have a combo pass.',
  },
  {
    question: 'What are the team size requirements?',
    answer: 'Team sizes vary by event: Paper Presentation (1-3 members), Dance Competition (1-10 members), Tech events (1-3 members). Solo participation is allowed for all events unless specified otherwise.',
  },
  {
    question: 'What should I bring to the event?',
    answer: 'Bring your college ID card (mandatory), laptop with charger for tech events, and your registration confirmation email. For workshops, ensure required software is pre-installed as per event guidelines.',
  },
  {
    question: 'How do I pay for registration?',
    answer: 'All payments are processed through our secure Google Forms registration link. We accept UPI and net banking. On the spot registration is also available at the event.',
  },
  {
    question: 'Will I get a certificate?',
    answer: 'Yes, all participants receive digital participation certificates. Winners receive merit certificates and prizes. Certificates will be sent via email within one week after the event.',
  },
  {
    question: 'What if I face technical issues during registration?',
    answer: 'If you experience any technical difficulties, please email us at 720723104032@hicet.ac.in or call our helpline. We\'re available Mon-Sat, 9 AM - 6 PM IST.',
  },
  {
    question: 'Is food provided during the event?',
    answer: 'Light refreshments and lunch will be provided to all registered participants. Please mention any dietary restrictions during registration.',
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-16 md:py-24 bg-gradient-to-b from-[#071133] via-[#071a45] to-[#06112b] text-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-teal-300 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-white text-lg max-w-2xl mx-auto">
            Got questions? We've got answers. If you can't find what you're looking for, 
            feel free to contact us.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-lg border border-border px-6 data-[state=open]:shadow-card"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
