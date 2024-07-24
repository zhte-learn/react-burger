export type TBurgerIngredient = {
  uniqueId?: string,
  _id: string;
  name: string;
  type: "bun" | "main" | "sause";
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

export type TUser = {
  name: string;
  email: string;
  password?: string;
}

export type TResponse = {
  success: boolean;
  message: string;
}

export type TIngredientsResponse = Omit<TResponse, 'message'> & { data: Array<TBurgerIngredient> };
export type TConfirmOrderResponse = Omit<TResponse, 'message'> & { name: string; order: { number : string}; };
export type TUserResponse = TResponse & { user: TUser };
export type TResponseWithToken = TUserResponse & { accessToken: string; refreshToken: string; };
export type TOrderResponse = Omit<TResponse, 'message'> & { orders: TOrder[]};

export type TUserForm = {
  name: string;
  email: string;
  password: string;
}

export type TForgotForm = Pick<TUserForm, "email">;
export type TResetForm = Pick<TUserForm, "password"> & { token: string; };
export type TLoginForm = Pick<TUserForm, "email" | "password">;

export type TOrder = {
  ingredients: string[];
  _id: string;
  status: string;
  number: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
