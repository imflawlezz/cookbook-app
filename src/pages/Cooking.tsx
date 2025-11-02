import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonBadge,
} from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import { checkmarkCircle, checkmarkCircleOutline } from 'ionicons/icons';
import { Recipe, ShoppingItem } from '../types/Recipe';
import { recipeService } from '../services/recipeService';
import './Cooking.css';

interface CookingStep {
  number: number;
  text: string;
  completed: boolean;
  timerMinutes?: number;
  timerActive?: boolean;
  timerRemaining?: number;
}

const Cooking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [steps, setSteps] = useState<CookingStep[]>([]);
  const history = useHistory();

  useEffect(() => {
    loadRecipe();
  }, [id]);

  const loadRecipe = () => {
    const foundRecipe = recipeService.getRecipeById(id);
    if (foundRecipe) {
      setRecipe(foundRecipe);
      
      // Parse ingredients into shopping list
      const items = foundRecipe.ingredients.split('\n').filter(line => line.trim()).map((item, index) => ({
        id: `item-${index}`,
        name: item.trim(),
        checked: false,
      }));
      setShoppingList(items);

      // Parse instructions into steps
      const instructionSteps = foundRecipe.instructions.split('\n').filter(line => line.trim()).map((step, index) => ({
        number: index + 1,
        text: step.trim(),
        completed: false,
      }));
      setSteps(instructionSteps);
    } else {
      history.push('/tabs/recipes');
    }
  };

  const toggleShoppingItem = (itemId: string) => {
    setShoppingList(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const toggleStep = (stepNumber: number) => {
    setSteps(prev => 
      prev.map(step => 
        step.number === stepNumber ? { ...step, completed: !step.completed } : step
      )
    );
  };

  const allIngredientsChecked = shoppingList.every(item => item.checked);
  const completedSteps = steps.filter(step => step.completed).length;
  const totalSteps = steps.length;

  if (!recipe) {
    return null;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/recipe/${id}`} />
          </IonButtons>
          <IonTitle>Cooking: {recipe.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* Shopping List Section */}
        <IonCard>
          <IonCardHeader>
            <div className="card-header-with-badge">
              <IonCardTitle>Shopping List</IonCardTitle>
              {allIngredientsChecked && (
                <IonBadge color="success">
                  <IonIcon icon={checkmarkCircle} /> Complete
                </IonBadge>
              )}
            </div>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              {shoppingList.map((item) => (
                <IonItem key={item.id}>
                  <IonCheckbox
                    slot="start"
                    checked={item.checked}
                    onIonChange={() => toggleShoppingItem(item.id)}
                  />
                  <IonLabel className={item.checked ? 'checked-item' : ''}>
                    {item.name}
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* Instructions Section */}
        <IonCard>
          <IonCardHeader>
            <div className="card-header-with-badge">
              <IonCardTitle>Instructions</IonCardTitle>
              <IonBadge color="primary">
                {completedSteps}/{totalSteps} Steps
              </IonBadge>
            </div>
          </IonCardHeader>
          <IonCardContent>
            <div className="steps-container">
              {steps.map((step) => (
                <div 
                  key={step.number} 
                  className={`cooking-step ${step.completed ? 'completed' : ''}`}
                  onClick={() => toggleStep(step.number)}
                >
                  <div className="step-header">
                    <div className="step-number-container">
                      <span className="step-number">Step {step.number}</span>
                      <IonIcon 
                        icon={step.completed ? checkmarkCircle : checkmarkCircleOutline}
                        className="step-check-icon"
                        color={step.completed ? 'success' : 'medium'}
                      />
                    </div>
                  </div>
                  <p className="step-text">{step.text}</p>
                </div>
              ))}
            </div>
          </IonCardContent>
        </IonCard>

        {completedSteps === totalSteps && totalSteps > 0 && (
          <div className="completion-message">
            <IonCard color="success">
              <IonCardContent>
                <h2>🎉 Recipe Complete!</h2>
                <p>Enjoy your {recipe.name}!</p>
              </IonCardContent>
            </IonCard>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Cooking;
