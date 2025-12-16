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

  if (!input || input.length < 2) {
    suggestions.classList.remove("show");
    return;
  }

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

// SEARCH FUNCTIONALITY

async function handleSearch() {
  const query = pokemonInput.value.trim().toLowerCase();

  if (!query) {
    showError("Please enter a Pokémon name or ID");
    return;
  }

  suggestions.classList.remove("show");
  hideError();
  showLoading(true);

  pokemonDisplay.innerHTML = "";
  pokemonDisplay.classList.add("hidden");

  if (typeof hideEvolutionDisplay === "function") {
    hideEvolutionDisplay();
  }

  try {
    const pokemonData = await fetchPokemon(query);
    const speciesData = await fetchPokemonSpecies(pokemonData.species.url);

    displayPokemon(pokemonData, speciesData);
    pokemonDisplay.classList.remove("hidden");

    if (
      typeof handleEvolutionChain === "function" &&
      speciesData.evolution_chain
    ) {
      handleEvolutionChain(speciesData.evolution_chain.url);
    }
  } catch (error) {
    showError(error.message);
  } finally {
    showLoading(false);
  }
}

async function handleRandomPokemon() {
  const randomId = Math.floor(Math.random() * 898) + 1;
  pokemonInput.value = randomId.toString();
  handleSearch();
}
