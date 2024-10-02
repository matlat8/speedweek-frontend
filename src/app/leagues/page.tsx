'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { Container } from '@/components/Container'

import ProtectedRoute from '@/components/ProtectedRoute'
import { Spinner } from '@/components/Spinner'
import { SpeedWeekAPI } from '@/api/SpeedWeekAPI'
export default function LeaguesPage() {

    const { data, isLoading, error } = useQuery({ 
        queryKey: ['leagues'], 
        queryFn: () => SpeedWeekAPI.fetch('/leagues') 
    })
    const router = useRouter()


    if (error) return <div>Error loading leagues: {JSON.stringify(error)}</div>;

    return (
        <ProtectedRoute>
            <Container>
                <div className='flex gap-6 pt-4'>

                    { isLoading && (
                        <div className='flex items-center justify-center min-h-screen'>
                            <Spinner color='primary' />
                        </div>
                    )}

                    {data && data.success && (
                        data.data
                        .map((league: any) => (
                            <div 
                            key={league.id} 
                            className='p-4 border border-gray-300 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-md bg-white cursor-pointer hover:bg-gray-50 hover:shadow-lg transition duration-200'
                            onClick={() => router.push(`/leagues/${league.id}`)}>
                                <h1>{league.name}</h1>
                                <p>{league.created_at}</p>
                                <p>{}</p>
                            </div>
                        ))
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