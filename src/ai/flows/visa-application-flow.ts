
'use server';
/**
 * @fileOverview A visa application processing AI agent.
 *
 * - applyForVisa - A function that handles the visa application submission.
 * - VisaApplicationInput - The input type for the applyForVisa function.
 * - VisaApplicationOutput - The return type for the applyForVisa function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { visaFormSchema, VisaApplicationOutputSchema } from '@/types/visa';
import type { VisaApplicationOutput } from '@/types/visa';

// Remove file fields from the flow input, as we handle the data URIs directly.
const VisaApplicationInputSchema = visaFormSchema.omit({ passportCopy: true, passportPhoto: true }).extend({
  passportDataUri: z
    .string()
    .describe(
      "A scanned copy of the user's passport, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'"
    ),
  passportPhotoDataUri: z
    .string()
    .describe(
      "The user's passport size photo, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'"
    ),
});

export type VisaApplicationInput = z.infer<typeof VisaApplicationInputSchema>;

export async function applyForVisa(
  input: VisaApplicationInput
): Promise<VisaApplicationOutput> {
  return visaApplicationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'visaApplicationPrompt',
  input: {schema: VisaApplicationInputSchema},
  output: {schema: VisaApplicationOutputSchema},
  prompt: `You are a visa processing assistant for Kosheli Travel.
  
You have received a new visa application. Your task is to review the provided information and the attached documents.

Generate a unique application ID in the format 'VISA-YYYYMMDD-XXXXXX' where X is a random alphanumeric character.

Based on the applicant's details, create a friendly and professional confirmation message. Address the applicant by their full name. Inform them that their application for the {{visaType}} to {{destination}} has been received and is now under review. Mention that they will receive an update at their email address ({{email}}) within 5-7 business days.

Applicant Details:
- Name: {{fullName}}
- Nationality: {{nationality}}
- Email: {{email}}
- Phone: {{phone}}
- Destination: {{destination}}
- Visa Type: {{visaType}}
- Travel Dates: {{travelDates}}
- Notes: {{notes}}

Documents:
- Passport Document: {{media url=passportDataUri}}
- Passport Photo: {{media url=passportPhotoDataUri}}
`,
});

const visaApplicationFlow = ai.defineFlow(
  {
    name: 'visaApplicationFlow',
    inputSchema: VisaApplicationInputSchema,
    outputSchema: VisaApplicationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
