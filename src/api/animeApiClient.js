import { createAnimeCatalog, getAnimeById } from '../data/animeRepository.js';

const animeCatalogEndpoint = `${process.env.PUBLIC_URL || ''}/api/animes.json`;

async function requestAnimeRecords() {
  const response = await fetch(animeCatalogEndpoint, {
    headers: {
      Accept: 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`AniFlix catalog request failed with status ${response.status}`);
  }

  const animeRecords = await response.json();

  if (!Array.isArray(animeRecords)) {
    throw new Error('AniFlix catalog payload was not an array');
  }

  return animeRecords;
}

export async function fetchAnimeCatalog() {
  return createAnimeCatalog(await requestAnimeRecords());
}

export async function fetchAnimeById(animeId) {
  return getAnimeById(animeId, await fetchAnimeCatalog());
}
