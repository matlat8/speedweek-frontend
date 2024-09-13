import { fetchLeagueMembers } from "@/api/Leagues";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Spinner } from "@/components/Spinner";

interface Member {
    id: number;
    is_owner: boolean;
    is_admin: boolean;
    user_id: string;
    display_name: string;
}

interface MembersListProps {
    data: Member[];
}

export function MembersList({ league_id }: { league_id: number }) {
    const { data, error, isFetching } = useQuery<MembersListProps>({
        queryKey: ['leaguesmembers', league_id],
        queryFn: () => fetchLeagueMembers(league_id),
        enabled: !!league_id,
    });

    if (isFetching) return <Spinner />;
    if (error) return <div>Error loading members</div>;

    const members = data?.data || [];

    return (
        <div className="flex">
            {members.map(member => (
                <div key={member.id} className="w-full h-16 border border-black">
                    <p>{member.display_name}</p>
                </div>
            ))}
        </div>
    );
}