import { createSlice, PayloadAction, SerializedError, nanoid } from "@reduxjs/toolkit";
import { TBurgerIngredient } from '../../utils/custom-types';

type TBurgerConstructorState = {
  bun: null | TBurgerIngredient;
  fillings: TBurgerIngredient[];
}

export const initialState: TBurgerConstructorState = {
  bun: null,
  fillings: []
}

export const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addBun: (state: TBurgerConstructorState, action: PayloadAction<TBurgerIngredient>) => {
      state.bun = action.payload;
    },
    addIngredient: {
      reducer: (state: TBurgerConstructorState, action: PayloadAction<TBurgerIngredient>) => {
        state.fillings.push(action.payload);
      },
      prepare: (ingredient: TBurgerIngredient) => {
        const id = nanoid();
        return {payload: { ...ingredient, uniqueId: id}};
      }
    },
    removeIngredient: (state: TBurgerConstructorState, action: PayloadAction<string>) => {
      state.fillings = state.fillings.filter(item => item.uniqueId !== action.payload);
    },
    moveIngredient: (state: TBurgerConstructorState, action: PayloadAction<{dragIndex: number, hoverIndex: number}>) => {
      const {dragIndex, hoverIndex} = action.payload;
      const updatedIngredients = [...state.fillings];
      const movedItem = updatedIngredients.splice(dragIndex, 1)[0];
      updatedIngredients.splice(hoverIndex, 0, movedItem);
      state.fillings = updatedIngredients;
    },
    resetConstructor: (state) => {
      state.bun = null;
      state.fillings = [];
    }
  }
})

export const { addBun, addIngredient, moveIngredient, removeIngredient, resetConstructor } = burgerConstructorSlice.actions;
