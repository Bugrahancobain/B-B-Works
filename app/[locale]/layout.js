import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function RootLayout({ children, params }) {
  // params.locale'i await ile çöz
  const locale = params?.locale || "en"; // Varsayılan dil atanır
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&family=Quicksand:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div>
            <Navbar locale={locale} />
            {children}
            <ScrollToTopButton />
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}