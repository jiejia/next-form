import {Inter} from "next/font/google";
import "./globals.css";
import {Providers} from "./providers";
import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';


const inter = Inter({subsets: ["latin"]});

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    const locale = await getLocale();

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();


    return (
        <html lang={locale}>
        <body className={`${inter.className} h-screen`} style={{backgroundColor: "#f3f3f3"}}>
        <NextIntlClientProvider messages={messages}>
            <Providers>
                {children}
            </Providers>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
