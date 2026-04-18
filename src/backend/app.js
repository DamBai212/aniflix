import { createAnimeDb } from './db.js';

export function createAnimeApi() {
  const animeDb = createAnimeDb();

  return {
    listAnimes() {
      return animeDb.getAllAnimes();
    },
    getAnime(animeId) {
      return animeDb.getAnimeById(animeId);
    }
  };
}
