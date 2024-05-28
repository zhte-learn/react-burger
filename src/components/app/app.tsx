import React from 'react';
import BurgerIngredient from "../../utils/ingredient-interface";
import styles from './app.module.css';
import AppHeader from '../header/header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from '../modal/modal';
import Loader from '../loader/loader';
import order from '../../utils/order';
import OrderDetails from '../order-details/order-details';

import { getIngredients } from '../../services/ingredients/actions';
//import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
//import { IngredientState } from '../../utils/ingredient-state';

const url = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [clickedIngredient, setClickedIngredient] = React.useState<BurgerIngredient | null>(null);
  const orderNumber = "034536";

  //const [ingredients, setIngredients] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const { ingredients } = useAppSelector(state => state.ingredients);
  const dispatch = useAppDispatch();

  function handleIngredientClick(ingredient: BurgerIngredient) {
    setClickedIngredient(ingredient);
    setIsModalOpen(true);
  }

  function handleMakeOrderClick() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setClickedIngredient(null);
    setIsModalOpen(false);
  }
  
  

  React.useEffect(() => {
    dispatch(getIngredients(url))
    //setError(null);
    //setIsLoading(true);
  }, []);

  return (  
    <>
      <AppHeader />

      {error 
        ? (
            <>
              <div>Что-то пошло не так</div>
              <div>{error}</div> 
            </>
          ) : isLoading ? (
              <Loader />
              ) : ingredients && ingredients.length ? (
                <main>
                  <div className={ styles.mainContainer }>
                    <BurgerIngredients 
                      ingredients = { ingredients }
                      onIngredientClick={ handleIngredientClick }
                    />
                    <BurgerConstructor 
                      ingredients = { order }
                      onIngredientClick={ handleIngredientClick }
                      onMakeOrderClick={ handleMakeOrderClick }
                    />
                  </div>
                </main>
                ) 
        : (<p>No ingredients...</p>)
      }
      
      {isModalOpen && (
        clickedIngredient 
        ? (
          <Modal 
            ingredient={ clickedIngredient } 
            onClose={ closeModal }
            orderNumber={ "" }
            title={"Детали ингредиента"}>
              <IngredientDetails 
                image={clickedIngredient.image_large}
                name={clickedIngredient.name}
                fat={clickedIngredient.fat}
                carbohydrates={clickedIngredient.carbohydrates}
                calories={clickedIngredient.calories}
                proteins={clickedIngredient.proteins}
              />
          </Modal>) 
        : (
          <Modal 
            ingredient={ null } 
            onClose={ closeModal }
            orderNumber={ orderNumber }
            title={""}>
              <OrderDetails orderNumber={orderNumber}/>
          </Modal>)
      )}  
    </>
  );
}

export default App;


/*function getIngredients(link: string) {
    fetch(link)
      .then(res => {
        if(!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then(data => {
        setIngredients(data.data);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };*/