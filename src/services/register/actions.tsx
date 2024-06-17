import { createAsyncThunk } from '@reduxjs/toolkit';
//import { registerUser } from '../../utils/auth-api';

interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}

// export const register = createAsyncThunk(
//   "auth/register",
//   async ({email, password, name}: RegisterPayload, thunkAPI) => {
//     try {
//       const res = await registerUser(email, password, name);
//       console.log("register res " + res)
//       return res;
//       //return await registerUser(email, password, name);
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
