import type { ReactNode } from 'react';

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="bg-gray-800"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
        animation: 'scanlines 5s linear infinite',
      }}
    >
      {/* <Header /> */}

      <main className="mx-auto max-w-[1240px] p-4 pt-20 flex gap-4">
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
