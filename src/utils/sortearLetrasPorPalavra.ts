export function sortearLetrasPorPalavraAleatoria(frase: string): number[] {
  // Divide a frase em palavras e pega os índices de início/fim de cada palavra
  const palavras: { start: number; end: number }[] = [];
  let inWord = false;
  let start = 0;

  for (let i = 0; i < frase.length; i++) {
    if (frase[i] !== ' ' && !inWord) {
      inWord = true;
      start = i;
    }
    if ((frase[i] === ' ' || i === frase.length - 1) && inWord) {
      inWord = false;
      palavras.push({
        start,
        end: i === frase.length - 1 ? i : i - 1,
      });
    }
  }

  if (palavras.length === 0) return [];

  // MAIOR ALEATORIEDADE: Sorteia entre 1 e 3 palavras (ou até o máximo disponível)
  const maxPalavras = Math.min(palavras.length, 3);
  const numPalavras = 1 + Math.floor(Math.random() * maxPalavras);

  // Usa algoritmo Fisher-Yates para embaralhar e selecionar palavras
  const indicesPalavras = Array.from({ length: palavras.length }, (_, i) => i);
  for (let i = indicesPalavras.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indicesPalavras[i], indicesPalavras[j]] = [
      indicesPalavras[j],
      indicesPalavras[i],
    ];
  }

  const palavrasSorteadas = indicesPalavras.slice(0, numPalavras);
  const indicesSorteados: number[] = [];

  palavrasSorteadas.forEach(idx => {
    const { start, end } = palavras[idx];
    const tamanhoPalavra = end - start + 1;

    // MAIOR ALEATORIEDADE: Porcentagem variável entre 20% e 100%
    const porcentagemMin = 0.2;
    const porcentagemMax = 1.0;
    const porcentagem =
      porcentagemMin + Math.random() * (porcentagemMax - porcentagemMin);

    let qtdLetras = Math.max(1, Math.floor(tamanhoPalavra * porcentagem));

    // MAIOR ALEATORIEDADE: Chance de 15% de pegar todas as letras, independente da porcentagem
    if (Math.random() < 0.15) {
      qtdLetras = tamanhoPalavra;
    }

    // MAIOR ALEATORIEDADE: Chance de 10% de pegar apenas 1 letra, mesmo em palavras grandes
    if (Math.random() < 0.1 && tamanhoPalavra > 1) {
      qtdLetras = 1;
    }

    // Usa Fisher-Yates novamente para selecionar letras aleatoriamente
    const indicesLetras = Array.from(
      { length: tamanhoPalavra },
      (_, i) => start + i
    );
    for (let i = indicesLetras.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indicesLetras[i], indicesLetras[j]] = [
        indicesLetras[j],
        indicesLetras[i],
      ];
    }

    indicesSorteados.push(...indicesLetras.slice(0, qtdLetras));
  });

  return indicesSorteados;
}

// Versão ainda mais aleatória com padrões completamente imprevisíveis
export function sortearLetrasCaotica(frase: string): number[] {
  const palavras: { start: number; end: number }[] = [];
  let inWord = false;
  let start = 0;

  for (let i = 0; i < frase.length; i++) {
    if (frase[i] !== ' ' && !inWord) {
      inWord = true;
      start = i;
    }
    if ((frase[i] === ' ' || i === frase.length - 1) && inWord) {
      inWord = false;
      palavras.push({
        start,
        end: i === frase.length - 1 ? i : i - 1,
      });
    }
  }

  if (palavras.length === 0) return [];

  const indicesSorteados: number[] = [];
  const random = Math.random();

  // CAOS TOTAL: Diferentes estratégias baseadas em probabilidade
  if (random < 0.2) {
    // 20% chance: Pega letras espalhadas por toda a frase
    const totalLetras = frase.replace(/ /g, '').length;
    const qtd = Math.max(
      1,
      Math.floor(totalLetras * (0.1 + Math.random() * 0.4))
    );
    const todasLetras: number[] = [];

    for (let i = 0; i < frase.length; i++) {
      if (frase[i] !== ' ') todasLetras.push(i);
    }

    for (let i = todasLetras.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [todasLetras[i], todasLetras[j]] = [todasLetras[j], todasLetras[i]];
    }

    indicesSorteados.push(...todasLetras.slice(0, qtd));
  } else if (random < 0.4) {
    // 20% chance: Foca em palavras pequenas
    const palavrasPequenas = palavras.filter(p => p.end - p.start + 1 <= 4);
    if (palavrasPequenas.length > 0) {
      const numPalavras = Math.min(
        palavrasPequenas.length,
        1 + Math.floor(Math.random() * 3)
      );
      for (let i = 0; i < numPalavras; i++) {
        const palavra =
          palavrasPequenas[Math.floor(Math.random() * palavrasPequenas.length)];
        const tam = palavra.end - palavra.start + 1;
        const qtd = Math.max(1, Math.floor(tam * Math.random()));

        for (let j = 0; j < qtd; j++) {
          const idx = palavra.start + Math.floor(Math.random() * tam);
          if (!indicesSorteados.includes(idx)) indicesSorteados.push(idx);
        }
      }
    }
  } else if (random < 0.6) {
    // 20% chance: Foca em palavras grandes
    const palavrasGrandes = palavras.filter(p => p.end - p.start + 1 > 4);
    if (palavrasGrandes.length > 0) {
      const palavra =
        palavrasGrandes[Math.floor(Math.random() * palavrasGrandes.length)];
      const tam = palavra.end - palavra.start + 1;
      const qtd = Math.max(1, Math.floor(tam * (0.3 + Math.random() * 0.7)));

      for (let i = 0; i < qtd; i++) {
        let idx;
        do {
          idx = palavra.start + Math.floor(Math.random() * tam);
        } while (indicesSorteados.includes(idx));
        indicesSorteados.push(idx);
      }
    }
  } else {
    // 40% chance: Estratégia completamente aleatória
    const numPalavras = Math.min(
      palavras.length,
      1 + Math.floor(Math.random() * palavras.length)
    );
    const palavrasEscolhidas = [...palavras]
      .sort(() => Math.random() - 0.5)
      .slice(0, numPalavras);

    palavrasEscolhidas.forEach(palavra => {
      const tam = palavra.end - palavra.start + 1;
      const qtd = Math.max(1, Math.floor(Math.random() * tam + Math.random()));

      for (let i = 0; i < qtd; i++) {
        const idx = palavra.start + Math.floor(Math.random() * tam);
        if (!indicesSorteados.includes(idx)) indicesSorteados.push(idx);
      }
    });
  }

  return indicesSorteados;
}
