import animeRecords from './animeRecords.js';
import animeMedia from './animeMedia.js';
import animeClips from './animeClips.js';

const defaultGenre = 'All';
const searchableFields = ['name', 'genre', 'tagline'];
const animeCatalog = Object.freeze(
  animeRecords.map((anime) =>
    Object.freeze({
      ...anime,
      cover: animeMedia[anime.id],
      mediaClip: animeClips[anime.id] || null,
      cName: 'dropdown-link'
    })
  )
);

export function getAnimeCatalog() {
  return animeCatalog.slice();
}

export function getAnimeById(animeId) {
  return animeCatalog.find((anime) => anime.id === animeId) || null;
}

export function getAnimeGenres() {
  return [defaultGenre, ...new Set(animeCatalog.map((anime) => anime.genre))];
}

export function getFeaturedAnime(featuredAnimeIds, animeList = animeCatalog) {
  return featuredAnimeIds
    .map((animeId) => animeList.find((anime) => anime.id === animeId))
    .filter(Boolean);
}

export function queryAnimeCatalog(filters = {}) {
  const {
    genre = defaultGenre,
    searchTerm = ''
  } = filters;
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  return animeCatalog.filter((anime) => {
    const matchesGenre = genre === defaultGenre || anime.genre === genre;
    const matchesSearch = normalizedSearchTerm === ''
      || searchableFields
        .map((field) => anime[field])
        .join(' ')
        .toLowerCase()
        .includes(normalizedSearchTerm);

    return matchesGenre && matchesSearch;
  });
}
