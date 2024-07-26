const BURGER_API_URL = 'https://norma.nomoreparties.space/api/';
import { TUser, TResponse, TUserResponse, TIngredientsResponse, TOrderResponse, TConfirmOrderResponse, TResponseWithToken } from "./custom-types";

const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

const checkSuccess = async <T>(res: T): Promise<T> => {
  if (res && (res as any).success) {
    return res;
  }
  return Promise.reject(res);
};

const request = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${BURGER_API_URL}${endpoint}`, options);
  const data = await checkResponse<T>(response);
  return checkSuccess<T>(data);
};

const getIngredients = (): Promise<TIngredientsResponse> => {
  return request<TIngredientsResponse>('ingredients');
}

const refreshToken = (): Promise<TResponseWithToken> => {
  return request<TResponseWithToken>('auth/token', {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
  .then(refreshData => {
    localStorage.setItem("refreshToken", refreshData.refreshToken); 
    localStorage.setItem("accessToken", refreshData.accessToken);
    return refreshData;
  })
}

const fetchWithRefresh = <T>(endpoint: string, options: RequestInit): Promise<T> => {
  return request<T>(endpoint, options)
    .catch(error => {
      return new Promise<T>((resolve, reject) => {
        if (error.message === "jwt expired") {
          refreshToken()
            .then(refreshData => {
              const headers = new Headers(options.headers as HeadersInit);
              headers.set('authorization', refreshData.accessToken);
              return request<T>(endpoint, { ...options, headers });
            })
            .then(resolve)
            .catch(reject);
        } else {
          reject(error);
        }
      });
    });
}

const makeOrder = (data: string[], token: string): Promise<TConfirmOrderResponse> => {
  return request<TConfirmOrderResponse>('orders', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`,
    },
    body: JSON.stringify({
      ingredients: data,
    }),
  })
}

const getOrder = (orderNumber: string): Promise<TOrderResponse> => {
  return request<TOrderResponse>(`orders/${orderNumber}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  })
}

const register = (email: string, password: string, name: string): Promise<TResponseWithToken> => {
  return request<TResponseWithToken>('auth/register', {
    credentials: 'omit',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  });
}

const login = (email: string, password: string): Promise<TResponseWithToken> => {
  return request<TResponseWithToken>('auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({email: email, password: password}),
  })
}

const logout = (token: string): Promise<TResponse> => {
  return request<TResponse>('auth/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({token: token}),
  })
}

const getUserDetails = (token: string): Promise<TUserResponse> => {
  return fetchWithRefresh<TUserResponse>('auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`,
    }
  })
}

const updateUserDetails = (token: string, userData: TUser): Promise<TUserResponse> => {
  return fetchWithRefresh<TUserResponse>('auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  })
}

const forgotPassword = (email: string): Promise<TResponse> => {
  return request<TResponse>('password-reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({email: email}),
  })
}

const resetPassword = (password: string, token: string): Promise<TResponse> => {
  return request<TResponse>('password-reset/reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({password: password, token: token}),
  })
}

export const api = {
  makeOrder,
  getOrder,
  getIngredients,
  register,
  login,
  logout,
  refreshToken,
  getUserDetails,
  updateUserDetails,
  forgotPassword,
  resetPassword,
};
