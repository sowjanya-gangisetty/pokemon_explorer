
const favoritesSection = document.getElementById("favorites-section");
const favoritesGrid = document.getElementById("favorites-grid");

loadFavorites();

function toggleFavorite(id, name, sprite) {
  let favorites = getFavorites();

  const index = favorites.findIndex((f) => f.id === id);

  if (index > -1) {
    // Remove from favorites
    favorites.splice(index, 1);
  } else {
    // Add to favorites
    favorites.push({ id, name, sprite });
  }

  // Save updated favorites
  saveFavorites(favorites);

  // Refresh the favorites display
  loadFavorites();

  // Update the favorite button if it exists on the current page
  updateFavoriteButton(id, index > -1);
}

function removeFavorite(id) {
  let favorites = getFavorites();

  // Filter out the Pokémon with this ID
  favorites = favorites.filter((f) => f.id !== id);

  // Save updated list
  saveFavorites(favorites);

  // Refresh display
  loadFavorites();
  updateFavoriteButton(id, true);
}

function updateFavoriteButton(id, wasRemoved) {
  const btn = document.querySelector(".favorite-btn");

  if (btn) {
    const isFav = isFavorite(id);

    if (isFav) {
      btn.classList.add("active");
      btn.innerHTML = "❤️ Remove from Favorites";
    } else {
      btn.classList.remove("active");
      btn.innerHTML = "🤍 Add to Favorites";
    }
  }
}

function getFavorites() {
  const stored = localStorage.getItem("pokemonFavorites");
  return stored ? JSON.parse(stored) : [];
}

function saveFavorites(favorites) {
  localStorage.setItem("pokemonFavorites", JSON.stringify(favorites));
}

function isFavorite(id) {
  return getFavorites().some((f) => f.id === id);
}

function clearAllFavorites() {
  if (confirm("Are you sure you want to remove all favorites?")) {
    saveFavorites([]);
    loadFavorites();
  }
}

function loadFavorites() {
  const favorites = getFavorites();

  // If no favorites, hide the section
  if (favorites.length === 0) {
    favoritesSection.classList.add("hidden");
    return;
  }

  // Show the favorites section
  favoritesSection.classList.remove("hidden");

  // Clear existing cards
  favoritesGrid.innerHTML = "";

  // Create a card for each favorite
  favorites.forEach((fav) => {
    const card = createFavoriteCard(fav);
    favoritesGrid.appendChild(card);
  });
}

function createFavoriteCard(fav) {
  const card = document.createElement("div");
  card.className = "favorite-card";

  card.innerHTML = `
    <img src="${fav.sprite}" alt="${fav.name}">
    <div class="favorite-card-name">${fav.name}</div>
    <div>
      #${String(fav.id).padStart(3, "0")}
    </div>
    <button class="remove-favorite" onclick="removeFavorite(${fav.id})">
      Remove
    </button>
  `;

  // Card click handler - search for this Pokémon
  card.onclick = (e) => {
    // Don't trigger if the remove button was clicked
    if (e.target.tagName !== "BUTTON") {
      searchFavoritePokemon(fav.name);
    }
  };

  return card;
}

function searchFavoritePokemon(name) {
  // Try to use Member 1's triggerSearch function
  if (typeof triggerSearch === "function") {
    triggerSearch(name);
  } else {
    // Fallback: set input manually
    const pokemonInput = document.getElementById("pokemonInput");
    if (pokemonInput) {
      pokemonInput.value = name;

      if (typeof handleSearch === "function") {
        handleSearch();
      }
    }
  }

  // Scroll to top
  if (typeof scrollToTop === "function") {
    scrollToTop();
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function scrollToFavorites() {
  const favorites = getFavorites();

  // Check if favorites exist
  if (favorites.length === 0) {
    // Show error using Member 1's function if available
    if (typeof showError === "function") {
      showError(
        "No favorites yet! Search for Pokémon and add them to favorites."
      );
    } else {
      alert("No favorites yet! Search for Pokémon and add them to favorites.");
    }
    return;
  }

  // Hide other sections
  const pokemonDisplay = document.getElementById("pokemon-display");
  const evolutionDisplay = document.getElementById("evolution-display");

  if (pokemonDisplay) pokemonDisplay.classList.add("hidden");
  if (evolutionDisplay) evolutionDisplay.classList.add("hidden");

  // Show favorites section
  favoritesSection.classList.remove("hidden");

  // Smooth scroll to favorites
  setTimeout(() => {
    favoritesSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 100);
}

function getFavoritesCount() {
  return getFavorites().length;
}

function exportFavorites() {
  const favorites = getFavorites();
  return JSON.stringify(favorites, null, 2);
}

function importFavorites(jsonString) {
  try {
    const favorites = JSON.parse(jsonString);

    if (Array.isArray(favorites)) {
      saveFavorites(favorites);
      loadFavorites();
      alert(`Successfully imported ${favorites.length} favorites!`);
    } else {
      throw new Error("Invalid format");
    }
  } catch (error) {
    alert("Error importing favorites. Please check the format.");
  }
}

function getAllFavorites() {
  return [...getFavorites()]; // Return a copy
}

function isFavoritesSectionVisible() {
  return !favoritesSection.classList.contains("hidden");
}
