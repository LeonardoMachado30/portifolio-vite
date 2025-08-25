import type { Project, Skill } from '@/types';

// Função para formatar data
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

// Função para filtrar projetos por tecnologia
export const filterProjectsByTech = (
  projects: Project[],
  technology: string
): Project[] => {
  return projects.filter(project =>
    project.technologies.some(tech =>
      tech.toLowerCase().includes(technology.toLowerCase())
    )
  );
};

// Função para ordenar habilidades por nível
export const sortSkillsByLevel = (skills: Skill[]): Skill[] => {
  const levelOrder = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 };
  return skills.sort((a, b) => levelOrder[a.level] - levelOrder[b.level]);
};

// Função para validar email
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Função para capitalizar primeira letra
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
