export interface ClientImage {
  id: string;
  url: string;
  width: number;
}

export interface Client {
  id: string;
  name: string;
  tagline: string;
  industry: string;
  feeling: string;
  images: ClientImage[];
}

const COTTONBALL_IMAGES: ClientImage[] = [
  { id: 'cb-01', url: '/assets/clients/cottonball/cb-01.png', width: 142 },
  { id: 'cb-02', url: '/assets/clients/cottonball/cb-02.png', width: 70 },
  { id: 'cb-03', url: '/assets/clients/cottonball/cb-03.png', width: 70 },
  { id: 'cb-04', url: '/assets/clients/cottonball/cb-04.png', width: 142 },
  { id: 'cb-05', url: '/assets/clients/cottonball/cb-05.png', width: 142 },
  { id: 'cb-06', url: '/assets/clients/cottonball/cb-06.png', width: 142 },
  { id: 'cb-07', url: '/assets/clients/cottonball/cb-07.png', width: 142 },
  { id: 'cb-08', url: '/assets/clients/cottonball/cb-08.png', width: 70 },
  { id: 'cb-09', url: '/assets/clients/cottonball/cb-09.png', width: 70 },
  { id: 'cb-10', url: '/assets/clients/cottonball/cb-10.png', width: 142 },
  { id: 'cb-11', url: '/assets/clients/cottonball/cb-11.png', width: 70 },
  { id: 'cb-12', url: '/assets/clients/cottonball/cb-12.png', width: 142 },
  { id: 'cb-13', url: '/assets/clients/cottonball/cb-13.png', width: 70 },
  { id: 'cb-14', url: '/assets/clients/cottonball/cb-14.png', width: 142 },
  { id: 'cb-15', url: '/assets/clients/cottonball/cb-15.png', width: 70 },
  { id: 'cb-16', url: '/assets/clients/cottonball/cb-16.png', width: 142 },
  { id: 'cb-17', url: '/assets/clients/cottonball/cb-17.png', width: 70 },
  { id: 'cb-18', url: '/assets/clients/cottonball/cb-18.png', width: 70 },
  { id: 'cb-19', url: '/assets/clients/cottonball/cb-19.png', width: 142 },
  { id: 'cb-20', url: '/assets/clients/cottonball/cb-20.png', width: 70 },
  { id: 'cb-21', url: '/assets/clients/cottonball/cb-21.png', width: 142 },
];

const AMESA_IMAGES: ClientImage[] = [
  { id: 'am-01', url: '/assets/clients/amesa/am-01.png', width: 142 },
  { id: 'am-02', url: '/assets/clients/amesa/am-02.png', width: 142 },
  { id: 'am-03', url: '/assets/clients/amesa/am-03.png', width: 70 },
  { id: 'am-04', url: '/assets/clients/amesa/am-04.png', width: 70 },
  { id: 'am-05', url: '/assets/clients/amesa/am-05.png', width: 142 },
  { id: 'am-06', url: '/assets/clients/amesa/am-06.png', width: 142 },
  { id: 'am-07', url: '/assets/clients/amesa/am-07.png', width: 142 },
  { id: 'am-08', url: '/assets/clients/amesa/am-08.png', width: 142 },
  { id: 'am-09', url: '/assets/clients/amesa/am-09.png', width: 142 },
  { id: 'am-10', url: '/assets/clients/amesa/am-10.png', width: 70 },
  { id: 'am-11', url: '/assets/clients/amesa/am-11.png', width: 70 },
  { id: 'am-12', url: '/assets/clients/amesa/am-12.png', width: 142 },
  { id: 'am-13', url: '/assets/clients/amesa/am-13.png', width: 142 },
  { id: 'am-14', url: '/assets/clients/amesa/am-14.png', width: 142 },
  { id: 'am-15', url: '/assets/clients/amesa/am-15.png', width: 70 },
  { id: 'am-16', url: '/assets/clients/amesa/am-16.png', width: 70 },
  { id: 'am-17', url: '/assets/clients/amesa/am-17.png', width: 142 },
  { id: 'am-18', url: '/assets/clients/amesa/am-18.png', width: 142 },
  { id: 'am-19', url: '/assets/clients/amesa/am-19.png', width: 142 },
  { id: 'am-20', url: '/assets/clients/amesa/am-20.png', width: 70 },
];

