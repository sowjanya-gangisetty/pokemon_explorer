
const evolutionDisplay = document.getElementById("evolution-display");

async function handleEvolutionChain(evolutionChainUrl) {
  try {
    // Fetch evolution chain data
    const evolutionData = await fetchEvolutionChain(evolutionChainUrl);

    // Display the evolution chain
    displayEvolutionChain(evolutionData);
  } catch (error) {
    console.error("Error loading evolution chain:", error);
    // Hide evolution display if there's an error
    hideEvolutionDisplay();
  }
}

function hideEvolutionDisplay() {
  evolutionDisplay.classList.add("hidden");
}

async function fetchEvolutionChain(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch evolution chain");
  }

  return await response.json();
}

function displayEvolutionChain(data) {
  // Build evolution chain array by traversing the nested structure
  const chain = buildEvolutionArray(data.chain);

  // If Pokémon doesn't evolve (only 1 form), hide the section
  if (chain.length <= 1) {
    hideEvolutionDisplay();
    return;
  }

  // Build and display the evolution chain HTML
  evolutionDisplay.innerHTML = `
    <h3>Evolution Chain</h3>
    <div class="evolution-chain">
      ${chain
        .map((evo, index) => createEvolutionStage(evo, index, chain.length))
        .join("")}
    </div>
  `;

  // Show the evolution section
  evolutionDisplay.classList.remove("hidden");
}

function buildEvolutionArray(chainData) {
  const chain = [];
  let current = chainData;

  // Traverse the chain and collect all evolution stages
  while (current) {
    chain.push({
      name: current.species.name,
      url: current.species.url,
    });

    // Move to the next evolution (or undefined if final form)
    current = current.evolves_to[0];
  }

  return chain;
}

function createEvolutionStage(evo, index, totalLength) {
  const pokemonId = getIdFromUrl(evo.url);
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

  // Arrow between stages (but not after the last one)
  const arrow =
    index < totalLength - 1 ? '<div class="evolution-arrow">→</div>' : "";

  return `
    <div class="evolution-item" onclick="searchEvolution('${evo.name}')">
      <img src="${imageUrl}" 
           alt="${evo.name}" 
           class="evolution-img">
      <div class="evolution-name">${evo.name}</div>
    </div>
    ${arrow}
  `;
}

function getIdFromUrl(url) {
  const parts = url.split("/");
  // Return the ID (second-to-last element, since URL ends with "/")
  return parts[parts.length - 2];
}

function searchEvolution(name) {
  // Check if Member 1's triggerSearch function is available
  if (typeof triggerSearch === "function") {
    triggerSearch(name);
  } else {
    // Fallback: set input and trigger search manually
    const pokemonInput = document.getElementById("pokemonInput");
    if (pokemonInput) {
      pokemonInput.value = name;

      // Try to call handleSearch from Member 1's module
      if (typeof handleSearch === "function") {
        handleSearch();
      }
    }
  }

  // Scroll to top to see results
  if (typeof scrollToTop === "function") {
    scrollToTop();
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function getCurrentEvolutionChain() {
  return evolutionDisplay.classList.contains("hidden") ? null : evolutionDisplay;
}
