
const pokeApi = {}   //OBJETO QUE REPRESENTARÁ A POKEAPI

function convertPokeApiDetailToPokemon(pokeDetail){ //Conversão do pokeapi para nosso modelo
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [ type ] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.species = pokeDetail.species.name
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight

    const abilities = pokeDetail.abilities.map((abilitieSlot) => abilitieSlot.ability.name)
    const [ abiliti ] = abilities
    pokemon.abilities = abilities
    pokemon.abiliti = abiliti
    
    
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json()) //Função para converter os detalhes em JSON
        .then(convertPokeApiDetailToPokemon)  //Chamada função
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {  //TODA MANIPULAÇÃO DO FETCH, função com 2 parâmetros 
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url) //Busca da requisição 
        .then((response) => response.json()) //Volta um HTTP response e converte para JSON
        .then((jsonBody) => jsonBody.results) // Com o resultado temos a lista de pokemnos
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) //Buscar detalhes, fazendo uma nova lista 
        .then((detailRequests) => Promise.all(detailRequests)) //Requisições de lista de detalhes, esperando que elas terminassem
        .then((pokemonDetails) => pokemonDetails) //Lista de detalhes de verdade 
}

pokeApi.getPokemonById = (id) => {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}/`
        return fetch(url)
            .then((response) => response.json())
            .then((data) => ({
                number: data.id,
                name: data.name,
                types: data.types.map(typeInfo => typeInfo.type.name),
                photo: data.sprites.front_default,
                species: data.species.name,
                height: data.height,
                weight: data.weight,

            }));
    }


