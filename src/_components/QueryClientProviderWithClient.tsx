'use client';
import React, {ReactNode} from 'react';
import {QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {queryClient} from '@/app/_lib/queryClient';

interface QueryClientProviderWithClientProps {
  children: ReactNode;
}

export const QueryClientProviderWithClient: React.FC<QueryClientProviderWithClientProps> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
