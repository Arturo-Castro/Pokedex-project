import { POKEMONS_PER_PAGE, obtainPokemon, obtainPokemonList, savePokemon, savePokemons } from "../Storage.js";
const offset = 33;

beforeEach(() => {
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn()
  };
  global.localStorage = localStorageMock;
  const spyGetItem = jest.spyOn(Storage.prototype, 'getItem'); 
  const spySetItem = jest.spyOn(Storage.prototype, 'setItem'); 
  jest.clearAllMocks(); 
});


it('Gives an error when loading a pokemon without an id', () => {
  expect(() => {
    obtainPokemon();
  }).toThrow(Error);
  expect(() => {
    obtainPokemon();
  }).toThrow('Need an identifier to load a pokemon');
});

it('Tests localStorage.getItem from obtainPokemon function', () => {
  JSON.parse = jest.fn().mockImplementationOnce(() => {});
  obtainPokemon('blastoise');

  expect(localStorage.getItem)
    .toHaveBeenCalledTimes(1); 
  expect(localStorage.getItem)
    .toBeCalledWith('pokemon_blastoise');
});

it('Gives error when the id is not found in the local storage from obtainPokemon call', () => {
  JSON.parse = jest.fn().mockImplementationOnce(() => {
    return null;
  });

  expect(() => {
    obtainPokemon('venasaur');
  }).toThrowError('Pokemon with id venasaur not found');
});

it('Tests localStorage.getItem from obtainPokemonList function', () => {
  JSON.parse = jest.fn().mockImplementationOnce(() => {});

  obtainPokemonList(offset, POKEMONS_PER_PAGE);
  expect(localStorage.getItem)
    .toHaveBeenCalledTimes(1);
  expect(localStorage.getItem)
    .toBeCalledWith('pokemons_33_33');
});

it('Gives error when the id is not found in the local storage from obtainPokemonList call', () => {
  JSON.parse = jest.fn().mockImplementationOnce(() => {
    return null;
  });

  expect(() => {
    obtainPokemonList(offset, POKEMONS_PER_PAGE);
  }).toThrowError(`Pokemon list with offset ${offset} and limit ${POKEMONS_PER_PAGE} not found`);
});

it('Tests localStorage.setItem from savePokemon function', () => {
  JSON.stringify = jest.fn().mockImplementationOnce(() => {});

  savePokemon('pikachu', {});
  expect(localStorage.setItem)
    .toHaveBeenCalledTimes(1);
});

it('Gives error when passing undefined parameters to savePokemon function', () => {
  expect(() => {
    savePokemon();
  }).toThrowError('Need an identifier and a pokemon to save in localStorage')
});

it('Tests localStorage.setItem from savePokemons function', () => {
  JSON.stringify = jest.fn().mockImplementationOnce(() => {});

  savePokemons('pikachu', POKEMONS_PER_PAGE, {});
  expect(localStorage.setItem)
    .toHaveBeenCalledTimes(1);
});

it('Gives error when passing undefined parameters to savePokemons function', () => {
  expect(() => {
    savePokemons();
  }).toThrowError('Need offset, limit and pokemon list')
});