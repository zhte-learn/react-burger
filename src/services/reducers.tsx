import { combineReducers } from 'redux';
import { burgerConstructorSlice } from './burger-constructor/reducer';
import { orderSlice } from './order/reducer';
//import { selectedIngredientSlice } from './selected-ingredient/reducer';
import { ingredientsSlice } from './ingredients/reducer';
import { userSlice } from './user/reducer';
//import { registerSlice } from './register/reducer';
//import { loginSlice } from './login/reducer';
//import { logoutSlice } from './logout/reducer';

export const rootReducer = combineReducers({
  [burgerConstructorSlice.reducerPath]: burgerConstructorSlice.reducer,
  [orderSlice.reducerPath]: orderSlice.reducer,
  //[selectedIngredientSlice.reducerPath]: selectedIngredientSlice.reducer,
  [ingredientsSlice.reducerPath]: ingredientsSlice.reducer,
  [userSlice.reducerPath]: userSlice.reducer,
  //[registerSlice.reducerPath]: registerSlice.reducer,
  //[loginSlice.reducerPath]: loginSlice.reducer,
  //[logoutSlice.reducerPath]: logoutSlice.reducer,
})


