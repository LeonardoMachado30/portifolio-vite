import Card from '@/components/molecules/Card';

export function Resume() {
  return (
    <section className="opacity-0 animate-[slideInTop_1.2s_cubic-bezier(0.4,0,0.2,1)_forwards,fadeIn_1s_linear_forwards]">
      <Card title={{ label: 'RESUMO', className: 'text-center' }}>
        <p>
          <span role="img" aria-label="notebook">
            💻
          </span>{' '}
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
          <span role="img" aria-label="foguete">
            🚀
          </span>{' '}
          <strong>Experiência em Resultados</strong>
        </p>
        <ul className="list-disc ml-6 mb-2">
          <li>
            <strong>Trabalha Brasil:</strong> 2º lugar em hackathon interno no
            3º mês de estágio → promoção a Front-end Júnior. Migração de jQuery
            2.2 → 3.7 (+20% performance).
          </li>
          <li>
            <strong>Grupo LAPM:</strong> Liderança na migração Vue 2 →
            Composition API, otimização de biometria facial e implementação de
            rede social com chat em tempo real.
          </li>
        </ul>
        <p>
          <span role="img" aria-label="ferramentas">
            🛠
          </span>{' '}
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
            <strong>Banco de Dados:</strong> MySQL, PostgreSQL, MongoDB, SQLite,
            modelagem relacional e não relacional
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
          </span>{' '}
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
        <p>
          <span role="img" aria-label="gráfico de crescimento">
            📈
          </span>{' '}
          <strong>Objetivo</strong>
        </p>
        <p>
          Atuar em projetos onde eu possa aplicar meus conhecimentos técnicos
          para gerar impacto real, contribuindo também para o desenvolvimento
          pessoal e profissional de outras pessoas. Busco um ambiente
          colaborativo, com independência e autonomia, que valorize troca de
          ideias, aprendizado contínuo e inovação.
        </p>
      </Card>
    </section>
  );
}
