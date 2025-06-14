import type { Activity } from '@/types';
import { ActivityCard } from './ActivityCard';

interface ActivityListProps {
  activities: Activity[];
}

export function ActivityList({ activities }: ActivityListProps) {
  if (activities.length === 0) {
    return <p className="text-center text-muted-foreground">No activities available at the moment. Please check back later.</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}
