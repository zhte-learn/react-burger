import { createAsyncThunk } from '@reduxjs/toolkit';
import BurgerIngredient from '../../utils/ingredient-interface';

export const selectIngredient = createAsyncThunk(
  "selectedIngredient/selectIngredient",
  async(ingredient: BurgerIngredient | null) => {
    return ingredient;
  }
)
