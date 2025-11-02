import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonButton } from '@ionic/react';
import { heart, heartOutline } from 'ionicons/icons';
import { Recipe } from '../types/Recipe';
import './RecipeCard.css';

interface RecipeCardProps {
  recipe: Recipe;
  onToggleFavorite: (id: string) => void;
  onClick: (id: string) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onToggleFavorite, onClick }) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(recipe.id);
  };

  return (
    <IonCard button onClick={() => onClick(recipe.id)} className="recipe-card">
      {recipe.imageUrl && (
        <div className="recipe-card-image">
          <img src={recipe.imageUrl} alt={recipe.name} />
          <IonButton 
            fill="clear" 
            className="favorite-button"
            onClick={handleFavoriteClick}
          >
            <IonIcon 
              icon={recipe.isFavorite ? heart : heartOutline} 
              color={recipe.isFavorite ? 'danger' : 'light'}
              size="large"
            />
          </IonButton>
        </div>
      )}
      <IonCardHeader>
        <IonCardTitle>{recipe.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p className="recipe-preview">
          {recipe.ingredients.substring(0, 100)}...
        </p>
      </IonCardContent>
    </IonCard>
  );
};

export default RecipeCard;
