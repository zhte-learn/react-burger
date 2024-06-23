export type BurgerIngredient = {
  uniqueId?: string,
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export type TIngredientsResponse = {
  success: boolean;
  data: BurgerIngredient[];
}

export type TUser = {
  name: string;
  email: string;
  password?: string;
}

export type TUserResponse = {
  user: TUser
}

export type TRegisterResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: TUser;
  message: string;
}

export type TLoginResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: TUser;
  message: string;
}

export type TLogoutResponse = {
  success: boolean;
  message: string;
}

export type TUpdateResponse = {
  success: boolean;
  user: TUser;
}

export type TResetPasswordResponse = {
  success: boolean;
  message: string;
}