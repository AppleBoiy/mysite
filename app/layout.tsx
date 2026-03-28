import type { Metadata } from 'next';

// Root metadata for PWA and icons
export const metadata: Metadata = {
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Chaipat Portfolio',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

// Root layout delegates to locale layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
