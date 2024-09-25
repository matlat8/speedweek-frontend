import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAllCars } from "@/api/Cars";
import { fetchAllTracks } from "@/api/Tracks";
import { addDays } from 'date-fns';
import CarsSelect from "./carsSelect";
import TracksSelect from "./tracksSelect";
import { ADateRange } from "@/components/DateRange";
import swAPI from "@/api/axiosInstance";
import { useParams } from 'next/navigation';

interface SelectedCar { 
    value: string;
    label: string;
}

interface SelectedTrack {
    value: string;
    label: string;
}


export function NewWeekDialog() {
    const { league_id, season_id } = useParams<{ league_id: string, season_id: string}>();
    const queryClient = useQueryClient();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState<SelectedCar | null>(null);
    const [selectedTrack, setSelectedTrack] = useState<SelectedTrack | null>(null);
    const [date, setDate] = useState<DateRange | undefined>({
        to: addDays(new Date(), 7),
        from: new Date(),
    });

    const { data: carData, isLoading: carIsLoading, error: carError } = useQuery({
        queryKey: ['cars'],
        queryFn: () => fetchAllCars()
    });

    const { data: tracksData, isLoading: tracksIsLoading, error: tracksError } = useQuery({
        queryKey: ['tracks'],
        queryFn: () => fetchAllTracks()
    })

    const handleCarSelect = (selectedItem: { value: string, label: string } | null) => {
        setSelectedCar(selectedItem);
    }
    const handleTrackSelect = (selectedItem: { value: string, label: string } | null) => {
        setSelectedTrack(selectedItem);
    }
    const mutation = useMutation({
        mutationFn: () => {
            return swAPI.post(`leagues/${league_id}/seasons/${season_id}/weeks`, {
                track_id: selectedTrack?.value,
                car_id: selectedCar?.value,
                start_date: date?.from?.toISOString().slice(0, 10),
                end_date: date?.to?.toISOString().slice(0, 10)
            })
        },
        onSuccess: () => {
            setIsDialogOpen(false);
            queryClient.invalidateQueries(['weeks', league_id, season_id]);
        }
    })


    const handleSubmit = (e: React.FormEvent<any>) => {
        e.preventDefault();
        mutation.mutate();
    };

    console.log(carData);
    
    const transformedCarData = Array.isArray(carData?.data) ? carData.data.map(car => ({
        value: car.id.toString(),
        label: car.car_name
    })) : [];

    const transformedTrackData = Array.isArray(tracksData?.data) ? tracksData.data.map(track => ({
        value: track.id.toString(),
        label: track.name + ' - ' + track.config
    })) : [];

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger>
                <div className='button-like bg-primary text-white rounded-md px-2 py-2 cursor-pointer drop-shadow-sm'>
                    New Week
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-2xl sm:max-h-full bg-white">
                <DialogHeader>
                    <DialogTitle>New Week</DialogTitle>
                    <DialogDescription>
                        <form onSubmit={handleSubmit}>
                            <p>I don't know what to put here but it looks better with this text.</p>
                            <div className='flex flex-row'>
                                {/* Add form fields here */}
                            </div>
                            <div className='pt-2 flex gap-2'>
                                <CarsSelect data={transformedCarData} title='cars' onSelect={handleCarSelect}/>
                                <TracksSelect data={transformedTrackData} onSelect={handleTrackSelect}/>
                            </div>
                            <div className="pt-4">
                                <ADateRange date={date} setDate={setDate}/>
                            </div>
                            <div className='pt-8 flex justify-end'>
                                <Button variant='default' type="submit">Submit</Button>
                            </div>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}