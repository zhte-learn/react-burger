import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { TUser } from "../../utils/custom-types";
import { register, 
        login, 
        logout, 
        updateUserDetails, 
        forgotPassword,
        resetPassword} from './actions';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  status: string;
  error: any;
}

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  status: 'idle',
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
    clearStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = {...action.payload.user, password: "*****"};
        state.status = "success";
        state.error = null;
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = {...action.payload.user, password: "*****"};
        state.status = "success";
        state.error = null;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(updateUserDetails.fulfilled, (state) => {
        state.status = "success";
        state.error = null;
      })
      .addCase(updateUserDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.status = 'success';
        state.error = null;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.status = 'success';
        state.error = null;
      })
      .addCase(resetPassword.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  }
})

export const { setAuthChecked, setUser, clearStatus } = userSlice.actions;
export default userSlice.reducer;
