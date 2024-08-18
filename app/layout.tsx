import "./globals.css";
import TopBar from "@/components/TopBar";
import SideBar from "@/components/SideBar";
import ResultsCounter from "@/components/ResultsCounter";
import Providers from "@/utils/Providers";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <Providers>
          <TopBar />
          <SideBar>
            <ResultsCounter />
          </SideBar>
          {children}
        </Providers>
      </body>
    </html>
  );
}
