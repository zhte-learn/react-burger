import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { TUser } from "../../utils/auth-types";
import { register, 
        login, 
        logout, 
        updateUserDetails, 
        forgotPassword,
        resetPassword} from './actions';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isFailed: boolean;
  isLoading: boolean;
  errorMessage: any;
  error: any;
}

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  isFailed: false,
  isLoading: false,
  errorMessage: null,
  error: null,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = {...action.payload.user, password: "*****"};
        state.isFailed = false;
        state.isLoading = false;
        state.errorMessage = null;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isFailed = true;
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = {...action.payload.user, password: "*****"};
        state.isFailed = false;
        state.isLoading = false;
        state.errorMessage = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isFailed = true;
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(updateUserDetails.fulfilled, (state) => {
        state.isFailed = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateUserDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.isFailed = true;
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isFailed = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.isFailed = false;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isFailed = true;
        state.error = action.payload;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isFailed = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.isFailed = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isFailed = true;
        //state.errorMessage = action.payload;
      })
  }
})

export const { setAuthChecked, setUser } = userSlice.actions;

export default userSlice.reducer;