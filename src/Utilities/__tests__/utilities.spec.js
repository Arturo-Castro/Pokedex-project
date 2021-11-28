/// <reference types="Jest"/>

import setOffsetAndPageNumber from "../utilities.js";

describe('Utilities', () => {
    it('Verifies offset and page values', () => {
        const POKEMONS_PER_PAGE = 33;
        const NUMBER_OF_POKEMONS = 898;
        expect(setOffsetAndPageNumber('Start', NUMBER_OF_POKEMONS, POKEMONS_PER_PAGE))
            .toEqual({
                offset: 0,
                CURRENT_PAGE_NUMBER: 1,
            });
        expect(setOffsetAndPageNumber('Last', NUMBER_OF_POKEMONS, POKEMONS_PER_PAGE))
            .toEqual({
                offset: 865,
                CURRENT_PAGE_NUMBER: 28,
            });
        expect(setOffsetAndPageNumber('Previous', NUMBER_OF_POKEMONS, POKEMONS_PER_PAGE))
            .toEqual({
                offset: 832,
                CURRENT_PAGE_NUMBER: 27,
            });
        expect(setOffsetAndPageNumber('Next', NUMBER_OF_POKEMONS, POKEMONS_PER_PAGE))
            .toEqual({
                offset: 865,
                CURRENT_PAGE_NUMBER: 28,
            });
        expect(setOffsetAndPageNumber('', NUMBER_OF_POKEMONS, POKEMONS_PER_PAGE))
            .toEqual({
                offset: 865,
                CURRENT_PAGE_NUMBER: 28,
        });
    });
});    