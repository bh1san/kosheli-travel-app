
'use client';

import { useState, useEffect } from 'react';
import { mockTeamMembers } from '@/lib/mockData';
import type { TeamMember } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { getData, saveTeamMember, deleteTeamMember } from '@/services/firestore';

export default function AdminTeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    async function fetchTeam() {
      setIsLoading(true);
      let data = await getData<TeamMember>('team');
      if (data.length === 0) {
        await Promise.all(mockTeamMembers.map(member => saveTeamMember(member)));
        data = mockTeamMembers;
      }
      setTeamMembers(data);
      setIsLoading(false);
    }
    fetchTeam();
  }, []);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    let memberData: TeamMember;
    
    if (editingMember) {
      memberData = {
        ...editingMember,
        name: formData.get('name') as string,
        role: formData.get('role') as string,
        bio: formData.get('bio') as string,
        imageUrl: formData.get('imageUrl') as string,
        socials: {
          linkedin: formData.get('linkedin') as string,
          twitter: formData.get('twitter') as string,
        },
      };
    } else {
      memberData = {
        id: `TM${Date.now()}`,
        name: formData.get('name') as string,
        role: formData.get('role') as string,
        bio: formData.get('bio') as string,
        imageUrl: formData.get('imageUrl') as string || 'https://placehold.co/400x400.png',
        socials: {
          linkedin: formData.get('linkedin') as string,
          twitter: formData.get('twitter') as string,
        },
      };
    }

    await saveTeamMember(memberData);
    const updatedTeam = await getData<TeamMember>('team');
    setTeamMembers(updatedTeam);
    
    closeDialog();
  };
  
  const handleEditClick = (member: TeamMember) => {
    setEditingMember(member);
    setIsDialogOpen(true);
  };

  const handleDeleteMember = async (id: string) => {
     if(confirm('Are you sure you want to delete this team member?')) {
        await deleteTeamMember(id);
        setTeamMembers(teamMembers.filter(m => m.id !== id));
     }
  };
  
  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingMember(null);
  };

  const openAddDialog = () => {
    setEditingMember(null);
    setIsDialogOpen(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-headline">Manage Team Members</h1>
        <Dialog open={isDialogOpen} onOpenChange={(isOpen) => {if(!isOpen) closeDialog()}}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <PlusCircle className="mr-2" /> Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingMember ? 'Edit Team Member' : 'Add a New Team Member'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div><Label htmlFor="name">Name</Label><Input id="name" name="name" required defaultValue={editingMember?.name} /></div>
              <div><Label htmlFor="role">Role</Label><Input id="role" name="role" required defaultValue={editingMember?.role} /></div>
              <div><Label htmlFor="bio">Bio</Label><Textarea id="bio" name="bio" required defaultValue={editingMember?.bio} /></div>
              <div><Label htmlFor="imageUrl">Image URL</Label><Input id="imageUrl" name="imageUrl" placeholder="https://placehold.co/400x400.png" defaultValue={editingMember?.imageUrl} /></div>
              <div><Label htmlFor="linkedin">LinkedIn URL</Label><Input id="linkedin" name="linkedin" defaultValue={editingMember?.socials?.linkedin} /></div>
              <div><Label htmlFor="twitter">Twitter URL</Label><Input id="twitter" name="twitter" defaultValue={editingMember?.socials?.twitter} /></div>
              <Button type="submit" className="w-full">{editingMember ? 'Save Changes' : 'Add Member'}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card p-4 rounded-lg shadow-md">
        {isLoading ? (
          <p>Loading team members...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <Image src={member.imageUrl} alt={member.name} width={60} height={60} className="rounded-full object-cover" key={member.imageUrl}/>
                  </TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell className="space-x-2">
                     <Button variant="outline" size="icon" onClick={() => handleEditClick(member)}><Edit size={16} /></Button>
                     <Button variant="destructive" size="icon" onClick={() => handleDeleteMember(member.id)}><Trash2 size={16} /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
