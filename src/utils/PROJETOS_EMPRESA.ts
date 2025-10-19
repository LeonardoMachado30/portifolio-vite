import type { Projeto } from '../pages/Portfolio';

export const projetosEmpresa: Projeto[] = [
  {
    name: 'Trabalha Brasil',
    html_url: 'https://www.trabalhabrasil.com.br', // se houver link público do projeto
    language: 'TypeScript',
    topics: ['frontend', 'backend', 'full-stack', 'automation'],
    homepage: 'https://www.trabalhabrasil.com.br',
    description:
      'Desenvolvimento de soluções full-stack para gestão de processos internos e automação de workflows, aumentando eficiência e produtividade.',
  },
  {
    name: 'SGR - Sistema de Governança e Registro',
    html_url: 'https://sgr.cofeci.gov.br',
    language: 'TypeScript',
    topics: ['frontend', 'backend', 'full-stack', 'optimization'],
    homepage: 'https://sgr.cofeci.gov.br',
    description:
      'Participação em desenvolvimento de sistemas corporativos, integração de módulos e otimização de fluxos de trabalho, entregando soluções escaláveis e confiáveis.',
  },
];
