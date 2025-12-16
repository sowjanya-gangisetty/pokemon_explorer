const BASE_URL = "https://pokeapi.co/api/v2";

const pokemonInput = document.getElementById("pokemonInput");
const searchBtn = document.getElementById("searchBtn");
const randomBtn = document.getElementById("randomBtn");
const suggestions = document.getElementById("suggestions");
const errorMessage = document.getElementById("errorMessage");
const loading = document.getElementById("loading");
const pokemonDisplay = document.getElementById("pokemon-display");

let allPokemonList = [];

loadPokemonList();

searchBtn.addEventListener("click", handleSearch);
randomBtn.addEventListener("click", handleRandomPokemon);
pokemonInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleSearch();
  }
});
pokemonInput.addEventListener("input", handleAutocomplete);

async function loadPokemonList() {
  try {
    const response = await fetch(`${BASE_URL}/pokemon?limit=1000`);

    if (!response.ok) {
      throw new Error("Failed to load Pokémon list");
    }

    const data = await response.json();
    allPokemonList = data.results;
  } catch (error) {
    console.error("Error loading Pokémon list:", error);
  }
}

function handleAutocomplete() {
  const input = pokemonInput.value.toLowerCase().trim();
  suggestions.innerHTML = "";

  // Only show suggestions for 2+ characters
  if (!input || input.length < 2) {
    suggestions.classList.remove("show");
    return;
  }

  // Find matches (up to 8 results)
  const matches = allPokemonList
    .filter((p) => p.name.startsWith(input))
    .slice(0, 8);

  if (matches.length === 0) {
    suggestions.classList.remove("show");
    return;
  }

  // Create suggestion items
  matches.forEach((pokemon) => {
    const li = document.createElement("li");
    li.textContent = pokemon.name;
    li.onclick = () => {
      pokemonInput.value = pokemon.name;
      suggestions.classList.remove("show");
      handleSearch();
    };
    suggestions.appendChild(li);
  });

  suggestions.classList.add("show");
}
