import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonRefresher,
  IonRefresherContent,
  IonGrid,
  IonRow,
  IonCol,
  RefresherEventDetail,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import { Recipe } from '../types/Recipe';
import { recipeService } from '../services/recipeService';
import './Recipes.css';

const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = () => {
    const allRecipes = recipeService.getAllRecipes();
    setRecipes(allRecipes);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      loadRecipes();
    } else {
      const filtered = recipeService.searchRecipes(query);
      setRecipes(filtered);
    }
  };

  const handleToggleFavorite = (id: string) => {
    recipeService.toggleFavorite(id);
    loadRecipes();
  };

  const handleRecipeClick = (id: string) => {
    history.push(`/recipe/${id}`);
  };

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    loadRecipes();
    event.detail.complete();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>All Recipes</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            value={searchQuery}
            onIonInput={(e) => handleSearch(e.detail.value!)}
            placeholder="Search recipes..."
            animated
          />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        {recipes.length === 0 ? (
          <div className="empty-state">
            <p>No recipes found. Add your first recipe!</p>
          </div>
        ) : (
          <IonGrid>
            <IonRow>
              {recipes.map((recipe) => (
                <IonCol size="12" sizeMd="6" sizeLg="4" key={recipe.id}>
                  <RecipeCard
                    recipe={recipe}
                    onToggleFavorite={handleToggleFavorite}
                    onClick={handleRecipeClick}
                  />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Recipes;
