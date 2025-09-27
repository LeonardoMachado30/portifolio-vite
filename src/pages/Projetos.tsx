import { useEffect, useRef, useState } from 'react';

type Projeto = {
  name: string;
  html_url: string;
  language: string | null;
  topics: string[];
  homepage: string | null;
  description?: string | null;
};

export function Portfolio() {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const ME = {
    name: 'Flávio Leonardo Machado de Pádua',
    role: 'Desenvolvedor Full-stack',
    title: 'React • Vue • TypeScript • Node.js • Next.js • Nest.js',
    location: 'Brasília',
    about:
      'Desenvolvedor apaixonado por criar aplicações web escaláveis e acessíveis. Com experiência sólida em desenvolvimento de CRMs, ATS e plataformas SaaS, busco sempre a excelência técnica, implementação de boas práticas e aprendizagem contínua para entregar soluções de alta qualidade.',
    education: 'Análise e Desenvolvimento de Sistemas - UNIP (2021)',
    email: 'flmp.leonardo@gmail.com',
    linkedin: 'https://linkedin.com/in/flavio-leonardo',
    github: 'https://github.com/LeonardoMachado30',
    phone: '+55 (61) 9 8109-5126',
  };

  const TECH_STACK = [
    { name: 'TypeScript', icon: '🔷', category: 'language' },
    { name: 'React', icon: '⚛️', category: 'frontend' },
    { name: 'Next.js', icon: '▲', category: 'frontend' },
    { name: 'Vue.js', icon: '💚', category: 'frontend' },
    { name: 'Node.js', icon: '🟢', category: 'backend' },
    { name: 'Prisma', icon: '🔺', category: 'database' },
    { name: 'PostgreSQL', icon: '🐘', category: 'database' },
    { name: 'Tailwind CSS', icon: '🎨', category: 'styling' },
    { name: 'Docker', icon: '🐳', category: 'devops' },
    { name: 'GSAP', icon: '✨', category: 'animation' },
  ];

  const SOFT_SKILLS = [
    'Comunicação eficaz',
    'Proatividade e iniciativa',
    'Resolução de problemas',
    'Trabalho em equipe',
    'Independência e autonomia',
    'Agilidade e adaptabilidade',
    'Pensamento analítico',
    'Liderança técnica',
  ];

  const EXPERIENCES = [
    {
      company: 'AURA R&S Labs',
      title: 'Desenvolvedor Full Stack',
      period: 'jun de 2025 – o momento · 4 meses',
      location: 'Brasília, Distrito Federal, Brasil · Remota',
      description:
        'Responsável por arquitetura modular, escalabilidade, segurança e performance em sistema CRM + ATS. Foco em organização, reuso, integração e entrega de valor.',
      highlights: [
        'Full stack: Next.js, TypeScript, Prisma, Firebase',
        'Arquitetura modular (backend/frontend), Atomic Design',
        'Autenticação, segurança, integrações externas',
        'Componentização, APIs REST, Redux, Tailwind',
        'Performance, manutenção e escalabilidade',
      ],
    },
    {
      company: 'Grupo LAPM',
      title: 'Desenvolvedor Full-stack',
      period: 'fev de 2024 – mar de 2025 · 1 ano 2 meses',
      location: 'Brasília, Distrito Federal, Brasil · Presencial',
      description:
        'Liderança técnica, inovação, modernização de stack e foco em performance e redução de custos.',
      highlights: [
        'Migração Vue 2→3, Vuex→Pinia: +60% performance',
        'Biometria: Python→Vue/Tensorflow, +80% performance, -4% custos',
        'Otimização DevOps: pipelines mais rápidos',
        'Modernização com ES6+, mitigação de erros',
        'Stack: Vue.js, Azure DevOps, GCP, TypeScript, Node.js, PHP, MySQL',
      ],
    },
    {
      company: 'Trabalha Brasil',
      title: 'Desenvolvedor Front-end',
      period: 'jun de 2021 – jan de 2023 · 1 ano 8 meses',
      location: 'Colombo, Paraná, Brasil',
      description:
        'Promoção por destaque. Foco em performance, modernização e SEO.',
      highlights: [
        'Migração jQuery 2.2→3.7: +20% performance',
        'Códigos modernos, redução de obsolescência',
        'SSR/SSG com Razor e Blazor (.NET)',
        'SEO e ranqueamento aprimorados',
        'Stack: Azure DevOps, Scrum, C#, TypeScript, Node.js, PostgreSQL',
      ],
    },
    {
      company: 'Trabalha Brasil',
      title: 'Estagiário de Front-end',
      period: 'abr de 2021 – jun de 2021 · 3 meses',
      location: 'Colombo, Paraná, Brasil',
      description:
        'Destaque em projetos internos, rápido crescimento e entrega de valor.',
      highlights: [
        '2º lugar em projeto interno (front-end)',
        'Promoção rápida após hackathon',
        'Interfaces com HTML5, CSS, Bootstrap, Git',
        'Trabalho em equipe e resolução de problemas',
      ],
    },
  ];

  const ACHIEVEMENTS = [
    {
      title: 'Sistemas de Alta Performance',
      description:
        'Otimizações que resultaram em melhorias de até 40% na velocidade de carregamento',
    },
    {
      title: 'Arquitetura Escalável',
      description:
        'Design de sistemas que suportam milhares de usuários simultâneos',
    },
    {
      title: 'Liderança Técnica',
      description:
        'Gestão de equipes multidisciplinares e mentoria de desenvolvedores junior',
    },
    {
      title: 'Inovação Contínua',
      description:
        'Implementação de tecnologias emergentes e boas práticas de desenvolvimento',
    },
  ];

  async function fetchProjetosGithub(): Promise<Projeto[]> {
    const response = await fetch(
      'https://api.github.com/users/LeonardoMachado30/repos'
    );
    if (!response.ok) {
      throw new Error('Erro ao buscar projetos do GitHub');
    }
    const data = await response.json();

    return data
      .map((repo: any) => ({
        name: repo.name,
        html_url: repo.html_url,
        language: repo.language,
        topics: repo.topics || [],
        homepage: repo.homepage,
        description: repo.description || null,
      }))
      .filter((repo: Projeto) => !repo.name.includes('LeonardoMachado30')); // Filter out profile readme
  }

  useEffect(() => {
    setCarregando(true);
    fetchProjetosGithub()
      .then(setProjetos)
      .catch(err => setErro(err.message))
      .finally(() => setCarregando(false));
  }, []);

  useEffect(() => {
    // Simple CSS animations with Intersection Observer for scroll effects
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.observe-section');
    sections.forEach(section => observer.observe(section));

    // Hero animations with CSS transitions
    const heroElements = document.querySelectorAll('.hero-animate');
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-fadeInUp');
      }, index * 200);
    });

    // Cleanup observer
    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-['Inter',system-ui,sans-serif] antialiased">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="font-bold text-xl text-slate-900">FL</div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#about"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                Sobre
              </a>
              <a
                href="#skills"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                Skills
              </a>
              <a
                href="#experience"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                Experiência
              </a>
              <a
                href="#projects"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                Projetos
              </a>
              <a
                href="#contact"
                className="bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                Contato
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="hero-animate text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6 opacity-0 translate-y-8 transition-all duration-1000">
                Criando soluções web
                <span className="text-blue-600 block">escaláveis</span>
              </h1>
              <p className="hero-animate text-xl text-slate-600 mb-4 opacity-0 translate-y-8 transition-all duration-1000">
                {ME.role}
              </p>
              <p className="hero-animate text-lg text-slate-500 mb-8 max-w-lg leading-relaxed opacity-0 translate-y-8 transition-all duration-1000">
                {ME.about}
              </p>
              <div className="hero-animate flex flex-col sm:flex-row gap-4 opacity-0 translate-y-8 transition-all duration-1000">
                <a
                  href="#projects"
                  className="bg-slate-900 text-white px-8 py-4 rounded-lg hover:bg-slate-800 transition-all transform hover:scale-105 text-center font-semibold"
                >
                  Ver Projetos
                </a>
                <a
                  href="#contact"
                  className="border-2 border-slate-900 text-slate-900 px-8 py-4 rounded-lg hover:bg-slate-900 hover:text-white transition-all text-center font-semibold"
                >
                  Entre em Contato
                </a>
              </div>

              {/* Quick Stats */}
              <div className="hero-animate grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-slate-200 opacity-0 translate-y-8 transition-all duration-1000">
                <a href="#experience">
                  <div className="text-2xl font-bold text-slate-900">4+</div>
                  <div className="text-sm text-slate-600">
                    Anos de Experiência
                  </div>
                </a>
                <a href="#projects">
                  <div className="text-2xl font-bold text-slate-900">10+</div>
                  <div className="text-sm text-slate-600">
                    Projetos Entregues
                  </div>
                </a>
                <a href="#skills">
                  <div className="text-2xl font-bold text-slate-900">10+</div>
                  <div className="text-sm text-slate-600">Tecnologias</div>
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="w-full max-w-md mx-auto">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-8 text-blue-500 shadow-2xl">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold mb-6 mx-auto overflow-hidden">
                    <img
                      src="/profile.png"
                      alt="Avatar de Flávio Leonardo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">
                    {ME.name}
                  </h3>
                  <p className="text-blue-400 text-center mb-6">{ME.title}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <span>📍</span>
                      <span>{ME.location}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span>🎓</span>
                      <span>ADS - UNIP 2021</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={aboutRef}
        className="observe-section py-20 px-6 bg-white opacity-0 translate-y-8 transition-all duration-1000"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Sobre Mim
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Desenvolvedor especializado em criar experiências digitais
              excepcionais com foco em performance, escalabilidade e
              usabilidade.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">
                Minha Jornada
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Com mais de 5 anos de experiência em desenvolvimento web,
                especializei-me em criar soluções robustas e escaláveis
                utilizando tecnologias modernas. Minha paixão por código limpo e
                arquiteturas bem estruturadas me levou a liderar equipes e
                projetos de alta complexidade.
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Atualmente, busco me aprofundar em metodologias ágeis como
                Scrum, gestão de projetos e liderança técnica, sempre com foco
                em entregar valor real aos usuários e aos negócios.
              </p>

              {/* Achievements Grid */}
              <div className="grid grid-cols-2 gap-4">
                {ACHIEVEMENTS.map((achievement, index) => (
                  <div key={index} className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-slate-900 mb-2">
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-slate-600">
                      {achievement.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">
                Soft Skills
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {SOFT_SKILLS.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-slate-100 px-4 py-3 rounded-lg text-slate-700 font-medium"
                  >
                    {skill}
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                <h4 className="font-semibold text-slate-900 mb-3">
                  🎯 Objetivos Profissionais
                </h4>
                <ul className="space-y-2 text-slate-700">
                  <li>• Especialização em metodologias Scrum e Agile</li>
                  <li>• Desenvolvimento de habilidades de liderança técnica</li>
                  <li>• Aprofundamento em arquitetura de sistemas complexos</li>
                  <li>• Contribuição com projetos open source</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        ref={skillsRef}
        className="observe-section py-20 px-6 bg-slate-50 opacity-0 translate-y-8 transition-all duration-1000"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Tecnologias
            </h2>
            <p className="text-xl text-slate-600">
              Stack tecnológico moderno para desenvolvimento full-stack
            </p>
          </div>

          <div className="skills-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {TECH_STACK.map((tech, index) => (
              <div
                key={index}
                className="skill-card bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all group hover:scale-105 hover:-translate-y-1"
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">
                  {tech.icon}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  {tech.name}
                </h3>
                <div className="text-xs text-slate-500 capitalize">
                  {tech.category}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">
              Principais Competências
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Desenvolvimento Full-stack',
                'Arquitetura de Software',
                'Performance Optimization',
                'API Design & Integration',
                'Database Design',
                'CI/CD Implementation',
                'Code Review & Mentorship',
                'Agile Methodologies',
              ].map((competencia, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {competencia}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        ref={experienceRef}
        className="observe-section experience-section py-20 px-6 bg-white opacity-0 translate-y-8 transition-all duration-1000"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Experiência Profissional
            </h2>
            <p className="text-xl text-slate-600">
              Trajetória de crescimento e evolução técnica
            </p>
          </div>

          <div className="space-y-12">
            {EXPERIENCES.map((exp, index) => (
              <div
                key={index}
                className="experience-item relative pl-8 border-l-2 border-blue-200 hover:border-blue-400 transition-colors"
              >
                <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
                <div className="bg-slate-50 rounded-xl p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-slate-900">
                        {exp.title}
                      </h3>
                      <p className="text-lg text-blue-600 font-medium">
                        {exp.company}
                      </p>
                      <p className="text-slate-600">{exp.location}</p>
                    </div>
                    <div className="text-slate-500 font-medium mt-2 lg:mt-0">
                      {exp.period}
                    </div>
                  </div>

                  <p className="text-slate-700 mb-6">{exp.description}</p>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-slate-900 mb-3">
                      Principais Conquistas:
                    </h4>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span className="text-slate-600">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        ref={projectsRef}
        className="observe-section py-20 px-6 bg-slate-50 opacity-0 translate-y-8 transition-all duration-1000"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Projetos</h2>
            <p className="text-xl text-slate-600">
              Seleção dos meus trabalhos mais recentes e relevantes
            </p>
          </div>

          {carregando && (
            <div className="text-center">
              <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-slate-600">Carregando projetos...</p>
            </div>
          )}

          {erro && (
            <div className="text-center p-8 bg-red-50 rounded-lg">
              <p className="text-red-600">Erro ao carregar projetos: {erro}</p>
            </div>
          )}

          <div className="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projetos.slice(0, 9).map((projeto, index) => (
              <div
                key={index}
                className="project-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {projeto.name}
                    </h3>
                    <div className="flex gap-2">
                      <a
                        href={projeto.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                        title="Ver no GitHub"
                      >
                        <span className="text-xl">↗</span>
                      </a>
                    </div>
                  </div>

                  {projeto.description && (
                    <p className="text-slate-600 mb-4 line-clamp-3">
                      {projeto.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    {projeto.language && (
                      <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                        {projeto.language}
                      </span>
                    )}
                    <div className="flex gap-1">
                      {projeto.topics.slice(0, 2).map(topic => (
                        <span
                          key={topic}
                          className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {projetos.length === 0 && !carregando && !erro && (
            <div className="text-center p-12 bg-white rounded-lg">
              <p className="text-slate-600">Nenhum projeto encontrado.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <a
              href={ME.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Ver Todos os Projetos
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={contactRef}
        className="observe-section py-20 px-6 bg-white opacity-0 translate-y-8 transition-all duration-1000"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Vamos Conversar?
            </h2>
            <p className="text-xl text-slate-600">
              Estou sempre aberto a novos desafios e oportunidades
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-8">
                Entre em Contato
              </h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-xl">📧</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Email</p>
                    <a
                      href={`mailto:${ME.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {ME.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-xl">💼</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">LinkedIn</p>
                    <a
                      href={ME.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Perfil Profissional
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-xl">💻</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">GitHub</p>
                    <a
                      href={ME.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Repositórios
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-xl">📱</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Telefone</p>
                    <a
                      href={`tel:${ME.phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {ME.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                <h4 className="font-semibold text-slate-900 mb-3">
                  💡 Áreas de Interesse
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Full-Stack',
                    'Front-end',
                    'Back-end',
                    'Desenvolvedor de IA',
                    'Arquitetura de Software',
                    'Mentoria',
                    'Projetos Inovadores',
                  ].map(interest => (
                    <span
                      key={interest}
                      className="bg-white text-slate-700 px-3 py-1 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-slate-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">
                Envie uma Mensagem
              </h3>

              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Nome
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Assunto
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Como posso ajudar?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Mensagem
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    placeholder="Conte-me sobre seu projeto ou oportunidade..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 text-white py-4 rounded-lg hover:bg-slate-800 transition-colors font-semibold"
                >
                  Enviar Mensagem
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-slate-600">
                  Normalmente respondo em até 24 horas
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-4">Pronto para começar?</h3>
              <p className="text-xl text-blue-400 mb-8 max-w-2xl mx-auto">
                Transforme suas ideias em realidade com soluções web modernas e
                escaláveis. Vamos criar algo incrível juntos!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`mailto:${ME.email}`}
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
                >
                  Conversar por Email
                </a>
                <a
                  href={ME.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white text-blue-600 px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold"
                >
                  Conectar no LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Flávio Leonardo</h3>
              <p className="text-slate-300 mb-4">
                Desenvolvedor Full-stack especializado em criar experiências
                digitais excepcionais.
              </p>
              <div className="flex gap-4">
                <a
                  href={ME.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  GitHub
                </a>
                <a
                  href={ME.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Navegação</h4>
              <div className="space-y-2">
                <a
                  href="#about"
                  className="block text-slate-300 hover:text-white transition-colors"
                >
                  Sobre
                </a>
                <a
                  href="#skills"
                  className="block text-slate-300 hover:text-white transition-colors"
                >
                  Skills
                </a>
                <a
                  href="#experience"
                  className="block text-slate-300 hover:text-white transition-colors"
                >
                  Experiência
                </a>
                <a
                  href="#projects"
                  className="block text-slate-300 hover:text-white transition-colors"
                >
                  Projetos
                </a>
                <a
                  href="#contact"
                  className="block text-slate-300 hover:text-white transition-colors"
                >
                  Contato
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <div className="space-y-2 text-slate-300">
                <p>📧 {ME.email}</p>
                <p>📱 {ME.phone}</p>
                <p>📍 {ME.location}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center">
            <p className="text-slate-400">
              © {new Date().getFullYear()} Flávio Leonardo Machado de Pádua.
              Todos os direitos reservados.
            </p>
            <p className="text-slate-500 text-sm mt-2">
              Desenvolvido com React, TypeScript e Tailwind CSS
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-slate-900 text-white w-12 h-12 rounded-full shadow-lg hover:bg-slate-800 transition-colors z-40"
        aria-label="Voltar ao topo"
      >
        ↑
      </button>

      {/* Custom CSS for animations and styling */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }

        /* Fade in up animation */
        .animate-fadeInUp {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Smooth scrolling for navigation links */
        @media (prefers-reduced-motion: no-preference) {
          html {
            scroll-behavior: smooth;
          }
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        ::-webkit-scrollbar-thumb {
          background: #64748b;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }

        /* Focus styles for better accessibility */
        button:focus-visible,
        a:focus-visible,
        input:focus-visible,
        textarea:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }

        /* Animation for loading spinner */
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        /* Staggered animations for hero elements */
        .hero-animate:nth-child(1) {
          transition-delay: 0ms;
        }
        .hero-animate:nth-child(2) {
          transition-delay: 200ms;
        }
        .hero-animate:nth-child(3) {
          transition-delay: 400ms;
        }
        .hero-animate:nth-child(4) {
          transition-delay: 600ms;
        }
        .hero-animate:nth-child(5) {
          transition-delay: 800ms;
        }

        /* Improved mobile navigation */
        @media (max-width: 768px) {
          .hero-animate {
            font-size: 2.5rem;
            line-height: 1.1;
          }

          .projects-grid {
            grid-template-columns: 1fr;
          }

          .skills-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Enhanced hover effects */
        .project-card:hover {
          transform: translateY(-4px);
        }

        .skill-card:hover {
          transform: translateY(-2px) scale(1.05);
        }

        /* Better gradient backgrounds */
        .bg-gradient-to-r {
          background: linear-gradient(to right, var(--tw-gradient-stops));
        }

        .bg-gradient-to-br {
          background: linear-gradient(
            to bottom right,
            var(--tw-gradient-stops)
          );
        }

        /* Smooth transitions for all interactive elements */
        * {
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            opacity 0.3s ease;
        }
      `}</style>
    </div>
  );
}
