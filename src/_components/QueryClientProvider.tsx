'use client';
import React, {ReactNode} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import { queryClient } from '@/app/_lib/queryClient';


interface QueryClientProviderWithClientProps {
  children: ReactNode;
}
export default function QueryClientProviderWithClient({
  children,
}: QueryClientProviderWithClientProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