const LUXNOMADS_IMAGES: ClientImage[] = [
  { id: 'lx-01', url: '/assets/clients/luxnomads/lx-01.png', width: 174 },
  { id: 'lx-02', url: '/assets/clients/luxnomads/lx-02.png', width: 174 },
  { id: 'lx-03', url: '/assets/clients/luxnomads/lx-03.png', width: 174 },
  { id: 'lx-04', url: '/assets/clients/luxnomads/lx-04.png', width: 87 },
  { id: 'lx-05', url: '/assets/clients/luxnomads/lx-05.png', width: 87 },
  { id: 'lx-06', url: '/assets/clients/luxnomads/lx-06.png', width: 174 },
  { id: 'lx-07', url: '/assets/clients/luxnomads/lx-07.png', width: 87 },
  { id: 'lx-08', url: '/assets/clients/luxnomads/lx-08.png', width: 87 },
  { id: 'lx-09', url: '/assets/clients/luxnomads/lx-09.png', width: 174 },
  { id: 'lx-10', url: '/assets/clients/luxnomads/lx-10.png', width: 87 },
  { id: 'lx-11', url: '/assets/clients/luxnomads/lx-11.png', width: 87 },
  { id: 'lx-12', url: '/assets/clients/luxnomads/lx-12.png', width: 174 },
  { id: 'lx-13', url: '/assets/clients/luxnomads/lx-13.png', width: 87 },
  { id: 'lx-14', url: '/assets/clients/luxnomads/lx-14.png', width: 87 },
  { id: 'lx-15', url: '/assets/clients/luxnomads/lx-15.png', width: 174 },
];

const AXUM_IMAGES: ClientImage[] = [
  { id: 'ax-01', url: '/assets/clients/axum/ax-01.png', width: 142 },
  { id: 'ax-02', url: '/assets/clients/axum/ax-02.png', width: 142 },
  { id: 'ax-03', url: '/assets/clients/axum/ax-03.png', width: 70 },
  { id: 'ax-04', url: '/assets/clients/axum/ax-04.png', width: 70 },
  { id: 'ax-05', url: '/assets/clients/axum/ax-05.png', width: 142 },
  { id: 'ax-06', url: '/assets/clients/axum/ax-06.png', width: 70 },
  { id: 'ax-07', url: '/assets/clients/axum/ax-07.png', width: 70 },
  { id: 'ax-08', url: '/assets/clients/axum/ax-08.png', width: 142 },
  { id: 'ax-09', url: '/assets/clients/axum/ax-09.png', width: 70 },
  { id: 'ax-10', url: '/assets/clients/axum/ax-10.png', width: 70 },
  { id: 'ax-11', url: '/assets/clients/axum/ax-11.png', width: 142 },
  { id: 'ax-12', url: '/assets/clients/axum/ax-12.png', width: 142 },
  { id: 'ax-13', url: '/assets/clients/axum/ax-13.png', width: 142 },
  { id: 'ax-14', url: '/assets/clients/axum/ax-14.png', width: 142 },
  { id: 'ax-15', url: '/assets/clients/axum/ax-15.png', width: 70 },
  { id: 'ax-16', url: '/assets/clients/axum/ax-16.png', width: 70 },
  { id: 'ax-17', url: '/assets/clients/axum/ax-17.png', width: 142 },
  { id: 'ax-18', url: '/assets/clients/axum/ax-18.png', width: 142 },
  { id: 'ax-19', url: '/assets/clients/axum/ax-19.png', width: 142 },
  { id: 'ax-20', url: '/assets/clients/axum/ax-20.png', width: 142 },
  { id: 'ax-21', url: '/assets/clients/axum/ax-21.png', width: 142 },
];

const SHIELD_AI_IMAGES: ClientImage[] = [
  { id: 'sh-01', url: '/assets/clients/shield-ai/sh-01.png', width: 142 },
  { id: 'sh-02', url: '/assets/clients/shield-ai/sh-02.png', width: 142 },
  { id: 'sh-03', url: '/assets/clients/shield-ai/sh-03.png', width: 71 },
  { id: 'sh-04', url: '/assets/clients/shield-ai/sh-04.png', width: 71 },
  { id: 'sh-05', url: '/assets/clients/shield-ai/sh-05.png', width: 142 },
  { id: 'sh-06', url: '/assets/clients/shield-ai/sh-06.png', width: 142 },
  { id: 'sh-07', url: '/assets/clients/shield-ai/sh-07.png', width: 71 },
  { id: 'sh-08', url: '/assets/clients/shield-ai/sh-08.png', width: 71 },
  { id: 'sh-09', url: '/assets/clients/shield-ai/sh-09.png', width: 142 },
  { id: 'sh-10', url: '/assets/clients/shield-ai/sh-10.png', width: 142 },
  { id: 'sh-11', url: '/assets/clients/shield-ai/sh-11.png', width: 142 },
  { id: 'sh-12', url: '/assets/clients/shield-ai/sh-12.png', width: 142 },
  { id: 'sh-13', url: '/assets/clients/shield-ai/sh-13.png', width: 142 },
  { id: 'sh-14', url: '/assets/clients/shield-ai/sh-14.png', width: 142 },
  { id: 'sh-15', url: '/assets/clients/shield-ai/sh-15.png', width: 71 },
  { id: 'sh-16', url: '/assets/clients/shield-ai/sh-16.png', width: 71 },
  { id: 'sh-17', url: '/assets/clients/shield-ai/sh-17.png', width: 142 },
  { id: 'sh-18', url: '/assets/clients/shield-ai/sh-18.png', width: 71 },
  { id: 'sh-19', url: '/assets/clients/shield-ai/sh-19.png', width: 71 },
  { id: 'sh-20', url: '/assets/clients/shield-ai/sh-20.png', width: 142 },
];

