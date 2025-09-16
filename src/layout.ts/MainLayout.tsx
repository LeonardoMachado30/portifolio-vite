import { type ReactNode } from 'react';

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <main
      className="bg-gray-800"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.01) 2px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.01) 1px, transparent 2px)`,
        backgroundSize: '50px 50px',
        animation: 'scanlines 5s linear infinite',
      }}
    >
      <div
        className="gap-4 bg-gray-800 "
        style={{
          backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.01) 2px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.01) 2px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'scanlines 5s linear infinite',
        }}
      >
        {children}
      </div>
    </main>
  );
}
