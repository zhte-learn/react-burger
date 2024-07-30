import { useAppDispatch } from "../store";
import { 
  addBun, 
  addIngredient, 
  removeIngredient,
  moveIngredient,
  resetConstructor, 
  burgerConstructorSlice, 
  initialState } 
from "./reducer"

const bunTest = {
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

const bunToAdd = {
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

const ingredientsTest = [
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

const ingredientToAdd = {
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
  it("initialize correctly", () => {
    const state = burgerConstructorSlice.reducer(undefined, { type: ""})
    expect(state).toEqual(initialState);
  })
})

it("should add a bun to empty constructor", ()=> {
  expect(burgerConstructorSlice.reducer(initialState, addBun(bunToAdd))).toEqual(
    { ...initialState, bun: bunToAdd }
  )
});

it("should replace a bun", ()=> {
  const prevState = {...initialState, bun: bunTest};
  expect(burgerConstructorSlice.reducer(prevState, addBun(bunToAdd))).toEqual(
    { ...prevState, bun: bunToAdd }
  )
});

it("should add an ingredient to empty constructor", ()=> {
  expect(burgerConstructorSlice.reducer(initialState, addIngredient(ingredientToAdd))).toEqual(
    { ...initialState, fillings: [{...ingredientToAdd, uniqueId: expect.any(String)}] }
  )
});

it("should add an ingredient to ingredients that were added before", ()=> {
  const prevState = {...initialState, fillings: ingredientsTest};
  expect(burgerConstructorSlice.reducer(prevState, addIngredient(ingredientToAdd))).toEqual(
    { ...prevState, fillings: [...ingredientsTest, {...ingredientToAdd, uniqueId: expect.any(String)}] }
  )
});

it("should remove an ingredient", ()=> {
  const prevState = {...initialState, fillings: ingredientsTest};
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

it("should change ingredient position in array after dragging", ()=> {
  const prevState = {...initialState, fillings: ingredientsTest};
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

it("should reset state", ()=> {
  const prevState = {bun: bunTest, fillings: ingredientsTest};
  expect(burgerConstructorSlice.reducer(prevState, resetConstructor())).toEqual(
    initialState
  )
});
