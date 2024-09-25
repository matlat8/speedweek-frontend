import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link';
import { TopLaps } from '../TopLaps';

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

interface WeeksListingProps {
    data: Week[];
}

export const WeeksListing: React.FC<WeeksListingProps> = ({ data }) => {
    const router = useRouter();
    const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
    const [isWeekDialogOpen, setIsWeekDialogOpen] = useState(false);
    const { league_id, season_id } = useParams<{ league_id: string, season_id: string}>();

    const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
        const weekId = e.currentTarget.id;
        setSelectedWeek(Number(weekId));
        setIsWeekDialogOpen(true);
    }
    return (
        <div>
            <ul>
                {data.map((week) => (
                    <li key={week.id} className='rounded-lg bg-white mb-4 flex max-h-[191px] overflow-hidden transition-shadow duration-300 hover:shadow-md' onClick={handleClick}>
                        <div className='flex w-full'>
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
                            <TopLaps week_id={week.id} isDialogOpen={isWeekDialogOpen}/>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};