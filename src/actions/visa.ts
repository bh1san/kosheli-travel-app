
'use server';

import { applyForVisa as applyForVisaFlow } from '@/ai/flows/visa-application-flow';
import type { VisaApplicationInput } from '@/ai/flows/visa-application-flow';
import type { VisaApplicationOutput } from '@/types/visa';
import { sendVisaApplicationEmail } from '@/services/email';

async function applyForVisaAction(
  input: VisaApplicationInput
): Promise<VisaApplicationOutput | { error: string }> {
  try {
    const result = await applyForVisaFlow(input);
    
    // After successful AI processing, send the email
    await sendVisaApplicationEmail({
        applicantName: input.fullName,
        applicantEmail: input.email,
        attachments: [
            {
                filename: `passport-copy-${input.fullName.replace(/\s/g, '_')}.png`,
                content: input.passportDataUri.split("base64,")[1],
                encoding: 'base64',
                contentType: 'image/png' // Assuming PNG, adjust if other types are used
            },
            {
                filename: `passport-photo-${input.fullName.replace(/\s/g, '_')}.png`,
                content: input.passportPhotoDataUri.split("base64,")[1],
                encoding: 'base64',
                contentType: 'image/png' // Assuming PNG
            }
        ]
    });

    return result;
  } catch (error) {
    console.error('Error in visa application action:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { error: `Failed to submit visa application. ${errorMessage}` };
  }
}

export default applyForVisaAction;
