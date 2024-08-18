"use client"

import ThemeRegistry from '@/app/ThemeRegistry';
import LayoutWrapper from '@/components/LayoutWrapper';
import ThemeContextProvider from '@/libs/contexts/context';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function Providers({ children }: {children: React.ReactNode}) {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    }
  })

  return (
    <ThemeContextProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeRegistry options={{ key: 'mui' }}>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </ThemeRegistry>
      </QueryClientProvider>
    </ThemeContextProvider>
  )
}

