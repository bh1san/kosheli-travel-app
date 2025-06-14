'use server';

import { getPersonalizedRecommendations as fetchPersonalizedRecommendations } from '@/ai/flows/personalized-recommendations';
import type { PersonalizedRecommendationsInput, PersonalizedRecommendationsOutput } from '@/ai/flows/personalized-recommendations';

export async function getPersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput | { error: string }> {
  try {
    const result = await fetchPersonalizedRecommendations(input);
    return result;
  } catch (error) {
    console.error('Error fetching personalized recommendations:', error);
    return { error: 'Failed to fetch recommendations. Please try again.' };
  }
}
