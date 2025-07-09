// src/utils/index.js

export async function fetchRecipes({ query, limit }) {
  if (!query) {
    const promises = Array.from({ length: limit }, () =>
      fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(res => res.json())
    );
    const results = await Promise.all(promises);
    return results.map(r => r.meals[0]);
  }

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  const response = await fetch(url);
  const data = await response.json();
  return data?.meals || [];
}

export async function fetchRecipe(id) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.meals ? data.meals[0] : null;
}
