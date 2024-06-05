//import { Dispatch } from 'redux';
import { getIngredientsRequest } from '../../utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

//export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
//export const GET_INGREDIENTS_REQUEST_SUCCESS = 'GET_INGREDIENTS_REQUEST_SUCCESS';
//export const GET_INGREDIENTS_REQUEST_FAILED = 'GET_INGREDIENTS_REQUEST_FAILED';

export const getIngredients = createAsyncThunk(
  "ingredients/getIngredients",
  async (_, thunkAPI) => {
    try {
      const response = await getIngredientsRequest();
      if(response.success) {
        const data = response.data;
        return data;
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error: any) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);


// export function getIngredients() {
//   return function(dispatch: Dispatch) {
//     dispatch({
//       type: GET_INGREDIENTS_REQUEST,
//     })

//     getIngredientsRequest()
//     .then(res => {
//       if(res && res.success) {
//         dispatch({
//           type: GET_INGREDIENTS_REQUEST_SUCCESS,
//           payload: res.data,
//         })
//       } else {
//         dispatch({
//           type: GET_INGREDIENTS_REQUEST_FAILED,
//         })
//       }
//     })
//     .catch(error => {
//       dispatch({
//         type: GET_INGREDIENTS_REQUEST_FAILED,
//         payload: `Код ошибки:${error.message}`,
//       })
//     })
//   };
// }