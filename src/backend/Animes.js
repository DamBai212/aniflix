import animeRecords from '../data/animeRecords.js';
import { createAnimeCatalog } from '../data/animeRepository.js';

const animeCatalog = createAnimeCatalog(animeRecords);

function cloneAnimeRecord(anime) {
  if (!anime) {
    return null;
  }

  return {
    ...anime,
    mediaClip: anime.mediaClip ? { ...anime.mediaClip } : null
  };
}

export function listAnimeRecords() {
  return animeCatalog.map((anime) => cloneAnimeRecord(anime));
}

export function findAnimeRecordById(animeId) {
  return cloneAnimeRecord(animeCatalog.find((anime) => anime.id === animeId) || null);
}
