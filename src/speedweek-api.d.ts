declare namespace SpeedWeekAPI {

    type ListResponse<T> = { data: T[] };

    type SuccessfulResponse<T> = { success: true } & T;

    type Error = {
        success: false;
        detail: string | { type: "missing", loc: string[] }[];
    };

    type Response<T> = SuccessfulResponse<T> | Error;

    interface $_RequestSchema {
        [key: string]: unknown;

        "/health": { version: string };
    }

    /// /// /// /// /// ///

    type League = {
        id: number;
        name: string;
        owner_id: string;
        discord_guild_id: string;
        visibility: boolean;
        invite_token: string;
        updated_at: string;
        created_at: string;
    }

    interface $_RequestSchema {
        "/leagues": ListResponse<{
            id: number;
            name: string;
            owner_id: string;
            discord_guild_id: string;
            visibility: boolean;
            invite_token: string;
            updated_at: string;
            created_at: string;
        }>;
    }

    interface $_RequestSchema {
        [`/leagues/${ number }`]: SuccessfulResponse<League>;
    }

    /// /// Seasons /// ///

    interface $_RequestSchema {
        "/leagues/{league_id}/seasons": ListResponse<{
            id: number;
            league_id: number;
            name: string;
            start_date: string;
            end_date: string;
            season_num: number;
            updated_at: string;
            created_at: string;
        }>;
    }

    interface $_RequestSchema {
        "/leagues/{league_id}/seasons/{season_id}": SuccessfulResponse<{
            id: number;
            league_id: number;
            name: string;
            start_date: string;
            end_date: string;
            season_num: number;
            season_num: number;
            updated_at: string;
            created_at: string;
        }>;
    }

    interface $_RequestSchema {
        "/leagues/{league_id}/seasons/{season_id}/weeks": ListResponse<{
                season_id: number;
                id: number;
                end_date: string;
                updated_at: string;
                track_id: number;
                week_num: number;
                car_id: number;
                start_date: string;
                created_at: string;
                track: {
                    iracing_image_url: string;
                    id: number;
                    config: string;
                    created_at: string;
                    name: string;
                    iracing_id: number;
                    garage61_id: number;
                    updated_at: string;
                };
                car: {
                    car_category: string;
                    id: number;
                    iracing_car_id: number;
                    garage61_car_id: number;
                    updated_at: string;
                    iracing_car_picture: string;
                    car_name: string;
                    created_at: string;
                };
        }>;
    }

    interface $_RequestSchema {
        "/leagues/{league_id}/seasons/{season_id}/weeks/{week_id}/laps": ListResponse<{
            id: string;
            driver: {
                slug: string;
                firstName: string;
                lastName: string;
            }
            driverRating: number;
            event: string;
            session: number;
            sessionType: string;
            run: number;
            season: {
                id: number;
                name: string;
                shortName: string;
                start: string;
                end: string;
            }
            car: {
                id: number;
                name: string;
                platform: string;
                platform_id: number;
            }
            track: {
                id: number;
                name: string;
                variant: string;
                platform: string;
                platform_id: number;
            }
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
            sectors: {
                sectorTime: number;
                incomplete: boolean;
            }[];
            fuelLevel: number;
            fuelUsed: number;
            fuelAdded: number;
            tireCompound: number;
            canViewTelemetry: boolean;
            canViewSetup: boolean;
        }>;
    }

}