import type { Metadata } from 'next';
import './globals.css';
import ThemeInjector from '../components/ThemeInjector';

export const metadata: Metadata = {
  title: 'ValueCalcer',
  description: 'Compare product value for money',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeInjector />
        {children}
      </body>
    </html>
  );
}
