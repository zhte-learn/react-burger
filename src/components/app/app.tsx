import React from 'react';
/*import data from '../../utils/data';*/
import BurgerIngredient from "../../utils/ingredient-interface";
import styles from './app.module.css';
import AppHeader from '../header/header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import ModalOverlay from '../modal-overlay/modal-overlay';
import Modal from '../modal/modal';
import Loader from '../loader/loader';

const url = "https://norma.nomoreparties.space/api/ingredients";


function App() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [clickedIngredient, setClickedIngredient] = React.useState<BurgerIngredient | null>(null);
  const orderNumber = "034536";

  const [ingredients, setIngredients] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);


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
  
  function getIngredients(link: string) {
    fetch(link)
      .then(res => {
        if(!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then(data => {
        setIngredients(data.data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    setError(null);
    setIsLoading(true);
    getIngredients(url);
  }, []);

  const order = [
    {
      _id:'60666c42cc7b410027a1a9b1', name:'Краторная булка N-200i', type:'bun',
      proteins:80, fat:24, carbohydrates:53, calories:420,
      price:1255, image:'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile:'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large:'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v:0
    },
    {
      _id:'60666c42cc7b410027a1a9b5',
      name:"Говяжий метеорит (отбивная)",
      type:"main",
      proteins:800,
      fat:800,
      carbohydrates:300,
      calories:2674,
      price:3000,
      image:"https://code.s3.yandex.net/react/code/meat-04.png",
      image_mobile:"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
      image_large:"https://code.s3.yandex.net/react/code/meat-04-large.png",
      __v:0
    },
    {
      _id:"60666c42cc7b410027a1a9b9",
      name:"Соус традиционный галактический",
      type:"sauce",
      proteins:42,
      fat:24,
      carbohydrates:42,
      calories:99,
      price:15,
      image:"https://code.s3.yandex.net/react/code/sauce-03.png",
      image_mobile:"https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
      image_large:"https://code.s3.yandex.net/react/code/sauce-03-large.png",
      __v:0
    },
    {
      _id:"60666c42cc7b410027a1a9bc",
      name:"Плоды Фалленианского дерева",
      type:"main",
      proteins:20,
      fat:5,
      carbohydrates:55,
      calories:77,
      price:874,
      image:"https://code.s3.yandex.net/react/code/sp_1.png",
      image_mobile:"https://code.s3.yandex.net/react/code/sp_1-mobile.png",
      image_large:"https://code.s3.yandex.net/react/code/sp_1-large.png",
      __v:0
    },
    {
      _id:"60666c42cc7b410027a1a9bb",
      name:"Хрустящие минеральные кольца",
      type:"main",
      proteins:808,
      fat:689,
      carbohydrates:609,
      calories:986,
      price:300,
      image:"https://code.s3.yandex.net/react/code/mineral_rings.png",
      image_mobile:"https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
      image_large:"https://code.s3.yandex.net/react/code/mineral_rings-large.png",
      __v:0
    },
    {
      _id:"60666c42cc7b410027a1a9ba",
      name:"Соус с шипами Антарианского плоскоходца",
      type:"sauce",
      proteins:101,
      fat:99,
      carbohydrates:100,
      calories:100,
      price:88,
      image:"https://code.s3.yandex.net/react/code/sauce-01.png",
      image_mobile:"https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
      image_large:"https://code.s3.yandex.net/react/code/sauce-01-large.png",
      __v:0
    },
  ];

  return (  
    <>
      <AppHeader />

      {error ? (
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
            ) : (
              <p>No ingredients...</p>
            )
      }
      
      {isModalOpen &&
        <ModalOverlay onClose={ closeModal }>
          <Modal 
            ingredient={ clickedIngredient } 
            onClose={ closeModal }
            orderNumber={ orderNumber }
          />
        </ModalOverlay>
      }
        
    </>
    
  );
}

export default App;



/*<div className={ styles.page }>
        {error ? (
          <div>Что-то пошло не так</div>
          <div>{error.message}</div>

        ) : isLoading ? (
          <div>Поиск...</div>
        )
        ingredients && ingredients.length ? (
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
        }*/