

'use client';

import { useState, useEffect } from 'react';
import type { Testimonial } from '@/types';
import { getData } from '@/services/firestore';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Star } from 'lucide-react';

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 5000 })]);

  useEffect(() => {
    async function loadTestimonials() {
      setIsLoading(true);
      const data = await getData<Testimonial>('testimonials');
      setTestimonials(data);
      setIsLoading(false);
    }
    loadTestimonials();
  }, []);

  if (isLoading) {
    return <div className="text-center">Loading testimonials...</div>;
  }

  if (testimonials.length === 0) {
    return null; // Don't render the section if there are no testimonials
  }

  return (
    <section className="py-12 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-headline font-semibold mb-8 text-center">What Our Customers Say</h2>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4">
                <Card className="h-full flex flex-col justify-between shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                            </div>
                        </div>
                        <blockquote className="text-foreground/80 italic">
                           "{testimonial.quote}"
                        </blockquote>
                    </CardContent>
                    <div className="p-6 bg-card flex items-center gap-4 border-t">
                        <Image
                            src={testimonial.imageUrl}
                            alt={testimonial.name}
                            width={56}
                            height={56}
                            className="rounded-full object-cover border-2 border-primary"
                            key={testimonial.imageUrl}
                            data-ai-hint="person portrait"
                        />
                        <div>
                            <p className="font-semibold text-foreground">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                        </div>
                    </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
