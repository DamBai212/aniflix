import {
  createAnimeCatalog,
  getAnimeById,
  getAnimeGenres,
  getFeaturedAnime,
  queryAnimeCatalog
} from './animeRepository.js';
import animeRecords from './animeRecords.js';

const animeCatalog = createAnimeCatalog(animeRecords);

test('returns the full anime catalog with mapped cover assets', () => {
  expect(animeCatalog).toHaveLength(6);
  expect(animeCatalog[0]).toMatchObject({
    id: 'jujutsu',
    cName: 'dropdown-link'
  });
  expect(animeCatalog[0].cover).toBeTruthy();
});

test('returns a single anime by id', () => {
  expect(getAnimeById('naruto', animeCatalog)).toMatchObject({
    id: 'naruto',
    genre: 'Shonen',
    studio: 'Pierrot',
    episodeCountLabel: '500 episodes',
    audioOptions: expect.arrayContaining(['English dub']),
    mediaClip: {
      provider: 'VIZ'
    }
  });
  expect(getAnimeById('bleach', animeCatalog)).toBeNull();
});

test('returns stable genre options with an all filter first', () => {
  expect(getAnimeGenres(animeCatalog)).toEqual([
    'All',
    'Dark Fantasy',
    'Adventure',
    'Action',
    'Shonen',
    'Superhero',
    'Thriller'
  ]);
});

test('filters featured anime by the requested ids in order', () => {
  expect(getFeaturedAnime(['attackontitan', 'jujutsu'], animeCatalog).map((anime) => anime.id)).toEqual([
    'attackontitan',
    'jujutsu'
  ]);
});

test('queries the catalog by genre and search term', () => {
  expect(queryAnimeCatalog({ genre: 'Action' }, animeCatalog).map((anime) => anime.id)).toEqual(['fireforce']);
  expect(queryAnimeCatalog({ searchTerm: 'treasure' }, animeCatalog).map((anime) => anime.id)).toEqual(['onepiece']);
  expect(queryAnimeCatalog({ genre: 'Thriller', searchTerm: 'walls' }, animeCatalog).map((anime) => anime.id)).toEqual(['attackontitan']);
});
