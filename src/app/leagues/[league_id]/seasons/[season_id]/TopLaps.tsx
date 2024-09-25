
import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query"
import { fetchLaps, Lap} from "@/api/Weeks";
import { Spinner } from "@/components/Spinner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect, useState } from "react";


const formatLapTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const milliseconds = Math.floor((seconds % 1) * 1000);

    return `${minutes}:${String(remainingSeconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;};

interface TopLapsProps {
    week_id: number;
    isDialogOpen: boolean;
}

export function TopLaps({ week_id, isDialogOpen: initialDialogOpen }: TopLapsProps) {
    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { league_id, season_id } = useParams<{ league_id: string, season_id: string }>();
    const { data: lapData, error: lapError, isLoading: lapIsLoading } = useQuery({
        queryKey: ['laps', league_id, season_id, week_id],
        queryFn: () => fetchLaps(Number(league_id), Number(season_id), Number(week_id)),
    });

    useEffect(() => {
        setIsDialogOpen(initialDialogOpen);
    }, [initialDialogOpen]);

    if (lapIsLoading) return (
        <div className='flex items-center justify-center min-h-screen'>
            <Spinner color='primary'/>
        </div>
    );

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="bg-white">
                <div>
                {lapData?.data.items.map((lap: Lap, index: number) => (
                    <div key={lap.id} className="flex p-2 border-b border-gray-200">
                        <div className="w-1/3">{index + 1}</div>
                        <div className="w-1/3 text-center">{lap.driver.firstName} {lap.driver.lastName}</div>
                        <div className="w-1/3 text-right">{formatLapTime(lap.lapTime)}</div>
                    </div>
                ))}
                </div>
            </DialogContent>
        </Dialog>

    )
}