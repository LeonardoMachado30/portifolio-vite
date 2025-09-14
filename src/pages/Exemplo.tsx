import { useEffect, useRef, useState } from 'react';
import Card from '../components/molecules/Card';
import { useNeonBoxShadow } from '../hooks/useNeonBoxShadow';
import { useScrollAppear } from '../hooks/useScrollAppear';
import { sortearLetrasCaotica } from '../utils/sortearLetrasPorPalavra';

type Projeto = {
  name: string;
  html_url: string;
  language: string;
  topics: string[];
  homepage: string;
  description: string;
};

const ITENS_POR_PAGINA = 9;

// Componente de botão "Ir para o topo" com efeito neon
function BotaoTopoNeon() {
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
        right: '2rem',
        bottom: '2rem',
        zIndex: 1000,
        padding: '1rem 1.5rem',
        fontSize: '1.2rem',
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
      ↑
    </button>
  );
}

// Função utilitária para verificar se um elemento está visível na viewport
function isInViewport(element: HTMLElement | null, offset = 0) {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  return rect.top + offset < window.innerHeight && rect.bottom - offset > 0;
}

export function Exemplo() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [paginaAtual, setPaginaAtual] = useState(1);

  const [sobreRef, sobreVisible] = useScrollAppear<HTMLElement>();
  const [projetosTituloRef, projetosTituloVisible] =
    useScrollAppear<HTMLHeadingElement>();
  const [projetosSectionRef, projetosSectionVisible] =
    useScrollAppear<HTMLElement>();

  // Refs para as seções do menu
  const heroRef = useRef<HTMLElement | null>(null);
  const sobreMenuRef = sobreRef;
  const projetosMenuRef = projetosTituloRef;

  // Estado para controlar qual seção está ativa
  const [activeSection, setActiveSection] = useState<string>('hero');

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
    colorEnter: 'black',
    boxShadowLeave: `
      0 0 8px #0ff,
      0 0 16px #0ff,
      0 0 32px #0ff,
      0 0 20px #0ff,
      0 0 0px #0ff
    `,
    colorLeave: 'black',
  });

  const neonTopics = useNeonBoxShadow({
    boxShadowEnter: `
      0 0 16px #ad46ff,
      0 0 32px ##ad46ff,
      0 0 64px ##ad46ff,
      0 0 128px ##ad46ff,
    `,
    colorEnter: 'white',
    boxShadowLeave: `
    0 0 8px #ad46ff,
    0 0 12px #ad46ff,
    0 0 64px #ad46ff,
    0 0 128px #ad46ff
    `,
    colorLeave: 'white',
    scaleEnter: 'translateY(-4px)',
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
    textShadowLeave: `
      0 0 8px #0ff,
      0 0 16px #0ff,
      0 0 32px #0ff,
      0 0 30px #0ff,
      0 0 0px #0ff
    `,
    colorLeave: '#0ff',
    scaleLeave: 'scale(1)',
  });

  const projetosPaginados = projetos.slice(
    (paginaAtual - 1) * ITENS_POR_PAGINA,
    paginaAtual * ITENS_POR_PAGINA
  );

  // Funções para aplicar efeito neon no h1 inteiro ao passar o mouse
  const handleH1MouseEnter = (e: React.MouseEvent<HTMLHeadingElement>) => {
    console.log(e);
    neonWelcome.onMouseEnter(e);
  };
  const handleH1MouseLeave = (e: React.MouseEvent<HTMLHeadingElement>) => {
    console.log(e);
    neonWelcome.onMouseLeave(e);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-4 "
        style={{
          backdropFilter: 'blur(16px)',
          background: 'rgba(30, 41, 59, 0.45)',
          borderBottom: '1px solid rgba(103, 232, 249, 0.18)',
          boxShadow: '0 4px 32px 0 rgba(0,0,0,0.12)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <div className="flex items-center justify-between mx-auto max-w-[1240px] w-full">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-cyan-200 drop-shadow">
              Flávio Leonardo Machado de Pádua
            </span>
          </div>
          <nav className="flex gap-6">
            <a
              href="#hero"
              className="text-cyan-100 hover:text-cyan-300 font-medium transition"
            >
              Início
            </a>
            <a
              href="#sobre"
              className="text-cyan-100 hover:text-cyan-300 font-medium transition"
            >
              Sobre
            </a>
            <a
              href="#projetos"
              className="text-cyan-100 hover:text-cyan-300 font-medium transition"
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

      <div className="p-4 sm:p-8 space-y-24">
        <section
          id="hero"
          className={`flex flex-col md:flex-row items-center justify-center text-center md:text-left min-h-screen left-[-200px] relative`}
        >
          <div className="w-full md:w-1/2 flex justify-center md:justify-end pr-0 md:pr-12 mb-8 md:mb-0 ">
            <div
              className="w-40 h-40 md:w-64 md:h-64 flex items-center justify-center"
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
                  filter:
                    'drop-shadow(0 0 5px #0ff) drop-shadow(0 0 8px #0ff) drop-shadow(0 0 20px #0ff) drop-shadow(0 0 25px #0ff)',
                }}
                width={600}
                height={600}
                src="/profile-sem-fundo.png"
                alt="Foto de perfil do desenvolvedor sem fundo"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl  font-extrabold text-shadow-2xs leading-tight font-BitcountGridDouble-ExtraLight"
              style={{
                transition: 'text-shadow 0.2s, color 0.2s',
                letterSpacing: '1px',
                userSelect: 'none',
              }}
            >
              {fraseH1.split('').map((letra, idx) => {
                if (letra === ' ') {
                  return <span key={idx}>&nbsp;</span>;
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
                    onMouseEnter={handleH1MouseEnter}
                    onMouseLeave={handleH1MouseLeave}
                  >
                    {letra}
                  </span>
                );
              })}
              <span className="text-gradient">
                {/* Flávio já incluso acima */}
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-200 max-w-lg mx-auto md:mx-0">
              Desenvolvedor de Sistemas apaixonada por criar soluções inovadoras
              e eficientes que impactam positivamente a vida das pessoas.
            </p>
            <a
              href="#projetos"
              className="mt-12 inline-block !text-[#0ff] font-bold py-3 px-8 rounded-full shadow-xl  bg-black text-shadow-primary box-shadow-primary neon-pulse"
              style={{
                transition: 'text-shadow 0.4s, color 0.4s, transform 0.4s',
              }}
              onMouseEnter={neonCard.onMouseEnter}
              onMouseLeave={neonCard.onMouseLeave}
            >
              Ver Projetos
            </a>
          </div>
        </section>

        <section
          id="sobre"
          ref={sobreRef}
          className={`mb-60 w-full flex justify-center items-center ${
            sobreVisible ? 'move-top-appear' : 'move-top-disappear'
          }`}
        >
          <div className="w-full max-w-3xl rounded-2xl shadow-lg bg-[#181c20] border border-cyan-400/40 overflow-hidden">
            {/* Barra do título do terminal */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#23272e] border-b border-cyan-400/30">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
              </div>
              <span className="text-cyan-300 font-bold text-lg select-none">
                Sobre mim
              </span>
              <span className="w-8"></span>
            </div>
            {/* Corpo do terminal */}
            <div className="px-6 py-8 font-mono text-lg text-cyan-200 min-h-[220px] bg-[#181c20]">
              <div className="flex items-center">
                <span className="text-cyan-400 font-bold">
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
                className={`mt-6 transition-opacity duration-700 ${
                  sobreVisible ? 'opacity-100' : 'opacity-0'
                }`}
                tabIndex={sobreVisible ? 0 : -1}
                aria-live="polite"
              >
                <p className="mb-4 text-gray-100 tagesschrift-regular">
                  Desde que escrevi minha primeira linha de código, me apaixonei
                  pelo poder de transformar ideias complexas em realidade
                  digital. Tenho experiência em desenvolvimento web e mobile,
                  com foco em tecnologias como JavaScript, React, Node.js e
                  bancos de dados como MongoDB e PostgreSQL.
                </p>
                <p className="text-gray-100 tagesschrift-regular">
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
        <section id="timeline" className="relative max-w-3xl mx-auto py-16">
          <h2
            className="text-5xl font-bold text-center mb-12 text-gradient text-primary font-BitcountGridDouble-ExtraLight"
            style={{
              letterSpacing: '2px',
              lineHeight: '54px',
            }}
          >
            Experiências
          </h2>

          <div className="relative border-l-4 border-cyan-400 ml-6">
            {[
              {
                titulo: 'Desenvolvedor Full-Stack',
                empresa: 'AURA R&S LABS',
                periodo: 'Mai/2024 – Atual',
                descricao:
                  'Desenvolvimento de CRM + ATS utilizando React.js, Next.js, Tailwindcss, Prisma, TypeScript, Postgres; Implementação de arquitetura modular, validações, autenticação segura JWT e integrações com datastone com APIs REST; Aplicação de testes automatizados e unitários e otimização de performance para garantir escalabilidade com Jest e Storybook;',
              },
              {
                titulo: 'Desenvolvedor Full-Stack',
                empresa: 'Grupo LAPM | Brasília/DF',
                periodo: 'Fev/2024 – Mar/2025',
                descricao:
                  'Desenvolvimento de gerenciador de contratos imobiliários utilizando Vue 2 e 3 (composition API), TypeScript, Laravel e MySQL; Liderança técnica da migração Vue 2 para o Vue 3 composition API, obtendo aumento de 60% na performance e maior manutenibilidade; Migração da biometria facial de Python no back-end para TensorFlow no front-end Vue, reduzindo custos de servidor em 4%;',
              },
              {
                titulo: 'Desenvolvedor Front-End',
                empresa: 'Trabalha Brasil | Remoto',
                periodo: 'Jun/2021 – Jan/2023',
                descricao:
                  'Desenvolvimento de job board / portal de empregos utilizando HTML, CSS, JavaScript 6+, Jquery, .NET Framework/Core, (i18n) e consumo de APIs REST; Participação em hackathon interno, garantindo promoção após 3 meses de estágio; Migração do Jquery 2.2 para 3.7 resultando em 20% mais performance e resolvido vulnerabilidades;',
              },
            ].map((exp, idx) => (
              <div
                key={idx}
                className="mb-12 last:mb-0 relative"
                style={{
                  opacity: 0,
                  animation: `fadeInTimeline 1s ease forwards`,
                  animationDelay: `${idx + 1}s`,
                }}
              >
                <span className="absolute -left-7 top-2 w-5 h-5 bg-cyan-400 rounded-full border-4 border-white shadow-lg"></span>
                <div className="ml-8 bg-gray-900 bg-opacity-80 rounded-xl p-6 shadow-lg">
                  <h3 className="text-2xl font-bold text-cyan-300 mb-1">
                    {exp.titulo}
                  </h3>
                  <span className="block text-cyan-100 font-semibold mb-2">
                    {exp.empresa}
                  </span>
                  <span className="block text-gray-400 text-sm mb-3">
                    {exp.periodo}
                  </span>
                  <p className="text-gray-200">{exp.descricao}</p>
                </div>
              </div>
            ))}
          </div>

          <style>
            {`
              @keyframes fadeInTimeline {
                from { opacity: 0; transform: translateY(40px);}
                to { opacity: 1; transform: translateY(0);}
              }
            `}
          </style>
        </section>

        <h3
          id="projetos"
          ref={projetosTituloRef}
          className={`text-3xl sm:text-5xl lg:text-5xl leading-tight text-center neon-blink-long`}
          style={{
            boxShadow: `
              0 0 16px #0ff,
              0 0 32px #0ff,
              0 0 64px #0ff,
              0 0 128px #0ff, 
            `,
            transition: 'text-shadow 0.4s, color 0.4s, transform 0.4s',
          }}
          onMouseEnter={neonWelcome.onMouseEnter}
          onMouseLeave={neonWelcome.onMouseLeave}
        >
          PROJETOS
        </h3>

        <section
          ref={projetosSectionRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-1 ${
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
              {projetosPaginados.map((proj, idx) => (
                <div
                  className="rounded-2xl border-2 bg-gray-900 b hover:box-shadow-primary-fit-pink transition-all box-shadow-primary-fit"
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
                  <div className="flex flex-col p-6">
                    <h3
                      className="text-2xl font-semibold mb-2 text-[#0ff]"
                      style={{}}
                    >
                      {proj.name}
                    </h3>
                    <p
                      className="text-[#0ff] text-sm leading-tight mt-8"
                      style={{
                        transition:
                          'text-shadow 0.8s, color 0.8s, transform 0.8s',
                      }}
                    >
                      {proj.description}
                    </p>
                    <div className="mt-4">
                      {proj.topics &&
                        proj.topics.map(topic => {
                          return (
                            <span
                              key={topic}
                              className="inline-block rounded-full bg-[#ad46ff] px-3 py-1 text-sm font-semibold mr-2 mb-2 transition-all"
                              style={{
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
                      className="mt-4 inline-block text-primary-pink font-bold text-shadow-primary-pink hover:underline self-end-safe transition-all"
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
              {projetosPaginados.length === 0 && (
                <Card>
                  <p>Nenhum projeto encontrado nesta página.</p>
                </Card>
              )}
            </>
          )}
        </section>

        <footer className="text-shadow-primary text-[#0ff] text-center">
          Todos os direitos reservados a Flávio Leonardo M. P.
        </footer>
      </div>
    </>
  );
}
