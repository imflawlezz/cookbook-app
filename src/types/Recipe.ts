export interface Recipe {
  id: string;
  name: string;
  ingredients: string;
  instructions: string;
  imageUrl: string;
  isFavorite: boolean;
  createdAt: number;
}

export interface ShoppingItem {
  id: string;
  name: string;
  checked: boolean;
}
