import { api } from "./api";

async function getRecipes() {
  return await api.get(`/api/recipes`);
}

async function getRecipeById(id: string) {
  return await api.get(`/api/recipes/${id}`);
}

// Add search function
async function searchRecipes(query: string) {
  return await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
}

export { getRecipes, getRecipeById, searchRecipes };