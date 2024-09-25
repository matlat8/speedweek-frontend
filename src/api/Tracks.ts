import swAPI from "./axiosInstance";

export const fetchAllTracks = async () => {
    const response = await swAPI.get('/tracks');
    return response.data;
}