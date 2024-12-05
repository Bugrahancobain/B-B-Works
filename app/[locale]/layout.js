import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export const metadata = {
  title: {
    default: "B&B Works",
    template: "%s | B&B Works", // Sayfa başlıkları için genel şablon
  },
  description: "Welcome to B&B Works. Explore our digital agency",
  keywords: ["B&B Works", "Shopify", "Google ADS", "Meta", "Digital Agency", "Services", "References", "Blog"],
  openGraph: {
    title: "B&B Works",
    description: "Welcome to B&B Works. Explore our digital agency.",
    type: "website",
    url: "https://www.bbworks.com",
    images: "/default-image.jpg",
  },
};

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
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-6MNF9663RH"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-6MNF9663RH');
                        `,
          }}
        ></script>
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

