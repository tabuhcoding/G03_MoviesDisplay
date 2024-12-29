"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@context/authContext';

export default function LoginResponse() {
  const router = useRouter();
  const { login } = useAuth();
  const [message, setMessage] = useState('Processing your login...');
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    console.log('LoginResponse page mounted');
    if (isFetching) return;
    setIsFetching(true);

    const fetchData = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        if (!token) {
          setMessage('Login failed. Redirecting to login page...');
          router.push("/login");
          return;
        }

        const res = await fetch('api-v2/login/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        });

        if (!res.ok) {
          setMessage('Login failed. Redirecting to login page...');
          router.push("/login");
          return;
        }

        const user = await res.json();
        login(user);
        setMessage('Login successful. Redirecting to profile page...');
        router.push("/");
      } catch (error: any) {
        setMessage(error.response?.data?.message || 'Login failed. Redirecting to login page...');
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [router, login, isFetching]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Login Status</h1>
        <p className="text-gray-600 mb-4">{message}</p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  );
};
