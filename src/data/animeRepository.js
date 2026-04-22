import animeMedia from './animeMedia.js';
import animeClips from './animeClips.js';

export const defaultGenre = 'All';
const searchableFields = ['name', 'genre', 'tagline'];

export function createAnimeCatalog(animeRecords = []) {
  return animeRecords.map((anime) => ({
    ...anime,
    cover: animeMedia[anime.id],
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
        .map((field) => anime[field])
        .join(' ')
        .toLowerCase()
        .includes(normalizedSearchTerm);

    return matchesGenre && matchesSearch;
  });
}
