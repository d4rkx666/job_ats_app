import "@/app/globals.css"
import { NextIntlClientProvider } from "next-intl";
import { AuthProvider } from "./contexts/AuthContext";
import ClientLayout from "./[locale]/ClientLayout";
import { getMessages } from "next-intl/server";
import { getSysVar } from "@/utils/FirestoreData";

export default async function RootLayout({
  children, params
}) {
  const loc = await params;
  const messages = await getMessages(loc.locale);

  // Get global variables
  const sysvar = await getSysVar();
  return (
   <html lang={loc.locale}>
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