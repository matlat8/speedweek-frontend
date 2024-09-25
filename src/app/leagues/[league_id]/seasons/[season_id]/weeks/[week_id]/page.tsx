'use client'
import { fetchLaps } from "@/api/Weeks";
import ProtectedRoute from "@/components/ProtectedRoute";

import { useParams } from "next/navigation";
import { TopLaps } from "../../TopLaps";


export default function WeekPage() {
    const { league_id, season_id, week_id } = useParams<{ league_id: string, season_id: string, week_id: string }>();


    return (
        <ProtectedRoute>
            <div>WeekPage</div>
            <div className="flex pt-16">
                <div className="w-1/2 bg-white">
                    <TopLaps />
                </div>
            </div>
        </ProtectedRoute>
        
        
    )
}