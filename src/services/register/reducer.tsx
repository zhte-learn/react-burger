import { createSlice } from "@reduxjs/toolkit";
//import { register } from './actions';

// interface RegisterState {
//   token: string,
//   registerFailed: boolean,
//   registerLoading: boolean,
//   registerError: any,
// }

// const initialState: RegisterState = {
//   token: "",
//   registerFailed: false,
//   registerLoading: false,
//   registerError: null,
// }

// export const registerSlice = createSlice({
//   name: "register",
//   initialState,
//   reducers: {
//     clearState: (state) => {
//       state.registerFailed = false;
//       state.registerLoading = false;
//       state.registerError = null;
//       return state;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(register.fulfilled, (state, action) => {
//         state.registerLoading = false;
//         state.registerFailed = false;
//         state.registerError = null;
//         //state.token = action.payload;
//       })
//       .addCase(register.pending, (state) => {
//         state.registerLoading = true;
//         state.registerError = null;
//       })
//       .addCase(register.rejected, (state, action) => {
//         state.registerFailed = true;
//         state.registerLoading = false;
//         state.registerError = action.payload;
//       })
      
//   }
// })

// export const { clearState } = registerSlice.actions;
