import { fetchAnimeById, fetchAnimeCatalog } from './animeApiClient.js';

test('fetches the public anime catalog and enriches it for the UI', async () => {
  const animeCatalog = await fetchAnimeCatalog();

  expect(global.fetch).toHaveBeenCalledWith('/api/animes.json', {
    headers: {
      Accept: 'application/json'
    }
  });
  expect(animeCatalog[0]).toMatchObject({
    id: 'jujutsu',
    cover: expect.any(String),
    mediaClip: {
      provider: 'Crunchyroll'
    }
  });
});

test('returns a single anime from the fetched catalog by id', async () => {
  await expect(fetchAnimeById('naruto')).resolves.toMatchObject({
    id: 'naruto',
    genre: 'Shonen'
  });
  await expect(fetchAnimeById('bleach')).resolves.toBeNull();
});

test('throws a helpful error when the public anime endpoint fails', async () => {
  global.fetch.mockResolvedValueOnce({
    ok: false,
    status: 500,
    json: () => Promise.resolve({ message: 'Internal Server Error' })
  });

  await expect(fetchAnimeCatalog()).rejects.toThrow(/status 500/i);
});
