'use client'

import { useQuery } from '@tanstack/react-query'

import { fetchMyTeams } from '@/api/Teams'

import { Spinner } from '@/components/Spinner'
import { Container } from '@/components/Container'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import ProtectedRoute from '@/components/ProtectedRoute'
import { Input } from '@/components/ui/input'
export default function teamsPage() {

    const { data, error, isLoading } = useQuery({ queryKey: ['teams'], queryFn: fetchMyTeams })
    console.log('Data:', data);

    if (isLoading) return (
        <div className='flex items-center justify-center min-h-screen'>
            <Spinner />
        </div>
    );
    if (error) return <div>Error loading teams</div>;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

    }
    
    // Extract the teams array from the response data
    const teams = data?.data || [];

    return (
        <ProtectedRoute>
            <Container>
                <div className='flex pt-12'>
                    <Dialog>
                      <DialogTrigger>
                        <Button>Create New Team</Button>
                      </DialogTrigger>
                      <DialogContent className='bg-white'>
                        <DialogHeader>
                            <DialogTitle className='text-primary'>Create a new team</DialogTitle>
                            <DialogDescription>
                                <p>Enter your email address then submit.</p>
                                <div className='pt-2'>
                                    <Input 
                                        type='text' 
                                        placeholder='Team Name' 
                                        className='pt-4' 
                                        id='team-id'/>
                                </div>
                                
                            </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                </div>
                <h1 className='font-extrabold text-3xl pt-4'>My Teams</h1>
                <div className='flex gap-6 pt-4'>
                    {Array.isArray(teams) && teams.length > 0 ? (
                        teams.map((team: any) => (
                            <div key={team.owner_id} className='p-4 border border-gray-300 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-md bg-white cursor-pointer hover:bg-gray-50 hover:shadow-lg transition duration-200'>
                                <div className='grid grid-cols-12 h-32'>
                                    <div className='col-span-12 flex'>
                                        <p className='font-bold'>{team.name}</p>
                                    </div>
                                    <div className='col-span-12'>
                                        <p>{team.display_name}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>No teams available</div>
                    )}
                </div>
                <pre className='text-grey'>
                    <code>{JSON.stringify(data, null, 4)}</code>
                </pre>
            </Container>
        </ProtectedRoute>
    );
}