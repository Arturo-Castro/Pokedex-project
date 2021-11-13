import { obtainPokemon, obtainPokemonList } from './data.js';

let offset = 0;
const NUMBER_OF_POKEMONS = 898;
let CURRENT_PAGE_NUMBER = 1;
const POKEMONS_PER_PAGE = 33;

export function fillCardNames(pokemonList) {
  document.querySelectorAll('.card').forEach(($card, index) => {
    $card.querySelector('p').textContent = pokemonList[index].name;
  });
}

export function placeCardImages() {
  document.querySelectorAll('.card').forEach(async ($card, index) => {
    const pokemon = await obtainPokemon(index + 1 + offset);
    $card.querySelector(`#img-${index}`).src = pokemon.sprites.front_default;
  });
}

function removeHiddenClasses() {
  if (document.contains(document.querySelector('.hidden'))) {
    document.querySelectorAll('.hidden').forEach(($div) => {
      $div.classList.remove('hidden');
    });
  }
}

function setOffsetAndPageNumber(clickedButton) {
  if (clickedButton.textContent === 'Start') {
    offset = 0;
    CURRENT_PAGE_NUMBER = 1;
  } else if (clickedButton.textContent === 'Last') {
    offset = NUMBER_OF_POKEMONS - POKEMONS_PER_PAGE;
    CURRENT_PAGE_NUMBER = Math.ceil(NUMBER_OF_POKEMONS / POKEMONS_PER_PAGE);
  } else if (clickedButton.textContent === 'Previous') {
    offset -= POKEMONS_PER_PAGE;
    CURRENT_PAGE_NUMBER -= 1;
  } else if (clickedButton.textContent === 'Next') {
    offset += POKEMONS_PER_PAGE;
    CURRENT_PAGE_NUMBER += 1;
  }
}

function manageButtonsDisplay() {
  if (CURRENT_PAGE_NUMBER > 1) {
    document.querySelector('#start-button').classList.remove('hidden');
    document.querySelector('#previous-button').classList.remove('hidden');
  } else if (CURRENT_PAGE_NUMBER === 1) {
    document.querySelector('#previous-button').classList.add('hidden');
    document.querySelector('#start-button').classList.add('hidden');
  }
  if (CURRENT_PAGE_NUMBER === Math.ceil(NUMBER_OF_POKEMONS / POKEMONS_PER_PAGE)) {
    document.querySelector('#next-button').classList.add('hidden');
    document.querySelector('#last-button').classList.add('hidden');
  }
}

function clearCardsContent() {
  document.querySelectorAll('p').forEach(($p) => {
    $p.textContent = '';
  });
  document.querySelectorAll('.grid img').forEach(($img) => {
    $img.src = '';
  });
}

function hideExcessCards() {
  document.querySelectorAll('.card').forEach(($div) => {
    if ($div.querySelector('p') === '' && $div.querySelector('img').src === '') {
      $div.classList.add('hidden');
    }
  });
}

export function managePagination() {
  document.querySelectorAll('button').forEach(($button) => {
    $button.onclick = async (e) => {
      removeHiddenClasses();
      setOffsetAndPageNumber(e.target);
      manageButtonsDisplay();
      clearCardsContent();
      const pokemonList = await obtainPokemonList(33, offset);
      fillCardNames(pokemonList);
      placeCardImages();
      hideExcessCards();
    };
  });
}

function openModalWindow() {
  document.querySelector('label').click();
}

export function fillModalWithData() {
  document.querySelectorAll('.card').forEach(($card) => {
    $card.onclick = async (e) => {
      const pokemonName = e.target.querySelector('p').textContent;
      openModalWindow();
      const pokemon = await obtainPokemon(pokemonName);
      document.querySelector('#modal-img').src = pokemon.sprites.front_default;
      document.querySelector('#name').textContent = `Name: ${pokemon.forms[0].name}`;
      document.querySelector('#id').textContent = `Id: ${pokemon.id}`;
      document.querySelector('#height').textContent = `Height: ${pokemon.height}`;
      document.querySelector('#weight').textContent = `Weight: ${pokemon.weight}`;
      let pokemonType = '';
      Object.keys(pokemon.types).forEach((index) => {
        pokemonType += `${pokemon.types[index].type.name} `;
      });
      document.querySelector('#type').textContent = `Type: ${pokemonType}`;
    };
  });
}
