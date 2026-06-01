// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import animeRecords from './data/animeRecords.js';

function createJsonResponse(body, options = {}) {
  return Promise.resolve({
    ok: options.ok !== undefined ? options.ok : true,
    status: options.status || 200,
    json: () => Promise.resolve(JSON.parse(JSON.stringify(body)))
  });
}

beforeEach(() => {
  const fetchMock = jest.fn((input) => {
    if (input === '/api/animes.json') {
      return createJsonResponse(animeRecords);
    }

    return createJsonResponse({ message: 'Not Found' }, {
      ok: false,
      status: 404
    });
  });

  global.fetch = fetchMock;
  window.fetch = fetchMock;
});
