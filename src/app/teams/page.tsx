'use client'

import { useQuery } from '@tanstack/react-query'

import { fetchMyTeams } from '@/api/Teams'

import { Spinner } from '@/components/Spinner'
import { Container } from '@/components/Container'
import ProtectedRoute from '@/components/ProtectedRoute'
export default function teamsPage() {

    const { data, error, isLoading } = useQuery({ queryKey: ['teams'], queryFn: fetchMyTeams })
    console.log('Data:', data);

    if (isLoading) return (
        <div className='flex items-center justify-center min-h-screen'>
            <Spinner />
        </div>
    );
    if (error) return <div>Error loading teams</div>;
    
    // Extract the teams array from the response data
    const teams = data?.data || [];

    return (
        <ProtectedRoute>
            <Container>
                <pre className='text-grey'>
                    <code>{JSON.stringify(data, null, 4)}</code>
                </pre>
                <div className='border border-grey'>
                    {Array.isArray(teams) && teams.length > 0 ? (
                        teams.map((team: any) => (
                            <div key={team.owner_id}>
                                {team.name}
                            </div>
                        ))
                    ) : (
                        <div>No teams available</div>
                    )}
                </div>
            </Container>
        </ProtectedRoute>
    );
}