import { useState, useEffect, useRef } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const lastFocusedCardRef = useRef(null);

  const fetchRecipes = async (query) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchRecipes(""); // load all meals on start
  }, []);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        closeRecipe();
      }
      // Allow keyboard activation on focused card
      if (!selectedRecipe && (e.key === "Enter" || e.key === " ")) {
        const target = document.activeElement;
        if (target && target.dataset && target.dataset.mealid) {
          const meal = recipes.find(r => r.idMeal === target.dataset.mealid);
          if (meal) openRecipe(meal, target);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedRecipe, recipes]);

  const openRecipe = (recipe, sourceEl) => {
    lastFocusedCardRef.current = sourceEl || null;
    setSelectedRecipe(recipe);
    // Optional: prevent background scroll
    document.body.style.overflow = "hidden";
  };

  const closeRecipe = () => {
    if (!selectedRecipe) return;
    setSelectedRecipe(null);
    document.body.style.overflow = "";
    // Return focus to the last focused card
    if (lastFocusedCardRef.current) {
      lastFocusedCardRef.current.focus();
    }
  };

  return (
    <div className="app-container">
      <h1>Recipe App</h1>

      <input
        type="text"
        placeholder="Search recipes..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          fetchRecipes(e.target.value);
        }}
        className="search-input"
      />

      {loading && <p>Loading recipes...</p>}

      <div className="recipes-grid">
        {recipes.map((recipe) => {
          // create a cleaned list of ingredients:
          const ingredients = [];

          for (let i = 1; i <= 20; i++) {
            const ing = recipe[`strIngredient${i}`];
            const measure = recipe[`strMeasure${i}`];

            // Only add if ingredient is not empty or null
            if (ing && ing.trim() !== "") {
              ingredients.push(`${ing} - ${measure}`);
            }
          }

          return (
            <div
              key={recipe.idMeal}
              className="card"
              role="button"
              tabIndex={0}
              data-mealid={recipe.idMeal}
              onClick={(e) => openRecipe(recipe, e.currentTarget)}
            >
              <h2>
                {recipe.strMeal}
              </h2>

              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
              />

              <p>
                <strong>Category:</strong> {recipe.strCategory}
              </p>

              <h4>Ingredients:</h4>
              <ul>
                {ingredients.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h4>Instructions:</h4>
              <p>
                {recipe.strInstructions}
              </p>
            </div>
          );
        })}
      </div>

      {selectedRecipe && (
        <div className="overlay" role="dialog" aria-modal="true">
          <div className="overlay-backdrop" onClick={closeRecipe} />
          <div className="overlay-content">
            <button className="overlay-close" onClick={closeRecipe} aria-label="Close">×</button>
            <h2 className="overlay-title">{selectedRecipe.strMeal}</h2>
            <img
              className="overlay-image"
              src={selectedRecipe.strMealThumb}
              alt={selectedRecipe.strMeal}
            />
            <p><strong>Category:</strong> {selectedRecipe.strCategory}</p>
            <h4>Ingredients:</h4>
            <ul>
              {Array.from({ length: 20 }, (_, i) => i + 1)
                .map(i => {
                  const ing = selectedRecipe[`strIngredient${i}`];
                  const measure = selectedRecipe[`strMeasure${i}`];
                  return ing && ing.trim() !== "" ? `${ing} - ${measure}` : null;
                })
                .filter(Boolean)
                .map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
            </ul>
            <h4>Instructions:</h4>
            <p>{selectedRecipe.strInstructions}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
