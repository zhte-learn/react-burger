import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';
import { TUser, TRegisterResponse, TLoginResponse, TUpdateResponse } from '../../utils/custom-types';
import { setAuthChecked, setUser } from './reducer';

interface RegisterArgs {
  email: string;
  password: string;
  name: string;
}

interface LoginArgs {
  email: string;
  password: string;
}

interface ResetPasswordArgs {
  password: string;
  token: string;
}

export const register = createAsyncThunk<TRegisterResponse, RegisterArgs>(
  "auth/register",
  async ({ email, password, name }, { rejectWithValue }) => {
    return await api.register(email, password, name)
      .then(res => {
        localStorage.setItem("accessToken", res.accessToken.split('Bearer ')[1]);
        localStorage.setItem("refreshToken", res.refreshToken);
        return res;
      })
      .catch(error => rejectWithValue(error))
  }
);

export const login = createAsyncThunk<TLoginResponse, LoginArgs>(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    return await api.login(email, password)
      .then(res => {
        localStorage.setItem("accessToken", res.accessToken.split('Bearer ')[1]);
        localStorage.setItem("refreshToken", res.refreshToken);
        return res;
      })
      .catch(error => rejectWithValue(error))
  }
);

export const logout = createAsyncThunk<void, void>(
  "user/logout",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("refreshToken");
    if(token) {
      return await api.logout(token)
        .then(res => res)
        .catch(error => rejectWithValue(error))
        .finally(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        })
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  }
);

export const refreshToken = createAsyncThunk<void, void> (
  "user/refreshToken",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("refreshToken");
    if(token) {
      return await api.refreshToken()
        .then(res => localStorage.setItem("accessToken", res.accessToken.split('Bearer ')[1]))
        .catch(error => rejectWithValue(error))
    }
  }
);

export const updateUserDetails = createAsyncThunk<void, TUser>(
  "auth/updateUserDetails",
  async(userData, { dispatch, rejectWithValue}) => {
    const token = localStorage.getItem("accessToken");
    if(token) {
      api.updateUserDetails(token, userData)
        .then(res => dispatch(setUser({ ...res.user, password: '*****' })))
        .catch(error => rejectWithValue(error))
    }
  }
)

export const checkUserAuth = createAsyncThunk<void, void> (
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
  async (email, { rejectWithValue, dispatch }) => {
    return await api.forgotPassword(email)
      .then(res => res)
      .catch(error => rejectWithValue(error))
  }
);

export const resetPassword = createAsyncThunk<void, ResetPasswordArgs>(
  "auth/resetPassword",
  async ({ password, token }, { rejectWithValue, dispatch }) => {
    return await api.resetPassword(password, token)
    .then(res => res)
    .catch(error => rejectWithValue(error))
  }
);
