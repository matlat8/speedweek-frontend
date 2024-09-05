'use client'

import { useQuery } from '@tanstack/react-query'

import fetchLeagues from '@/api/Leagues'
import ProtectedRoute from '@/components/ProtectedRoute'
export default function LeaguesPage() {

    const { data, error, isLoading } = useQuery({ queryKey: ['leagues'], queryFn: fetchLeagues })

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading leagues</div>;
    
    return (
        <ProtectedRoute>
            <div>
                <h1>Leagues</h1>
            </div>
        </ProtectedRoute>
    );
}