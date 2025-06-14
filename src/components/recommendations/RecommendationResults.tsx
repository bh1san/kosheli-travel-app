import type { PersonalizedRecommendationsOutput } from '@/ai/flows/personalized-recommendations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plane, MapPin } from 'lucide-react';

interface RecommendationResultsProps {
  results: PersonalizedRecommendationsOutput;
}

export function RecommendationResults({ results }: RecommendationResultsProps) {
  return (
    <div className="mt-8 space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-headline flex items-center gap-2">
            <Plane className="text-primary h-6 w-6" />
            Flight Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/90 whitespace-pre-line">{results.flightRecommendations}</p>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-headline flex items-center gap-2">
            <MapPin className="text-primary h-6 w-6" />
            Activity Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/90 whitespace-pre-line">{results.activityRecommendations}</p>
        </CardContent>
      </Card>
    </div>
  );
}
