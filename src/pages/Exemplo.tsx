import Card from '@/components/molecules/Card';
import { useNeonBoxShadow } from '@/hooks/useNeonBoxShadow';
import { experiencia } from '@/modal/experiencias';
import { sortearLetrasCaotica } from '@/utils/sortearLetrasPorPalavra';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IconGithub, IconLinkedin } from '../components/atoms/icons';

// Imports do Lenis e do GSAP
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registra o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

type Projeto = {
  name: string;
  html_url: string;
  language: string;
  topics: string[];
  homepage: string;
  description: string;
};

async function fetchProjetosGithub(): Promise<Projeto[]> {
  const response = await fetch(
    'https://api.github.com/users/LeonardoMachado30/repos'
  );
  if (!response.ok) {
    throw new Error('Erro ao buscar projetos do GitHub');
  }
  const data = await response.json();
  return data
    .filter(
      (repo: any) => !!repo.description && !!repo.language && repo.homepage
    )
    .map((repo: any) => ({
      name: repo.name
        .split('-')
        .filter((palavra: string) => /^[a-zA-ZÀ-ÿ]+$/.test(palavra))
        .map(
          (palavra: string) =>
            palavra.charAt(0).toUpperCase() + palavra.slice(1)
        )
        .join(' '),
      html_url: repo.html_url,
      language: repo.language,
      topics: repo.topics || [],
      homepage: repo.homepage,
      description: repo.description,
    }));
}

