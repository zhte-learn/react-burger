import { Dispatch } from 'redux';
import BurgerIngredient from '../../utils/ingredient-interface';

// export const ADD_BUN = 'ADD_BUN';
// export const ADD_INGREDIENT = 'ADD_INGREDIENT';
// export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
// export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
// export const RESET_CONSTRUCTOR = 'RESET_CONSTRUCTOR'

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


/*export function addBun (bun: BurgerIngredient) {
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

export function moveIngredient(dragIndex: number, hoverIndex: number) {
  return function(dispatch: Dispatch) {
    dispatch({
      type: MOVE_INGREDIENT,
      payload: {dragIndex, hoverIndex},
    })
  }
}

export function resetConstructor() {
  return function(dispatch: Dispatch) {
    dispatch({
      type: RESET_CONSTRUCTOR,
    })
  }
}*/