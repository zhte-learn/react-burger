import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { TBurgerIngredient } from '../../utils/custom-types';
import { getIngredients } from "./actions";

type TIngredientsState = {
  ingredients: TBurgerIngredient[]; 
  status: string;
  error: any;
  ingredientsMap: {[id: string]: TBurgerIngredient};
}

const initialState: TIngredientsState = {
  ingredients: [],
  status: 'idle',
  error: null,
  ingredientsMap: {},
};

function createMap(ingredients: TBurgerIngredient[]) {
  const dict: {[id: string]: TBurgerIngredient} = {};
  ingredients.forEach(item => {
    dict[item._id] = item;
  })
  return dict;
}

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.fulfilled, (state: TIngredientsState, action: PayloadAction<{data: TBurgerIngredient[]}>) => {
        state.status = 'success';
        state.ingredients = action.payload.data;
        state.ingredientsMap = createMap(action.payload.data);
      })
      .addCase(getIngredients.pending, (state: TIngredientsState) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state: TIngredientsState, action) => {
        state.status = 'failed';
        state.error = action.error as SerializedError;
      })
  }
})
