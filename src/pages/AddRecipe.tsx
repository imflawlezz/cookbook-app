import React, { useState, useEffect } from 'react';
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
  IonButtons,
  IonBackButton,
  IonPopover,
  IonIcon,
} from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import { ellipsisVertical, library } from 'ionicons/icons';
import { recipeService } from '../services/recipeService';
import './AddRecipe.css';

const AddRecipe: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const isEditMode = !!id;
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState<Event | undefined>(undefined);
  const history = useHistory();

  useEffect(() => {
    if (isEditMode && id) {
      const recipe = recipeService.getRecipeById(id);
      if (recipe) {
        setName(recipe.name);
        setIngredients(recipe.ingredients);
        setInstructions(recipe.instructions);
        setImageUrl(recipe.imageUrl);
      } else {
        history.push('/tabs/recipes');
      }
    }
  }, [id, isEditMode, history]);

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

    if (isEditMode && id) {
      recipeService.updateRecipe(id, {
        name: name.trim(),
        ingredients: ingredients.trim(),
        instructions: instructions.trim(),
        imageUrl: imageUrl.trim() || 'https://via.placeholder.com/400x300?text=Recipe',
      });
      setToastMessage('Recipe updated successfully!');
    } else {
      recipeService.addRecipe({
        name: name.trim(),
        ingredients: ingredients.trim(),
        instructions: instructions.trim(),
        imageUrl: imageUrl.trim() || 'https://via.placeholder.com/400x300?text=Recipe',
        isFavorite: false,
      });
      setToastMessage('Recipe added successfully!');
      
      // Clear fields after successful creation
      setName('');
      setIngredients('');
      setInstructions('');
      setImageUrl('');
    }

    setShowToast(true);

    setTimeout(() => {
      if (isEditMode) {
        history.push(`/recipe/${id}`);
      } else {
        history.push('/tabs/recipes');
      }
    }, 1000);
  };

  const handleLoadSampleRecipes = () => {
    recipeService.loadSampleRecipes();
    setShowPopover(false);
    setToastMessage('Sample recipes loaded successfully!');
    setShowToast(true);
    setTimeout(() => {
      history.push('/tabs/recipes');
    }, 1500);
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    setPopoverEvent(e.nativeEvent);
    setShowPopover(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={isEditMode ? `/recipe/${id}` : '/tabs/recipes'} />
          </IonButtons>
          <IonTitle>{isEditMode ? 'Edit Recipe' : 'Add Recipe'}</IonTitle>
          {!isEditMode && (
            <IonButtons slot="end">
              <IonButton onClick={handleMenuClick}>
                <IonIcon icon={ellipsisVertical} />
              </IonButton>
            </IonButtons>
          )}
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
                {isEditMode ? 'Update Recipe' : 'Add Recipe'}
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>

        <IonPopover
          isOpen={showPopover}
          event={popoverEvent}
          onDidDismiss={() => setShowPopover(false)}
        >
          <IonContent className="ion-padding">
            <IonItem button detail={false} onClick={handleLoadSampleRecipes}>
              <IonIcon icon={library} slot="start" />
              <IonLabel>Load Sample Recipes</IonLabel>
            </IonItem>
          </IonContent>
        </IonPopover>

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
