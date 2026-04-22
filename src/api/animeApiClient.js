import { createAnimeApi } from '../backend/app.js';

const animeApi = createAnimeApi();

function cloneAnime(anime) {
  if (!anime) {
    return null;
  }

  return {
    ...anime,
    mediaClip: anime.mediaClip ? { ...anime.mediaClip } : null
  };
}

function resolveAnimeRequest(callback) {
  return Promise.resolve().then(() => callback());
}

export function fetchAnimeCatalog() {
  return resolveAnimeRequest(() => animeApi.listAnimes().map((anime) => cloneAnime(anime)));
}

export function fetchAnimeById(animeId) {
  return resolveAnimeRequest(() => cloneAnime(animeApi.getAnime(animeId)));
}
