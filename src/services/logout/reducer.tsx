import { createSlice } from "@reduxjs/toolkit";
//import { logoutUser } from './actions';

// interface LogoutState {
//   logoutFailed: boolean,
//   logoutLoading: boolean,
//   logoutError: any,
// }

// const initialState: LogoutState = {
//   logoutFailed: false,
//   logoutLoading: false,
//   logoutError: null,
// }

// export const logoutSlice = createSlice({
//   name: "logout",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(logoutUser.fulfilled, (state, action) => {
//         state.logoutLoading = false;
//         state.logoutFailed = false;
//         state.logoutError = null;
//       })
//       .addCase(logoutUser.pending, (state) => {
//         state.logoutLoading = true;
//         state.logoutError = null;
//       })
//       .addCase(logoutUser.rejected, (state, action) => {
//         state.logoutFailed = true;
//         state.logoutLoading = false;
//         state.logoutError = action.payload;
//       })
//   }
// })
