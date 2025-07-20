import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Project Papa - De gids voor de man, zonder gedoe",
  description: "Progressive Web App voor aanstaande vaders met dagelijkse zwangerschapscontent en humor",
  applicationName: "Project Papa",
  authors: [{ name: "Project Papa" }],
  keywords: ["zwangerschap", "papa", "vader", "baby", "zwanger", "pregnancy", "dad"],
  creator: "Project Papa",
  publisher: "Project Papa",
  formatDetection: {
    telephone: false,
  },
  metadataBase: new URL("https://projectpapa.nl"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://projectpapa.nl",
    title: "Project Papa - De gids voor de man, zonder gedoe",
    description: "Progressive Web App voor aanstaande vaders met dagelijkse zwangerschapscontent en humor",
    siteName: "Project Papa",
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Papa - De gids voor de man, zonder gedoe",
    description: "Progressive Web App voor aanstaande vaders met dagelijkse zwangerschapscontent en humor",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Project Papa",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-256x256.png", sizes: "256x256", type: "image/png" },
      { url: "/icon-384x384.png", sizes: "384x384", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#FEDD03",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://api.giphy.com" />
        <link rel="dns-prefetch" href="https://api.giphy.com" />
      </head>
      <body>
        <div id="root">{children}</div>
        <script dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                  .then(function(registration) {
                    console.log('SW registered: ', registration);
                  })
                  .catch(function(registrationError) {
                    console.log('SW registration failed: ', registrationError);
                  });
              });
            }
          `
        }} />
      </body>
    </html>
  );
}
