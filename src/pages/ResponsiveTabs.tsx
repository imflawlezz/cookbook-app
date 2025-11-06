import React from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import {
    IonRouterOutlet,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonItem,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonPage,
    IonImg,
} from '@ionic/react';
import { book, heart, add } from 'ionicons/icons';
import Recipes from './Recipes';
import Favorites from './Favorites';
import AddRecipe from './AddRecipe';
import './ResponsiveTabs.css';

const ResponsiveTabs: React.FC = () => {
    const location = useLocation();

    const items = [
        { title: 'Recipes', icon: book, href: '/tabs/recipes', tab: 'recipes' },
        { title: 'Add Recipe', icon: add, href: '/tabs/add', tab: 'add' },
        { title: 'Favorites', icon: heart, href: '/tabs/favorites', tab: 'favorites' },
    ];

    return (
        <IonSplitPane contentId="main-content" when="(min-width: 1024px)">
            <IonMenu contentId="main-content" type="overlay">
                <IonHeader>
                    <IonToolbar color="primary">
                        <div className="menu-header">
                            <IonImg src="/assets/logo.png" alt="CookBook logo" className="menu-logo" />
                            <IonTitle className="menu-title">CookBook</IonTitle>
                        </div>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <IonList>
                        {items.map((item) => (
                            <IonItem
                                key={item.href}
                                button
                                routerLink={item.href}
                                routerDirection="none"
                                className={location.pathname === item.href ? 'menu-active' : ''}
                            >
                                <IonIcon icon={item.icon} slot="start" />
                                <IonLabel>{item.title}</IonLabel>
                            </IonItem>
                        ))}
                    </IonList>
                </IonContent>
            </IonMenu>

            <IonPage id="main-content">
                <IonTabs>
                    <IonRouterOutlet id="main-content">
                        <Route exact path="/tabs/recipes" component={Recipes} />
                        <Route exact path="/tabs/add" component={AddRecipe} />
                        <Route exact path="/tabs/favorites" component={Favorites} />
                        <Route exact path="/tabs">
                            <Redirect to="/tabs/recipes" />
                        </Route>
                    </IonRouterOutlet>

                    <IonTabBar slot="bottom" className="tabbar-desktop-hidden">
                        {items.map((item) => (
                            <IonTabButton
                                key={item.href}
                                tab={item.tab}
                                href={item.href}
                                className={location.pathname === item.href ? 'tab-active' : ''}
                            >
                                <IonIcon icon={item.icon} />
                                <IonLabel>{item.title}</IonLabel>
                            </IonTabButton>
                        ))}
                    </IonTabBar>
                </IonTabs>
            </IonPage>
        </IonSplitPane>
    );
};

export default ResponsiveTabs;
