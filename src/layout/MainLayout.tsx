import { Header } from '@/components/molecules/Header';
import { Info } from '@/components/molecules/Info';
import type { ReactNode } from 'react';

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-primary-500 h-full">
      <Header />

      <main className="mx-auto max-w-[1240px] p-4 pt-20 flex gap-4">
        <Info />
        <div
          className="animate-fade-in"
          style={{
            animation: 'fadeIn 2s linear forwards',
            opacity: 0,
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
