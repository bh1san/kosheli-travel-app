
'use server';

import { applyForVisa as applyForVisaFlow } from '@/ai/flows/visa-application-flow';
import type { VisaApplicationInput } from '@/ai/flows/visa-application-flow';
import type { VisaApplicationOutput } from '@/types/visa';

async function applyForVisaAction(
  input: VisaApplicationInput
): Promise<VisaApplicationOutput | { error: string }> {
  try {
    const result = await applyForVisaFlow(input);
    return result;
  } catch (error) {
    console.error('Error in visa application action:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { error: `Failed to submit visa application. ${errorMessage}` };
  }
}

export default applyForVisaAction;
