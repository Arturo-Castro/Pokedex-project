import { obtainPokemonList } from './data.js';
import {
  fillCardNames, placeCardImages, managePagination, fillModalWithData,
} from './ui.js';

async function initialize() {
  const pokemonList = await obtainPokemonList();
  fillCardNames(pokemonList);
  placeCardImages();
}

initialize();
managePagination();
fillModalWithData();
