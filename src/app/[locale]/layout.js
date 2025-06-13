import ClientLayout from "./ClientLayout";
import { AuthProvider } from "../contexts/AuthContext";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { getSysVar } from "../../utils/FirestoreData";

import "@/app/globals.css"

async function RootLayout({
  children,
  params
}) {
  const loc = await params;
  const messages = await getMessages(loc.locale);
  // Get global variables
  const sysvar = await getSysVar();
  return (
    <html lang={loc.locale}>
      <head>
        <link rel="icon" href="/logo.svg" />
        <meta name="theme-color" content="#000000" />
        <title>{process.env.NEXT_PUBLIC_NAME}</title>
        
        <link rel="alternate" hrefLang="en" href="https://www.perfectocv/en"/>
        <link rel="alternate" hrefLang="es" href="https://www.perfectocv/es"/>
        <link rel="canonical" href="https://www.perfectocv" />

        <meta name="author" content="PerfectoCV" />
        <meta name="keywords" content="cv, resume, curriculum, curriculum vitae, ia, ai, inteligencia artificial, artificial intelligence, mejorar, improve" />

        <meta
          name="description"
          content={messages.metaTag.description}
        />
      </head>
      <body>
        <NextIntlClientProvider locale={loc.locale} messages={messages}>
            <AuthProvider sysVar={sysvar.system}>
              <ClientLayout>
                {children}
              </ClientLayout>
            </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export default RootLayout;