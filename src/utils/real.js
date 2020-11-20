export const int2Brl = v =>
  parseFloat(v / 100)
    .toFixed(2)
    .replace('.', ',')
    .replace(/(\d)(?=(\d{3})+\,)/g, '$1.');

export const brl2Int = v => parseInt(v.replace(/(\D)/g, ''), 10);
