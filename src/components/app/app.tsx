import React from 'react';
import { DndProvider } from 'react-dnd';
import styles from './app.module.css';
import AppHeader from '../header/header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from '../modal/modal';
import Loader from '../loader/loader';
import OrderDetails from '../order-details/order-details';

import { selectIngredient } from '../../services/selected-ingredient/actions';
import { getIngredients } from '../../services/ingredients/actions';
import { resetOrder } from '../../services/order/actions';
import { resetConstructor } from '../../services/constructor/actions';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const dispatch = useAppDispatch();
  const { ingredients, ingredientsLoading, ingredientsRequestFailed, errorMessage } = useAppSelector(state => state.ingredients);
  const { selectedIngredient } = useAppSelector(state => state.selectedIngredient);
  const { orderNumber, orderRequestFailed, orderLoading, orderErrorMessage } = useAppSelector(state => state.order);
  
  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    dispatch(selectIngredient(null));
    dispatch(resetOrder());
    dispatch(resetConstructor());
  }
  
  React.useEffect(() => {
    dispatch(getIngredients());
  }, []);

  return (  
    <>
      <AppHeader />
      { ingredientsRequestFailed 
        ? (
            <>
              <div>Что-то пошло не так</div>
              <div>{ errorMessage }</div>
            </>
          ) : ingredientsLoading ? (
              <Loader />
              ) : ingredients && ingredients.length ? (
                <main>
                  <DndProvider backend={HTML5Backend}>
                    <div className={ styles.mainContainer }>
                      <BurgerIngredients 
                        ingredients = { ingredients }
                        onIngredientClick={ openModal }
                      />
                      <BurgerConstructor 
                        onOrderClick={ openModal }
                      />                                        
                    </div>
                  </DndProvider>
                </main>
                ) 
        : (<p>No ingredients...</p>)
      }
      
      {isModalOpen && (
        selectedIngredient 
        ? (
          <Modal 
            ingredient={selectedIngredient} 
            onClose={closeModal}
            title={"Детали ингредиента"}>  
              <IngredientDetails 
                image={selectedIngredient.image_large}
                name={selectedIngredient.name}
                fat={selectedIngredient.fat}
                carbohydrates={selectedIngredient.carbohydrates}
                calories={selectedIngredient.calories}
                proteins={selectedIngredient.proteins}
              />
          </Modal>) 
        : (
          <Modal 
            ingredient={null} 
            onClose={closeModal}
            title={""}>
              {orderRequestFailed ?
              (
                <>
                  <div>Что-то пошло не так</div>
                  <div>{ orderErrorMessage }</div>
                </>
              ) : orderLoading ? (
                <Loader />
              ) : (
                <OrderDetails orderNumber={orderNumber}/>
              )
            }
          </Modal>)
      )}
    </>
  );
}

export default App;
