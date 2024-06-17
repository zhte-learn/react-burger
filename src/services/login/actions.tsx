import { createAsyncThunk } from '@reduxjs/toolkit';
//import { login } from '../../utils/auth-api';

interface LoginPayload {
  email: string;
  password: string;
}

// export const loginUser = createAsyncThunk(
//   "auth/login",
//   async ({email, password}: LoginPayload, thunkAPI) => {
//     try {
//       return await login(email, password);
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
