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
  async ({ email, password, name }) => {
    const res = await api.register(email, password, name);
    localStorage.setItem("accessToken", res.accessToken.split('Bearer ')[1]);
    localStorage.setItem("refreshToken", res.refreshToken);
    return res;
  }
);

export const login = createAsyncThunk<TLoginResponse, LoginArgs>(
  "auth/login",
  async ({ email, password }) => {
    const res = await api.login(email, password);
    localStorage.setItem("accessToken", res.accessToken.split('Bearer ')[1]);
    localStorage.setItem("refreshToken", res.refreshToken);
    return res;
  }
);

export const logout = createAsyncThunk<void, void>(
  "user/logout",
  async() => {
    const token = localStorage.getItem("refreshToken");
    if(token) {
      const res = await api.logout(token);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return res;
    }
  }
);

export const refreshToken = createAsyncThunk<void, void> (
  "user/refreshToken",
  async() => {
    const token = localStorage.getItem("refreshToken");
    if(token) {
      const res = await api.refreshToken();
      localStorage.setItem("accessToken", res.accessToken.split('Bearer ')[1]);
      return res;
    }
  }
);

export const updateUserDetails = createAsyncThunk<void, TUser>(
  "auth/updateUserDetails",
  async(userData, { dispatch }) => {
    const token = localStorage.getItem("accessToken");
    if(token) {
      const res = await api.updateUserDetails(token, userData);
      dispatch(setUser({ ...res.user, password: '*****' }));
      return res;
    }
  }
)

export const checkUserAuth = createAsyncThunk<void, void> (
  "user/checkAuth",
  async (_, { dispatch }) => {
    const token = localStorage.getItem("accessToken");
    if(token) {
      const res = await api.getUserDetails(token);
      dispatch(setUser({...res.user, password: '*****'}));
    }
    dispatch(setAuthChecked(true));
  }
);

export const forgotPassword = createAsyncThunk<void, string>(
  "auth/forgotPassword",
  async (email, { dispatch }) => {
    return await api.forgotPassword(email);
  }
);

export const resetPassword = createAsyncThunk<void, ResetPasswordArgs>(
  "auth/resetPassword",
  async ({ password, token }) => {
    return await api.resetPassword(password, token);
  }
);
