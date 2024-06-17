import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { register, login, logout, updateUserDetails } from './actions';
import { TUser } from "../../utils/auth-types";

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isUpdateFailed: boolean;
  isUpdateLoading: boolean;
  updateError: any; 
}

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  isUpdateFailed: false,
  isUpdateLoading: false,
  updateError: null,
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
  }
})

export const { setAuthChecked, setUser } = userSlice.actions;

export default userSlice.reducer;