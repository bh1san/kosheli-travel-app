
import { MainLayout } from '@/components/layout/MainLayout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What travel documents do I need to visit Dubai?",
    answer: "Most visitors require a passport valid for at least six months. Depending on your nationality, you may need to apply for a visa in advance. We can assist you with the visa application process."
  },
  {
    question: "What is the best time of year to visit Dubai?",
    answer: "The best time to visit Dubai is from November to March when the weather is cooler and pleasant, making it ideal for outdoor activities. The summer months (June to September) are very hot."
  },
  {
    question: "What currency is used in Dubai?",
    answer: "The official currency is the UAE Dirham (AED). Credit and debit cards are widely accepted, but it's a good idea to have some cash for smaller purchases and local markets."
  },
  {
    question: "Can you arrange custom tour packages?",
    answer: "Absolutely! We specialize in creating personalized travel itineraries based on your interests, budget, and travel dates. Contact us to start planning your custom trip."
  },
  {
    question: "What is your cancellation policy?",
    answer: "Cancellation policies vary depending on the flight, activity, or package booked. Please refer to the specific terms and conditions provided at the time of booking or contact us for details."
  },
   {
    question: "Do I need travel insurance?",
    answer: "Travel insurance is highly recommended for all trips to cover unforeseen circumstances such as medical emergencies, trip cancellations, or lost luggage. We can help you find a suitable insurance plan."
  }
];


export default function FaqPage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        <section className="text-center py-8 bg-card shadow-md rounded-lg">
          <h1 className="text-4xl font-bold font-headline text-primary">Frequently Asked Questions</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about traveling to Dubai with Kosheli Travel.
          </p>
        </section>

        <section className="max-w-4xl mx-auto">
           <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg text-left font-semibold hover:no-underline">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pl-9">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </MainLayout>
  );
}
