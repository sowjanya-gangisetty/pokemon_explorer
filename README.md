Pokémon Explorer is a *single-page web application* built with *HTML, CSS, and vanilla JavaScript* that allows users to search, explore, and favorite Pokémon using live data from the *PokéAPI*.

All application logic, styling, and structure are contained in *one HTML file*, making it easy to run, understand, and modify.

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
