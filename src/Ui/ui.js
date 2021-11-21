export function openModalWindow() {
  document.querySelector('label').click();
}

export function fillCardNames(pokemonList, setCallBackFunction = () => {}) {
  document.querySelectorAll('.card').forEach(($card, index) => {
    $card.querySelector('p').textContent = pokemonList[index].name;
  });
  document.querySelector('.grid').onclick = (e) => setCallBackFunction(e);
}

export function removeHiddenClasses() {
  if (document.contains(document.querySelector('.hidden'))) {
    document.querySelectorAll('.hidden').forEach(($div) => {
      $div.classList.remove('hidden');
    });
  }
}

export function manageButtonsDisplay(
  pageNumber,
  NUMBER_OF_POKEMONS,
  POKEMONS_PER_PAGE,
  setCallBackFunction,
) {
  if (pageNumber > 1) {
    document.querySelector('#start-button').classList.remove('hidden');
    document.querySelector('#previous-button').classList.remove('hidden');
  } else if (pageNumber === 1) {
    document.querySelector('#previous-button').classList.add('hidden');
    document.querySelector('#start-button').classList.add('hidden');
  }
  if (pageNumber === Math.ceil(NUMBER_OF_POKEMONS / POKEMONS_PER_PAGE)) {
    document.querySelector('#next-button').classList.add('hidden');
    document.querySelector('#last-button').classList.add('hidden');
  }
  document.querySelectorAll('.pagination-button-container button').forEach((button) => {
    button.onclick = (e) => setCallBackFunction(e);
  });
}

export function clearCardsContent() {
  document.querySelectorAll('p').forEach(($p) => {
    $p.textContent = '';
  });
}

export function hideExcessCards() {
  document.querySelectorAll('.card').forEach(($div) => {
    if ($div.querySelector('p') === '' && $div.querySelector('img').src === '') {
      $div.classList.add('hidden');
    }
  });
}

export function fillModalWithData(pokemon, setCallBackFunction = () => {}) {
  setCallBackFunction();
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
}
