import { Link, useLocation } from 'react-router';

export function Header() {
  const location = useLocation();
  const navegation = [
    {
      title: 'Resumo',
      icon: <span className="material-icons-outlined">description</span>,
      href: '/resumo',
    },
    {
      title: 'Projetos',
      icon: <span className="material-icons-outlined">work</span>,
      href: '/projetos',
    },
  ];
  return (
    <header className="fixed w-full px-4 py-2 animate-[slideInDown_1.2s_cubic-bezier(0.4,0,0.2,1)_forwards,fadeIn_1.4s_linear_forwards]">
      <nav className="mx-auto md:max-w-[1210px] py-2 rounded-lg bg-">
        <ul className="flex gap-3 items-center justify-center">
          {navegation.map(item => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.title}>
                <Link
                  to={item.href}
                  className={`flex items-center py-2 px-6 rounded-4xl text-sm gap-2 hover:scale-110 hover:shadow-sm transition-all duration-150 shadow shadow-white
                    ${isActive ? 'bg-secondary-500 text-white shadow scale-105' : 'bg-success-500 text-secondary-500'}
                  `}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
