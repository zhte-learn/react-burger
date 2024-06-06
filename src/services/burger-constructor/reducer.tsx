import BurgerIngredient from '../../utils/ingredient-interface';

import { createSlice } from "@reduxjs/toolkit";
import { addBun, addIngredient, moveIngredient, removeIngredient, resetConstructor } from './actions';

interface BurgerConstructorState {
  bun: null | BurgerIngredient,
  fillings: BurgerIngredient[],
}

const initialState: BurgerConstructorState = {
  bun: null,
  fillings: []
}

export const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBun.fulfilled, (state, action) => {
        state.bun = action.payload;
      })
      .addCase(addIngredient.fulfilled, (state, action) => {
        state.fillings.push(action.payload);
      })
      .addCase(removeIngredient.fulfilled, (state, action) => {
        state.fillings = state.fillings.filter(item => item._id !== action.payload);
      })
      .addCase(moveIngredient.fulfilled, (state, action) => {
        const {dragIndex, hoverIndex} = action.payload;
        const updatedIngredients = [...state.fillings];
        const movedItem = updatedIngredients.splice(dragIndex, 1)[0];
        updatedIngredients.splice(hoverIndex, 0, movedItem);
        state.fillings = updatedIngredients;
      })
      .addCase(resetConstructor.fulfilled, (state) => {
        state.bun = null;
        state.fillings = [];
      })
  }
})
