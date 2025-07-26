
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

export const VisaApplicationInputSchema = z.object({
  fullName: z.string().describe('The full name of the applicant.'),
  email: z.string().email().describe('The email address of the applicant.'),
  phone: z.string().optional().describe('The phone number of the applicant.'),
  nationality: z.string().describe('The nationality of the applicant.'),
  destination: z.enum(['uae', 'europe']).describe('The visa destination.'),
  visaType: z.string().describe('The type of visa being applied for.'),
  travelDates: z.string().describe('The planned travel dates.'),
  passportDataUri: z
    .string()
    .describe(
      "A scanned copy of the user's passport, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  notes: z.string().optional().describe('Any additional notes from the applicant.'),
});
export type VisaApplicationInput = z.infer<typeof VisaApplicationInputSchema>;

export const VisaApplicationOutputSchema = z.object({
  confirmationMessage: z
    .string()
    .describe('A confirmation message to be shown to the user upon successful submission.'),
  applicationId: z.string().describe('A unique ID for the submitted application.'),
});
export type VisaApplicationOutput = z.infer<typeof VisaApplicationOutputSchema>;

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
  
You have received a new visa application. Your task is to review the provided information and the attached passport copy. 

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

Passport Document:
{{media url=passportDataUri}}
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
