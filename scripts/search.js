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

// API FETCH FUNCTIONS

async function fetchPokemon(nameOrId) {
  const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Pokémon not found. Please check the name or ID.");
    }
    throw new Error("Failed to fetch Pokémon data. Please try again.");
  }

  return await response.json();
}

/**
 * Fetch Pokémon species data
 */
async function fetchPokemonSpecies(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch species data");
  }

  return await response.json();
}

function displayPokemon(pokemon, species) {
  const card = document.createElement("div");
  card.className = "pokemon-card";

  const description =
    species.flavor_text_entries
      .find((entry) => entry.language.name === "en")
      ?.flavor_text.replace(/\f/g, " ") || "No description available.";

  const favorited =
    typeof isFavorite === "function" ? isFavorite(pokemon.id) : false;

  card.innerHTML = `
    <div class="pokemon-header">
      <img src="${
        pokemon.sprites.other["official-artwork"].front_default ||
        pokemon.sprites.front_default
      }" 
           alt="${pokemon.name}" 
           class="pokemon-image">
      <div class="pokemon-name">${pokemon.name}</div>
      <div class="pokemon-id">#${String(pokemon.id).padStart(3, "0")}</div>
    </div>
    
    <div class="pokemon-types">
      ${pokemon.types
        .map(
          (t) =>
            `<span class="type-badge type-${t.type.name}">${t.type.name}</span>`
        )
        .join("")}
    </div>
    
    <p style="color: #666; line-height: 1.6; margin: 20px 0;">${description}</p>
    
    <div class="info-grid">
      <div class="info-item">
        <div class="info-label">Height</div>
        <div class="info-value">${(pokemon.height / 10).toFixed(1)} m</div>
      </div>
      <div class="info-item">
        <div class="info-label">Weight</div>
        <div class="info-value">${(pokemon.weight / 10).toFixed(1)} kg</div>
      </div>
      <div class="info-item">
        <div class="info-label">Base Experience</div>
        <div class="info-value">${pokemon.base_experience}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Habitat</div>
        <div class="info-value">${species.habitat?.name || "Unknown"}</div>
      </div>
    </div>
    
    <div class="abilities">
      <h4>Abilities</h4>
      <div class="ability-list">
        ${pokemon.abilities
          .map(
            (a) =>
              `<span class="ability-badge">${a.ability.name.replace(
                "-",
                " "
              )}</span>`
          )
          .join("")}
      </div>
    </div>
    
    <div class="pokemon-stats">
      <h3>Base Stats</h3>
      ${pokemon.stats
        .map(
          (stat) => `
        <div class="stat-item">
          <span class="stat-name">${stat.stat.name.replace("-", " ")}</span>
          <span class="stat-value">${stat.base_stat}</span>
        </div>
      `
        )
        .join("")}
    </div>
    
    <button class="favorite-btn ${favorited ? "active" : ""}" 
            onclick="typeof toggleFavorite === 'function' && toggleFavorite(${
              pokemon.id
            }, '${pokemon.name}', '${pokemon.sprites.front_default}')">
      ${favorited ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
    </button>
  `;

  pokemonDisplay.appendChild(card);
}

// UI HELPER FUNCTIONS
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.add("show");

  setTimeout(() => {
    errorMessage.classList.remove("show");
  }, 5000);
}

function hideError() {
  errorMessage.classList.remove("show");
}

function showLoading(show) {
  if (show) {
    loading.classList.add("show");
  } else {
    loading.classList.remove("show");
  }

  searchBtn.disabled = show;
  randomBtn.disabled = show;
}

// PUBLIC API FOR OTHER MODULES

function triggerSearch(pokemonName) {
  pokemonInput.value = pokemonName;
  handleSearch();
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
