import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients/reducer';
import { selectedIngredientReducer } from './selected-ingredient/reducer';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  selectedIngredient: selectedIngredientReducer,
});