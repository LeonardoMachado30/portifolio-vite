export const experiencia = [
  {
    titulo: 'Desenvolvedor Full-Stack',
    empresa: 'AURA R&S LABS',
    periodo: (function () {
      const inicio = new Date(2025, 4, 1);
      const agora = new Date();
      let meses =
        (agora.getFullYear() - inicio.getFullYear()) * 12 +
        (agora.getMonth() - inicio.getMonth());
      if (agora.getDate() < inicio.getDate()) {
        meses--;
      }
      meses = Math.max(0, meses + 1);
      return `Mai/2025 – Atual - ${meses} ${meses === 1 ? 'mês' : 'meses'}`;
    })(),
    descricao:
      'Desenvolvimento de CRM + ATS utilizando React.js, Next.js, Tailwindcss, Prisma, TypeScript, Postgres; Implementação de arquitetura modular, validações, autenticação segura JWT e integrações com datastone com APIs REST; Aplicação de testes automatizados e unitários e otimização de performance para garantir escalabilidade com Jest e Storybook;',
  },
  {
    titulo: 'Desenvolvedor Full-Stack',
    empresa: 'Grupo LAPM | Brasília/DF',
    periodo: 'Fev/2024 – Mar/2025 - 1 ano e 1 mês',
    descricao:
      'Desenvolvimento de gerenciador de contratos imobiliários utilizando Vue 2 e 3 (composition API), TypeScript, Laravel e MySQL; Liderança técnica da migração Vue 2 para o Vue 3 composition API, obtendo aumento de 60% na performance e maior manutenibilidade; Migração da biometria facial de Python no back-end para TensorFlow no front-end Vue, reduzindo custos de servidor em 4%;',
  },
  {
    titulo: 'Desenvolvedor Front-End',
    empresa: 'Trabalha Brasil | Remoto',
    periodo: 'Jun/2021 – Jan/2023 - 1 ano e 10 meses',
    descricao:
      'Desenvolvimento de job board / portal de empregos utilizando HTML, CSS, JavaScript 6+, Jquery, .NET Framework/Core, (i18n) e consumo de APIs REST; Participação em hackathon interno, garantindo promoção após 3 meses de estágio; Migração do Jquery 2.2 para 3.7 resultando em 20% mais performance e resolvido vulnerabilidades;',
  },
];
