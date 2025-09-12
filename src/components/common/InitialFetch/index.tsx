'use client';

import { getCookie } from 'cookies-next';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { useHomeStore } from '@/store';

import { Spinner } from '../Spinner';

export const InitialFetch: React.FC = () => {
  const { isLoading: homeLoading, fetch: homeFetch } = useHomeStore();
  const pathname = usePathname();
  const router = useRouter();
  const isLoading = homeLoading.main;

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    const noGoLogin = [
      '/login',
      'signin',
      '/signup',
      'sentry-example',
    ].includes(pathname);

    if (!accessToken) {
      if (!noGoLogin) {
        router.replace('/login');
      }
    } else {
      homeFetch.getMe();
    }
  }, []);

  return <>{isLoading && <Spinner />}</>;
};
