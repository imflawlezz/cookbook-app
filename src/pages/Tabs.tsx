import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import { book, heart, add } from 'ionicons/icons';
import Recipes from './Recipes';
import Favorites from './Favorites';
import AddRecipe from './AddRecipe';

const Tabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/recipes">
          <Recipes />
        </Route>
        <Route exact path="/tabs/add">
          <AddRecipe />
        </Route>
        <Route exact path="/tabs/favorites">
          <Favorites />
        </Route>
        <Route exact path="/tabs">
          <Redirect to="/tabs/recipes" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="recipes" href="/tabs/recipes">
          <IonIcon icon={book} />
          <IonLabel>Recipes</IonLabel>
        </IonTabButton>
        <IonTabButton tab="add" href="/tabs/add">
          <IonIcon icon={add} />
          <IonLabel>Add Recipe</IonLabel>
        </IonTabButton>
        <IonTabButton tab="favorites" href="/tabs/favorites">
          <IonIcon icon={heart} />
          <IonLabel>Favorites</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
