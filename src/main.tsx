import { MainLayout } from '@/layout.ts/MainLayout.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App.tsx';
import './index.scss';
import { Exemplo } from './pages/Exemplo.tsx';
import { Portfolio } from './pages/Projetos.tsx';
import Resume from './pages/Resume.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/" element={<App />} />
          <Route path="/resumo" element={<Resume />} />
          <Route path="/projetos" element={<Exemplo />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  </StrictMode>
);
