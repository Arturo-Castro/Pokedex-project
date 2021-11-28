import { fillCardNames, openModalWindow, removeHiddenClasses, manageButtonsDisplay, clearCardsContent, fillModalWithData } from "../ui.js";
import pokedexFixture from "../pokedex.fixture.js";
import pokemonFixture from "../../../cypress/fixtures/nidoking.json"

beforeEach(() => {
  jest.clearAllMocks();
});

const mockCallBackFunction = jest.fn();
const testArray = [{name: 'test'}, {name: 'test'}, {name: 'test'}, {name: 'test'}, {name: 'test'},
                    {name: 'test'}, {name: 'test'}, {name: 'test'}, {name: 'test'}, {name: 'test'},
                    {name: 'test'}, {name: 'test'}, {name: 'test'}, {name: 'test'}, {name: 'test'},
                    {name: 'test'}, {name: 'test'}, {name: 'test'}, {name: 'test'}, {name: 'test'},
                    {name: 'test'}, {name: 'test'}, {name: 'test'}, {name: 'test'}, {name: 'test'},
                    {name: 'test'}, {name: 'test'}, {name: 'test'}, {name: 'test'}, {name: 'test'},
                    {name: 'test'}, {name: 'test'}, {name: 'test'}
                  ];

it('Tests openModalWindow click', () => {
  document.body.innerHTML = pokedexFixture;
  openModalWindow();
  expect(document.querySelector('label')).toBeCalled;
});

it('Tests fillCardNames function', () => {
  fillCardNames(testArray, mockCallBackFunction);
  let outputArray = [];
  document.querySelectorAll('.card').forEach((card) => {
    outputArray.push({name: `${card.querySelector('p').textContent}`})
    document.querySelector('.grid').click();
  });
  expect(testArray).toEqual(outputArray);
  expect(mockCallBackFunction).toBeCalledTimes(33);
});

it('Tests fillCardNames callback function default parameter', () => {   
  fillCardNames(testArray);
  expect(document.querySelector('.grid').click()).toBe(undefined);                                        
});

it('Tests removeHiddenClasses function', () => {
  removeHiddenClasses();
  expect(document.contains(document.querySelector('hidden'))).toEqual(false);
});


it('Tests manageButtonsDisplay function', () => {
  const pageNumber = 2;
  const NUMBER_OF_POKEMONS = 898;
  const POKEMONS_PER_PAGE = 33;
  const LAST_PAGE = 28;

  manageButtonsDisplay(pageNumber, undefined, undefined);
  expect(document.querySelector('#start-button').classList.contains('hidden')).toEqual(false);
  expect(document.querySelector('#previous-button').classList.contains('hidden')).toEqual(false);

  manageButtonsDisplay(pageNumber - 1, undefined, undefined);
  expect(document.querySelector('#start-button').classList.contains('hidden')).toEqual(true);
  expect(document.querySelector('#previous-button').classList.contains('hidden')).toEqual(true);

  manageButtonsDisplay(LAST_PAGE, NUMBER_OF_POKEMONS, POKEMONS_PER_PAGE);
  expect(document.querySelector('#next-button').classList.contains('hidden')).toEqual(true);
  expect(document.querySelector('#last-button').classList.contains('hidden')).toEqual(true);
});

it('Tests manageButtonsDisplay callBack function', () => {
  manageButtonsDisplay(undefined, undefined, undefined, mockCallBackFunction);
  document.querySelector('#start-button').click();
  document.querySelector('#previous-button').click();
  document.querySelector('#next-button').click();
  document.querySelector('#last-button').click();
  expect(mockCallBackFunction).toBeCalledTimes(4);
});

it('Tests clearCardsContent', () => {
  const emptyArray = ['', '', '', '', '',
                      '', '', '', '', '',
                      '', '', '', '', '',
                      '', '', '', '', '',
                      '', '', '', '', '',
                      '', '', '', '', '',
                      '', '', ''
                      ];
  let outputArray = [];  
  fillCardNames(testArray);                    
  clearCardsContent();
  document.querySelectorAll('p').forEach((p) => {
    outputArray.push(p.textContent);
  });
  expect(emptyArray).toEqual(outputArray);
});

it('Tests that the modal window is being filled correctly with data', () => {
  fillModalWithData(pokemonFixture);
  expect(document.querySelector('#modal-img').src).toEqual(pokemonFixture.sprites.front_default);
  expect(document.querySelector('#name').textContent).toEqual(`Name: ${pokemonFixture.forms[0].name}`);
  expect(document.querySelector('#id').textContent).toEqual(`Id: ${pokemonFixture.id}`);
  expect(document.querySelector('#height').textContent).toEqual(`Height: ${pokemonFixture.height}`);
  expect(document.querySelector('#weight').textContent).toEqual(`Weight: ${pokemonFixture.weight}`);
});