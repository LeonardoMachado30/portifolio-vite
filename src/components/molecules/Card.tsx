import type { CSSProperties } from 'react';

const Card: React.FC<{
  title?: string | { label: string; className?: string };
  children: React.ReactNode;
  classNameContainer?: string;
  classNameContent?: string;
  style?: CSSProperties;
}> = ({ title, children, classNameContent, classNameContainer, style }) => (
  <div
    className={`border-2 bg-white rounded-lg shadow-md px-4 py-4 text-secondary-500 hover:scale-[1.01] transition-all duration-150  ${classNameContainer}`}
    style={style}
  >
    {title && (
      <h3
        className={
          typeof title === 'string'
            ? 'text-lg font-bold px-4'
            : `text-lg font-bold px-4 ${title.className}`
        }
      >
        {typeof title === 'string' ? title : title.label}
      </h3>
    )}
    <div className={`${classNameContent}`}>{children}</div>
  </div>
);

export default Card;
