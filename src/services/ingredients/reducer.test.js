import { initialState, ingredientsSlice } from './reducer';
import { getIngredients } from './actions';

const mockIngredients = [
  {
    "_id":"60666c42cc7b410027a1a9b1",
    "name":"Краторная булка N-200i",
    "type":"bun",
    "proteins":80,
    "fat":24,
    "carbohydrates":53,
    "calories":420,
    "price":1255,
    "image":"https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v":0
  },
  {
    "_id":"60666c42cc7b410027a1a9b5",
    "name":"Говяжий метеорит (отбивная)",
    "type":"main",
    "proteins":800,
    "fat":800,
    "carbohydrates":300,
    "calories":2674,
    "price":3000,
    "image":"https://code.s3.yandex.net/react/code/meat-04.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
    "__v":0
  },
];

const mockIngredientsMap = () => {
  const dict = {};
  mockIngredients.forEach(item => {
    dict[item._id] = item;
  })
  return dict;
}

describe("ingredients reducer", () => {
  test("initialize correctly", () => {
    const state = ingredientsSlice.reducer(undefined, { type: ""})
    expect(state).toEqual(initialState);
  })

  test("get ingredients fullfilled", () => {
    const action = { 
      type: getIngredients.fulfilled.type, 
      payload: {data: mockIngredients }
    };
    
    const state = ingredientsSlice.reducer(initialState, action);
    
    expect(state).toEqual(
      { ...initialState, 
        status: "success", 
        ingredients: mockIngredients, 
        ingredientsMap: mockIngredientsMap(),
      }
    )  
  })

  test("get ingredients pending", () => {
    const action = { type: getIngredients.pending.type };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({...initialState, status: "loading"});
  })

  test("get ingredients failed", () => {
    const action = { type: getIngredients.rejected.type, error: { message: "Test" } };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({...initialState, status: "failed", error: { message: "Test" }});
  })
})
