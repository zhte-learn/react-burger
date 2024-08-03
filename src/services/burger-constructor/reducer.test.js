import { 
  addBun, 
  addIngredient, 
  removeIngredient,
  moveIngredient,
  resetConstructor, 
  burgerConstructorSlice, 
  initialState } 
from "./reducer"

const mockBun = {
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
};

const mockBunToAdd = {
  "_id":"60666c42cc7b410027a1a9b2",
  "name":"Флюоресцентная булка R2-D3",
  "type":"bun",
  "proteins":44,
  "fat":26,
  "carbohydrates":85,
  "calories":643,
  "price":988,
  "image":"https://code.s3.yandex.net/react/code/bun-01.png",
  "image_mobile":"https://code.s3.yandex.net/react/code/bun-01-mobile.png",
  "image_large":"https://code.s3.yandex.net/react/code/bun-01-large.png",
  "__v":0
};

const mockIngredients = [
  {
    "uniqueId": "1",
    "_id":"60666c42cc7b410027a1a9b3",
    "name":"Филе Люминесцентного тетраодонтимформа",
    "type":"main",
    "proteins":44,
    "fat":26,
    "carbohydrates":85,
    "calories":643,
    "price":988,
    "image":"https://code.s3.yandex.net/react/code/meat-03.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/meat-03-large.png",
    "__v":0
 },
 {
    "uniqueId": "2",
    "_id":"60666c42cc7b410027a1a9bf",
    "name":"Сыр с астероидной плесенью",
    "type":"main",
    "proteins":84,
    "fat":48,
    "carbohydrates":420,
    "calories":3377,
    "price":4142,
    "image":"https://code.s3.yandex.net/react/code/cheese.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/cheese-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/cheese-large.png",
    "__v":0,
 },
];

const mockIngredientToAdd = {
  "uniqueId": "3",
  "_id":"60666c42cc7b410027a1a9be",
  "name":"Мини-салат Экзо-Плантаго",
  "type":"main",
  "proteins":1,
  "fat":2,
  "carbohydrates":3,
  "calories":6,
  "price":4400,
  "image":"https://code.s3.yandex.net/react/code/salad.png",
  "image_mobile":"https://code.s3.yandex.net/react/code/salad-mobile.png",
  "image_large":"https://code.s3.yandex.net/react/code/salad-large.png",
  "__v":0,
};

describe("burger-constructor reducer", () => {
  test("initialize correctly", () => {
    const state = burgerConstructorSlice.reducer(undefined, { type: ""})
    expect(state).toEqual(initialState);
  });

  test("should add a bun to empty constructor", ()=> {
    expect(burgerConstructorSlice.reducer(initialState, addBun(mockBunToAdd))).toEqual(
      { ...initialState, bun: mockBunToAdd }
    )
  });

  test("should replace a bun", ()=> {
    const prevState = {...initialState, bun: mockBun};
    expect(burgerConstructorSlice.reducer(prevState, addBun(mockBunToAdd))).toEqual(
      { ...prevState, bun: mockBunToAdd }
    )
  });

  test("should add an ingredient to empty constructor", ()=> {
    expect(burgerConstructorSlice.reducer(initialState, addIngredient(mockIngredientToAdd))).toEqual(
      { ...initialState, fillings: [{...mockIngredientToAdd, uniqueId: expect.any(String)}] }
    )
  });

  test("should add an ingredient to ingredients that were added before", ()=> {
    const prevState = {...initialState, fillings: mockIngredients};
    expect(burgerConstructorSlice.reducer(prevState, addIngredient(mockIngredientToAdd))).toEqual(
      { ...prevState, fillings: [...mockIngredients, {...mockIngredientToAdd, uniqueId: expect.any(String)}] }
    )
  });

  test("should remove an ingredient", ()=> {
    const prevState = {...initialState, fillings: mockIngredients};
    expect(burgerConstructorSlice.reducer(prevState, removeIngredient('1'))).toEqual(
      { ...prevState, 
        fillings: [{
          "uniqueId": "2",
          "_id":"60666c42cc7b410027a1a9bf",
          "name":"Сыр с астероидной плесенью",
          "type":"main",
          "proteins":84,
          "fat":48,
          "carbohydrates":420,
          "calories":3377,
          "price":4142,
          "image":"https://code.s3.yandex.net/react/code/cheese.png",
          "image_mobile":"https://code.s3.yandex.net/react/code/cheese-mobile.png",
          "image_large":"https://code.s3.yandex.net/react/code/cheese-large.png",
          "__v":0,
        }]
      } 
    )
  });

  test("should change ingredient position in array after dragging", ()=> {
    const prevState = {...initialState, fillings: mockIngredients};
    expect(burgerConstructorSlice.reducer(prevState, moveIngredient({ dragIndex: 1, hoverIndex: 0 }))).toEqual(
      { ...prevState, fillings: [
        {
          "uniqueId": "2",
          "_id":"60666c42cc7b410027a1a9bf",
          "name":"Сыр с астероидной плесенью",
          "type":"main",
          "proteins":84,
          "fat":48,
          "carbohydrates":420,
          "calories":3377,
          "price":4142,
          "image":"https://code.s3.yandex.net/react/code/cheese.png",
          "image_mobile":"https://code.s3.yandex.net/react/code/cheese-mobile.png",
          "image_large":"https://code.s3.yandex.net/react/code/cheese-large.png",
          "__v":0,
        },
        {
          "uniqueId": "1",
          "_id":"60666c42cc7b410027a1a9b3",
          "name":"Филе Люминесцентного тетраодонтимформа",
          "type":"main",
          "proteins":44,
          "fat":26,
          "carbohydrates":85,
          "calories":643,
          "price":988,
          "image":"https://code.s3.yandex.net/react/code/meat-03.png",
          "image_mobile":"https://code.s3.yandex.net/react/code/meat-03-mobile.png",
          "image_large":"https://code.s3.yandex.net/react/code/meat-03-large.png",
          "__v":0
        }
      ]}
    )
  });

  test("should reset state", ()=> {
    const prevState = {bun: mockBun, fillings: mockIngredients};
    expect(burgerConstructorSlice.reducer(prevState, resetConstructor())).toEqual(
      initialState
    )
  });
})
