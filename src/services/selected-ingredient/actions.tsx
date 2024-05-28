import { Dispatch } from 'redux';
import BurgerIngredient from '../../utils/ingredient-interface';

export const SELECT_INGREDIENT = "SELECT_INGREDIENT";

export function selectIngredient (ingredient: BurgerIngredient) {
  return function(dispatch: Dispatch) {
    dispatch({
      type: SELECT_INGREDIENT,
      payload: ingredient,
    })
  }
}