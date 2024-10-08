'use client'

import { fetchLeagueDetails } from "@/api/Leagues";
import { fetchSeasonDetails } from "@/api/Seasons"
import { fetchWeeks } from "@/api/Weeks";
import { Container } from "@/components/Container";
import { Spinner } from "@/components/Spinner";
import { useQuery } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { WeeksListing } from "./(WeeksList)/WeeksList";
import { Button } from "@/components/ui/button";
import { NewWeekDialog } from "./(NewWeek)/NewWeek";
import { useState } from "react";
import { SpeedWeekAPI } from "@/api/SpeedWeekAPI";


export default function seasonPage() {

    const router = useRouter()
    const { season_id, league_id } = useParams<{ season_id: string, league_id: string }>();
    const seasonId = parseInt(season_id)
    const leagueId = parseInt(league_id)

    const { data, isLoading, error } = useQuery({
        queryKey: ['seasons', seasonId],
        queryFn: () => SpeedWeekAPI.fetch(`/leagues/${leagueId}/seasons/${seasonId}` as '/leagues/{league_id}/seasons/{season_id}'),
    })

    const { data: leagueData, isLoading: leagueIsLoading, error: leagueError } = useQuery({
        queryKey: ['leagues', leagueId],
        queryFn: () => fetchLeagueDetails(leagueId),
    })




    if (isLoading) return (
        <div className='flex items-center justify-center min-h-full'>
            <Spinner color='primary'/>
        </div>
    );
    return (
        <Container className="sm:pt-[8rem] pb-8">
        <div className="flex items-center">
            <div className="flex-col">
                <h1 className="font-light text-[20px]">
                    
                </h1>
                <h1 className="font-medium text-[24px]">
                    {data?.success ? data.name : 'Loading...'}
                </h1>
            </div>
            <div className="ml-auto flex items-center space-x-2">
                <Button variant={'outline'} onClick={() => router.push(`/leagues/${leagueId}/seasons/${seasonId}/edit`)}>Edit</Button>
                <NewWeekDialog />
            </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4" style={{ minHeight: '100%' }}>
            <div className="flex flex-col relative w-full sm:w-2/5 bg-white overflow-y-auto" style={{ maxHeight: 'calc(100vh - 12rem)', paddingBottom: '1rem' }}>
                <pre className="p-4 flex-grow">
                    <code>{JSON.stringify(data, null, 4)}</code>
                    <code>{JSON.stringify(leagueData, null, 4)}</code>
                </pre>
                <div className="mt-auto p-4 bg-gray-100 text-gray-600 text-sm">
                    Footer content here
                </div>
            </div>
            <div className="w-full sm:w-3/5">
                <WeeksListing />
            </div>
        </div>
    </Container>
    )
}