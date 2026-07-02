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
  'visualMood',
  'posterMotif',
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
  const titleWords = anime.name.split(' ');
  const titleLines = titleWords.reduce((lines, word) => {
    const currentLine = lines[lines.length - 1] || '';
    const nextLine = currentLine ? `${currentLine} ${word}` : word;

    if (nextLine.length > 13 && currentLine) {
      return [...lines, word];
    }

    return [...lines.slice(0, -1), nextLine];
  }, ['']).slice(0, 3);
  const genre = escapeSvgText(anime.genre);
  const motif = escapeSvgText(anime.posterMotif || anime.signatureTags[0] || 'AniFlix Original');
  const mood = escapeSvgText(anime.visualMood || anime.setting);
  const accent = anime.accent || '#ff8c5a';
  const titleMarkup = titleLines
    .map((line, index) => `<text x="56" y="${670 + (index * 82)}" fill="#fff8ea" font-family="Arial, sans-serif" font-size="70" font-weight="900">${escapeSvgText(line)}</text>`)
    .join('');
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 960">
      <defs>
        <linearGradient id="posterGradient" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${accent}"/>
          <stop offset="100%" stop-color="#060914"/>
        </linearGradient>
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="16"/>
        </filter>
      </defs>
      <rect width="640" height="960" fill="url(#posterGradient)"/>
      <circle cx="500" cy="168" r="184" fill="rgba(255,255,255,0.13)" filter="url(#softGlow)"/>
      <circle cx="132" cy="804" r="220" fill="rgba(0,0,0,0.24)"/>
      <path d="M42 256 C168 172 268 198 396 112 C458 70 530 54 606 64" fill="none" stroke="rgba(255,255,255,0.26)" stroke-width="18" stroke-linecap="round"/>
      <path d="M72 320 C212 250 332 304 560 214" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="8" stroke-linecap="round"/>
      <rect x="46" y="442" width="548" height="114" rx="28" fill="rgba(3,6,14,0.34)" stroke="rgba(255,255,255,0.12)"/>
      <text x="56" y="104" fill="rgba(255,255,255,0.72)" font-family="Arial, sans-serif" font-size="34" font-weight="700" letter-spacing="8">${genre}</text>
      <text x="74" y="494" fill="#fff8ea" font-family="Arial, sans-serif" font-size="32" font-weight="800">${motif}</text>
      <text x="74" y="532" fill="rgba(255,255,255,0.72)" font-family="Arial, sans-serif" font-size="22" font-weight="700">${mood}</text>
      ${titleMarkup}
      <text x="56" y="900" fill="rgba(255,255,255,0.76)" font-family="Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="6">ANIFLIX PICK</text>
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
