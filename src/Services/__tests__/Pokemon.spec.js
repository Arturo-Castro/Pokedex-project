import * as mockService from "../Pokemon.js"
import * as mockStorage from "../../Storage/Storage.js"
import * as mockApi from "../../Api/Pokemon.js"

jest.mock("../../Storage/Storage.js", () => ({
  obtainPokemon: jest.fn(),
  savePokemon: jest.fn(),
  obtainPokemonList: jest.fn(),
  savePokemons: jest.fn()
}));

jest.mock("../../Api/Pokemon.js", () => ({
  obtainPokemon: jest.fn(),
  obtainPokemonList: jest.fn()
}));

it('Throws error if obtainPokemon has an undefined parameter', async () => {
  await expect(mockService.obtainPokemon()).rejects.toThrow('Need an identifier to load a pokemon');
});

it('Calls obtainPokemon From Local Storage', async () => {
  await mockService.obtainPokemon('test');
  expect(mockStorage.obtainPokemon).toHaveBeenCalledTimes(1);
});

it('Calls obtainPokemon From Api', async () => {
  mockStorage.obtainPokemon.mockImplementationOnce(() => {
    throw new Error;
  });
  await mockService.obtainPokemon('test');
  expect(mockApi.obtainPokemon).toHaveBeenCalledTimes(1);
  expect(mockStorage.savePokemon).toHaveBeenCalledTimes(1);
});

it('Calls obtainPokemonList From Local Storage', async () => {
  await mockService.obtainPokemonList('test', 'test');
  expect(mockStorage.obtainPokemonList).toHaveBeenCalledTimes(1);
});

it('Calls obtainPokemonList From Api', async () => {
  mockStorage.obtainPokemonList.mockImplementationOnce(() => {
    throw new Error;
  });
  await mockService.obtainPokemonList('test');
  expect(mockApi.obtainPokemonList).toHaveBeenCalledTimes(1);
  expect(mockStorage.savePokemons).toHaveBeenCalledTimes(1);
});