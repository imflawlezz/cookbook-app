import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonTextarea,
  IonItem,
  IonLabel,
  IonToast,
  IonCard,
  IonCardContent,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { recipeService } from '../services/recipeService';
import './AddRecipe.css';

const AddRecipe: React.FC = () => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const history = useHistory();

  const validateForm = (): boolean => {
    if (!name.trim()) {
      setToastMessage('Please enter a recipe name');
      setShowToast(true);
      return false;
    }
    if (!ingredients.trim()) {
      setToastMessage('Please enter ingredients');
      setShowToast(true);
      return false;
    }
    if (!instructions.trim()) {
      setToastMessage('Please enter instructions');
      setShowToast(true);
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    recipeService.addRecipe({
      name: name.trim(),
      ingredients: ingredients.trim(),
      instructions: instructions.trim(),
      imageUrl: imageUrl.trim() || 'https://via.placeholder.com/400x300?text=Recipe',
      isFavorite: false,
    });

    setToastMessage('Recipe added successfully!');
    setShowToast(true);

    setTimeout(() => {
      history.push('/tabs/recipes');
    }, 1000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Recipe</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="add-recipe-content">
        <IonCard>
          <IonCardContent>
            <IonItem>
              <IonLabel position="stacked">Recipe Name *</IonLabel>
              <IonInput
                value={name}
                onIonInput={(e) => setName(e.detail.value!)}
                placeholder="Enter recipe name"
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Ingredients *</IonLabel>
              <IonTextarea
                value={ingredients}
                onIonInput={(e) => setIngredients(e.detail.value!)}
                placeholder="List all ingredients, one per line"
                rows={6}
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Instructions *</IonLabel>
              <IonTextarea
                value={instructions}
                onIonInput={(e) => setInstructions(e.detail.value!)}
                placeholder="Step-by-step instructions"
                rows={8}
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Image URL</IonLabel>
              <IonInput
                value={imageUrl}
                onIonInput={(e) => setImageUrl(e.detail.value!)}
                placeholder="https://example.com/image.jpg"
                type="url"
              />
            </IonItem>

            <div className="button-container">
              <IonButton expand="block" onClick={handleSubmit} color="primary">
                Add Recipe
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          position="bottom"
        />
      </IonContent>
    </IonPage>
  );
};

export default AddRecipe;
