"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useRedirectToHome = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/');
  }, [router]);
};

export default useRedirectToHome;
