import { Dispatch } from 'redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import BurgerIngredient from '../../utils/ingredient-interface';

//export const SELECT_INGREDIENT = "SELECT_INGREDIENT";

export const selectIngredient = createAsyncThunk(
  "selectedIngredient/selectIngredient",
  async(ingredient: BurgerIngredient | null) => {
    return ingredient;
  }
)

// export function selectIngredient (ingredient: BurgerIngredient | null) {
//   return function(dispatch: Dispatch) {
//     dispatch({
//       type: SELECT_INGREDIENT,
//       payload: ingredient,
//     })
//   }
// }