import React, { useState, useEffect, useRef } from 'react';
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
  IonButton,
  IonIcon,
  IonBadge,
} from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import { timer, checkmarkCircle, checkmarkCircleOutline, play, pause, stop } from 'ionicons/icons';
import { Recipe, ShoppingItem } from '../types/Recipe';
import { recipeService } from '../services/recipeService';
import './Cooking.css';

interface CookingStep {
  number: number;
  text: string;
  completed: boolean;
  timerMinutes?: number;
  timerSeconds?: number;
  timerActive?: boolean;
  timerRemaining?: number;
}

const Cooking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [steps, setSteps] = useState<CookingStep[]>([]);
  const history = useHistory();
  const timerIntervals = useRef<{ [key: number]: NodeJS.Timeout }>({});
  const timerRemainingRefs = useRef<{ [key: number]: number }>({});

  useEffect(() => {
    loadRecipe();

    return () => {
      Object.values(timerIntervals.current).forEach(interval => {
        if (interval) clearInterval(interval);
      });
    };
  }, [id]);

  // Parse timestamp from text (e.g., "(3:00)" -> { minutes: 3, seconds: 0 })
  const parseTimestamp = (text: string): { minutes: number; seconds: number } | null => {
    const timestampRegex = /\(?(\d{1,2}):(\d{2})\)?/;
    const match = text.match(timestampRegex);
    
    if (match) {
      const minutes = parseInt(match[1], 10);
      const seconds = parseInt(match[2], 10);
      if (minutes >= 0 && minutes <= 59 && seconds >= 0 && seconds <= 59) {
        return { minutes, seconds };
      }
    }
    return null;
  };

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

      // Parse instructions into steps with timestamp extraction
      const instructionSteps = foundRecipe.instructions.split('\n').filter(line => line.trim()).map((step, index) => {
        const stepText = step.trim();
        const timestamp = parseTimestamp(stepText);
        
        const stepData: CookingStep = {
          number: index + 1,
          text: stepText,
          completed: false,
        };
        
        if (timestamp) {
          stepData.timerMinutes = timestamp.minutes;
          stepData.timerSeconds = timestamp.seconds;
          stepData.timerRemaining = timestamp.minutes * 60 + timestamp.seconds;
        }
        
        return stepData;
      });
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
    setSteps(prev => {
      const updatedSteps = prev.map(step => 
        step.number === stepNumber ? { ...step, completed: !step.completed } : step
      );
      
      // If a step is being completed, stop its timer if it's running
      const completingStep = prev.find(s => s.number === stepNumber);
      if (completingStep && !completingStep.completed && completingStep.timerActive) {
        if (timerIntervals.current[stepNumber]) {
          clearInterval(timerIntervals.current[stepNumber]);
          delete timerIntervals.current[stepNumber];
        }
        // Mark timer as inactive
        return updatedSteps.map(s => 
          s.number === stepNumber ? { ...s, timerActive: false } : s
        );
      }
      
      return updatedSteps;
    });
  };

  const startTimer = (stepNumber: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSteps(prev => {
      const updatedSteps = prev.map(step => {
        if (step.number === stepNumber && step.timerRemaining !== undefined && step.timerRemaining > 0) {
          if (!step.timerActive) {
            if (timerIntervals.current[stepNumber]) {
              clearInterval(timerIntervals.current[stepNumber]);
            }

            timerRemainingRefs.current[stepNumber] = step.timerRemaining;
            
            const interval = setInterval(() => {
              const currentRemaining = timerRemainingRefs.current[stepNumber] || 0;
              
              if (currentRemaining <= 1) {
                if (timerIntervals.current[stepNumber]) {
                  clearInterval(timerIntervals.current[stepNumber]);
                  delete timerIntervals.current[stepNumber];
                  delete timerRemainingRefs.current[stepNumber];
                }
                setSteps(currentSteps => {
                  return currentSteps.map(s => {
                    if (s.number === stepNumber) {
                      return { ...s, timerActive: false, timerRemaining: 0 };
                    }
                    return s;
                  });
                });
              } else {
                const newRemaining = currentRemaining - 1;
                timerRemainingRefs.current[stepNumber] = newRemaining;
                
                setSteps(currentSteps => {
                  return currentSteps.map(s => {
                    if (s.number === stepNumber) {
                      return { ...s, timerRemaining: newRemaining };
                    }
                    return s;
                  });
                });
              }
            }, 1000);
            
            timerIntervals.current[stepNumber] = interval;
            return { ...step, timerActive: true };
          }
        }
        return step;
      });
      return updatedSteps;
    });
  };

  const pauseTimer = (stepNumber: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (timerIntervals.current[stepNumber]) {
      clearInterval(timerIntervals.current[stepNumber]);
      delete timerIntervals.current[stepNumber];
    }
    setSteps(prev => {
      return prev.map(step => {
        if (step.number === stepNumber) {
          if (step.timerRemaining !== undefined) {
            timerRemainingRefs.current[stepNumber] = step.timerRemaining;
          }
          return { ...step, timerActive: false };
        }
        return step;
      });
    });
  };

  const stopTimer = (stepNumber: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (timerIntervals.current[stepNumber]) {
      clearInterval(timerIntervals.current[stepNumber]);
      delete timerIntervals.current[stepNumber];
    }
    setSteps(prev => 
      prev.map(step => {
        if (step.number === stepNumber && step.timerMinutes !== undefined && step.timerSeconds !== undefined) {
          const resetTime = step.timerMinutes * 60 + step.timerSeconds;
          timerRemainingRefs.current[stepNumber] = resetTime;
          return {
            ...step,
            timerActive: false,
            timerRemaining: resetTime,
          };
        }
        return step;
      })
    );
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const allIngredientsChecked = shoppingList.every(item => item.checked);
  const completedSteps = steps.filter(step => step.completed).length;
  const totalSteps = steps.length;
  
  // Find the current step (first incomplete step)
  const currentStep = steps.find(step => !step.completed);
  const currentStepNumber = currentStep?.number;

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
                  {step.timerRemaining !== undefined && step.number === currentStepNumber && (
                    <div className="timer-container" onClick={(e) => e.stopPropagation()}>
                      <div className="timer-display">
                        <IonIcon icon={timer} className="timer-icon" />
                        <span className={`timer-time ${step.timerRemaining === 0 ? 'timer-finished' : ''}`}>
                          {formatTime(step.timerRemaining)}
                        </span>
                      </div>
                      <div className="timer-controls">
                        {!step.timerActive ? (
                          <IonButton
                            size="small"
                            color="primary"
                            onClick={(e) => startTimer(step.number, e)}
                            disabled={step.timerRemaining === 0}
                          >
                            <IonIcon icon={play} slot="start" />
                            Start
                          </IonButton>
                        ) : (
                          <>
                            <IonButton
                              size="small"
                              color="warning"
                              onClick={(e) => pauseTimer(step.number, e)}
                            >
                              <IonIcon icon={pause} slot="start" />
                              Pause
                            </IonButton>
                            <IonButton
                              size="small"
                              color="medium"
                              onClick={(e) => stopTimer(step.number, e)}
                            >
                              <IonIcon icon={stop} slot="start" />
                              Stop
                            </IonButton>
                          </>
                        )}
                      </div>
                      {step.timerRemaining === 0 && step.timerActive === false && (
                        <div className="timer-notification">⏰ Timer finished!</div>
                      )}
                    </div>
                  )}
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
