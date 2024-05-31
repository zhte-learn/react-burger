import React from "react";
import ingredientsStyles from './burger-ingredients.module.css';
import IngredientsGroup from "./ingredients-group/ingredients-group";
import BurgerIngredient from "../../utils/ingredient-interface";
import { useAppSelector, useAppDispatch } from '../../services/hooks';

interface BurgerIngredientsProps {
  ingredients: BurgerIngredient[],
  onIngredientClick: () => void
}

function BurgerIngredients( props: BurgerIngredientsProps ) {
  const [activeTab, setActiveTab] = React.useState('bun');
  const containerScrollRef = React.useRef<HTMLDivElement>(null);
  const bunRef = React.useRef<HTMLDivElement>(null);
  const sauceRef = React.useRef<HTMLDivElement>(null);
  const mainRef = React.useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const ingredientsByType = React.useMemo(() => {
    return { 
      bun: getItemsByType(props.ingredients, "bun"),
      sauce: getItemsByType(props.ingredients, "sauce"),
      main: getItemsByType(props.ingredients, "main"),
    };
  }, [props.ingredients]);

  function getItemsByType(data: BurgerIngredient[], type: string) {
    return data.filter(item => item.type === type);
  }

  const handleScroll = () => {
    if (bunRef.current && sauceRef.current && mainRef.current && containerScrollRef.current) {
      const containerTop = containerScrollRef.current.getBoundingClientRect().top;
      const bunTop = bunRef.current.getBoundingClientRect().top;
      const sauceTop = sauceRef.current.getBoundingClientRect().top;
      const mainTop = mainRef.current.getBoundingClientRect().top;
      const bunHeigth = bunRef.current.getBoundingClientRect().height;
      const sauceHeight = sauceRef.current.getBoundingClientRect().height;
      const scrollTop = containerScrollRef.current.scrollTop;
      const sauceOffset = bunHeigth - scrollTop;
      const mainOffset = (sauceHeight + bunHeigth) - scrollTop;

      if(containerTop === bunTop) {
        setActiveTab('bun');
      } else if((sauceOffset < 0) && Math.abs(sauceTop - containerTop) < containerTop) {
        setActiveTab('sauce');
      } else if ((mainOffset < 0) && Math.abs(mainTop - containerTop) < containerTop){
        setActiveTab('main');
      }
    }
  };

  React.useEffect(() => {
    const content = containerScrollRef.current;
    if (content) {
      content.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (content) {
        content.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return(
    <section className={`${ingredientsStyles.container} pl-5 pr-5 mt-10 mb-15`}>
      <h2 className={`${ingredientsStyles.title} text text_type_main-large mb-5`}>Соберите бургер</h2>
      <ul className={`${ingredientsStyles.nav} mb-10`}>
        <li className={`${ingredientsStyles.navItem} ${activeTab === 'bun' ? ingredientsStyles.navItem_active : ''} text text_type_main-small`}>
          Булки
        </li>
        <li className={`${ingredientsStyles.navItem} ${activeTab === 'sauce' ? ingredientsStyles.navItem_active : ''} text text_type_main-small text_color_inactive`}>
          Соусы
        </li>
        <li className={`${ingredientsStyles.navItem} ${activeTab === 'main' ? ingredientsStyles.navItem_active : ''} text text_type_main-small text_color_inactive`}>
          Начинки
        </li>
      </ul>

      
      <div ref={containerScrollRef} className={ ingredientsStyles.content }>
      <div ref={bunRef}>
          <IngredientsGroup 
            groupTitle={'Булки'}
            ingredients={ingredientsByType.bun}
            onIngredientClick={props.onIngredientClick}
          /> 
      </div>
      <div ref={sauceRef}>
        <IngredientsGroup 
          groupTitle={'Соусы'} 
          ingredients={ingredientsByType.sauce}
          onIngredientClick={props.onIngredientClick}
        />
      </div>
      <div ref={mainRef}>
        <IngredientsGroup 
          groupTitle={'Начинки'} 
          ingredients={ingredientsByType.main}
          onIngredientClick={props.onIngredientClick}
        />
      </div>
      </div>
      
      
    </section>
  )
}

export default BurgerIngredients;
