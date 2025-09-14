import { useCallback } from 'react';

// Este hook foi ajustado para funcionar corretamente em tags de texto como h3, span, p, etc.
// Ele aplica boxShadow, textShadow, color e transform conforme as props recebidas.

export function useNeonBoxShadow({
  boxShadowEnter,
  colorEnter,
  boxShadowLeave,
  colorLeave,
  scaleEnter,
  scaleLeave,
  textShadowLeave,
  textShadowEnter,
}: {
  boxShadowEnter?: string;
  colorEnter?: string;
  boxShadowLeave?: string;
  colorLeave?: string;
  scaleEnter?: string;
  scaleLeave?: string;
  textShadowLeave?: string;
  textShadowEnter?: string;
}) {
  const onMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget as HTMLElement;
      if (boxShadowEnter) el.style.boxShadow = boxShadowEnter;
      if (textShadowEnter) el.style.textShadow = textShadowEnter;
      if (colorEnter) el.style.color = colorEnter;
      if (scaleEnter) el.style.transform = scaleEnter;
    },
    [boxShadowEnter, textShadowEnter, colorEnter, scaleEnter]
  );

  const onMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget as HTMLElement;
      if (boxShadowLeave) el.style.boxShadow = boxShadowLeave;
      if (textShadowLeave) el.style.textShadow = textShadowLeave;
      if (colorLeave) el.style.color = colorLeave;
      if (scaleLeave) el.style.transform = scaleLeave;
    },
    [boxShadowLeave, textShadowLeave, colorLeave, scaleLeave]
  );

  return { onMouseEnter, onMouseLeave };
}
