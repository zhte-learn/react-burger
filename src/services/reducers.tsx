import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients/reducer';
import { selectedIngredientReducer } from './selected-ingredient/reducer';
import { constructorReducer } from './constructor/reducer';
import { orderReducer } from './order/reducer';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  selectedIngredient: selectedIngredientReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
});