import { useEffect, useState } from 'react';
import Card from '../components/molecules/Card';
import { Info } from '../components/molecules/Info';

type Projeto = {
  name: string;
  html_url: string;
  language: string;
  topics: string[];
  homepage: string;
};

const ITENS_POR_PAGINA = 9;

export function Projetos() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [paginaAtual, setPaginaAtual] = useState(1);

  async function fetchProjetosGithub(): Promise<Projeto[]> {
    const response = await fetch(
      'https://api.github.com/users/LeonardoMachado30/repos'
    );
    if (!response.ok) {
      throw new Error('Erro ao buscar projetos do GitHub');
    }
    const data = await response.json();

    return data.map((repo: any) => ({
      name: repo.name,
      html_url: repo.html_url,
      language: repo.language,
      topics: repo.topics || [],
      homepage: repo.homepage,
    }));
  }

  useEffect(() => {
    setCarregando(true);
    fetchProjetosGithub()
      .then(setProjetos)
      .catch(err => setErro(err.message))
      .finally(() => setCarregando(false));
  }, []);

  const totalPaginas = Math.ceil(projetos.length / ITENS_POR_PAGINA);

  const projetosPaginados = projetos.slice(
    (paginaAtual - 1) * ITENS_POR_PAGINA,
    paginaAtual * ITENS_POR_PAGINA
  );

  function irParaPagina(pagina: number) {
    if (pagina < 1 || pagina > totalPaginas) return;
    setPaginaAtual(pagina);
  }

  if (carregando) {
    return (
      <section>
        <p>Carregando projetos...</p>
      </section>
    );
  }

  if (erro) {
    return (
      <section>
        <Card>
          <p>Erro: {erro}</p>
        </Card>
      </section>
    );
  }

  return (
    <>
      <Info />

      <section className="opacity-0 animate-[slideInTop_1.2s_cubic-bezier(0.4,0,0.2,1)_forwards,fadeIn_1s_linear_forwards] mb-14">
        {/* <Card title={{ label: 'RESUMO', className: 'text-center' }}> */}
        <h3 className="text-primary font-bold text-center text-xl mb-4">
          RESUMO
        </h3>
        <p>
          <span role="img" aria-label="notebook">
            💻
          </span>
          <strong>
            Desenvolvedor Front-end | Vue.js | React | Node.js | Escalabilidade
            e Performance
          </strong>
        </p>
        <p>
          Sou apaixonado por criar soluções web escaláveis e acessíveis, unindo
          visão técnica e foco no usuário. Formado em Análise e Desenvolvimento
          de Sistemas pela UNIP (2021), sigo em constante evolução para entregar
          resultados de alto impacto.
        </p>

        <p>
          <span role="img" aria-label="gráfico de crescimento">
            📈
          </span>
          <strong>Objetivo</strong>
        </p>
        <p>
          Atuar em projetos onde eu possa aplicar meus conhecimentos técnicos
          para gerar impacto real, contribuindo também para o desenvolvimento
          pessoal e profissional de outras pessoas. Busco um ambiente
          colaborativo, com independência e autonomia, que valorize troca de
          ideias, aprendizado contínuo e inovação.
        </p>
        {/* </Card> */}
      </section>

      <section className="opacity-0 animate-[slideInTop_1.2s_cubic-bezier(0.4,0,0.2,1)_forwards,fadeIn_1s_linear_forwards] mb-14">
        <Card title={{ label: 'Experiências', className: 'text-center' }}>
          <p>
            <span role="img" aria-label="foguete">
              🚀
            </span>
            <strong>Experiência em Resultados</strong>
          </p>
          <ul className="list-disc ml-6 mb-2">
            <li>
              <strong>Trabalha Brasil:</strong> 2º lugar em hackathon interno no
              3º mês de estágio → promoção a Front-end Júnior. Migração de
              jQuery 2.2 → 3.7 (+20% performance).
            </li>
            <li>
              <strong>Grupo LAPM:</strong> Liderança na migração Vue 2 →
              Composition API, otimização de biometria facial e implementação de
              rede social com chat em tempo real.
            </li>
          </ul>
        </Card>
      </section>

      <section className="opacity-0 animate-[slideInTop_1.2s_cubic-bezier(0.4,0,0.2,1)_forwards,fadeIn_1s_linear_forwards] mb-14">
        <Card title={{ label: 'Habilidades', className: 'text-center' }}>
          <p>
            <span role="img" aria-label="ferramentas">
              🛠
            </span>
            <strong>Hard Skills</strong>
          </p>
          <ul className="list-disc ml-6 mb-2">
            <li>
              <strong>Full-stack:</strong> Nuxt, Next.js, Quasar Framework,
              desenvolvimento de plataformas SaaS, CRM e ATS personalizados
            </li>
            <li>
              <strong>Front-end:</strong> Vue.js, React, Angular, Tailwind CSS,
              Bootstrap, MUI, otimização de performance e acessibilidade
            </li>
            <li>
              <strong>Back-end:</strong> Node.js (Express, Prisma, Zup), PHP
              (Laravel), criação de APIs REST e GraphQL, integração com APIs
              externas
            </li>
            <li>
              <strong>DevOps & Cloud:</strong> Docker, Git/GitHub, CI/CD,
              hospedagem em Vercel/Render, otimização de deploy
            </li>
            <li>
              <strong>Banco de Dados:</strong> MySQL, PostgreSQL, MongoDB,
              SQLite, modelagem relacional e não relacional
            </li>
            <li>
              <strong>Mobile:</strong> React Native, CapacitorJS, Expo
            </li>
            <li>
              <strong>Outros:</strong> TypeScript, Zod/Yup, bcryptjs, Axios,
              Firebase, scraping de dados, cache com LRU, busca fuzzy
            </li>
          </ul>
          <p>
            <span role="img" aria-label="aperto de mãos">
              🤝
            </span>
            <strong>Soft Skills</strong>
          </p>
          <ul className="list-disc ml-6 mb-2">
            <li>Comunicação técnica e interpessoal</li>
            <li>Liderança e mentoria de equipe</li>
            <li>Assiduidade e confiabilidade</li>
            <li>Gestão ágil (Scrum/Kanban)</li>
            <li>Documentação e padronização de processos</li>
            <li>Resolução estratégica de conflitos técnicos</li>
            <li>Proatividade na identificação e solução de problemas</li>
            <li>Adaptabilidade a novas tecnologias</li>
            <li>Colaboração multidisciplinar</li>
            <li>Pensamento crítico orientado a resultados</li>
          </ul>
        </Card>
      </section>

      <section></section>

      <h3 className="text-primary font-bold text-center text-xl mb-4">
        PROJETOS
      </h3>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-1">
        {projetosPaginados.map((proj, idx) => (
          <Card
            key={proj.name}
            classNameContainer="animate-[slideInTop_0.3s_cubic-bezier(0.4,0,0.2,1)_forwards,fadeIn_0.6s_linear_forwards]"
            style={{
              animationDelay: `${0.2 * (idx + 1)}s, ${0.2 * (idx + 1)}s`,
            }}
          >
            <div
              className="flex flex-col h-full justify-between items-stretch opacity-0 animate-[slideInLeft_1s_cubic-bezier(0.4,0,0.2,1)_forwards,fadeIn_1s_linear_forwards]
            "
              style={{
                animationDelay: `${0.2 * (idx + 1)}s, ${0.2 * (idx + 1)}s`,
              }}
            >
              <h2 className="text-md font-bold">{proj.name}</h2>
              <a
                href={proj.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-secondary-200 hover:text-blue-800"
                onClick={e => e.stopPropagation()}
              >
                Ver no GitHub
              </a>

              <a
                href={proj.homepage ? proj.homepage : proj.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-secondary-200 hover:text-blue-800"
                onClick={e => e.stopPropagation()}
              >
                Ver Pagina
              </a>

              <div className="flex flex-col items-end justify-self-end">
                <div className="bg-secondary-400 rounded px-2 py-0.5 text-xs text-primary-100 shadow">
                  Linguagem: {proj.language || 'Sem linguagem'}
                </div>
                <div className="rounded-lg px-1 py-1 mb-1 shadow text-xs flex flex-wrap gap-1 justify-end">
                  {proj.topics && proj.topics.length > 0 ? (
                    proj.topics.map(topic => (
                      <span
                        key={topic}
                        className="bg-primary-500 text-white rounded px-1 py-0.5 mr-0.5"
                      >
                        {topic}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400">Sem tópicos</span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
        {projetosPaginados.length === 0 && (
          <Card>
            <p>Nenhum projeto encontrado nesta página.</p>
          </Card>
        )}
      </section>
      {totalPaginas > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4 opacity-0 animate-[slideInTop_2s_cubic-bezier(0.4,0,0.2,1)_forwards,fadeIn_2s_linear_forwards]">
          <button
            onClick={() => irParaPagina(paginaAtual - 1)}
            disabled={paginaAtual === 1}
            className={`px-3 py-1 rounded bg-secondary-400 text-primary-100 shadow hover:bg-secondary-300 transition cursor-pointer hover:scale-105 ${
              paginaAtual === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Anterior
          </button>
          {Array.from({ length: totalPaginas }, (_, idx) => (
            <button
              key={idx + 1}
              onClick={() => irParaPagina(idx + 1)}
              className={`px-2 py-1 rounded cursor-pointer hover:scale-105 ${
                paginaAtual === idx + 1
                  ? 'bg-success-500 text-white font-bold'
                  : 'bg-secondary-400 text-primary-100'
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => irParaPagina(paginaAtual + 1)}
            disabled={paginaAtual === totalPaginas}
            className={`px-3 py-1 rounded bg-secondary-400 text-primary-100 shadow hover:bg-secondary-300 transition cursor-pointer hover:scale-105 ${
              paginaAtual === totalPaginas
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            Próxima
          </button>
        </div>
      )}
    </>
  );
}
