'use client'

import { fetchLeagueDetails } from "@/api/Leagues";
import { fetchSeasonDetails } from "@/api/Seasons"
import { fetchWeeks } from "@/api/Weeks";
import { Container } from "@/components/Container";
import { Spinner } from "@/components/Spinner";
import { useQuery } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { WeeksListing } from "./(WeeksList)/WeeksList";


export default function seasonPage() {

    const router = useRouter()
    const { season_id, league_id } = useParams<{ season_id: string, league_id: string }>();
    const seasonId = parseInt(season_id)
    const leagueId = parseInt(league_id)

    const { data, isLoading, error } = useQuery({
        queryKey: ['seasons', 'season_id'],
        queryFn: () => fetchSeasonDetails(seasonId, leagueId),
    })

    const { data: leagueData, isLoading: leagueIsLoading, error: leagueError } = useQuery({
        queryKey: ['leagues', leagueId],
        queryFn: () => fetchLeagueDetails(leagueId),
    })

    const { data: weeksData, isLoading: weeksIsLoading, error: weeksError } = useQuery({
        queryKey: ['weeks', leagueId, seasonId],
        queryFn: () => fetchWeeks(leagueId, seasonId),
    })

    if (isLoading) return (
        <div className='flex items-center justify-center min-h-full'>
            <Spinner color='primary'/>
        </div>
    );
    return (
        <Container className="sm:pt-[8rem] pb-8">
        <div>
            <h1 className="font-light text-[20px]">
                {leagueData ? leagueData.info.name : 'Loading...'}
            </h1>
            <h1 className="font-medium text-[24px]">
                {data ? data.info.name : 'Loading...'}
            </h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-4" style={{ minHeight: '100%' }}>
            <div className="w-full sm:w-2/5 bg-white overflow-y-auto" style={{ maxHeight: 'calc(100vh - 12rem)', paddingBottom: '1rem' }}>
                <pre className="p-4">
                    <code>{JSON.stringify(data, null, 4)}</code>
                    <code>{JSON.stringify(leagueData, null, 4)}</code>
                    <code>{JSON.stringify(weeksData, null, 4)}</code>
                </pre>
            </div>
            <div className="w-full sm:w-3/5">
                <WeeksListing data={weeksData?.data || []} />
            </div>
        </div>
    </Container>
    )
}