import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../utils/auth-api';
import { TUser, TRegisterResponse, TLoginResponse, TLogoutResponse, TUpdateResponse } from '../../utils/auth-types';
import { setAuthChecked, setUser } from './reducer';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { AppDispatch } from '../store';

interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

export const register = createAsyncThunk<TRegisterResponse, RegisterPayload>(
  "auth/register",
  async ({email, password, name}, thunkAPI) => {
    try {
      const res = await authApi.register(email, password, name);
      localStorage.setItem("accessToken", res.accessToken.split('Bearer ')[1]);
      localStorage.setItem("refreshToken", res.refreshToken);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk<TLoginResponse, LoginPayload>(
  "auth/login",
  async ({email, password}, thunkAPI) => {
    try {
      const res = await authApi.login(email, password);
      localStorage.setItem("accessToken", res.accessToken.split('Bearer ')[1]);
      localStorage.setItem("refreshToken", res.refreshToken);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        await authApi.logout(token);
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'An error occurred while logging out');
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  }
);

export const refreshToken = createAsyncThunk<void, void> (
  "user/refreshToken",
  async () => {
    const token = localStorage.getItem("refreshToken");
    if(token) {
      authApi.refreshToken(token)
        .then(res => localStorage.setItem("accessToken", res.accessToken.split('Bearer ')[1]))
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        })
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  }
);


export const updateUserDetails = createAsyncThunk<void, TUser, {dispatch: AppDispatch}>(
  "auth/updateUserDetails",
  async(userData, { dispatch, rejectWithValue }) => {
    try{
      const token = localStorage.getItem("accessToken");
      if(token) {
        const res = await authApi.updateUserDetails(token, userData);
        dispatch(setUser({ ...res.user, password: '*****' }));
        authApi.updateUserDetails(token, userData)
      } else {
        return rejectWithValue('Token not found');
      }
    } catch(error: any) {
      return rejectWithValue(error.message || 'An error occurred while updating user details');
    }
  }
)

export const checkUserAuth = createAsyncThunk<void, void, {dispatch: AppDispatch}> (
  "user/checkAuth",
  async (_, { dispatch }) => {
    const token = localStorage.getItem("accessToken");
    if(token) {
      authApi.getUserDetails(token)
        .then(res => dispatch(setUser({...res.user, password: '*****'})))
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  }
);

// export const refreshToken = createAsyncThunk<void, string>(
//   "auth/refreshToken",
//   async (_, thunkAPI) => {
//     try {
//       const token = localStorage.getItem("refreshToken");
//       if(token) {
//         const res = await authApi.refreshToken(token);
//         localStorage.setItem("accessToken", res.accessToken.split('Bearer ')[1]);
//         return res;
//       } else {
//         throw new Error("Token not found");
//       }
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.message || 'Failed to update user details');
//     }
//   }
// );

// export const logout = createAsyncThunk<TLogoutResponse, string>(
//   "auth/logout",
//   async (token: string, thunkAPI) => {
//     try {
//       const res = await authApi.logout(token);
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");
//       return res;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
