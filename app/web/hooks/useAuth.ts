"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import appConfig from '@/config/app.config';

export const useAuth = () => {
   const [authenticated, setAuthenticated] = useState<boolean>(null!);
   const router = useRouter();

   useEffect(() => {
      if (typeof window !== 'undefined') {
         const verifyToken = async () => {
            const token = localStorage.getItem('accessToken'); // or however you store your token
            if (!token) {
               setAuthenticated(false);
               return;
            }

            try {
               const response = await axios.post(`${appConfig.BACKEND_URL}/api/verifytoken`, { token });
               setAuthenticated(response.data.authenticated);
            } catch (error) {
               setAuthenticated(false);
            }
         };

         verifyToken();
      }
   }, []);

   useEffect(() => {
      if (authenticated === false) {
         router.push('/login');
      }

   }, [authenticated, router]);

   return authenticated;
};