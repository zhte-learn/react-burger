import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './app.module.css';

import AppHeader from '../header/header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Loader from '../loader/loader';

import { getIngredients } from '../../services/ingredients/actions';
import { useAppSelector, useAppDispatch } from '../../services/hooks';

function App() {
  const dispatch = useAppDispatch();
  const { ingredients, 
          ingredientsLoading, 
          ingredientsRequestFailed, 
          ingredientsError } 
          = useAppSelector(state => state.ingredients);
  
  React.useEffect(() => {
    dispatch(getIngredients());
  }, []);

  return (  
    <>
      <AppHeader />
      {ingredientsRequestFailed 
        ? (
          <>
            <div>Что-то пошло не так</div>
            <div>{ingredientsError}</div>
          </>
          ) 
        : ingredientsLoading 
          ? <Loader />
          : ingredients && ingredients.length 
            ? (
              <main>
                <DndProvider backend={HTML5Backend}>
                  <div className={ styles.mainContainer }>
                    <BurgerIngredients ingredients = {ingredients} />
                    <BurgerConstructor />                                        
                  </div>
                </DndProvider>
              </main>
              ) 
            : <p>No ingredients...</p>
      }
    </>
  );
}

export default App;
