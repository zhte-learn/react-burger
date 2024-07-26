import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './styles.module.css';

import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';

const MainPage = (): JSX.Element => {
  return(
    <DndProvider backend={HTML5Backend}>
      <h2 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>Соберите бургер</h2>
      <div className={`${styles.columns} ${styles.ingredientsHeight}`}>
        <BurgerIngredients />
        <BurgerConstructor />                                        
      </div>
    </DndProvider>
  )
}

export default MainPage;
