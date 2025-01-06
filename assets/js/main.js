//PEGA LISTA 

const pokemonList = document.getElementById('pokemonList')
const infoPoke = document.getElementById('infows')
const loadMoreButton = document.getElementById('loadMoreButton')



//Limitando quantidade de registros

const maxRecords = 151    //quantidade máxima

const limit = 10
let offset = 0;


/* 1, 2, 3, 4, 5    O offset é 0 e limite 5
   6, 7, 8, 9, 10   Offset 5 e limite 5
   11,               offset 10 e limite 5  Remove o botão para não carregar mais*/


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {  //REQUISIÇÃO DOS POKEMONS
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}" onclick="goToNewPage(${pokemon.number})">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
            
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">

                    
                </div>`
        ).join('')
        pokemonList.innerHTML += newHtml

    })
}

function goToNewPage(pokemonId) {
    
    localStorage.setItem('selectedPokemonId', pokemonId);
    window.location.href = 'About.html';
}

// Em pokemonDetails.html
document.addEventListener('DOMContentLoaded', () => {
    
    const pokemonId = localStorage.getItem('selectedPokemonId');
    if (pokemonId) {
        pokeApi.getPokemonById(pokemonId).then((pokemon) => {
            const teste = `
                <section  class="contentInfoImg">

            <img class="foto" src="${pokemon.photo}" alt="">

        </section>
        <section class="contentInfo">
        
            <ol class="options">
             <li><a href="About.html">About</a></li> 
             <li><a href="">Base Status</a></li>
             <li><a href="">Evolution</a></li>
             <li><a href="">Moves</a></li>
            </ol>
         
        
            <ol class="liDupla">
                <li>Species</li>
                <li>${pokemon.species}</li>
                <li>Height</li>
                <li>${pokemon.height}</li>
                <li>Weight</li>
                <li>${pokemon.weight}</li>
                <li>Abilites</li>
                
            </ol>

            
            <h4>Breeding</h4>
            <ol class="liDupla">
                <li>Gender</li>
                <li>null</li>
                <li>Egg Groups</li>
                <li>null</li>
                <li>Egg Cycle</li>
                <li>null</li>
            
            </ol> 
        </section>`
            infoPoke.innerHTML = teste;

        })
    } else{
        console.log('falhou')
    }
})


loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    debugger
    const  qtdRecordsWithNexPAGE = offset + limit

    if (qtdRecordsWithNexPAGE >= maxRecords ) {
        const newLimit = maxRecords - offset 
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton) //Remover o botão
    } else {
        loadPokemonItens(offset, limit)
    }

    
})


function goToNewPage2() {
    window.location.href = 'index.html'
}

function handleClick() {
    alert("Item clicado!");
    // Adicione aqui a lógica que você deseja ao clicar no item
}
