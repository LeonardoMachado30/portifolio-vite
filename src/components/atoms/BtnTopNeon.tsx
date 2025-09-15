import { useEffect, useState } from 'react';

export function BotaoTopoNeon() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    function aoRolar() {
      if (window.scrollY > 100) {
        setVisivel(true);
      } else {
        setVisivel(false);
      }
    }
    window.addEventListener('scroll', aoRolar);
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  function irParaTopo() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (!visivel) return null;

  return (
    <button
      onClick={irParaTopo}
      style={{
        position: 'fixed',
        right: '1rem',
        bottom: '1rem',
        zIndex: 1000,
        padding: '0.5rem',
        fontSize: '0.8rem',
        color: '#fff',
        background: '#111',
        border: 'none',
        borderRadius: '2rem',
        boxShadow: '0 0 10px #0ff, 0 0 20px #0ff, 0 0 30px #0ff, 0 0 40px #0ff',
        textShadow: '0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff, 0 0 40px #0ff',
        cursor: 'pointer',
        transition: 'box-shadow 0.3s, text-shadow 0.3s',
        outline: 'none',
      }}
      aria-label="Ir para o topo"
    >
      <span className="material-icons-outlined text-[10px]">arrow_upward</span>
    </button>
  );
}
