import swAPI from "./axiosInstance";

export const fetchSeasons = async (league_id: number) => {
    const response = await swAPI.get(`leagues/${league_id}/seasons`);
    return response.data;
}

export const fetchSeasonDetails = async (season_id: number, league_id: number) => {
    const response = await swAPI.get(`leagues/${league_id}/seasons/${season_id}`);
    return response.data;
}

