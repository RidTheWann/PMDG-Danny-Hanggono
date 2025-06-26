/**
 * SEO and Open Graph helpers for Next.js App Router
 * @module lib/seo
 */
export const defaultMeta = {
  title: 'Praktek Mandiri drg. Danny Hanggono',
  description:
    'A modern, luxury dental practice dashboard. Catat, kelola, dan analisa data pasien dengan UI premium.',
  url: 'https://praktek-drg-danny.vercel.app',
  image: '/Praktek.png',
  type: 'website',
};

export function getMeta(meta?: Partial<typeof defaultMeta>): typeof defaultMeta {
  return {
    ...defaultMeta,
    ...meta,
  };
}
