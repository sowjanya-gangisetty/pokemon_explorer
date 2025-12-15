
// API Configuration
const BASE_URL = "https://pokeapi.co/api/v2";



const randomBtn = document.getElementById("randomBtn");
const pokemonDisplay = document.getElementById("pokemon-display");
const nameEl = document.getElementById("pokemon-name");
const imageEl = document.getElementById("pokemon-image");

async function getRandomPokemon() {
  const maxPokemonId = 1010;
  const randomId = Math.floor(Math.random() * maxPokemonId) + 1;

  const response = await fetch(`${BASE_URL}/pokemon/${randomId}`);
  const data = await response.json();

  nameEl.textContent = data.name.toUpperCase();
  imageEl.src = data.sprites.front_default;

  pokemonDisplay.classList.remove("hidden");
}

randomBtn.addEventListener("click", getRandomPokemon);