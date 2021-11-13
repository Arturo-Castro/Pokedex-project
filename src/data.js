export function obtainPokemonList(limit = 33, offset = 0) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
    .then((response) => response.json())
    .then((responseJson) => responseJson.results);
}

export function obtainPokemon(pokemonIdOrName = 1) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIdOrName}`)
    .then((response) => response.json())
    .then((responseJson) => responseJson);
}
