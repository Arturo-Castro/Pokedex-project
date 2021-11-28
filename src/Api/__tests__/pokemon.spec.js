import { obtainPokemonList, obtainPokemon } from "../Pokemon.js";

beforeEach(() => {
  global.fetch = jest.fn();
});

it('Loads a pokemon', () => {
  global.fetch.mockImplementationOnce(() => new Promise ((resolve) => {
    const jsonPromise = new Promise ((r) => {
      r({});
    });
    resolve({json: () => jsonPromise});
  }));

  obtainPokemon('wartortle');
  expect(global.fetch)
    .toHaveBeenCalledTimes(1)
});

it('Loads pokemon list', () => {
  global.fetch.mockImplementationOnce(() => new Promise ((resolve) => {
    const jsonPromise = new Promise ((r) => {
      r({});
    });
    resolve({json: () => jsonPromise});
  }));

  obtainPokemonList(33, 33);
  expect(global.fetch)
    .toHaveBeenCalledTimes(1)
});