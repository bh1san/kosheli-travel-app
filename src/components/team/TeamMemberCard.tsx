
'use client';

import Image from 'next/image';
import type { TeamMember } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader>
        <div className="relative w-32 h-32 mx-auto">
          <Image
            src={member.imageUrl}
            alt={`Profile picture of ${member.name}`}
            width={128}
            height={128}
            className="rounded-full object-cover border-4 border-primary/20"
            data-ai-hint="person portrait"
            key={member.imageUrl}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardTitle className="text-xl font-headline">{member.name}</CardTitle>
        <CardDescription className="text-primary font-semibold">{member.role}</CardDescription>
        <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
      </CardContent>
      <CardFooter className="p-4 bg-muted/30 justify-center gap-4">
        {member.socials?.twitter && (
          <Button asChild variant="ghost" size="icon" aria-label={`${member.name}'s Twitter profile`}>
            <Link href={member.socials.twitter} target="_blank" rel="noopener noreferrer">
              <Twitter className="h-5 w-5" />
            </Link>
          </Button>
        )}
        {member.socials?.linkedin && (
          <Button asChild variant="ghost" size="icon" aria-label={`${member.name}'s LinkedIn profile`}>
            <Link href={member.socials.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
