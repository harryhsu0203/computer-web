export function toInt(value: string | number | undefined, defaultValue = 0): number {
  if (value === undefined) return defaultValue;
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  const n = Number.parseInt(String(value), 10);
  return Number.isNaN(n) ? defaultValue : n;
}

export function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}


