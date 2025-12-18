Pokémon Explorer is a *single-page web application* built with *HTML, CSS, and vanilla JavaScript* that allows users to search, explore, and favorite Pokémon using live data from the *PokéAPI*.

All application logic, styling, and structure are contained in *one HTML file*, making it easy to run, understand, and modify.

** Live Demo: **

GitHub Link : https://github.com/sowjanya-gangisetty/pokemon_explorer.git

Netlify Live Link :  pokemonexplorerproject.netlify.app

The project was developed as a **team collaboration**, with the application logic divided into two major functional parts:

- **Search & Pokémon Details**
- **Evolution Chain & Favorites System**

---

## 👥 Team Members & Contributions

### 👩‍💻 Anuhya

**Role:** Search & Pokémon Information Module

Anuhya was responsible for implementing the **search functionality and Pokémon data display**, including:

- 🔍 Pokémon search by **name or ID**
- 🎲 Random Pokémon generator
- ✨ Autocomplete search suggestions
- 🌐 API integration with PokéAPI
- 📊 Display of Pokémon details:
- Name, ID, and official artwork
- Types with dynamic styling
- Description (flavor text)
- Height, weight, base experience, habitat
- Abilities
- Base stats
- ⏳ Loading spinner and error handling
- 🧠 Fetching and managing Pokémon & species data

---

### 👩‍💻 Sowjanya

**Role:** Evolution Chain & Favorites Module

Sowjnya handled the **evolution logic and favorites management**, including:

- 🔄 Evolution chain implementation:
- Fetching evolution chain data
- Extracting and displaying evolution stages
- Clickable evolution cards for navigation
- ⭐ Favorites system:
- Add/remove Pokémon from favorites
- Persistent storage using `localStorage`
- Favorites grid display
- Remove favorites functionality
- 🔁 Navigation between favorites and search results
- 💾 State persistence across page reloads

---

## 📌 Overview

This project demonstrates:
- API integration using fetch
- Dynamic DOM manipulation
- Autocomplete search functionality
- Evolution chain traversal
- Persistent state using localStorage
- Responsive UI design with modern CSS

---

## 🚀 Features

- 🔍 *Search Pokémon* by name or ID
- 🎲 *Random Pokémon* generator
- ✨ *Autocomplete suggestions* (from 1000 Pokémon)
- 📊 *Detailed Pokémon information*
- Types
- Description (flavor text)
- Base stats
- Abilities
- Height, weight, base experience, habitat
- 🔄 *Evolution chain display*
- Click any evolution to explore it
- ⭐ *Favorites system*
- Add/remove Pokémon
- Saved using localStorage
- 📱 *Fully responsive layout*
- Desktop, tablet, and mobile support
- 🎨 *Modern UI*
- Gradients, animations, hover effects

---

## 🛠️ Technologies Used

- *HTML5* – Page structure
- *CSS3* – Styling, animations, responsive design
- *JavaScript (ES6)* – Logic, API calls, state handling
- *PokéAPI* – Pokémon data source
BASE_URL = "https://pokeapi.co/api/v2"

---
## 📂 Project Structure

pokemon-explorer/
│
├── index.html
│
├── styles/
│ ├── styles.css # Main styles
│ ├── search.css # Search section styles
│ ├── favourite.css # Favorites section styles
│ └── evolution.css # Evolution chain styles
│
└── scripts/
├── search.js # Search functionality
├── favourite.js # Favorites features
└── evolution.js # Evolution chain

## 🧠 How the Code Works

### 1️⃣ Initialization
- Loads the Pokémon list for autocomplete
- Loads saved favorites from localStorage

### 2️⃣ Search Flow
1. User enters a Pokémon name or ID
2. App fetches:
- Pokémon data
- Species data
- Evolution chain
3. Data is displayed dynamically in cards

### 3️⃣ Autocomplete
- Activates after typing 2 characters
- Filters Pokémon names from the cached list
- Displays up to 8 suggestions

### 4️⃣ Evolution Chain
- Extracts evolution stages from nested API data
- Displays each stage as a clickable card

### 5️⃣ Favorites System
- Favorites stored in localStorage
- Persistent across page reloads
- Click favorite cards to re-search Pokémon

---
📱 Responsive Design
*Fully responsive layout*
- Desktop, tablet, and mobile support
- 🎨 *Modern UI*
- Gradients, animations, hover effects

## ⭐ Favorites Storage Format

Stored in localStorage as:

```json
[
{
"id": 25,
"name": "pikachu",
"sprite": "image_url"
}
]
