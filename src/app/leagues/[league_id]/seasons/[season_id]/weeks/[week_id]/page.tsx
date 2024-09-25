'use client'
import { fetchLaps } from "@/api/Weeks";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation";


export default function WeekPage() {
const { league_id, season_id, week_id } = useParams<{ league_id: string, season_id: string, week_id: string }>();

    const { data: lapData, error: lapError, isLoading: lapIsLoading } = useQuery({
        queryKey: ['laps', league_id, season_id, week_id],
        queryFn: () => fetchLaps(Number(league_id), Number(season_id), Number(week_id)),
    });

    if (lapIsLoading) return <div>Loading...</div>;
    return (
        <ProtectedRoute>
            <div>WeekPage</div>
            <pre>
                {JSON.stringify(lapData? lapData.data : 'Loading...', null, 2)}
            </pre>
        </ProtectedRoute>
        
        
    )
}