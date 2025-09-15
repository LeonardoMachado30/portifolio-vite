import { useCallback } from 'react';

export function useNeonBoxShadow({
  boxShadowEnter,
  colorEnter,
  boxShadowLeave,
  colorLeave,
  scaleEnter,
  scaleLeave,
  textShadowLeave,
  textShadowEnter,
  dropShadowEnter,
  dropShadowLeave,
  filterEnter,
  filterLeave,
}: {
  boxShadowEnter?: string;
  colorEnter?: string;
  boxShadowLeave?: string;
  colorLeave?: string;
  scaleEnter?: string;
  scaleLeave?: string;
  textShadowLeave?: string;
  textShadowEnter?: string;
  dropShadowEnter?: string;
  dropShadowLeave?: string;
  filterEnter?: string;
  filterLeave?: string;
}) {
  const onMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget as HTMLElement;
      if (boxShadowEnter)
        el.style.setProperty('box-shadow', boxShadowEnter, 'important');
      if (textShadowEnter)
        el.style.setProperty('text-shadow', textShadowEnter, 'important');
      if (colorEnter) el.style.setProperty('color', colorEnter, 'important');
      if (scaleEnter)
        el.style.setProperty('transform', scaleEnter, 'important');
      if (dropShadowEnter)
        el.style.setProperty('filter', dropShadowEnter, 'important');
      if (filterEnter) el.style.setProperty('filter', filterEnter, 'important');
    },
    [
      boxShadowEnter,
      textShadowEnter,
      colorEnter,
      scaleEnter,
      dropShadowEnter,
      filterEnter,
    ]
  );

  const onMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget as HTMLElement;
      // Remove as propriedades adicionadas no mouseEnter se não houver valor de Leave
      if (boxShadowEnter && !boxShadowLeave) {
        el.style.removeProperty('box-shadow');
      }
      if (textShadowEnter && !textShadowLeave) {
        el.style.removeProperty('text-shadow');
      }
      if (colorEnter && !colorLeave) {
        el.style.removeProperty('color');
      }
      if (scaleEnter && !scaleLeave) {
        el.style.removeProperty('transform');
      }
      if (dropShadowEnter && !dropShadowLeave && !filterLeave) {
        el.style.removeProperty('filter');
      }
      if (filterEnter && !filterLeave && !dropShadowLeave) {
        el.style.removeProperty('filter');
      }
      // Se valores de "Leave" forem fornecidos, aplica-os
      if (boxShadowLeave)
        el.style.setProperty('box-shadow', boxShadowLeave, 'important');
      if (textShadowLeave)
        el.style.setProperty('text-shadow', textShadowLeave, 'important');
      if (colorLeave) el.style.setProperty('color', colorLeave, 'important');
      if (scaleLeave)
        el.style.setProperty('transform', scaleLeave, 'important');
      if (dropShadowLeave)
        el.style.setProperty('filter', dropShadowLeave, 'important');
      if (filterLeave) el.style.setProperty('filter', filterLeave, 'important');
    },
    [
      boxShadowEnter,
      textShadowEnter,
      colorEnter,
      scaleEnter,
      dropShadowEnter,
      filterEnter,
      boxShadowLeave,
      textShadowLeave,
      colorLeave,
      scaleLeave,
      dropShadowLeave,
      filterLeave,
    ]
  );

  return { onMouseEnter, onMouseLeave };
}
