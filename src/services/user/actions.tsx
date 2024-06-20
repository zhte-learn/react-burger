import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';
import { TUser, TRegisterResponse, TLoginResponse, TUpdateResponse } from '../../utils/auth-types';
import { setAuthChecked, setUser } from './reducer';
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

interface ResetPayload {
  password: string;
  token: string;
}

export const register = createAsyncThunk<TRegisterResponse, RegisterPayload>(
  "auth/register",
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const res = await api.register(email, password, name);
      localStorage.setItem("accessToken", res.accessToken.split('Bearer ')[1]);
      localStorage.setItem("refreshToken", res.refreshToken);
      return res;
    } catch(err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const login = createAsyncThunk<TLoginResponse, LoginPayload>(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.login(email, password);
      localStorage.setItem("accessToken", res.accessToken.split('Bearer ')[1]);
      localStorage.setItem("refreshToken", res.refreshToken);
      return res;
    } catch(err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const logout = createAsyncThunk<void, void>(
  "user/logout",
  async () => {
    const token = localStorage.getItem("refreshToken");
    if(token) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      const res = await api.logout(token);
      return res;
    } else {
      console.log('An error occurred while logging out');
    }
  }
);

export const refreshToken = createAsyncThunk<void, void> (
  "user/refreshToken",
  async () => {
    const token = localStorage.getItem("refreshToken");
    if(token) {
      api.refreshToken()
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

export const updateUserDetails = createAsyncThunk<TUpdateResponse, TUser, {dispatch: AppDispatch}>(
  "auth/updateUserDetails",
  async(userData, { dispatch }) => {
    const token = localStorage.getItem("accessToken");
    if(token) {
      const res = await api.updateUserDetails(token, userData);
      dispatch(setUser({ ...res.user, password: '*****' }));
      return res;
    } else {
      console.log('Token not found');
    }
  }
)

export const checkUserAuth = createAsyncThunk<void, void, {dispatch: AppDispatch}> (
  "user/checkAuth",
  async (_, { dispatch }) => {
    const token = localStorage.getItem("accessToken");
    if(token) {
      api.getUserDetails(token)
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

export const forgotPassword = createAsyncThunk<void, string>(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      return await api.forgotPassword(email);
    } catch(error: any) {
      return rejectWithValue(error.message);
    }
  }
);


export const resetPassword = createAsyncThunk<void, ResetPayload>(
  "auth/resetPassword",
  async ({ password, token }, { rejectWithValue }) => {
    try {
      const res = await api.resetPassword(password, token);
      return res;
    } catch(error: any) {
      return rejectWithValue(error);
    }
  }
);

// export const resetPassword = createAsyncThunk<void, ResetPayload>(
//   "auth/resetPassword",
//   async ({password, token}, { rejectWithValue }) => {
//     const res = await api.resetPassword(password, token);
//     if(res.success) {
//       return res;
//     } else {
//       console.log(res.message)
//       return rejectWithValue(res.message);
//     }
//   }
// );

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
