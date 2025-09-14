import imgPerfil from '@/assets/perfil.png';
import Card from './Card';

export function Info() {
  const link = [
    {
      href: 'https://www.linkedin.com/in/flavio-leonardo-machado',
      icon: 'link',
      text: <p>Flávio Leonardo</p>,
      className: 'text-cyan-300',
    },
    {
      href: 'https://github.com/LeonardoMachado30',
      icon: 'code',
      text: 'GitHub',
      className: 'text-gray-300',
    },
    {
      href: 'https://www.instagram.com/user.flavio.leonardo/',
      icon: 'photo_camera',
      text: 'Instagram',
      className: 'text-pink-600',
    },
    {
      href: 'https://wa.me/5561981095126',
      icon: 'phone_enabled',
      text: <p>(61) 9 8109-5126</p>,
      className: 'text-green-600',
    },
  ];

  return (
    <Card
      classNameContainer="hidden lg:block min-w-[280px] !bg-transparent mb-60"
      classNameContent="flex gap-4 justify-between items-center text-white"
      style={{
        animation:
          'slideInLeft 1s cubic-bezier(0.4,0,0.2,1) forwards, fadeIn 1.4s linear forwards',
        opacity: 0,
      }}
    >
      <img
        src={imgPerfil}
        alt="Minha Foto"
        className="w-50 h-50 rounded-full object-cover border-4 border-priamry-300 self-center"
      />
      <h2
        className={`
          text-xl font-bold text-center
          opacity-0
          animate-[slideInLeft_1.2s_cubic-bezier(0.4,0,0.2,1)_forwards,fadeIn_1.4s_linear_forwards]
        `}
      >
        Flávio Leonardo Machado
      </h2>
      <div className="flex flex-col gap-2 mt-2 items-center">
        {link.map((item, idx) => (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              flex items-center gap-2 hover:border-b-2 hover:transition-all hover:duration-100 ${item.className}
              opacity-0 text-sm
              animate-[slideInLeft_1s_cubic-bezier(0.4,0,0.2,1)_forwards,fadeIn_2s_linear_forwards]
            `}
            style={{
              animationDelay: `${0.2 * (idx + 1)}s, ${0.2 * (idx + 1)}s`,
            }}
          >
            <span className="material-icons">{item.icon}</span>
            {item.text}
          </a>
        ))}
      </div>
    </Card>
  );
}
