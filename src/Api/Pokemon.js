export function obtainPokemonList(limit = 33, offset = 0) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
    .then((response) => response.json())
    .then((responseJson) => responseJson.results);
}

export function obtainPokemon(id) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((response) => response.json())
    .then((responseJson) => responseJson);
}
