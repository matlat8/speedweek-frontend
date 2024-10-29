import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link';
import { TopLaps } from '../TopLaps';
import { SpeedWeekAPI } from '@/api/SpeedWeekAPI';
import { useQuery } from '@tanstack/react-query';
import { useQueryParam } from '@/hooks/params';
import { Modal } from '@/components/Modal';
import { Spinner } from '@/components/Spinner';

interface Week {
    id: number;
    week_num: number;
    car_id: number;
    track_id: number;
    start_date: string;
    end_date: string;
    season_id: number;
    track: Track;
    car: Car;
}

interface Track {
    id: number;
    name: string;
    config: string;
    iracing_image_url: string;
}

interface Car {
    id: number;
    car_name: string;
    car_category: string;
    iracing_car_picture: string;
}

const formatLapTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const milliseconds = Math.floor((seconds % 1) * 1000);

    return `${minutes}:${String(remainingSeconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;};


export function WeeksListing() {
    const router = useRouter();
    const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
    const [isWeekDialogOpen, setIsWeekDialogOpen] = useState(false);
    const { league_id, season_id } = useParams<{ league_id: string, season_id: string}>();
    const [ , setWeekId ] = useQueryParam<string>("weekId", '');

    const { data, isLoading, error } = useQuery({
        queryKey: ['weeks', league_id, season_id],
        queryFn: () => SpeedWeekAPI.fetch(`/leagues/${league_id}/seasons/${season_id}/weeks` as '/leagues/{league_id}/seasons/{season_id}/weeks'),
    })

    return (
        <div>
            <ul>
                {data && data.success && data.data
                .map((week) => (
                    <li key={week.id} className='rounded-lg bg-white mb-4 flex max-h-[191px] overflow-hidden transition-shadow duration-300 hover:shadow-md'>
                        <div className='flex w-full' onClick={ () => setWeekId(String(week.id)) }>
                            <div className='pl-4 pt-4 flex-1'>
                                <div className='font-bold pb-6'>Week {week.week_num}</div>
                                <div className='font-light'>{week.track.config}</div>
                                <div className='pb-6 font-semibold'>{week.track.name}</div>
                                <div className='font-light'>{week.car.car_name}</div>

                            </div>
                            <div className='flex items-center h-full w-[340px] justify-end ml-auto'>
                                <Image
                                    src={week.car.iracing_car_picture} 
                                    alt={week.car.car_name} 
                                    layout="intrinsic" 
                                    width={340} 
                                    height={191} 
                                    className='object-cover h-full w-full' 
                                />
                            </div>
                        </div>
                        <WeekModal { ...week } />
                    </li>
                    
                ))}
            </ul>
        </div>
    );
};

function WeekModal(row: SpeedWeekAPI.$_RequestSchema["/leagues/{league_id}/seasons/{season_id}/weeks"]['data'][number]) {
    const [weekId, setWeekId] = useQueryParam<string>("weekId", "");
    const { league_id } = useParams<{ league_id: string}>();
    const dev = false;

    const closeModal = () => {
        setWeekId(""); // Clear the weekId query parameter
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ['weeks', row.id],
        queryFn: () => SpeedWeekAPI.fetch(`/leagues/${league_id}/seasons/${row.season_id}/weeks/${row.id}/laps` as '/leagues/{league_id}/seasons/{season_id}/weeks/{week_id}/laps'),
        enabled: !!weekId && Number(weekId) === row.id
    })

    return (

        <Modal state={[!!weekId && Number(weekId) === row.id, closeModal]}>
                <div className='flex flex-col bg-white rounded-lg shadow-lg px-5 py-4 max-w-xl dark:bg-gray-800'>
                    {isLoading && (
                        <div className='flex items-center justify-center h-32 w-32'>
                            <Spinner color='primary'/>
                        </div>
                    )}

                    {data && data.success && data.data.length >= 1 && dev && (
                    <div>
                        <pre>{JSON.stringify(data, null, 4)}</pre>
                    </div>
                    )}

                    {data && data.success && data.data.length >= 1 && (
                        <>
                        <div className='flex flex-col w-auto'>
                            {data.data.map((row) => (
                                <div className='flex gap-4 border-b-2 p-2'>
                                    <div className='w-[16rem]'>
                                        <p>{row.driver.firstName} {row.driver.lastName}</p>
                                    </div>
                                    <div className='w-[16rem] flex items-center justify-center'>
                                        {row.lapNumber}
                                    </div>
                                    <div className='w-[16rem] ml-auto'>
                                        <p className='text-right'>{formatLapTime(row.lapTime)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='pt-4'>Footer content</div>
                        </>
                    )}

                    {error && (
                        <div className='flex items-center justify-center h-32 w-32'>
                            <p>Error loading data</p>
                        </div>
                    )}

                    {data && data.success && data.data.length === 0 && (
                        <div className='flex items-center justify-center h-32 w-32'>
                            <p>No data available</p>
                        </div>
                    )}
            </div>
        </Modal>
    );
}