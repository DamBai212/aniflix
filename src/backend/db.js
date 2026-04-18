import { findAnimeRecordById, listAnimeRecords } from './Animes.js';

export function createAnimeDb() {
  return {
    getAllAnimes() {
      return listAnimeRecords();
    },
    getAnimeById(animeId) {
      return findAnimeRecordById(animeId);
    }
  };
}
