import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import { Recipe } from '../types/Recipe';
import { recipeService } from '../services/recipeService';
import './Favorites.css';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const history = useHistory();

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const favRecipes = recipeService.getFavorites();
    setFavorites(favRecipes);
  };

  const handleToggleFavorite = (id: string) => {
    recipeService.toggleFavorite(id);
    loadFavorites();
  };

  const handleRecipeClick = (id: string) => {
    history.push(`/recipe/${id}`);
  };

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    loadFavorites();
    event.detail.complete();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Favorites</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        {favorites.length === 0 ? (
          <div className="empty-state">
            <p>No favorite recipes yet. Add some by tapping the heart icon!</p>
          </div>
        ) : (
          <IonGrid>
            <IonRow>
              {favorites.map((recipe) => (
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

export default Favorites;
