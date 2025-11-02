import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonActionSheet,
} from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import { heart, heartOutline, create, trash, restaurant } from 'ionicons/icons';
import { Recipe } from '../types/Recipe';
import { recipeService } from '../services/recipeService';
import './ViewRecipe.css';

const ViewRecipe: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const history = useHistory();

  useEffect(() => {
    loadRecipe();
  }, [id]);

  const loadRecipe = () => {
    const foundRecipe = recipeService.getRecipeById(id);
    if (foundRecipe) {
      setRecipe(foundRecipe);
    } else {
      history.push('/tabs/recipes');
    }
  };

  const handleToggleFavorite = () => {
    recipeService.toggleFavorite(id);
    loadRecipe();
  };

  const handleDelete = () => {
    recipeService.deleteRecipe(id);
    history.push('/tabs/recipes');
  };

  const handleCook = () => {
    history.push(`/cooking/${id}`);
  };

  const handleEdit = () => {
    history.push(`/edit-recipe/${id}`);
  };

  if (!recipe) {
    return null;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/recipes" />
          </IonButtons>
          <IonTitle>{recipe.name}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleToggleFavorite}>
              <IonIcon 
                icon={recipe.isFavorite ? heart : heartOutline} 
                color={recipe.isFavorite ? 'danger' : undefined}
              />
            </IonButton>
            <IonButton onClick={() => setShowActionSheet(true)}>
              <IonIcon icon={create} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {recipe.imageUrl && (
          <div className="recipe-image">
            <img src={recipe.imageUrl} alt={recipe.name} />
          </div>
        )}

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Ingredients</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div className="recipe-text">
              {recipe.ingredients.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Instructions</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div className="recipe-text">
              {recipe.instructions.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </IonCardContent>
        </IonCard>

        <div className="cook-button-container">
          <IonButton expand="block" size="large" onClick={handleCook}>
            <IonIcon slot="start" icon={restaurant} />
            Start Cooking
          </IonButton>
        </div>

        <IonActionSheet
          isOpen={showActionSheet}
          onDidDismiss={() => setShowActionSheet(false)}
          buttons={[
            {
              text: 'Edit',
              icon: create,
              handler: handleEdit,
            },
            {
              text: 'Delete',
              role: 'destructive',
              icon: trash,
              handler: handleDelete,
            },
            {
              text: 'Cancel',
              role: 'cancel',
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default ViewRecipe;
