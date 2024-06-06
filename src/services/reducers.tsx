import { combineReducers } from 'redux';
import { burgerConstructorSlice } from "./burger-constructor/reducer";
import { orderSlice } from "./order/reducer";
import { selectedIngredientSlice } from "./selected-ingredient/reducer";
import { ingredientsSlice } from "./ingredients/reducer";

export const rootReducer = combineReducers({
  [burgerConstructorSlice.reducerPath]: burgerConstructorSlice.reducer,
  [orderSlice.reducerPath]: orderSlice.reducer,
  [selectedIngredientSlice.reducerPath]: selectedIngredientSlice.reducer,
  [ingredientsSlice.reducerPath]: ingredientsSlice.reducer,
})


