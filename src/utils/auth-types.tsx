export type TUser = {
    name: string;
    email: string;
    password: string,
}

export type TUserResponse = {
    user: TUser
}

export type TRegisterResponse = {
    success: boolean;
    accessToken: string;
    refreshToken: string;
    user: TUser;
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