export function Exemplo() {
  // Neon blink state para letras do H1
  const fraseH1 = 'Olá, eu sou o Flávio';
  const [letrasNeon, setLetrasNeon] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const isMobile =
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false;

  // Estados para paginação
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = isMobile ? 2 : 3;

  const totalPaginas = Math.ceil(projetos.length / itensPorPagina);

  // useEffect(() => {
  //   // Força o scroll para o topo imediatamente
  //   window.scrollTo(0, 0);

  //   // Desabilita a restauração automática de scroll do navegador
  //   // if ('scrollRestoration' in history) {
  //   //   history.scrollRestoration = 'manual';
  //   // }

  //   // Backup para garantir que está no topo
  //   document.documentElement.scrollTop = 0;
  //   document.body.scrollTop = 0;
  // }, []);

  const loadProjetos = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      const data = await fetchProjetosGithub();
      setProjetos(data);
    } catch (err: any) {
      setErro(err.message || 'Erro desconhecido');
    } finally {
      setCarregando(false);
    }
  }, []);

  // Setup das animações GSAP
  const setupAnimations = useCallback(() => {
    // Limpa animações anteriores
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Animação do Hero Section
    gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: false,
        pin: false,
        onEnter: () => {
          // Animação de entrada do hero
          const tl = gsap.timeline();

          tl.fromTo(
            '#hero h1',
            {
              opacity: 0,
              y: 100,
              rotationX: -90,
              transformOrigin: '50% 100%',
            },
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 1.5,
              ease: 'power3.out',
            }
          )
            .fromTo(
              '#hero p',
              {
                opacity: 0,
                x: -50,
                filter: 'blur(10px)',
              },
              {
                opacity: 1,
                x: 0,
                filter: 'blur(0px)',
                duration: 1,
                ease: 'power2.out',
              },
              '-=0.8'
            )
            .fromTo(
              '#hero .hero-buttons > *',
              {
                opacity: 0,
                scale: 0,
                rotation: 180,
              },
              {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.6,
                ease: 'back.out(1.7)',
                stagger: 0.1,
              },
              '-=0.5'
            )
            .fromTo(
              '#hero img',
              {
                opacity: 0,
                scale: 0.3,
                filter: 'blur(20px)',
              },
              {
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)',
                duration: 1.2,
                ease: 'elastic.out(1, 0.5)',
              },
              '-=1'
            );
        },
      },
    });

    // Animação da Timeline com pin
    gsap.timeline({
      scrollTrigger: {
        trigger: '#timeline',
        start: 'top 20%',
        end: 'bottom 80%',
        scrub: false,
        pin: true,
        pinSpacing: true,
        onEnter: () => {
          // Animação em cascata dos itens da timeline
          gsap.fromTo(
            '#timeline h2',
            {
              opacity: 0,
              y: -50,
              scale: 0.5,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: 'power3.out',
            }
          );

          gsap.fromTo(
            '.timeline-item',
            {
              opacity: 0,
              x: -100,
              rotationY: -90,
            },
            {
              opacity: 1,
              x: 0,
              rotationY: 0,
              duration: 0.8,
              ease: 'power2.out',
              stagger: 0.3,
              delay: 0.5,
            }
          );

          // Animação da linha da timeline
          gsap.fromTo(
            '.timeline-line',
            {
              opacity: 0,
              scaleY: 0,
              transformOrigin: 'top',
            },
            {
              opacity: 1,
              scaleY: 1,
              duration: 2,
              ease: 'power2.out',
              delay: 0.2,
            }
          );
        },
      },
    });

    // Animação da seção Sobre com efeito de máquina de escrever
    gsap.timeline({
      scrollTrigger: {
        trigger: '#sobre',
        start: 'top 30%',
        end: 'bottom 70%',
        scrub: false,
        pin: true,
        pinSpacing: true,
        onEnter: () => {
          const tl = gsap.timeline();

          // Animação do container como se fosse um monitor ligando
          tl.fromTo(
            '#sobre .terminal-container',
            {
              opacity: 0,
              scale: 0.1,
              filter: 'brightness(0)',
            },
            {
              opacity: 1,
              scale: 1,
              filter: 'brightness(1)',
              duration: 1.5,
              ease: 'power3.out',
            }
          ).fromTo(
            '#sobre .terminal-dots > *',
            {
              scale: 0,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              duration: 0.3,
              stagger: 0.1,
              ease: 'bounce.out',
            },
            '-=0.8'
          );

          // Efeito de digitação
          const paragraphs = document.querySelectorAll('#sobre p');
          paragraphs.forEach((p, index) => {
            const text = p.textContent || '';
            p.textContent = '';

            gsap.to(
              {},
              {
                duration: text.length * 0.02,
                delay: 1.5 + index * 2,
                onUpdate: function () {
                  const progress = this.progress();
                  const currentLength = Math.floor(progress * text.length);
                  p.textContent =
                    text.substring(0, currentLength) +
                    (progress < 1 ? '|' : '');
                },
              }
            );
          });
        },
      },
    });

    // Animação da seção de Projetos com efeito 3D
    gsap.timeline({
      scrollTrigger: {
        trigger: '#projetos',
        start: 'top 20%',
        end: 'bottom 80%',
        scrub: false,
        pin: true,
        pinSpacing: true,
        onEnter: () => {
          // Título com efeito de explosão
          gsap.fromTo(
            '#projetos h2',
            {
              opacity: 0,
              scale: 0,
              rotation: 360,
            },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 1.5,
              ease: 'elastic.out(1, 0.3)',
            }
          );

          // Cards dos projetos com efeito de flip 3D
          gsap.set('.project-card', { perspective: 1000 });

          gsap.fromTo(
            '.project-card',
            {
              opacity: 0,
              rotationY: -180,
              z: -200,
            },
            {
              opacity: 1,
              rotationY: 0,
              z: 0,
              duration: 1,
              ease: 'power2.out',
              stagger: {
                amount: 1.5,
                from: 'random',
              },
              delay: 0.5,
            }
          );

          // Botões sociais com bounce
          gsap.fromTo(
            '#projetos .social-links a',
            {
              opacity: 0,
              y: 100,
              rotation: 360,
            },
            {
              opacity: 1,
              y: 0,
              rotation: 0,
              duration: 0.8,
              ease: 'bounce.out',
              stagger: 0.2,
              delay: 2,
            }
          );
        },
      },
    });
  }, []);

  // useEffect principal para Lenis + GSAP
  useEffect(() => {
    const initializeScrollAndAnimations = async () => {
      await loadProjetos();

      // Inicializa Lenis
      if (!lenisRef.current) {
        lenisRef.current = new Lenis({
          duration: 1.6,
          easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          // direction: 'vertical',
          // gestureDirection: 'vertical',
          // smooth: true,
          // mouseMultiplier: 1.2,
          // smoothTouch: false,
          touchMultiplier: 2,
          infinite: false,
        });

        function raf(time: number) {
          lenisRef.current?.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }

      // Setup das animações após um pequeno delay
      setTimeout(() => {
        setupAnimations();
      }, 300);
    };

    initializeScrollAndAnimations();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, [loadProjetos, setupAnimations]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLetrasNeon(sortearLetrasCaotica(fraseH1));
    }, 6000);
    // setLetrasNeon(sortearLetrasCaotica(fraseH1));
    return () => clearInterval(interval);
  }, [fraseH1]);

  const fullNeon = useNeonBoxShadow({
    textShadowEnter: `
      0 0 2px #ad46ff,
      0 0 4px #ad46ff
    `,
    boxShadowEnter: `
      0 0 4px #ad46ff,
      0 0 10px #ad46ff
    `,
    colorEnter: '#ad46ff',
    scaleLeave: 'scale(1)',
  });

  const neonWelcome = useNeonBoxShadow({
    textShadowEnter: `
      0 0 8px #ad46ff,
      0 0 16px #ad46ff,
      0 0 32px #ad46ff,
      0 0 20px #ad46ff,
      0 0 0px #ad46ff
    `,
    colorEnter: '#ad46ff',
    scaleLeave: 'scale(1)',
  });

  const neonImage = useNeonBoxShadow({
    filterEnter: `
      drop-shadow(0 0 4px #ad46ff)
      drop-shadow(0 0 8px #ad46ff)
      drop-shadow(0 0 12px #ad46ff)
      brightness(1.08)
    `,
    colorEnter: '#ad46ff',
  });

  // Função para obter os projetos da página atual
  const projetosPaginados = projetos.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  // Funções de scroll para Lenis
  const scrollToSection = (selector: string) => {
    const el = document.querySelector(selector);
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el as any, {
        offset: -60,
        lerp: 0.3,
        duration: 2,
        easing: t =>
          t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
      });
    }
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4"
        style={{
          backdropFilter: 'blur(16px)',
          background: 'rgba(30, 41, 59, 0.45)',
          borderBottom: '1px solid rgba(103, 232, 249, 0.18)',
          boxShadow: '0 4px 32px 0 rgba(0,0,0,0.12)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <div className="flex items-center justify-between mx-auto max-w-full sm:max-w-[1240px] w-full">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-base sm:text-xl font-bold text-cyan-200 drop-shadow whitespace-nowrap flex flex-nowrap">
              Flávio Leonardo
              <span className="hidden md:block">Machado de Pádua</span>
              <span className="block md:hidden">M. de P.</span>
            </span>
          </div>
          <nav className="flex gap-6">
            <button
              onClick={() => scrollToSection('#hero')}
              className="text-cyan-100 hover:text-cyan-300 transition-colors"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection('#sobre')}
              className="text-cyan-100 hover:text-cyan-300 transition-colors"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection('#projetos')}
              className="text-cyan-100 hover:text-cyan-300 transition-colors"
            >
              Projetos
            </button>
          </nav>
        </div>
        <div
          className="shadow-neon absolute"
          style={{ height: '20px', bottom: '0px' }}
        />
      </header>

      <div
        ref={containerRef}
        className="w-full min-h-[100vh] flex flex-col"
        style={{ minHeight: '100%' }}
      >
        <div className="max-w-[1240px] mx-auto p-4 pt-20">
          {/* Hero Section */}
          <section
            id="hero"
            className="flex flex-col md:flex-row items-center justify-center text-center md:text-left min-h-screen relative"
          >
            <div className="w-full flex flex-col gap-6">
              <h1
                className="text-5xl md:text-7xl font-extrabold text-shadow-2xs leading-tight font-BitcountGridDouble-ExtraLight m-10 md:mb-0"
                style={{
                  transition: 'text-shadow 0.2s, color 0.2s',
                  letterSpacing: '2px',
                  userSelect: 'none',
                  wordBreak: 'break-word',
                  opacity: 0,
                }}
              >
                {fraseH1.split('').map((letra, idx) => {
                  if (letra === ' ') {
                    return <span key={idx}> </span>;
                  }
                  const isNeon = letrasNeon.includes(idx);
                  return (
                    <span
                      key={idx}
                      className={`${isNeon ? 'neon-blink' : 'neon-off'}`}
                      style={{ minWidth: '1em', fontFamily: 'inherit' }}
                      onMouseEnter={neonWelcome.onMouseEnter}
                      onMouseLeave={neonWelcome.onMouseLeave}
                    >
                      {letra}
                    </span>
                  );
                })}
              </h1>
              <p
                className="text-base sm:text-lg text-gray-200 max-w-full sm:max-w-lg mx-auto md:mx-0"
                style={{ opacity: 0 }}
              >
                Desenvolvedor de Sistemas apaixonada por criar soluções
                inovadoras e eficientes que impactam positivamente a vida das
                pessoas.
              </p>
              <div className="hero-buttons flex gap-6 justify-center md:justify-start">
                <button
                  type="button"
                  onClick={() => scrollToSection('#projetos')}
                  className="flex justify-center items-center text-[#0ff] my-1 mb:py-2 px-4 md:px-6 rounded-full bg-black neon-pulse text-sm md:text-base"
                  style={{ letterSpacing: '2px', opacity: 0 }}
                  onMouseEnter={fullNeon.onMouseEnter}
                  onMouseLeave={fullNeon.onMouseLeave}
                >
                  Ver Projetos
                </button>
                <a
                  href="https://www.linkedin.com/in/flavio-leonardo-machado/"
                  target="_blank"
                  className="flex items-center justify-center p-4 md:p-4 rounded-full bg-black neon-pulse"
                  style={{
                    transition: 'text-shadow 0.4s, color 0.4s, transform 0.4s',
                    letterSpacing: '2px',
                    opacity: 0,
                  }}
                  onMouseEnter={fullNeon.onMouseEnter}
                  onMouseLeave={fullNeon.onMouseLeave}
                >
                  <IconLinkedin />
                </a>
                <a
                  href="https://github.com/LeonardoMachado30"
                  target="_blank"
                  className="flex items-center justify-center p-4 rounded-full bg-black neon-pulse"
                  style={{ letterSpacing: '2px', opacity: 0 }}
                  onMouseEnter={fullNeon.onMouseEnter}
                  onMouseLeave={fullNeon.onMouseLeave}
                >
                  <IconGithub />
                </a>
              </div>
            </div>
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: 'transparent', position: 'relative' }}
            >
              <img
                className="drop-shadow-pulse"
                width={320}
                height={320}
                src="/profile-sem-fundo.png"
                alt="Foto de perfil do desenvolvedor sem fundo"
                onMouseEnter={neonImage.onMouseEnter}
                onMouseLeave={neonImage.onMouseLeave}
                style={{ opacity: 0 }}
              />
            </div>
          </section>

          {/* Timeline Section */}
          <section
            id="timeline"
            className="relative max-w-full sm:max-w-3xl mx-auto py-10 sm:py-16 px-1 sm:px-0 min-h-screen"
          >
            <h2
              className="text-3xl sm:text-5xl font-bold text-center text-primary font-BitcountGridDouble-ExtraLight neon-blink-long mb-16"
              style={{
                letterSpacing: '2px',
                lineHeight: '1.2',
                userSelect: 'none',
                opacity: 0,
              }}
            >
              EXPERIÊNCIAS
            </h2>

            <div className="timeline-line  gap-10 flex flex-col">
              {experiencia.map((exp, idx) => (
                <div
                  key={idx}
                  className="timeline-item relative"
                  style={{ opacity: 0 }}
                >
                  <span className="absolute -left-5 sm:-left-7 top-2 w-4 h-4 sm:w-5 sm:h-5 bg-cyan-400 rounded-full border-2 sm:border-4 border-white shadow-lg"></span>
                  <div className="ml-6 sm:ml-8 bg-gray-900 bg-opacity-80 rounded-xl p-4 sm:p-6 shadow-lg">
                    <h3 className="text-lg sm:text-2xl font-bold text-cyan-300 ">
                      {exp.titulo}
                    </h3>
                    <span className="block text-cyan-100 font-semibold text-sm sm:text-base tagesschrift-regular">
                      {exp.empresa}
                    </span>
                    <span className="block text-gray-400 text-xs sm:text-sm tagesschrift-regular">
                      {exp.periodo}
                    </span>
                    <ul className="text-gray-200 text-sm sm:text-md tagesschrift-regular">
                      {exp.descricoes.map((description, index) => (
                        <li key={index} className="list-disc list-inside ml-4">
                          {description}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4">
                      {exp.topics &&
                        exp.topics.map(topic => (
                          <span
                            key={topic}
                            className="inline-block rounded-full bg-[#ad46ff] px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-semibold mr-2 mb-2 sm:mr-4 transition-all tagesschrift-regular"
                            style={{
                              userSelect: 'none',
                            }}
                          >
                            {topic}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sobre Section */}
          <section
            id="sobre"
            className="w-full flex justify-center items-center min-h-screen"
          >
            <div
              className="terminal-container w-full max-w-full sm:max-w-3xl rounded-2xl shadow-lg bg-[#181c20] border border-cyan-400/40 overflow-hidden mx-1 sm:mx-0"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center justify-between px-2 sm:px-4 py-2 bg-[#23272e] border-b border-cyan-400/30">
                <div className="terminal-dots flex items-center gap-1 sm:gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
                </div>
                <span className="text-cyan-300 font-bold text-base sm:text-lg select-none">
                  Sobre mim
                </span>
                <span className="w-6 sm:w-8"></span>
              </div>
              <div className="px-3 sm:px-6 py-6 sm:py-8 font-mono text-base sm:text-lg text-cyan-200 min-h-[180px] sm:min-h-[220px] bg-[#181c20]">
                <div className="flex items-center">
                  <span className="text-cyan-400 font-bold text-xs sm:text-base">
                    C:/flavio/sobre-mim:
                  </span>
                  <span
                    className="ml-2 animate-blink"
                    style={{
                      animation: 'neon-blink-on 1.2s steps(1) infinite',
                    }}
                  >
                    |
                  </span>
                </div>
                <div aria-live="polite">
                  <p className="text-gray-100 tagesschrift-regular text-xs sm:text-base mb-4">
                    Desde que escrevi minha primeira linha de código, me
                    apaixonei pelo poder de transformar ideias complexas em
                    realidade digital. Tenho experiência em desenvolvimento web
                    e mobile, com foco em tecnologias como JavaScript, React,
                    Node.js e bancos de dados como MongoDB e PostgreSQL. Meu
                    objetivo é sempre aprender e crescer, buscando desafios que
                    me permitam aplicar e expandir meu conhecimento. Acredito
                    que a tecnologia pode ser uma ferramenta de mudança e estou
                    comprometido em construir soluções que sejam não apenas
                    funcionais, mas também intuitivas e acessíveis.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Projetos Section */}
        <section id="projetos" className="min-h-screen py-30">
          <h2
            className="relative text-3xl sm:text-5xl font-bold text-center text-primary font-BitcountGridDouble-ExtraLight neon-blink-long mb-10"
            style={{
              letterSpacing: '2px',
              lineHeight: '1.2',
              userSelect: 'none',
              zIndex: '-1',
              opacity: 0,
            }}
          >
            PROJETOS
          </h2>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-8 lg:gap-10 p-0 sm:p-4 max-w-[1240px] mx-auto"
            style={{
              zIndex: '3',
            }}
          >
            {carregando ? (
              <div className="col-span-full flex justify-center items-center">
                <p>Carregando projetos...</p>
              </div>
            ) : erro ? (
              <div className="col-span-full flex flex-col justify-center items-center">
                <Card>
                  <p>Erro: {erro}</p>
                  <button className="mt-2 px-4 py-1 rounded bg-cyan-700 text-white hover:bg-cyan-800 transition">
                    Tentar novamente
                  </button>
                </Card>
              </div>
            ) : (
              <>
                {projetosPaginados.map((proj, key) => (
                  <div
                    key={key}
                    className="project-card rounded-xl border-[1px] bg-gray-900 mx-4"
                    style={{ opacity: 0 }}
                  >
                    <div className="flex flex-col px-8 p-4 sm:p-6">
                      <h3 className="text-lg sm:text-2xl font-semibold text-[#0ff]">
                        {proj.name}
                      </h3>
                      <p
                        className="text-[#0ff] text-sm sm:text-md leading-tight"
                        style={{
                          transition:
                            'text-shadow 0.8s, color 0.8s, transform 0.8s',
                          userSelect: 'none',
                        }}
                      >
                        {proj.description}
                      </p>
                      <div className="mt-4 mb-2">
                        {proj.topics &&
                          proj.topics.map(topic => (
                            <span
                              key={topic}
                              className="inline-block rounded-full bg-[#ad46ff] px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-semibold mr-1 sm:mr-2 transition-all tagesschrift-regular mb-2"
                              style={{
                                userSelect: 'none',
                              }}
                            >
                              {topic}
                            </span>
                          ))}
                      </div>
                      <a
                        href={proj.homepage}
                        target="_blank"
                        className="inline-block text-primary-pink font-bold text-shadow-primary-pink hover:underline self-end-safe transition-all text-xs sm:text-base"
                        style={{
                          fontWeight: 700,
                          letterSpacing: '0.5px',
                        }}
                      >
                        Ver Detalhes{' '}
                        <span className="material-icons-outlined">
                          arrow_outward
                        </span>
                      </a>
                    </div>
                  </div>
                ))}
                {projetosPaginados.length === 0 && (
                  <Card>
                    <p>Nenhum projeto encontrado nesta página.</p>
                  </Card>
                )}
              </>
            )}
          </div>

          {/* Paginação */}
          {totalPaginas > 1 && (
            <div className="flex justify-center items-center mt-8 gap-2">
              <button
                className="px-3 py-1 rounded bg-cyan-700 text-white hover:bg-cyan-800 transition disabled:opacity-50"
                onClick={() => setPaginaAtual(paginaAtual - 1)}
                disabled={paginaAtual === 1}
              >
                Anterior
              </button>
              <span className="mx-2 text-cyan-200">
                Página {paginaAtual} de {totalPaginas}
              </span>
              <button
                className="px-3 py-1 rounded bg-cyan-700 text-white hover:bg-cyan-800 transition disabled:opacity-50"
                onClick={() => setPaginaAtual(paginaAtual + 1)}
                disabled={paginaAtual === totalPaginas}
              >
                Próxima
              </button>
            </div>
          )}

          <div className="social-links flex gap-6 justify-center md:justify-start mt-10">
            <a
              href="https://www.linkedin.com/in/flavio-leonardo-machado/"
              target="_blank"
              className="flex items-center justify-center p-4 rounded-full bg-black neon-pulse"
              style={{
                transition: 'text-shadow 0.4s, color 0.4s, transform 0.4s',
                letterSpacing: '2px',
                opacity: 0,
              }}
              onMouseEnter={fullNeon.onMouseEnter}
              onMouseLeave={fullNeon.onMouseLeave}
            >
              <IconLinkedin />
            </a>
            <a
              href="https://github.com/LeonardoMachado30"
              target="_blank"
              className="flex items-center justify-center p-4 rounded-full bg-black neon-pulse"
              style={{ letterSpacing: '2px', opacity: 0 }}
              onMouseEnter={fullNeon.onMouseEnter}
              onMouseLeave={fullNeon.onMouseLeave}
            >
              <IconGithub />
            </a>
          </div>
        </section>
      </div>

      {/* Estilos CSS adicionais para as animações */}
      <style>{`
        @keyframes fadeInTimeline {
          from {
            opacity: 0;
            transform: translateX(-50px) rotateY(-20deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) rotateY(0);
          }
        }

        @keyframes neon-blink-on {
          0%,
          50% {
            opacity: 1;
            text-shadow:
              0 0 8px #ad46ff,
              0 0 16px #ad46ff;
          }
          51%,
          100% {
            opacity: 0;
            text-shadow: none;
          }
        }

        .neon-blink {
          color: #ad46ff;
          text-shadow:
            0 0 5px #ad46ff,
            0 0 10px #ad46ff,
            0 0 15px #ad46ff,
            0 0 20px #ad46ff;
          animation: neon-pulse 2s ease-in-out infinite alternate;
        }

        .neon-off {
          color: #ffffff;
          transition: all 0.3s ease;
        }

        .neon-blink-long {
          animation: neon-pulse-long 3s ease-in-out infinite;
        }

        @keyframes neon-pulse {
          0% {
            text-shadow:
              0 0 5px #ad46ff,
              0 0 10px #ad46ff,
              0 0 15px #ad46ff,
              0 0 20px #ad46ff;
          }
          100% {
            text-shadow:
              0 0 2px #ad46ff,
              0 0 5px #ad46ff,
              0 0 8px #ad46ff,
              0 0 12px #ad46ff;
          }
        }

        @keyframes neon-pulse-long {
          0%,
          100% {
            text-shadow:
              0 0 5px #ad46ff,
              0 0 10px #ad46ff,
              0 0 15px #ad46ff,
              0 0 20px #ad46ff;
          }
          50% {
            text-shadow:
              0 0 10px #ad46ff,
              0 0 20px #ad46ff,
              0 0 30px #ad46ff,
              0 0 40px #ad46ff;
          }
        }

        .drop-shadow-pulse {
          filter: drop-shadow(0 0 10px rgba(173, 70, 255, 0.5));
          transition: filter 0.3s ease;
        }

        .drop-shadow-pulse:hover {
          filter: drop-shadow(0 0 20px rgba(173, 70, 255, 0.8));
        }

        .neon-pulse {
          box-shadow:
            0 0 5px rgba(173, 70, 255, 0.3),
            0 0 10px rgba(173, 70, 255, 0.2);
          transition: all 0.3s ease;
        }

        .neon-pulse:hover {
          box-shadow:
            0 0 10px rgba(173, 70, 255, 0.6),
            0 0 20px rgba(173, 70, 255, 0.4),
            0 0 30px rgba(173, 70, 255, 0.2);
          transform: scale(1.05);
        }

        /* Animações personalizadas para elementos específicos */
        .project-card {
          transition: all 0.3s ease;
          transform-style: preserve-3d;
        }

        .project-card:hover {
          transform: rotateY(5deg) rotateX(5deg) translateZ(10px);
          box-shadow: 0 20px 40px rgba(0, 255, 255, 0.2);
        }

        .timeline-line {
          transform-origin: top center;
        }

        .terminal-container {
          transition: all 0.5s ease;
        }

        .terminal-container:hover {
          transform: scale(1.02);
          box-shadow: 0 0 30px rgba(173, 70, 255, 0.3);
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Otimizações para performance */
        * {
          will-change: auto;
        }

        .hero-buttons > * {
          will-change: transform, opacity;
        }

        .project-card {
          will-change: transform, opacity;
        }

        .timeline-item {
          will-change: transform, opacity;
        }

        /* Responsividade aprimorada */
        @media (max-width: 768px) {
          .project-card:hover {
            transform: scale(1.02);
          }

          .terminal-container:hover {
            transform: scale(1.01);
          }
        }
      `}</style>
    </>
  );
}
