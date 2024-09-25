import { useQuery } from "@tanstack/react-query";

import swAPI from '@/api/axiosInstance'
import { StringToBoolean } from "class-variance-authority/types";

export const fetchWeeks = async (league_id: number, season_id: number) => {
    const response = await swAPI.get(`leagues/${league_id}/seasons/${season_id}/weeks`);
    return response.data;
}

interface Driver {
    slug: string;
    firstName: string;
    lastName: string;
}

interface Season {
    id: number;
    name: string;
    shortName: string;
    start: string;
    end: string;
}

interface Car {
    id: number;
    name: string;
    platform: string;
    platform_id: number;
}

interface Track {
    id: number;
    name: string;
    variant: string;
    platform: string;
    platform_id: number;
}

interface Sector {
    sectorTime: number;
    incomplete: boolean;
}

export interface Lap {
    id: string;
    driver: Driver;
    driverRating: number;
    event: string;
    session: number;
    sessionType: number;
    run: number;
    season: Season;
    car: Car;
    track: Track;
    startTime: string;
    lapNumber: number;
    lapTime: number;
    clean: boolean;
    joker: boolean;
    discontinuity: boolean;
    missing: boolean;
    incomplete: boolean;
    offtrack: boolean;
    pitlane: boolean;
    pitIn: boolean;
    pitOut: boolean;
    trackTemp: number;
    trackUsage: number;
    trackWetness: number;
    airTemp: number;
    clouds: number;
    airDensity: number;
    airPressure: number;
    windVel: number;
    windDir: number;
    relativeHumidity: number;
    fogLevel: number;
    precipitation: number;
    sectors: Sector[];
    fuelLevel: number;
    fuelUsed: number;
    fuelAdded: number;
    tireCompound: number;
    canViewTelemetry: boolean;
    canViewSetup: boolean;
}

interface Item {
    items: Lap[];
}

interface LapResponse {
    data: Item;
}
export const fetchLaps = async(leagueId: number, season_id: number, weekId: number) => {
    const response = await swAPI.get<LapResponse>(`leagues/${leagueId}/seasons/${season_id}/weeks/${weekId}/laps`);
    return response.data;
}