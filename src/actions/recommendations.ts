'use server';

import { getPersonalizedRecommendations as fetchPersonalizedRecommendationsFromFlow } from '@/ai/flows/personalized-recommendations';
import type { PersonalizedRecommendationsInput, PersonalizedRecommendationsOutput } from '@/ai/flows/personalized-recommendations';

async function getPersonalizedRecommendationsAction(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput | { error: string }> {
  try {
    const result = await fetchPersonalizedRecommendationsFromFlow(input);
    return result;
  } catch (error) {
    console.error('Error fetching personalized recommendations:', error);
    return { error: 'Failed to fetch recommendations. Please try again.' };
  }
}

export default getPersonalizedRecommendationsAction;
