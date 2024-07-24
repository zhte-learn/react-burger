import { combineReducers } from 'redux';
import { burgerConstructorSlice } from './burger-constructor/reducer';
import { orderSlice } from './order/reducer';
import { ingredientsSlice } from './ingredients/reducer';
import { userSlice } from './user/reducer';
import { feedSlice } from './feed/reducer';
import { feedProfileSlice } from './feed-profile/reducer';

export const rootReducer = combineReducers({
  [burgerConstructorSlice.reducerPath]: burgerConstructorSlice.reducer,
  [orderSlice.reducerPath]: orderSlice.reducer,
  [ingredientsSlice.reducerPath]: ingredientsSlice.reducer,
  [userSlice.reducerPath]: userSlice.reducer,
  [feedSlice.reducerPath]: feedSlice.reducer,
  [feedProfileSlice.reducerPath]: feedProfileSlice.reducer,
})
