import {
  obtainPokemon as obtainPokemonFromApi,
  obtainPokemonList as obtainPokemonListFromApi,
} from '../Api/Pokemon.js';

import {
  obtainPokemon as obtainPokemonFromStorage,
  obtainPokemonList as obtainPokemonListFromStorage,
  savePokemon,
  savePokemons,
  POKEMONS_PER_PAGE,
} from '../Storage/Storage.js';

export async function obtainPokemon(id) {
  if (id === undefined) {
    throw new Error('Need an identifier to load a pokemon');
  }

  let pokemon;

  try {
    pokemon = obtainPokemonFromStorage(id);
  } catch (e) {
    pokemon = await obtainPokemonFromApi(id);
    savePokemon(id, pokemon);
  }

  return pokemon;
}

export async function obtainPokemonList(offset = 0, limit = POKEMONS_PER_PAGE) {
  try {
    return obtainPokemonListFromStorage(offset, limit);
  } catch (e) {
    const pokemonsData = await obtainPokemonListFromApi(offset, limit);
    savePokemons(offset, limit, pokemonsData);
    return pokemonsData;
  }
}
