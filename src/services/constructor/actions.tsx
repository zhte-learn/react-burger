import { Dispatch } from 'redux';
import BurgerIngredient from '../../utils/ingredient-interface';

export const ADD_BUN = "ADD_BUN";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";

export function addBun (bun: BurgerIngredient) {
  return function(dispatch: Dispatch) {
    dispatch({
      type: ADD_BUN,
      payload: bun,
    })
  }
}

export function addIngredient (ingredient: BurgerIngredient) {
  return function(dispatch: Dispatch) {
    dispatch({
      type: ADD_INGREDIENT,
      payload: ingredient,
    })
  }
}

export function removeIngredient (id: string) {
  return function(dispatch: Dispatch) {
    dispatch({
      type: REMOVE_INGREDIENT,
      payload: id,
    })
  }
}