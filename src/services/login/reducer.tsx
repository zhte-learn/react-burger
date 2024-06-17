import { createSlice } from "@reduxjs/toolkit";
//import { loginUser } from './actions';

interface LoginState {
  accessToken: string,
  refreshToken: string,
  loginFailed: boolean,
  loginLoading: boolean,
  loginError: any,
}

const initialState: LoginState = {
  accessToken: "",
  refreshToken: "",
  loginFailed: false,
  loginLoading: false,
  loginError: null,
}

// export const loginSlice = createSlice({
//   name: "login",
//   initialState,
//   reducers: {
//     clearState: (state) => {
//       state.loginFailed = false;
//       state.loginLoading = false;
//       state.loginError = null;
//       state.accessToken = "";
//       state.refreshToken = "";
//       return state;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loginLoading = false;
//         state.loginFailed = false;
//         state.loginError = null;
//         console.log(action.payload);
//         state.accessToken = action.payload.accessTocken.split('Bearer ')[1];
//         state.refreshToken = action.payload.refreshToken;
//       })
//       .addCase(loginUser.pending, (state) => {
//         state.loginLoading = true;
//         state.loginError = null;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loginFailed = true;
//         state.loginLoading = false;
//         state.loginError = action.payload;
//       })
      
//   }
// })

// export const { clearState } = loginSlice.actions;
