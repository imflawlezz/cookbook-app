import { Recipe } from '../types/Recipe';
import { sampleRecipes } from '../data/sampleRecipes';

const RECIPES_KEY = 'cookbook_recipes';

export const recipeService = {
  getAllRecipes(): Recipe[] {
    const recipes = localStorage.getItem(RECIPES_KEY);
    return recipes ? JSON.parse(recipes) : [];
  },

  getRecipeById(id: string): Recipe | undefined {
    const recipes = this.getAllRecipes();
    return recipes.find(recipe => recipe.id === id);
  },

  addRecipe(recipe: Omit<Recipe, 'id' | 'createdAt'>): Recipe {
    const recipes = this.getAllRecipes();
    const newRecipe: Recipe = {
      ...recipe,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };
    recipes.push(newRecipe);
    localStorage.setItem(RECIPES_KEY, JSON.stringify(recipes));
    return newRecipe;
  },

  updateRecipe(id: string, updates: Partial<Recipe>): Recipe | null {
    const recipes = this.getAllRecipes();
    const index = recipes.findIndex(recipe => recipe.id === id);
    if (index === -1) return null;
    
    recipes[index] = { ...recipes[index], ...updates };
    localStorage.setItem(RECIPES_KEY, JSON.stringify(recipes));
    return recipes[index];
  },

  deleteRecipe(id: string): boolean {
    const recipes = this.getAllRecipes();
    const filtered = recipes.filter(recipe => recipe.id !== id);
    if (filtered.length === recipes.length) return false;
    
    localStorage.setItem(RECIPES_KEY, JSON.stringify(filtered));
    return true;
  },

  toggleFavorite(id: string): Recipe | null {
    const recipe = this.getRecipeById(id);
    if (!recipe) return null;
    
    return this.updateRecipe(id, { isFavorite: !recipe.isFavorite });
  },

  getFavorites(): Recipe[] {
    return this.getAllRecipes().filter(recipe => recipe.isFavorite);
  },

  searchRecipes(query: string): Recipe[] {
    const recipes = this.getAllRecipes();
    const lowerQuery = query.toLowerCase();
    return recipes.filter(recipe => 
      recipe.name.toLowerCase().includes(lowerQuery)
    );
  },

  loadSampleRecipes(): void {
    const existingRecipes = this.getAllRecipes();
    const baseTime = Date.now();
    const newRecipes: Recipe[] = sampleRecipes.map((recipe, index) => ({
      ...recipe,
      id: (baseTime + index).toString() + Math.random().toString(36).substr(2, 9),
      createdAt: baseTime + index,
      isFavorite: false,
    }));

    const allRecipes = [...existingRecipes, ...newRecipes];
    localStorage.setItem(RECIPES_KEY, JSON.stringify(allRecipes));
  },
};
