export const POKEMONS_PER_PAGE = 33;

function obtainPokemonKey(id) {
  return `pokemon_${id}`;
}

function obtainPokemonKeys(offset, limit) {
  return `pokemons_${offset}_${limit}`;
}

export function obtainPokemon(id) {
  if (id === undefined) {
    throw new Error('Need an identifier to load a pokemon');
  }

  const pokemon = JSON.parse(localStorage.getItem(obtainPokemonKey(id)));
  if (pokemon === null) {
    throw new Error(`Pokemon with id ${id} not found`);
  }

  return pokemon;
}

export function obtainPokemonList(offset = 0, limit = POKEMONS_PER_PAGE) {
  const pokemons = JSON.parse(localStorage.getItem(obtainPokemonKeys(offset, limit)));
  if (pokemons === null) {
    throw new Error(`Pokemon list with offset ${offset} and limit ${limit} not found`);
  }

  return pokemons;
}

export function savePokemon(id, pokemon) {
  if (id === undefined || typeof pokemon !== 'object') {
    throw new Error('Need an identifier and a pokemon to save in localStorage');
  }

  localStorage.setItem(obtainPokemonKey(id), JSON.stringify(pokemon));
}

export function savePokemons(offset, limit, pokemons) {
  if (offset === undefined || limit === undefined || typeof pokemons !== 'object') {
    throw new Error('Need offset, limit and pokemon list');
  }

  localStorage.setItem(obtainPokemonKeys(offset, limit), JSON.stringify(pokemons));
}
