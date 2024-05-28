import { Dispatch } from 'redux';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_REQUEST_SUCCESS = 'GET_INGREDIENTS_REQUEST_SUCCESS';
export const GET_INGREDIENTS_REQUEST_FAILED = 'GET_INGREDIENTS_REQUEST_FAILED';

export function getIngredients(url: string) {
  return function(dispatch: Dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    })
    fetch(url)
    .then(res => res.json())
    .then(res => {
      if(res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_REQUEST_SUCCESS,
          ingredients: res.data,
        })
      } else {
        dispatch({
          type: GET_INGREDIENTS_REQUEST_FAILED,
        })
      }
    })
    .catch(error => {
      dispatch({
        type: GET_INGREDIENTS_REQUEST_FAILED,
      })
    })
    // .finally(() => {
    // setIsLoading(false);
    // });
  };
}