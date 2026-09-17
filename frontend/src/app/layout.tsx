import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Job Search AI',
  description: 'Compare your CV with a job posting using AI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
