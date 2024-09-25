'use client'

import ProtectedRoute from "@/components/ProtectedRoute";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import swAPI from "@/api/axiosInstance";


export default function Home() {

  const { data: garage61LinkData, error: garage61LinkError, isLoading: garage61LinkIsLoading } = useQuery({
    queryKey: ['garage61Link'],
    queryFn: () => swAPI.get('/auth/garage61'),
  })

  const handleGarage61LinkClick = () => {
    window.open(garage61LinkData?.data?.url, '_blank');
  }
  return (
    <ProtectedRoute>
      <div className="pt-8 pl-8">
        <Button onClick={handleGarage61LinkClick}>
          <p>Link Garage61</p>
        </Button>
      </div>
    </ProtectedRoute>
  );
}
