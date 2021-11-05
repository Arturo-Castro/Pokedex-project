fetch('https://pokeapi.co/api/v2/pokemon/?limit=33&offset=0')
    .then(response => response.json())
    .then(responseJson => {
        document.querySelectorAll('.card').forEach(($card, index) => {
            $card.querySelector('p').textContent = responseJson.results[index].name;
            fetch(responseJson.results[index].url)
                .then(response => response.json())
                .then(responseJson => {
                    $card.querySelector('img').src = responseJson.sprites['front_default'];
                })
        })
    })
let offset = 0;

document.querySelectorAll('button').forEach($button => {
    $button.onclick = function(e){
        if (document.contains(document.querySelector('.hidden'))){
            document.querySelectorAll('.hidden').forEach($div => {
                $div.classList.remove('hidden')
            })
        }
        /* let limit = 33; */
        if(e.target.textContent === 'Start'){
            offset = 0;
        } else if (e.target.textContent === 'Last'){
            offset = 891;
        } else if (e.target.textContent === 'Previous'){
            offset-=33;
        } else if (e.target.textContent === 'Next'){
            offset+=33;
        }
        if (offset > 891){
            offset = 891;
            for (let i=8; i<=33; i++){
                document.querySelector(`#card-container${i}`).classList.add('hidden')
            }
            return;
        }
        if (offset < 0){
            offset = 0
            return;
        }
        /* if (offset = 891){
            limit = 7;
        } */
        console.log(offset);
        fetch(`https://pokeapi.co/api/v2/pokemon/?limit=33&offset=${offset}`)
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                document.querySelectorAll('p').forEach($p => {
                    $p.textContent = '';
                })
                document.querySelectorAll('img').forEach($img => {
                    $img.src = '';
                })
                document.querySelectorAll('.card').forEach(($card, index) => {
                    if (offset === 891){
                        for (let i=8; i<=33; i++){
                            document.querySelector(`#card-container${i}`).classList.add('hidden')
                        }
                        /* document.querySelector('#card-container1').classList.add('hidden') */
                    }
                    $card.querySelector('p').textContent = responseJson.results[index].name;
                    fetch(responseJson.results[index].url)
                        .then(response => response.json())
                        .then(responseJson => {
                            $card.querySelector('img').src = responseJson.sprites['front_default'];
                        })
                })
            })
    }
})

document.querySelectorAll('.card').forEach($card => {
    $card.onclick = function(e){
        document.querySelector('label').click();
        fetch(`https://pokeapi.co/api/v2/pokemon/${e.target.querySelector('p').textContent}`) //WARNING: ITS CASE SENSITIVE!!!!!!!!!!!!
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson.types);
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
