
'use server';

import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import type { Testimonial } from '@/types';

const commentSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  location: z.string().min(1, 'Location is required.'),
  quote: z.string().min(1, 'Comment is required.'),
});

export async function submitComment(prevState: any, formData: FormData) {
  const validatedFields = commentSchema.safeParse({
    name: formData.get('name'),
    location: formData.get('location'),
    quote: formData.get('quote'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const newTestimonial: Omit<Testimonial, 'id'> = {
      ...validatedFields.data,
      status: 'pending',
      imageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        validatedFields.data.name
      )}&background=random`,
    };

    await addDoc(collection(db, 'testimonials'), newTestimonial);

    return { success: true, message: 'Comment submitted for review.' };
  } catch (error) {
    console.error('Error submitting comment:', error);
    return { success: false, message: 'Failed to submit comment.' };
  }
}
