import swAPI from "./axiosInstance"

export const fetchAllCars = async () => {
    const response = await swAPI.get('/cars');
    return response.data;
}