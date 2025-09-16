import Card from '@/components/molecules/Card';
import { useNeonBoxShadow } from '@/hooks/useNeonBoxShadow';
import { experiencia } from '@/modal/experiencias';
import { sortearLetrasCaotica } from '@/utils/sortearLetrasPorPalavra';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { useCallback, useEffect, useRef, useState } from 'react';

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
  const scrollRef = useRef<LocomotiveScroll | null>(null);

  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const loadProjetos = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      const data = await fetchProjetosGithub();
      setProjetos(data);
      // scrollRef.current?.update();
    } catch (err: any) {
      setErro(err.message || 'Erro desconhecido');
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    const fetchAndInit = async () => {
      if (!containerRef.current) return;
      await loadProjetos();

      // O restante do código do useEffect permanece igual
    };

    fetchAndInit();

    // Detecta a largura da tela para ajustar lerp e multiplier no mobile
    const isMobile = window.innerWidth <= 768;
    const scroll = new LocomotiveScroll({
      el: containerRef.current!,
      smooth: true,
      lerp: isMobile ? 0.24 : 0.07, // aumenta a velocidade no mobile
      multiplier: isMobile ? 1.8 : 1, // aumenta a velocidade no mobile
      smartphone: {
        smooth: true,
        direction: 'vertical',
      },
    });

    scrollRef.current = scroll;

    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.update();
    }
  }, [projetos]); // ou qualquer conteúdo dinâmico

  useEffect(() => {
    const interval = setInterval(() => {
      setLetrasNeon(sortearLetrasCaotica(fraseH1));
    }, 6000);
    setLetrasNeon(sortearLetrasCaotica(fraseH1));
    return () => clearInterval(interval);
  }, [fraseH1]);

  // Atualiza o scroll quando projetos mudam (dinamicamente)

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
              onClick={() => scrollRef.current?.scrollTo('#hero')}
              className="text-cyan-100 hover:text-cyan-300"
            >
              Início
            </button>
            <button
              onClick={() => scrollRef.current?.scrollTo('#sobre')}
              className="text-cyan-100 hover:text-cyan-300"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollRef.current?.scrollTo('#projetos')}
              className="text-cyan-100 hover:text-cyan-300"
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
        data-scroll-container
        className="w-full min-h-[100vh] flex flex-col gap-50"
        style={{ minHeight: '100%' }}
      >
        <div className="max-w-[1240px]  mx-auto p-4 pt-20">
          <section
            data-scroll-section
            id="hero"
            className="flex flex-col md:flex-row items-center justify-center text-center md:text-left min-h-screen relative mb-100"
          >
            <div
              data-scroll
              data-scroll-speed="2"
              data-scroll-delay="0.1"
              className="w-full flex flex-col gap-6"
            >
              <h1
                className="text-5xl md:text-7xl font-extrabold text-shadow-2xs leading-tight font-BitcountGridDouble-ExtraLight m-10 md:mb-0"
                style={{
                  transition: 'text-shadow 0.2s, color 0.2s',
                  letterSpacing: '2px',
                  userSelect: 'none',
                  wordBreak: 'break-word',
                }}
              >
                {fraseH1.split('').map((letra, idx) => {
                  if (letra === ' ') {
                    return <span key={idx}> </span>;
                  }
                  const isNeon = letrasNeon.includes(idx);
                  return (
                    <span
                      data-scroll
                      data-scroll-speed={`2`}
                      data-scroll-delay={`0.1`}
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
                data-scroll
                className="text-base sm:text-lg text-gray-200 max-w-full sm:max-w-lg mx-auto md:mx-0"
              >
                Desenvolvedor de Sistemas apaixonada por criar soluções
                inovadoras e eficientes que impactam positivamente a vida das
                pessoas.
              </p>
              <div className="flex gap-6 justify-center md:justify-start">
                <button
                  type="button"
                  onClick={() => scrollRef.current?.scrollTo('#projetos')}
                  className="flex justify-center items-center text-[#0ff] my-1 mb:py-2 px-4 md:px-6 rounded-full bg-black neon-pulse text-sm md:text-base"
                  style={{ letterSpacing: '2px' }}
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
                  }}
                  onMouseEnter={fullNeon.onMouseEnter}
                  onMouseLeave={fullNeon.onMouseLeave}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      filter:
                        'drop-shadow(0 0 1px #0ff) drop-shadow(0 0 6px #0ff)',
                      transition: 'filter 0.3s',
                    }}
                  >
                    <path
                      d="M3.60001 16H0.199997V5.3H3.60001V16ZM1.9 3.8C0.800002 3.8 0 3 0 1.9C0 0.8 0.900002 0 1.9 0C3 0 3.8 0.8 3.8 1.9C3.8 3 3 3.8 1.9 3.8ZM16 16H12.6V10.2C12.6 8.5 11.9 8 10.9 8C9.89999 8 8.89999 8.8 8.89999 10.3V16H5.5V5.3H8.7V6.8C9 6.1 10.2 5 11.9 5C13.8 5 15.8 6.1 15.8 9.4V16H16Z"
                      fill="#0ff"
                      style={{
                        filter: 'drop-shadow(0 0 1px #0ff)',
                        transition: 'filter 0.3s',
                      }}
                    />
                  </svg>
                </a>
                <a
                  href="https://github.com/LeonardoMachado30"
                  target="_blank"
                  className="flex items-center justify-center p-4 rounded-full bg-black neon-pulse"
                  style={{ letterSpacing: '2px' }}
                  onMouseEnter={fullNeon.onMouseEnter}
                  onMouseLeave={fullNeon.onMouseLeave}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      filter:
                        'drop-shadow(0 0 1px #0ff) drop-shadow(0 0 6px #0ff)',
                      transition: 'filter 0.3s',
                    }}
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.97553 0C3.57186 0 0 3.57187 0 7.97553C0 11.4985 2.29969 14.4832 5.43119 15.5596C5.82263 15.6086 5.96942 15.3639 5.96942 15.1682C5.96942 14.9725 5.96942 14.4832 5.96942 13.7982C3.76758 14.2875 3.27829 12.7217 3.27829 12.7217C2.93578 11.792 2.39755 11.5474 2.39755 11.5474C1.66361 11.0581 2.44648 11.0581 2.44648 11.0581C3.22936 11.107 3.66972 11.8899 3.66972 11.8899C4.40367 13.1131 5.52905 12.7706 5.96942 12.5749C6.01835 12.0367 6.263 11.6942 6.45872 11.4985C4.69725 11.3028 2.83792 10.6177 2.83792 7.53517C2.83792 6.65443 3.1315 5.96942 3.66972 5.38226C3.62079 5.23547 3.32722 4.40367 3.76758 3.32722C3.76758 3.32722 4.4526 3.1315 5.96942 4.15902C6.6055 3.9633 7.29052 3.91437 7.97553 3.91437C8.66055 3.91437 9.34557 4.01223 9.98165 4.15902C11.4985 3.1315 12.1835 3.32722 12.1835 3.32722C12.6239 4.40367 12.3303 5.23547 12.2813 5.43119C12.7706 5.96942 13.1131 6.70336 13.1131 7.58410C13.1131 10.6667 11.2538 11.3028 9.49235 11.4985C9.78593 11.7431 10.0306 12.2324 10.0306 12.9664C10.0306 14.0428 10.0306 14.8746 10.0306 15.1682C10.0306 15.3639 10.1774 15.6086 10.5688 15.5596C13.7492 14.4832 16 11.4985 16 7.97553C15.9511 3.57187 12.3792 0 7.97553 0Z"
                      fill="#0ff"
                      style={{
                        filter: 'drop-shadow(0 0 1px #0ff)',
                        transition: 'filter 0.3s',
                      }}
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: 'transparent', position: 'relative' }}
            >
              <img
                data-scroll
                data-scroll-speed="2"
                data-scroll-delay="0.1"
                className="drop-shadow-pulse"
                width={320}
                height={320}
                src="/profile-sem-fundo.png"
                alt="Foto de perfil do desenvolvedor sem fundo"
                onMouseEnter={neonImage.onMouseEnter}
                onMouseLeave={neonImage.onMouseLeave}
              />
            </div>
          </section>

          <section
            id="timeline"
            data-scroll-section
            className="relative max-w-full sm:max-w-3xl mx-auto py-10 sm:py-16 px-1 sm:px-0 mb-200"
          >
            <h2
              className="text-3xl sm:text-5xl font-bold text-center text-primary font-BitcountGridDouble-ExtraLight neon-blink-long"
              style={{
                letterSpacing: '2px',
                lineHeight: '1.2',
                userSelect: 'none',
              }}
            >
              EXPÊRIENCIAS
            </h2>

            <div
              data-scroll
              data-scroll-speed="1"
              data-scroll-delay="0.1"
              className="border-l-2 sm:border-l-4 border-cyan-400 ml-3 sm:ml-6 gap-10 flex flex-col"
            >
              {experiencia.map((exp, idx) => (
                <div
                  key={idx}
                  className="relative"
                  style={{
                    opacity: 0,
                    animation: `fadeInTimeline 0.8s ease forwards`,
                    animationDelay: `${idx + 1}s`,
                  }}
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
                    <p className="text-gray-200 sm:text-md tagesschrift-regular">
                      <ul>
                        {exp.descricoes.map(description => (
                          <li className="list-disc list-inside ml-4">
                            {description}
                          </li>
                        ))}
                      </ul>
                    </p>

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

          <section
            data-scroll-section
            id="sobre"
            className="w-full flex justify-center items-center mt-100 mb-200"
          >
            <div
              data-scroll
              data-scroll-speed="-1"
              data-scroll-delay="0.2"
              className="w-full max-w-full sm:max-w-3xl rounded-2xl shadow-lg bg-[#181c20] border border-cyan-400/40 overflow-hidden mx-1 sm:mx-0"
            >
              <div className="flex items-center justify-between px-2 sm:px-4 py-2 bg-[#23272e] border-b border-cyan-400/30">
                <div className="flex items-center gap-1 sm:gap-2">
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
                <div data-scroll aria-live="polite">
                  <p className="text-gray-100 tagesschrift-regular text-xs sm:text-base">
                    Desde que escrevi minha primeira linha de código, me
                    apaixonei pelo poder de transformar ideias complexas em
                    realidade digital. Tenho experiência em desenvolvimento web
                    e mobile, com foco em tecnologias como JavaScript, React,
                    Node.js e bancos de dados como MongoDB e PostgreSQL.
                  </p>
                  <p className="text-gray-100 tagesschrift-regular text-xs sm:text-base">
                    Meu objetivo é sempre aprender e crescer, buscando desafios
                    que me permitam aplicar e expandir meu conhecimento.
                    Acredito que a tecnologia pode ser uma ferramenta de mudança
                    e estou comprometido em construir soluções que sejam não
                    apenas funcionais, mas também intuitivas e acessíveis.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="projetos" data-scroll-section>
            <h2
              className="relative text-3xl sm:text-5xl font-bold text-center text-primary font-BitcountGridDouble-ExtraLight neon-blink-long mb-10"
              style={{
                letterSpacing: '2px',
                lineHeight: '1.2',
                userSelect: 'none',
                zIndex: '-1',
              }}
            >
              PROJETOS
            </h2>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-8 lg:gap-10 p-0 sm:p-4"
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
                  {projetos.map((proj, key) => (
                    <div
                      key={key}
                      className="rounded-xl border-[1px] bg-gray-900"
                    >
                      <div className="flex flex-col p-3 sm:p-6">
                        <h3 className="text-lg sm:text-2xl font-semibold text-[#0ff]">
                          {proj.name}
                        </h3>
                        <p
                          className="text-[#0ff] text-base sm:text-md leading-tight"
                          style={{
                            transition:
                              'text-shadow 0.8s, color 0.8s, transform 0.8s',
                            userSelect: 'none',
                          }}
                        >
                          {proj.description}
                        </p>
                        <div>
                          {proj.topics &&
                            proj.topics.map(topic => (
                              <span
                                key={topic}
                                className="inline-block rounded-full bg-[#ad46ff] px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-semibold mr-1 sm:mr-2 transition-all tagesschrift-regular"
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
                          Ver Detalhes &rarr;
                        </a>
                      </div>
                    </div>
                  ))}
                  {projetos.length === 0 && (
                    <Card>
                      <p>Nenhum projeto encontrado nesta página.</p>
                    </Card>
                  )}
                </>
              )}
            </div>

            <div className="flex gap-6 justify-center md:justify-start mt-10">
              <a
                href="https://www.linkedin.com/in/flavio-leonardo-machado/"
                target="_blank"
                className="flex items-center justify-center p-4 rounded-full bg-black neon-pulse"
                style={{
                  transition: 'text-shadow 0.4s, color 0.4s, transform 0.4s',
                  letterSpacing: '2px',
                }}
                onMouseEnter={fullNeon.onMouseEnter}
                onMouseLeave={fullNeon.onMouseLeave}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    filter:
                      'drop-shadow(0 0 1px #0ff) drop-shadow(0 0 6px #0ff)',
                    transition: 'filter 0.3s',
                  }}
                >
                  <path
                    d="M3.60001 16H0.199997V5.3H3.60001V16ZM1.9 3.8C0.800002 3.8 0 3 0 1.9C0 0.8 0.900002 0 1.9 0C3 0 3.8 0.8 3.8 1.9C3.8 3 3 3.8 1.9 3.8ZM16 16H12.6V10.2C12.6 8.5 11.9 8 10.9 8C9.89999 8 8.89999 8.8 8.89999 10.3V16H5.5V5.3H8.7V6.8C9 6.1 10.2 5 11.9 5C13.8 5 15.8 6.1 15.8 9.4V16H16Z"
                    fill="#0ff"
                    style={{
                      filter: 'drop-shadow(0 0 1px #0ff)',
                      transition: 'filter 0.3s',
                    }}
                  />
                </svg>
              </a>
              <a
                href="https://github.com/LeonardoMachado30"
                target="_blank"
                className="flex items-center justify-center p-4 rounded-full bg-black neon-pulse"
                style={{ letterSpacing: '2px' }}
                onMouseEnter={fullNeon.onMouseEnter}
                onMouseLeave={fullNeon.onMouseLeave}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    filter:
                      'drop-shadow(0 0 1px #0ff) drop-shadow(0 0 6px #0ff)',
                    transition: 'filter 0.3s',
                  }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.97553 0C3.57186 0 0 3.57187 0 7.97553C0 11.4985 2.29969 14.4832 5.43119 15.5596C5.82263 15.6086 5.96942 15.3639 5.96942 15.1682C5.96942 14.9725 5.96942 14.4832 5.96942 13.7982C3.76758 14.2875 3.27829 12.7217 3.27829 12.7217C2.93578 11.792 2.39755 11.5474 2.39755 11.5474C1.66361 11.0581 2.44648 11.0581 2.44648 11.0581C3.22936 11.107 3.66972 11.8899 3.66972 11.8899C4.40367 13.1131 5.52905 12.7706 5.96942 12.5749C6.01835 12.0367 6.263 11.6942 6.45872 11.4985C4.69725 11.3028 2.83792 10.6177 2.83792 7.53517C2.83792 6.65443 3.1315 5.96942 3.66972 5.38226C3.62079 5.23547 3.32722 4.40367 3.76758 3.32722C3.76758 3.32722 4.4526 3.1315 5.96942 4.15902C6.6055 3.9633 7.29052 3.91437 7.97553 3.91437C8.66055 3.91437 9.34557 4.01223 9.98165 4.15902C11.4985 3.1315 12.1835 3.32722 12.1835 3.32722C12.6239 4.40367 12.3303 5.23547 12.2813 5.43119C12.7706 5.96942 13.1131 6.70336 13.1131 7.58410C13.1131 10.6667 11.2538 11.3028 9.49235 11.4985C9.78593 11.7431 10.0306 12.2324 10.0306 12.9664C10.0306 14.0428 10.0306 14.8746 10.0306 15.1682C10.0306 15.3639 10.1774 15.6086 10.5688 15.5596C13.7492 14.4832 16 11.4985 16 7.97553C15.9511 3.57187 12.3792 0 7.97553 0Z"
                    fill="#0ff"
                    style={{
                      filter: 'drop-shadow(0 0 1px #0ff)',
                      transition: 'filter 0.3s',
                    }}
                  />
                </svg>
              </a>
            </div>
          </section>

          <footer className="text-shadow-primary text-[#0ff] text-center text-xs sm:text-base">
            Todos os direitos reservados a Flávio Leonardo M. P.
          </footer>
        </div>
      </div>
    </>
  );
}
