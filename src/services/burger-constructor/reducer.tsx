import BurgerIngredient from '../../utils/ingredient-interface';
import { createSlice, PayloadAction, nanoid  } from "@reduxjs/toolkit";

interface BurgerConstructorState {
  bun: null | BurgerIngredient,
  fillings: BurgerIngredient[],
}

const initialState: BurgerConstructorState = {
  bun: null,
  fillings: []
}

const removeElementById = (array: BurgerIngredient[], id: string) => {
  const idx = array.findIndex((element: BurgerIngredient) => element._id === id);
  if (idx !== -1) {
    return [...array.slice(0, idx), ...array.slice(idx + 1)];
  }
  return array;
}

export const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<BurgerIngredient>) => {
      state.bun = action.payload;
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<BurgerIngredient>) => {
        state.fillings.push(action.payload);
      },
      prepare: (ingredient: BurgerIngredient) => {
        const id = nanoid();
        return {payload: { ...ingredient, uniqueId: id}};
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.fillings = removeElementById(state.fillings, action.payload);
    },
    moveIngredient: (state, action: PayloadAction<{dragIndex: number, hoverIndex: number}>) => {
      const {dragIndex, hoverIndex} = action.payload;
      const updatedIngredients = [...state.fillings];
      const movedItem = updatedIngredients.splice(dragIndex, 1)[0];
      updatedIngredients.splice(hoverIndex, 0, movedItem);
      state.fillings = updatedIngredients;
    },
    resetConstructor: (state) => {
      state.bun = null;
      state.fillings = [];
    }
  }
})

export const { addBun, addIngredient, moveIngredient, removeIngredient, resetConstructor } = burgerConstructorSlice.actions;

// export const burgerConstructorSlice = createSlice({
//   name: "burgerConstructor",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(addBun.fulfilled, (state, action) => {
//         state.bun = action.payload;
//       })
//       .addCase(addIngredient.fulfilled, (state, action) => {
//         state.fillings.push(action.payload);
//       })
//       .addCase(removeIngredient.fulfilled, (state, action) => {
//         state.fillings = state.fillings.filter(item => item._id !== action.payload);
//       })
//       .addCase(moveIngredient.fulfilled, (state, action) => {
//         const {dragIndex, hoverIndex} = action.payload;
//         const updatedIngredients = [...state.fillings];
//         const movedItem = updatedIngredients.splice(dragIndex, 1)[0];
//         updatedIngredients.splice(hoverIndex, 0, movedItem);
//         state.fillings = updatedIngredients;
//       })
//       .addCase(resetConstructor.fulfilled, (state) => {
//         state.bun = null;
//         state.fillings = [];
//       })
//   }
// })
