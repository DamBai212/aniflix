import animeRecords from '../data/animeRecords.js';

export function listAnimeRecords() {
  return animeRecords.map((anime) => ({ ...anime }));
}

export function findAnimeRecordById(animeId) {
  return animeRecords.find((anime) => anime.id === animeId) || null;
}
