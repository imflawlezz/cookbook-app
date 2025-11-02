export interface Recipe {
  id: string;
  name: string;
  ingredients: string;
  instructions: string;
  imageUrl: string;
  isFavorite: boolean;
  steps?: RecipeStep[];
  createdAt: number;
}

export interface RecipeStep {
  stepNumber: number;
  instruction: string;
  timerMinutes?: number;
  completed?: boolean;
}

export interface ShoppingItem {
  id: string;
  name: string;
  checked: boolean;
}
