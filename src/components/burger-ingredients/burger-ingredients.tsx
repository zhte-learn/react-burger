import React from "react";
import ingredientsStyles from './burger-ingredients.module.css';
import IngredientsGroup from './ingredients-group/ingredients-group';
import { BurgerIngredient } from '../../utils/custom-types';
import { useAppSelector } from '../../services/hooks';

function BurgerIngredients(): JSX.Element {
  const [activeTab, setActiveTab] = React.useState<string>('bun');
  // @ts-ignore
  const { ingredients } = useAppSelector(state => state.ingredients);
  const containerScrollRef = React.useRef<HTMLDivElement>(null);
  const bunRef = React.useRef<HTMLDivElement>(null);
  const sauceRef = React.useRef<HTMLDivElement>(null);
  const mainRef = React.useRef<HTMLDivElement>(null);

  const ingredientsByType = React.useMemo<{
    bun: BurgerIngredient[];
    sauce: BurgerIngredient[];
    main: BurgerIngredient[];
  }>(() => {
    return { 
      bun: getItemsByType(ingredients, "bun"),
      sauce: getItemsByType(ingredients, "sauce"),
      main: getItemsByType(ingredients, "main"),
    };
  }, [ingredients]);

  function getItemsByType(data: BurgerIngredient[], type: string): BurgerIngredient[] {
    return data.filter(item => item.type === type);
  }

  function getStyles(type: string): string {
    return `${ingredientsStyles.navItem} 
            ${activeTab === type ? ingredientsStyles.navItem_active : 'text_color_inactive'} 
            text text_type_main-small`;
  }

  const handleScroll = (): void => {
    if (bunRef.current && sauceRef.current && mainRef.current && containerScrollRef.current) {
      const containerTop: number = containerScrollRef.current.getBoundingClientRect().top;
      const bunTop: number = bunRef.current.getBoundingClientRect().top;
      const sauceTop: number = sauceRef.current.getBoundingClientRect().top;
      const mainTop: number = mainRef.current.getBoundingClientRect().top;
      const bunHeigth: number = bunRef.current.getBoundingClientRect().height;
      const sauceHeight: number = sauceRef.current.getBoundingClientRect().height;
      const scrollTop: number = containerScrollRef.current.scrollTop;
      const sauceOffset: number = bunHeigth - scrollTop;
      const mainOffset: number = (sauceHeight + bunHeigth) - scrollTop;

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
    const content: HTMLDivElement | null = containerScrollRef.current;
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
        <li className={getStyles('bun')}>
          Булки
        </li>
        <li className={getStyles('sauce')}>
          Соусы
        </li>
        <li className={getStyles('main')}>
          Начинки
        </li>
      </ul>

      <div ref={containerScrollRef} className={ingredientsStyles.content}>
        <IngredientsGroup 
          ref={bunRef}
          groupTitle={'Булки'}
          ingredients={ingredientsByType.bun}
        />
        <IngredientsGroup
          ref={sauceRef}
          groupTitle={'Соусы'} 
          ingredients={ingredientsByType.sauce}
        />
        <IngredientsGroup 
          ref={mainRef}
          groupTitle={'Начинки'} 
          ingredients={ingredientsByType.main}
        /> 
      </div>
    </section>
  )
}

export default BurgerIngredients;
