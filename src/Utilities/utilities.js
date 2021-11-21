let offset = 0;
let CURRENT_PAGE_NUMBER = 1;
export default function setOffsetAndPageNumber(buttonName, NUMBER_OF_POKEMONS, POKEMONS_PER_PAGE) {
  if (buttonName === 'Start') {
    offset = 0;
    CURRENT_PAGE_NUMBER = 1;
  } else if (buttonName === 'Last') {
    offset = NUMBER_OF_POKEMONS - POKEMONS_PER_PAGE;
    CURRENT_PAGE_NUMBER = Math.ceil(NUMBER_OF_POKEMONS / POKEMONS_PER_PAGE);
  } else if (buttonName === 'Previous') {
    offset -= POKEMONS_PER_PAGE;
    CURRENT_PAGE_NUMBER -= 1;
  } else if (buttonName === 'Next') {
    offset += POKEMONS_PER_PAGE;
    CURRENT_PAGE_NUMBER += 1;
  }
  return { offset, CURRENT_PAGE_NUMBER };
}
