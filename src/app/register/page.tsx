'use client'

import swAPI from "@/api/axiosInstance";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter()

    const mutation = useMutation({
        mutationFn: () => {
            return swAPI.post('/auth/register', {
                email: email,
                password: password
            })
        },
        onSuccess: () => {
            router.push('/login')
        },
        onError: (error) => {
            console.log(error)
            setErrorMessage(error.response?.data?.detail)
        }
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate();
    }
    return (
        <div>
            <Container className="bg-orange-200">
                <div className='flex items-center justify-center min-h-screen'>
                    <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                        <form onSubmit={handleSubmit}>
                            <h1 className="text-2xl font-bold mb-6 text-center pb-4">Create a new account</h1>
                            {errorMessage && <p className='text-red-400'>{errorMessage}</p>}
                            <Input 
                                type="email" 
                                placeholder="Email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                />
                            <Input 
                                type="password" 
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                            <Button variant="default" className="w-max pt-2">Submit</Button>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    )
}