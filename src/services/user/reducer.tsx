import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { TUser } from "../../utils/auth-types";
import { register, 
        login, 
        logout, 
        updateUserDetails, 
        resetPassword} from './actions';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isUpdateFailed: boolean;
  isUpdateLoading: boolean;
  updateError: any;
  isResetFailed: boolean;
  isResetLoading: boolean;
  resetError: any;
}

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  isUpdateFailed: false,
  isUpdateLoading: false,
  updateError: null,
  isResetFailed: false,
  isResetLoading: false,
  resetError: null,
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
      .addCase(login.fulfilled, (state, action) => {
        state.user = {...action.payload.user, password: "*****"};
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(updateUserDetails.fulfilled, (state) => {
        state.isUpdateFailed = false;
        state.isUpdateLoading = false;
        state.updateError = null;
      })
      .addCase(updateUserDetails.pending, (state) => {
        state.isUpdateLoading = true;
        state.updateError = null;
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.isUpdateFailed = true;
        state.isUpdateLoading = false;
        state.updateError = action.payload;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isResetFailed = false;
        state.resetError = null;
        state.isResetLoading = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isResetLoading = true;
        state.isResetFailed = false;
        state.resetError = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isResetLoading = false;
        state.isResetFailed = true;
        state.resetError = action.payload;
      })
  }
})

export const { setAuthChecked, setUser } = userSlice.actions;

export default userSlice.reducer;