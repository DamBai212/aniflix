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
  expect(animeCatalog).toHaveLength(10);
  expect(animeCatalog[0]).toMatchObject({
    id: 'jujutsu',
    cName: 'dropdown-link'
  });
  expect(animeCatalog[0].cover).toBeTruthy();
  expect(getAnimeById('sololeveling', animeCatalog).cover).toMatch(/^data:image\/svg\+xml/);
  expect(getAnimeById('demonslayer', animeCatalog).cover).toMatch(/^data:image\/svg\+xml/);
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
    'Thriller',
    'Action Fantasy',
    'Comedy',
    'Science Adventure',
    'Historical Fantasy'
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
  expect(queryAnimeCatalog({ searchTerm: 'MAPPA' }, animeCatalog).map((anime) => anime.id)).toEqual(['jujutsu', 'attackontitan']);
  expect(queryAnimeCatalog({ searchTerm: 'breathing style' }, animeCatalog).map((anime) => anime.id)).toEqual(['demonslayer']);
  expect(queryAnimeCatalog({ searchTerm: 'English dub' }, animeCatalog).map((anime) => anime.id)).toEqual([
    'jujutsu',
    'onepiece',
    'fireforce',
    'naruto',
    'myheroacademia',
    'attackontitan',
    'sololeveling',
    'spyxfamily',
    'drstone',
    'demonslayer'
  ]);
});