const MIENNE_IMAGES: ClientImage[] = [
  { id: 'mi-01', url: '/assets/clients/mienne/mi-01.png', width: 146 },
  { id: 'mi-02', url: '/assets/clients/mienne/mi-02.png', width: 142 },
  { id: 'mi-03', url: '/assets/clients/mienne/mi-03.png', width: 135 },
  { id: 'mi-04', url: '/assets/clients/mienne/mi-04.png', width: 135 },
  { id: 'mi-05', url: '/assets/clients/mienne/mi-05.png', width: 142 },
  { id: 'mi-06', url: '/assets/clients/mienne/mi-06.png', width: 136 },
  { id: 'mi-07', url: '/assets/clients/mienne/mi-07.png', width: 135 },
  { id: 'mi-08', url: '/assets/clients/mienne/mi-08.png', width: 136 },
  { id: 'mi-09', url: '/assets/clients/mienne/mi-09.png', width: 136 },
  { id: 'mi-10', url: '/assets/clients/mienne/mi-10.png', width: 67 },
  { id: 'mi-11', url: '/assets/clients/mienne/mi-11.png', width: 67 },
  { id: 'mi-12', url: '/assets/clients/mienne/mi-12.png', width: 142 },
  { id: 'mi-13', url: '/assets/clients/mienne/mi-13.png', width: 71 },
  { id: 'mi-14', url: '/assets/clients/mienne/mi-14.png', width: 67 },
  { id: 'mi-15', url: '/assets/clients/mienne/mi-15.png', width: 136 },
  { id: 'mi-16', url: '/assets/clients/mienne/mi-16.png', width: 67 },
  { id: 'mi-17', url: '/assets/clients/mienne/mi-17.png', width: 67 },
];

const FREEGAME_IMAGES: ClientImage[] = [
  { id: 'fg-01', url: '/assets/clients/freegame/fg-01.png', width: 142 },
  { id: 'fg-02', url: '/assets/clients/freegame/fg-02.png', width: 135 },
  { id: 'fg-03', url: '/assets/clients/freegame/fg-03.png', width: 67 },
  { id: 'fg-04', url: '/assets/clients/freegame/fg-04.png', width: 67 },
  { id: 'fg-05', url: '/assets/clients/freegame/fg-05.png', width: 142 },
  { id: 'fg-06', url: '/assets/clients/freegame/fg-06.png', width: 142 },
  { id: 'fg-07', url: '/assets/clients/freegame/fg-07.png', width: 135 },
  { id: 'fg-08', url: '/assets/clients/freegame/fg-08.png', width: 136 },
  { id: 'fg-09', url: '/assets/clients/freegame/fg-09.png', width: 67 },
  { id: 'fg-10', url: '/assets/clients/freegame/fg-10.png', width: 71 },
  { id: 'fg-11', url: '/assets/clients/freegame/fg-11.png', width: 135 },
  { id: 'fg-12', url: '/assets/clients/freegame/fg-12.png', width: 67 },
  { id: 'fg-13', url: '/assets/clients/freegame/fg-13.png', width: 67 },
  { id: 'fg-14', url: '/assets/clients/freegame/fg-14.png', width: 142 },
  { id: 'fg-15', url: '/assets/clients/freegame/fg-15.png', width: 67 },
  { id: 'fg-16', url: '/assets/clients/freegame/fg-16.png', width: 67 },
];

export const CLIENTS: Client[] = [
  {
    id: 'cottonball',
    name: 'Cottonball',
    tagline: 'Cultivating a couture skincare experience',
    industry: 'beauty',
    feeling: 'radiant',
    images: COTTONBALL_IMAGES,
  },
  {
    id: 'amesa',
    name: 'Amesa',
    tagline: 'Pioneering engineered intelligence',
    industry: 'manufacturing',
    feeling: 'optimized',
    images: AMESA_IMAGES,
  },
  {
    id: 'luxnomads',
    name: 'LuxNomads',
    tagline: 'Reshaping the European relocation',
    industry: 'travel',
    feeling: 'adventurous',
    images: LUXNOMADS_IMAGES,
  },
  {
    id: 'axum',
    name: 'Axum',
    tagline: 'Building value behind the scenes',
    industry: 'venture capital',
    feeling: 'steady',
    images: AXUM_IMAGES,
  },
  {
    id: 'shield-ai',
    name: 'Shield AI',
    tagline: 'Building the future of defense',
    industry: 'Technology',
    feeling: 'fortified',
    images: SHIELD_AI_IMAGES,
  },
  {
    id: 'mienne',
    name: 'Mienne',
    tagline: 'Brand that awakens the senses',
    industry: 'beauty',
    feeling: 'turned on',
    images: MIENNE_IMAGES,
  },
  {
    id: 'freegame',
    name: 'FreeGame',
    tagline: 'Redefining representation for a new era of athletes',
    industry: 'sports',
    feeling: 'ahead of the game',
    images: FREEGAME_IMAGES,
  },
];
