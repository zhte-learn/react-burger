import { 
  addBun, 
  addIngredient, 
  removeIngredient,
  moveIngredient,
  resetConstructor, 
  burgerConstructorSlice, 
  initialState } 
from "./reducer";

import { bun1, bun2, ingredient1, ingredient2, ingredient3 } from './mock-data';

const mockIngredients = [ ingredient1, ingredient2 ];

describe("burger-constructor reducer", () => {
  test("initialize correctly", () => {
    const state = burgerConstructorSlice.reducer(undefined, { type: ""})
    expect(state).toEqual(initialState);
  });

  test("should add a bun to empty constructor", ()=> {
    expect(burgerConstructorSlice.reducer(initialState, addBun(bun2))).toEqual(
      { ...initialState, bun: bun2 }
    )
  });

  test("should replace a bun", ()=> {
    const prevState = {...initialState, bun: bun1};
    expect(burgerConstructorSlice.reducer(prevState, addBun(bun2))).toEqual(
      { ...prevState, bun: bun2 }
    )
  });

  test("should add an ingredient to empty constructor", ()=> {
    expect(burgerConstructorSlice.reducer(initialState, addIngredient(ingredient3))).toEqual(
      { ...initialState, fillings: [{...ingredient3, uniqueId: expect.any(String)}] }
    )
  });

  test("should add an ingredient to ingredients that were added before", ()=> {
    const prevState = {...initialState, fillings: mockIngredients};
    expect(burgerConstructorSlice.reducer(prevState, addIngredient(ingredient3))).toEqual(
      { ...prevState, fillings: [...mockIngredients, {...ingredient3, uniqueId: expect.any(String)}] }
    )
  });

  test("should remove an ingredient", ()=> {
    const prevState = {...initialState, fillings: mockIngredients};
    expect(burgerConstructorSlice.reducer(prevState, removeIngredient('1'))).toEqual(
      { ...prevState, 
        fillings: [ingredient2]
      } 
    )
  });

  test("should change ingredient position in array after dragging", ()=> {
    const prevState = {...initialState, fillings: mockIngredients};
    expect(burgerConstructorSlice.reducer(prevState, moveIngredient({ dragIndex: 1, hoverIndex: 0 }))).toEqual(
      { ...prevState, fillings: [ ingredient2, ingredient1 ]}
    )
  });

  test("should reset state", ()=> {
    const prevState = {bun: bun1, fillings: mockIngredients};
    expect(burgerConstructorSlice.reducer(prevState, resetConstructor())).toEqual(
      initialState
    )
  });
})
