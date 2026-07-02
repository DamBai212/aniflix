import animeMedia from './animeMedia.js';
import animeClips from './animeClips.js';

export const defaultGenre = 'All';
const searchableFields = [
  'name',
  'originalTitle',
  'genre',
  'format',
  'tagline',
  'studio',
  'releaseStatus',
  'seasonCountLabel',
  'episodeCountLabel',
  'runtime',
  'setting',
  'audioOptions',
  'signatureTags'
];

function getSearchableValue(anime, field) {
  const value = anime[field];

  return Array.isArray(value) ? value.join(' ') : value || '';
}

function createFallbackCover(anime) {
  const escapeSvgText = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;'
  }[character]));
  const title = escapeSvgText(anime.name);
  const genre = escapeSvgText(anime.genre);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 960">
      <defs>
        <linearGradient id="posterGradient" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${anime.accent || '#ff8c5a'}"/>
          <stop offset="100%" stop-color="#060914"/>
        </linearGradient>
      </defs>
      <rect width="640" height="960" fill="url(#posterGradient)"/>
      <circle cx="492" cy="170" r="180" fill="rgba(255,255,255,0.12)"/>
      <circle cx="128" cy="812" r="220" fill="rgba(0,0,0,0.22)"/>
      <text x="56" y="104" fill="rgba(255,255,255,0.72)" font-family="Arial, sans-serif" font-size="34" font-weight="700" letter-spacing="8">${genre}</text>
      <text x="56" y="760" fill="#fff8ea" font-family="Arial, sans-serif" font-size="72" font-weight="900">${title}</text>
      <text x="56" y="838" fill="rgba(255,255,255,0.76)" font-family="Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="6">ANIFLIX PICK</text>
    </svg>
  `;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export function createAnimeCatalog(animeRecords = []) {
  return animeRecords.map((anime) => ({
    ...anime,
    cover: animeMedia[anime.id] || createFallbackCover(anime),
    mediaClip: animeClips[anime.id] || null,
    cName: 'dropdown-link'
  }));
}

export function getAnimeById(animeId, animeCatalog = []) {
  return animeCatalog.find((anime) => anime.id === animeId) || null;
}

export function getAnimeGenres(animeCatalog = []) {
  return [defaultGenre, ...new Set(animeCatalog.map((anime) => anime.genre))];
}

export function getFeaturedAnime(featuredAnimeIds, animeList = []) {
  return featuredAnimeIds
    .map((animeId) => animeList.find((anime) => anime.id === animeId))
    .filter(Boolean);
}

export function queryAnimeCatalog(filters = {}, animeCatalog = []) {
  const {
    genre = defaultGenre,
    searchTerm = ''
  } = filters;
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  return animeCatalog.filter((anime) => {
    const matchesGenre = genre === defaultGenre || anime.genre === genre;
    const matchesSearch = normalizedSearchTerm === ''
      || searchableFields
        .map((field) => getSearchableValue(anime, field))
        .join(' ')
        .toLowerCase()
        .includes(normalizedSearchTerm);

    return matchesGenre && matchesSearch;
  });
}
