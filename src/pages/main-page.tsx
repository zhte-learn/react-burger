import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './styles.module.css';

import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';

export const MainPage = () => {
  return(
    <DndProvider backend={HTML5Backend}>
      <div className={ styles.container }>
        <BurgerIngredients />
        <BurgerConstructor />                                        
      </div>
    </DndProvider>
  )
}
