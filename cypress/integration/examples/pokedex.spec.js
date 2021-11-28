/// <reference types="Cypress" />
const URL = "192.168.0.119:8080"

context('Pokedex', () => {
  before(() => {
    cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon?limit=33&offset=0', { fixture: 'firstPage.json' });
    cy.visit(URL);
  });

  describe('Web content', () => {
    const NUMBER_OF_POKEMONS = 33;
    it('Verifies number of pokemons in the first page', () => {
      cy.get('.grid').find('.card').should('have.length', NUMBER_OF_POKEMONS);
    });

    it('Verifies pagination buttons', () => {
      cy.get('.pagination-button-container').find('#start-button').should('be.hidden');
      cy.get('.pagination-button-container').find('#previous-button').should('be.hidden');
      cy.get('.pagination-button-container').find('#next-button').should('be.visible');
      cy.get('.pagination-button-container').find('#last-button').should('be.visible');
    });
  });

  describe('Web functionality', () => {
    it('Verifies display of pagionation buttons', () => {
      cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon?limit=33&offset=33', { fixture: 'secondPage.json' });
      cy.get('#next-button').click();
      cy.wait(500);
      cy.get('#start-button').should('be.visible');
      cy.get('#previous-button').should('be.visible');
      cy.get('#next-button').should('be.visible');
      cy.get('#last-button').should('be.visible');
    });

    it('Verifies modal content', () => {
      const NAME_FIELD = 'Name: nidoking';
      const ID_FIELD = 'Id: 34';
      const HEIGHT_FIELD = 'Height: 14';
      const WEIGHT_FIELD = 'Weight: 620';
      const TYPE_FIELD = 'Type: poison ground ';
      cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/nidoking', { fixture: 'nidoking.json' });
      cy.get('#card-container1').click();
      cy.get('.content').should('be.visible');
      cy.get('#name').should('have.text', NAME_FIELD);
      cy.get('#id').should('have.text', ID_FIELD);
      cy.get('#height').should('have.text', HEIGHT_FIELD);
      cy.get('#weight').should('have.text', WEIGHT_FIELD);
      cy.get('#type').should('have.text', TYPE_FIELD);
      cy.get('.modal-window label').click();
      cy.wait(500);
      cy.get('.content').should('not.be.visible');
    });

    it('Verifies pagination buttons of last page', () => {
      cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon?limit=33&offset=865', { fixture: 'lastPage.json' });
      cy.get('#last-button').click();
      cy.get('#start-button').should('be.visible');
      cy.get('#previous-button').should('be.visible');
      cy.get('#next-button').should('not.be.visible');
      cy.get('#last-button').should('not.be.visible');
    });
  });
});