const NUMBER_OF_POKEMONS = 898;
let CURRENT_PAGE_NUMBER = 1;
const POKEMONS_PER_PAGE = 33;

fetch('https://pokeapi.co/api/v2/pokemon/?limit=33&offset=0')
    .then(response => response.json())
    .then(responseJson => {
        fillCardNames(responseJson);
        placeCardImages(responseJson);  
    })

let offset = 0;

document.querySelectorAll('button').forEach($button => {
    $button.onclick = function(e){
        removeHiddenClasses();
        setOffsetAndPageNumber(e.target);
        manageButtonsDisplay();
        fetch(`https://pokeapi.co/api/v2/pokemon/?limit=33&offset=${offset}`)
            .then(response => response.json())
            .then(responseJson => {
               clearCardsContent();
               fillCardNames(responseJson);
               placeCardImages(responseJson);
               hideExcessCards();
            })
    }
})

fillModalWithData();


function fillCardNames(pokemonData){
    document.querySelectorAll('.card').forEach(($card, index) => {
        $card.querySelector('p').textContent = pokemonData.results[index].name;
    })
}

function placeCardImages(pokemonData){
    Object.keys(pokemonData.results).forEach(index => {
        fetch(pokemonData.results[index].url)
            .then(response => response.json())
            .then(responseJson => {
                document.querySelector(`#img-${index}`).src = responseJson.sprites['front_default'];
            })
    })
}

function removeHiddenClasses(){
    if (document.contains(document.querySelector('.hidden'))){
        document.querySelectorAll('.hidden').forEach($div => {
            $div.classList.remove('hidden')
        })
    }
}

function setOffsetAndPageNumber(clickedButton){
    if(clickedButton.textContent === 'Start'){
        offset = 0;
        CURRENT_PAGE_NUMBER = 1;
    } else if (clickedButton.textContent === 'Last'){
        offset = NUMBER_OF_POKEMONS;
        CURRENT_PAGE_NUMBER = Math.ceil(NUMBER_OF_POKEMONS/POKEMONS_PER_PAGE);
    } else if (clickedButton.textContent === 'Previous'){
        offset-=POKEMONS_PER_PAGE;
        CURRENT_PAGE_NUMBER-=1;
    } else if (clickedButton.textContent === 'Next'){
        offset+=POKEMONS_PER_PAGE;
        CURRENT_PAGE_NUMBER+=1;
    }
}

function manageButtonsDisplay(){
    if (CURRENT_PAGE_NUMBER > 1){
        document.querySelector('#start-button').classList.remove('hidden');
        document.querySelector('#previous-button').classList.remove('hidden');
    } else if (CURRENT_PAGE_NUMBER === 1){
        document.querySelector('#previous-button').classList.add('hidden');
        document.querySelector('#start-button').classList.add('hidden');
    }
    if (CURRENT_PAGE_NUMBER === Math.ceil(NUMBER_OF_POKEMONS/POKEMONS_PER_PAGE)){
        document.querySelector('#next-button').classList.add('hidden');
        document.querySelector('#last-button').classList.add('hidden');
    }
}

function hideExcessCards(){
    document.querySelectorAll('.card').forEach($div => {
        if ($div.querySelector('p') === '' && $div.querySelector('img').src === ''){
            $div.classList.add('hidden');
        }
    })
}

function clearCardsContent(){
    document.querySelectorAll('p').forEach($p => {
        $p.textContent = '';
    })
    document.querySelectorAll('.grid img').forEach($img => {
        $img.src = '';
    })
}

function openModalWindow(){
    document.querySelector('label').click();
}

function fillModalWithData(){
    document.querySelectorAll('.card').forEach($card => {
        $card.onclick = function(e){
            const pokemonName = e.target.querySelector('p').textContent;
            openModalWindow();
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
                .then(response => response.json())
                .then(responseJson => {
                    document.querySelector('#modal-img').src = responseJson.sprites['front_default'];
                    document.querySelector('#name').textContent = `Name: ${responseJson.forms[0].name}`;
                    document.querySelector('#id').textContent = `Id: ${responseJson.id}`;
                    document.querySelector('#height').textContent = `Height: ${responseJson.height}`;
                    document.querySelector('#weight').textContent = `Weight: ${responseJson.weight}`;
                    let pokemonType = '';
                    Object.keys(responseJson.types).forEach(index => {
                       pokemonType += `${responseJson.types[index].type.name} `;   
                    })
                    document.querySelector('#type').textContent = `Type: ${pokemonType}`;
                })
        }
    })
}