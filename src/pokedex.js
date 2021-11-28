import { obtainPokemon, obtainPokemonList } from './Services/Pokemon.js';
import {
  fillCardNames,
  removeHiddenClasses,
  manageButtonsDisplay,
  clearCardsContent,
  fillModalWithData,
  openModalWindow,
} from './Ui/ui.js';
import setOffsetAndPageNumber from './Utilities/utilities.js';
import { POKEMONS_PER_PAGE } from './Storage/Storage.js';

async function manageContent(page) {
  const NUMBER_OF_POKEMONS = 898;
  removeHiddenClasses();
  const {
    offset,
    CURRENT_PAGE_NUMBER,
  } = setOffsetAndPageNumber(page, NUMBER_OF_POKEMONS, POKEMONS_PER_PAGE);
  manageButtonsDisplay(CURRENT_PAGE_NUMBER, NUMBER_OF_POKEMONS, POKEMONS_PER_PAGE, (e) => {
    const buttonName = e.target.textContent;
    manageContent(buttonName);
  });
  clearCardsContent();
  const pokemonList = await obtainPokemonList(POKEMONS_PER_PAGE, offset);
  fillCardNames(pokemonList, async (e) => {
    const pokemonName = e.target.querySelector('p').textContent;
    const pokemon = await obtainPokemon(pokemonName);
    fillModalWithData(pokemon, openModalWindow);
  });

}

export default async function initialize() {
  manageContent('Start');
}
