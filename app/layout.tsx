"use client"

import "./globals.css";
import TopBar from "@/components/TopBar";
import SideBar from "@/components/SideBar";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import ThemeRegistry from "./ThemeRegistry";
import ThemeContextProvider from "@/libs/contexts/context";
import LayoutWrapper from "@/components/LayoutWrapper";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  }
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <ThemeContextProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeRegistry options={{ key: 'mui' }}>
              <LayoutWrapper>
                <TopBar />
                <SideBar/>
                {children}
              </LayoutWrapper>
            </ThemeRegistry>
          </QueryClientProvider>  
        </ThemeContextProvider>
      </body>
    </html>
  );
}
