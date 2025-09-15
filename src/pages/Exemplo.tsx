import { BotaoTopoNeon } from '@/components/atoms/BtnTopNeon';
import Card from '@/components/molecules/Card';
import { useNeonBoxShadow } from '@/hooks/useNeonBoxShadow';
import { useScrollAppear } from '@/hooks/useScrollAppear';
import { experiencia } from '@/modal/experiencias';
import { sortearLetrasCaotica } from '@/utils/sortearLetrasPorPalavra';
import { useEffect, useState } from 'react';

type Projeto = {
  name: string;
  html_url: string;
  language: string;
  topics: string[];
  homepage: string;
  description: string;
};

// Componente de botão "Ir para o topo" com efeito neon

export function Exemplo() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const [sobreRef, sobreVisible] = useScrollAppear<HTMLElement>();
  useScrollAppear<HTMLHeadingElement>();
  const [projetosSectionRef, projetosSectionVisible] =
    useScrollAppear<HTMLElement>();

  // Neon blink state para letras do H1
  const fraseH1 = 'Olá, eu sou o Flávio';
  const [letrasNeon, setLetrasNeon] = useState<number[]>([]);

  useEffect(() => {
    // Pisca mais devagar (2s) e sorteia letras de 1 ou 2 palavras
    const interval = setInterval(() => {
      setLetrasNeon(sortearLetrasCaotica(fraseH1));
    }, 3000);
    // Inicializa com um sorteio
    setLetrasNeon(sortearLetrasCaotica(fraseH1));
    return () => clearInterval(interval);
  }, []);

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

  useEffect(() => {
    setCarregando(true);
    fetchProjetosGithub()
      .then(setProjetos)
      .catch(err => setErro(err.message))
      .finally(() => setCarregando(false));
  }, []);

  // Hook para efeito neon nos cards de projeto
  const neonCard = useNeonBoxShadow({
    boxShadowEnter: `
      0 0 8px #ad46ff,
      0 0 16px #ad46ff,
      0 0 32px #ad46ff,
      0 0 20px #ad46ff,
      0 0 0px #ad46ff
    `,
    colorEnter: 'ad46ff',
  });

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
            <span className="text-base sm:text-xl font-bold text-cyan-200 drop-shadow whitespace-nowrap">
              Flávio Leonardo
              <span className="hidden md:block">Machado de Pádua</span>
              <span className="block md:hidden">M. de P.</span>
            </span>
          </div>
          <nav className="flex gap-3 sm:gap-6">
            <a
              href="#hero"
              className="text-cyan-100 hover:text-cyan-300 font-medium transition text-sm sm:text-base"
            >
              Início
            </a>
            <a
              href="#sobre"
              className="text-cyan-100 hover:text-cyan-300 font-medium transition text-sm sm:text-base"
            >
              Sobre
            </a>
            <a
              href="#projetos"
              className="text-cyan-100 hover:text-cyan-300 font-medium transition text-sm sm:text-base"
            >
              Projetos
            </a>
          </nav>
        </div>

        <div
          className="shadow-neon absolute"
          style={{ height: '20px', bottom: '0px' }}
        />
      </header>

      <BotaoTopoNeon />

      <div className="">
        <section
          id="hero"
          className={`flex flex-col md:flex-row items-center justify-center text-center md:text-left min-h-screen relative`}
        >
          <div className="w-full flex justify-center p-8">
            <div
              className="w-32 h-full sm:w-40 sm:h-40 md:w-64 md:h-64 flex items-center justify-center"
              style={{
                background: 'transparent',
                position: 'relative',
              }}
            >
              <img
                className="object-contain drop-shadow-pulse"
                style={{
                  background: 'transparent',
                  transform: 'scaleX(-1)',
                  maxWidth: '100%',
                  height: 'auto',
                }}
                width={320}
                height={320}
                src="/profile-sem-fundo.png"
                alt="Foto de perfil do desenvolvedor sem fundo"
                onMouseEnter={neonImage.onMouseEnter}
                onMouseLeave={neonImage.onMouseLeave}
              />
            </div>
          </div>
          <div className="w-full ">
            <h1
              className="text-4xl md:text-7xl font-extrabold text-shadow-2xs leading-tight font-BitcountGridDouble-ExtraLight"
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
                    key={idx}
                    className={`${isNeon ? 'neon-blink' : 'neon-off'}`}
                    style={{
                      minWidth: '1em',
                      fontFamily: 'inherit',
                    }}
                    onMouseEnter={neonWelcome.onMouseEnter}
                    onMouseLeave={neonWelcome.onMouseLeave}
                  >
                    {letra}
                  </span>
                );
              })}
            </h1>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-200 max-w-full sm:max-w-lg mx-auto md:mx-0">
              Desenvolvedor de Sistemas apaixonada por criar soluções inovadoras
              e eficientes que impactam positivamente a vida das pessoas.
            </p>
            <div className="flex gap-4 mt-10">
              <a
                href="#projetos"
                className="inline-block text-[#0ff] font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full shadow-xl bg-black text-shadow-primary box-shadow-primary neon-pulse text-sm sm:text-base"
                style={{
                  letterSpacing: '2px',
                }}
                onMouseEnter={fullNeon.onMouseEnter}
                onMouseLeave={fullNeon.onMouseLeave}
              >
                Ver Projetos
              </a>

              <a
                href="#projetos"
                className="inline-block !text-[#0ff] font-bold py-2 sm:py-3 px-3 sm:px-8 rounded-full shadow-xl bg-black text-shadow-primary box-shadow-primary neon-pulse text-sm sm:text-base"
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
            </div>
          </div>
        </section>

        <section
          id="sobre"
          ref={sobreRef}
          className={`mb-32 sm:mb-60 w-full flex justify-center items-center ${
            sobreVisible ? 'move-top-appear' : 'move-top-disappear'
          }`}
        >
          <div className="w-full max-w-full sm:max-w-3xl rounded-2xl shadow-lg bg-[#181c20] border border-cyan-400/40 overflow-hidden mx-1 sm:mx-0">
            {/* Barra do título do terminal */}
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
            {/* Corpo do terminal */}
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
              {/* Texto de apresentação aparece com fade após foco */}
              <div
                className={`mt-4 sm:mt-6 transition-opacity duration-700 ${
                  sobreVisible ? 'opacity-100' : 'opacity-0'
                }`}
                tabIndex={sobreVisible ? 0 : -1}
                aria-live="polite"
              >
                <p className="mb-3 sm:mb-4 text-gray-100 tagesschrift-regular text-xs sm:text-base">
                  Desde que escrevi minha primeira linha de código, me apaixonei
                  pelo poder de transformar ideias complexas em realidade
                  digital. Tenho experiência em desenvolvimento web e mobile,
                  com foco em tecnologias como JavaScript, React, Node.js e
                  bancos de dados como MongoDB e PostgreSQL.
                </p>
                <p className="text-gray-100 tagesschrift-regular text-xs sm:text-base">
                  Meu objetivo é sempre aprender e crescer, buscando desafios
                  que me permitam aplicar e expandir meu conhecimento. Acredito
                  que a tecnologia pode ser uma ferramenta de mudança e estou
                  comprometido em construir soluções que sejam não apenas
                  funcionais, mas também intuitivas e acessíveis.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline de Experiências */}
        <section
          id="timeline"
          className="relative max-w-full sm:max-w-3xl mx-auto py-10 sm:py-16 px-1 sm:px-0"
        >
          <h2
            className="text-3xl sm:text-5xl font-bold text-center mb-8 sm:mb-12  text-primary font-BitcountGridDouble-ExtraLight neon-blink-long"
            style={{
              letterSpacing: '2px',
              lineHeight: '1.2',
              userSelect: 'none',
            }}
          >
            EXPÊRIENCIAS
          </h2>

          <div className="relative border-l-2 sm:border-l-4 border-cyan-400 ml-3 sm:ml-6">
            {experiencia.map((exp, idx) => (
              <div
                key={idx}
                className="mb-8 sm:mb-12 last:mb-0 relative"
                style={{
                  opacity: 0,
                  animation: `fadeInTimeline 1s ease forwards`,
                  animationDelay: `${idx + 1}s`,
                }}
              >
                <span className="absolute -left-5 sm:-left-7 top-2 w-4 h-4 sm:w-5 sm:h-5 bg-cyan-400 rounded-full border-2 sm:border-4 border-white shadow-lg"></span>
                <div className="ml-6 sm:ml-8 bg-gray-900 bg-opacity-80 rounded-xl p-4 sm:p-6 shadow-lg">
                  <h3 className="text-lg sm:text-2xl font-bold text-cyan-300 mb-1">
                    {exp.titulo}
                  </h3>
                  <span className="block text-cyan-100 font-semibold mb-1 sm:mb-2 text-sm sm:text-base tagesschrift-regular">
                    {exp.empresa}
                  </span>
                  <span className="block text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 tagesschrift-regular">
                    {exp.periodo}
                  </span>
                  <p className="text-gray-200 text-xs sm:text-base tagesschrift-regular">
                    {exp.descricao}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <h2
          className="text-3xl sm:text-5xl font-bold text-center mb-8 sm:mb-12  text-primary font-BitcountGridDouble-ExtraLight neon-blink-long mt-30"
          style={{
            letterSpacing: '2px',
            lineHeight: '1.2',
            userSelect: 'none',
          }}
          id="projetos"
        >
          PROJETOS
        </h2>

        <section
          ref={projetosSectionRef}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-8 lg:gap-10 p-0 sm:p-1 ${
            projetosSectionVisible ? 'move-top-appear' : 'move-top-disappear'
          }`}
        >
          {carregando ? (
            <div className="col-span-full flex justify-center items-center">
              <p>Carregando projetos...</p>
            </div>
          ) : erro ? (
            <div className="col-span-full flex justify-center items-center">
              <Card>
                <p>Erro: {erro}</p>
              </Card>
            </div>
          ) : (
            <>
              {projetos.map(proj => (
                <div
                  className="rounded-2xl border-2 bg-gray-900 hover:box-shadow-primary-fit-pink transition-all box-shadow-primary-fit"
                  key={proj.name}
                  style={{
                    boxShadow: `
                      0 0 8px #0ff,
                      0 0 16px #0ff,
                      0 0 32px #0ff,
                      0 0 20px #0ff,
                      0 0 50px #0ff, 
                    `,
                    transition:
                      'box-shadow 0.2s, text-shadow 0.2s, color 0.2s, transform 0.2s',
                  }}
                  onMouseEnter={neonCard.onMouseEnter}
                  onMouseLeave={neonCard.onMouseLeave}
                >
                  <div className="flex flex-col p-3 sm:p-6">
                    <h3
                      className="text-lg sm:text-2xl font-semibold mb-1 sm:mb-2 text-[#0ff]"
                      style={{
                        userSelect: 'none',
                      }}
                    >
                      {proj.name}
                    </h3>
                    <p
                      className="text-[#0ff] text-xs sm:text-sm leading-tight mt-4 sm:mt-8"
                      style={{
                        transition:
                          'text-shadow 0.8s, color 0.8s, transform 0.8s',
                        userSelect: 'none',
                      }}
                    >
                      {proj.description}
                    </p>
                    <div className="mt-2 sm:mt-4">
                      {proj.topics &&
                        proj.topics.map(topic => {
                          return (
                            <span
                              key={topic}
                              className="inline-block rounded-full bg-[#ad46ff] px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-semibold mr-1 sm:mr-2 mb-1 sm:mb-2 transition-all tagesschrift-regular"
                              style={{
                                userSelect: 'none',
                                boxShadow: `
                                  0 0 8px #ad46ff,
                                  0 0 16px #ad46ff,
                                  0 0 32px #ad46ff,
                                  0 0 20px #ad46ff,
                                  0 0 320px #ad46ff, 
                                `,
                                transition:
                                  'box-shadow 0.2s, color 0.2s, transform 0.2s',
                              }}
                            >
                              {topic}
                            </span>
                          );
                        })}
                    </div>
                    <a
                      href={proj.homepage}
                      target="_blank"
                      className="mt-2 sm:mt-4 inline-block text-primary-pink font-bold text-shadow-primary-pink hover:underline self-end-safe transition-all text-xs sm:text-base"
                      style={{
                        transition:
                          'text-shadow 0.4s, color 0.4s, transform 0.4s',
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
        </section>

        <footer className="text-shadow-primary text-[#0ff] text-center text-xs sm:text-base mt-20">
          Todos os direitos reservados a Flávio Leonardo M. P.
        </footer>
      </div>
    </>
  );
}
