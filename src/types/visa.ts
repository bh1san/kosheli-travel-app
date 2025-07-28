// src/types/visa.ts
import { z } from 'zod';

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const fileSchema = z
    .any()
    .refine((files) => files?.length == 1, "This file is required.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    );

export const visaFormSchema = z.object({
  fullName: z.string().min(1, 'Full name is required.'),
  email: z.string().email('Invalid email address.'),
  phone: z.string().optional(),
  nationality: z.string().min(1, 'Nationality is required.'),
  destination: z.enum(['uae', 'europe'], { required_error: 'Please select a destination.' }),
  visaType: z.string().min(1, 'Visa type is required.'),
  travelDates: z.string().min(1, 'Travel dates are required.'),
  passportCopy: fileSchema,
  passportPhoto: fileSchema,
  notes: z.string().optional(),
});

export type VisaFormValues = z.infer<typeof visaFormSchema>;

export const VisaApplicationOutputSchema = z.object({
  confirmationMessage: z
    .string()
    .describe('A confirmation message to be shown to the user upon successful submission.'),
  applicationId: z.string().describe('A unique ID for the submitted application.'),
});
export type VisaApplicationOutput = z.infer<typeof VisaApplicationOutputSchema>;
