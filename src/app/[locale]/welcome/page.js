"use client"
import { useEffect } from 'react';
import WelcomePro from './components/WelcomePro';
import { useRouter } from 'next/navigation';

const WelcomeProPage = () => {

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 6000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <WelcomePro/>
  )
};

export default WelcomeProPage;