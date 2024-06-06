import BurgerIngredient from '../../utils/ingredient-interface';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addBun = createAsyncThunk(
  "burgerConstructor/addBun",
  async(bun: BurgerIngredient) => {
    return bun;
  }
)

export const addIngredient = createAsyncThunk(
  "burgerConstructor/addIngredient",
  async(ingredient: BurgerIngredient) => {
    return ingredient;
  }
)

export const removeIngredient = createAsyncThunk(
  "burgerConstructor/removeIngredient",
  async(id: string) => {
    return id;
  }
)

export const moveIngredient = createAsyncThunk(
  "burgerConstructor/moveIngredient",
  async(indices: {dragIndex: number, hoverIndex: number}) => {
    return indices;
  }
)

export const resetConstructor = createAsyncThunk(
  "burgerConstructor/resetConstructor",
  async() => {
    return;
  }
)
