import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { SeasonDateRange } from './date-range';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { addDays } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import swAPI from '@/api/axiosInstance';
import { useParams } from 'next/navigation';




export function NewSeason() {
    const { league_id } = useParams<{ league_id: string }>();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [seasonName, setSeasonName] = useState('');
    const queryClient = useQueryClient();
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 90),
    });
    

    const mutation = useMutation({
        mutationFn: () => {
            return swAPI.post(`/leagues/${league_id}/seasons`, {
                name: seasonName,
                start_date: date?.from?.toISOString().slice(0, 10),
                end_date: date?.to?.toISOString().slice(0, 10)
            });
        },
        onSuccess: () => {
            setIsDialogOpen(false);
            queryClient.invalidateQueries(['seasons', league_id]);
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate();
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger>
            <div className='button-like bg-primary text-white rounded-md px-2 py-2 cursor-pointer drop-shadow-sm'>
                    New Season
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white">
                <DialogHeader>
                    <DialogTitle>Create a new season</DialogTitle>
                    <DialogDescription>
                        <form onSubmit={handleSubmit}>
                        <p>Enter the season number and dates then submit.</p>
                        <div className='pt-2'>
                            <Input 
                                type='text' 
                                placeholder='Season Name'  
                                id='season-name'
                                value={seasonName}
                                onChange={(e) => setSeasonName(e.target.value)}
                            />
                        </div>
                        <div className='pt-2'>
                            <SeasonDateRange 
                                date={date} 
                                setDate={setDate} 
                            />
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