const $searchInput = document.getElementById("search-input");
const $searchButton = document.getElementById("search-button");
const $pokemonName = document.getElementById("pokemon-name");
const $pokemonId = document.getElementById("pokemon-id");
const $weight = document.getElementById("weight");
const $height = document.getElementById("height");
const $imgPokemon = document.getElementById("img-pokemon");
const $stats = document.querySelectorAll("tbody td");
const $types = document.getElementById("types");

let isPokemon = false;
let currentPokemon = 0;

const checkIdOrName = (id,arr)=>{
    for (let pokemon in arr) {
        if (arr[pokemon].id == id || arr[pokemon].name == id) {
            isPokemon = true;
            currentPokemon = pokemon;
            return;
        }
    }
    isPokemon = false;
}

const renderStats = async (url)=>{
    try {
        const res = await fetch(url);
        const data = await res.json();
        const stats = data.stats;
        $height.textContent = data.height;
        $weight.textContent = data.weight;
        $imgPokemon.innerHTML = `<img id="sprite" src="${data.sprites.front_default}">`;
        for (let i in stats) {
            $stats[i].textContent = stats[i]["base_stat"];
        }
        for (let i of data.types) {
            $types.innerHTML += `<span class="${i.type.name}">${i.type.name.toUpperCase()}</span>`
        }
    } catch (error) {
        alert("Pokémon not found");
        $searchInput.value = "";
    }
}

const renderData = async(id)=>{
    const res = await fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon");
    const data = await res.json();
    const pokemonsArr = data.results;
    checkIdOrName(id,pokemonsArr);
    if (isPokemon) {
        $pokemonName.textContent = pokemonsArr[currentPokemon].name.toUpperCase();
        $pokemonId.textContent = "#"+pokemonsArr[currentPokemon].id;
        const currentUrl = pokemonsArr[currentPokemon].url;
        renderStats(currentUrl);
    } else {
        alert("Pokémon not found");
        $searchInput.value = "";
    }
}

$searchButton.addEventListener("click", e=>{
    $types.innerHTML = "";
    const idOrName = ($searchInput.value).toLowerCase().trim();
    renderData(idOrName);
    $searchInput.value = "";
})