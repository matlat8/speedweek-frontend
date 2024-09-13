'use client'
import { Spinner } from '@/components/Spinner';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchLeagueDetails } from '@/api/Leagues';
import { fetchSeasons } from '@/api/Seasons';
import { MembersList } from './MembersList';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Season, columns } from './(SeasonsTable)/columns';
import { SeasonsDataTable } from './(SeasonsTable)/SeasonsList';
import { NewSeason } from './(NewSeason)/NewSeason';


export default function LeagueDetailsPage() {
    const { league_id } = useParams<{ league_id: string }>();

    const { data, error, isFetching } = useQuery({
        queryKey: ['leagues', league_id],
        queryFn: () => fetchLeagueDetails(league_id as string),
        enabled: !!league_id, // Only run the query if league_id is available
    });

    const { data: seasonsData, error: seasonsError, isFetching: seasonsIsFetching } = useQuery({
        queryKey: ['seasons', league_id],
        queryFn: () => fetchSeasons(league_id as string),
        enabled: !!league_id, // Only run the query if league_id is available
    });

    if (!league_id) return <div>Loading...</div>;
    if (isFetching) return (
        <div className='flex items-center justify-center min-h-screen'>
            <Spinner color='primary'/>
        </div>
    );
    if (error) return <div>Error loading league details</div>;
    console.log(data);
    // Formatted Fields
    data.info.created_at = format(new Date(data.info.created_at), 'MMMM dd, yyyy');

    // API Extracted Fields
    const info = data?.info || {};
    const members = data?.members || [];
    const seasons: Season[] = seasonsData?.data || [];

    return (
        <>
        <div className='flex p-4 pt-8 gap-4'>
            <div className='bg-white border border-gray-200 rounded-md min-w-96 h-auto'>
                <h1 className='text-2xl font-semibold p-4'>{info.name}</h1>
                <p className='p-4'>{info.created_at}</p>
                <Button className='m-4' variant={'outline'}>Edit</Button>
            </div>
        </div>
        <div className='bg-white mt-3 h-full'>
            <div className='flex justify-between items-center p-4'>
                <h2 className='text-lg font-semibold'>Seasons</h2>
                <div>
                    <NewSeason />
                </div>
            </div>
        <SeasonsDataTable columns={columns} data={seasons} />
    </div>
        </>
    );
}