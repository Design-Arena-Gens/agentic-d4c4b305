import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Autonomous Dev Environment',
  description: 'Plan, simulate, and validate features with agents',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        <div className="mx-auto max-w-6xl p-6">
          <header className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Autonomous Development Environment</h1>
            <a className="text-sm text-brand-600 hover:underline" href="https://vercel.com" target="_blank" rel="noreferrer">Vercel</a>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
