import React from 'react';
import BurgerIngredient from "../../utils/ingredient-interface";
import styles from './app.module.css';
import AppHeader from '../header/header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from '../modal/modal';
import Loader from '../loader/loader';
//import order from '../../utils/order';
import OrderDetails from '../order-details/order-details';

import { getIngredients } from '../../services/ingredients/actions';
//import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
//import { IngredientState } from '../../utils/ingredient-state';


function App() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  //const [clickedIngredient, setClickedIngredient] = React.useState<BurgerIngredient | null>(null);
  const orderNumber = "034536";
  const order: BurgerIngredient[] = [];
  order[0] = {
    "_id":"60666c42cc7b410027a1a9b2",
     "name":"Флюоресцентная булка R2-D3",
     "type":"bun",
     "proteins":44,
     "fat":26,
     "carbohydrates":85,
     "calories":643,
     "price":988,
     "image":"https://code.s3.yandex.net/react/code/bun-01.png",
     "image_mobile":"https://code.s3.yandex.net/react/code/bun-01-mobile.png",
     "image_large":"https://code.s3.yandex.net/react/code/bun-01-large.png",
     "__v":0
  }

  const dispatch = useAppDispatch();
  const { ingredients, ingredientsLoading, ingredientsRequestFailed, errorMessage } = useAppSelector(state => state.ingredients);
  const { selectedIngredient } = useAppSelector(state => state.selectedIngredient);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
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
                  <div className={ styles.mainContainer }>
                    <BurgerIngredients 
                      ingredients = { ingredients }
                      onIngredientClick={ openModal }
                    />

                    {
                      //<BurgerConstructor 
                      //  ingredients = { order }
                      //  onMakeOrderClick={ openModal }
                      ///>
                    }
                    
                  </div>
                </main>
                ) 
        : (<p>No ingredients...</p>)
      }
      
      
      {isModalOpen && (
        selectedIngredient 
        ? (
          <Modal 
            ingredient={ selectedIngredient } 
            onClose={ closeModal }
            orderNumber={ "" }
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