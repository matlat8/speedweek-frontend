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

}