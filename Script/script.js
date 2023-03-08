const pokemonNname = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonAnt = document.querySelector(".btn-prev");
const buttonPro = document.querySelector(".btn-next");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;  
    }
}

const tipoPokemon = async (tiposPokemon) => {

    const APIResponses = await fetch(`"https://pokeapi.co/api/v2/pokemon-species/${tiposPokemon}"`);  
    
    if (APIResponses.status === 200) {
        const data = await APIResponses.json();
        return data;  
    }
}

const renderPokemon = async (pokemon) => {

    pokemonNname.innerHTML = "Carregando...";
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);
    
   if (data) {
    pokemonImage.style.display = 'block';
    pokemonNname.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = ''; 
   } else {
    pokemonNname.innerHTML = 'Não encontrado :/';
    pokemonNumber.innerHTML = '';
    pokemonImage.style.display = 'none';
   }  
}


form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
    input.value = '';  
});

buttonAnt.addEventListener('click', () => {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
});

buttonPro.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);