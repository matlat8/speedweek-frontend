import { useQuery } from "@tanstack/react-query";

import swAPI from '@/api/axiosInstance'

export const fetchUserInformation = async (userId: string) => {
    const response = await swAPI.get(`/users/${userId}`);
    return response.data;
}

export const getUserInformation = (userId: string) => {
    return useQuery({
        queryKey: ['users', userId],
        queryFn: () => fetchUserInformation(userId),
        enabled: !!userId,
    })
}
