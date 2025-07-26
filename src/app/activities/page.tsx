
'use client';

import { useState, useEffect } from 'react';
import type { Activity } from '@/types';
import { ActivityList } from '@/components/activities/ActivityList';
import { MainLayout } from '@/components/layout/MainLayout';
import { mockActivities } from '@/lib/mockData';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ACTIVITIES_STORAGE_KEY = 'adminActivities';

export default function ActivitiesPage() {
  const [allActivities, setAllActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const savedActivities = localStorage.getItem(ACTIVITIES_STORAGE_KEY);
    const loadedActivities = savedActivities ? JSON.parse(savedActivities) : mockActivities;
    setAllActivities(loadedActivities);
    setFilteredActivities(loadedActivities);
    
    const uniqueCategories = Array.from(new Set(loadedActivities.map((act: Activity) => act.category)));
    setCategories(uniqueCategories);
  }, []);

  const handleSearch = () => {
    let activities = allActivities;

    if (searchTerm) {
      activities = activities.filter(activity =>
        activity.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      activities = activities.filter(activity =>
        activity.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredActivities(activities);
  };
  
  useEffect(() => {
    // This allows real-time filtering as you type or select
    handleSearch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedCategory, allActivities]);


  return (
    <MainLayout>
      <div className="space-y-8">
        <section className="text-center py-8 bg-card shadow-md rounded-lg">
          <h1 className="text-4xl font-bold font-headline text-primary">Discover Dubai's Best Activities</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From thrilling desert adventures to iconic landmarks, find unforgettable experiences in Dubai.
          </p>
        </section>

        <section className="bg-card p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="md:col-span-1">
              <label htmlFor="activity-search" className="block text-sm font-medium text-foreground mb-1">Search Activities</label>
              <Input 
                type="text" 
                id="activity-search" 
                placeholder="e.g., Desert Safari" 
                className="font-body"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="activity-category" className="block text-sm font-medium text-foreground mb-1">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger id="activity-category" className="font-body">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category.toLowerCase()}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full md:w-auto font-body" aria-label="Search activities" onClick={handleSearch}>
              <Search size={18} className="mr-2" />
              Search
            </Button>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-headline font-semibold mb-6 text-center md:text-left">Explore Activities</h2>
          <ActivityList activities={filteredActivities} />
        </section>
      </div>
    </MainLayout>
  );
}
