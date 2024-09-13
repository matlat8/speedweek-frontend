'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { Container } from '@/components/Container'

import fetchLeagues from '@/api/Leagues'
import ProtectedRoute from '@/components/ProtectedRoute'
export default function LeaguesPage() {

    const { data, error, isLoading } = useQuery({ queryKey: ['leagues'], queryFn: fetchLeagues })
    const router = useRouter()
    
    console.log('Data:', data);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading leagues</div>;
    const leagues = data?.data || [];
    return (
        <ProtectedRoute>
            <Container>
                <div className='flex gap-6 pt-4'>
                    {Array.isArray(leagues) && leagues.length > 0 ? (
                        leagues.map((league: any) => (
                            <div 
                            key={league.id} 
                            className='p-4 border border-gray-300 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-md bg-white cursor-pointer hover:bg-gray-50 hover:shadow-lg transition duration-200'                            onClick={() => router.push(`/leagues/${league.id}`)}>
                                <h1>{league.name}</h1>
                                <p>{league.description}</p>
                            </div>
                        ))
                    ) : (
                        <div>No leagues found</div>
                    )}
                    <div>
                    </div>
                </div>
                <pre>
                    <code>{JSON.stringify(data, null, 4)}</code>
                </pre>
            </Container>
        </ProtectedRoute>
    );
}