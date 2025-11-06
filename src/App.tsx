import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import ResponsiveTabs from './pages/ResponsiveTabs';
import AddRecipe from './pages/AddRecipe';
import ViewRecipe from './pages/ViewRecipe';
import Cooking from './pages/Cooking';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';

import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/tabs">
          <ResponsiveTabs />
        </Route>
        <Route exact path="/add-recipe">
          <AddRecipe />
        </Route>
        <Route exact path="/edit-recipe/:id">
          <AddRecipe />
        </Route>
        <Route exact path="/recipe/:id">
          <ViewRecipe />
        </Route>
        <Route exact path="/cooking/:id">
          <Cooking />
        </Route>
        <Route exact path="/">
          <Redirect to="/tabs/recipes" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
