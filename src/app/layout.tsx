import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen`} style={{backgroundColor:"#f3f3f3"}}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
