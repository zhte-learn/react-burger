const BURGER_API_URL = 'https://norma.nomoreparties.space/api/';
import { TUser } from "./custom-types";

const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

const checkSuccess = async (res: any) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(res);
};

const request = (endpoint: string, options?: RequestInit) => {
  return fetch(`${BURGER_API_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};

const getIngredients = () => {
  return request('ingredients');
}

const refreshToken = () => {
  return request('auth/token', {
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

const fetchWithRefresh = (endpoint: string, options: RequestInit) => {
  return request(endpoint, options)
    .catch(error => {
      refreshToken()
        .then(refreshData => {
          if (error.message === "jwt expired") {
            const headers = new Headers(options.headers as HeadersInit);
            headers.set('authorization', refreshData.accessToken);
            return request(endpoint, { ...options, headers });
          } else {
            return Promise.reject(error);
          }
        })
    })
}

const getOrder = (data: string[]) => {
  return request('orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ingredients: data}),
  })
}

const register = (email: string, password: string, name: string) => {
  return request('auth/register', {
    credentials: 'omit',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  });
}

const login = (email: string, password: string) => {
  return request('auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({email: email, password: password}),
  })
}

const logout = (token: string) => {
  return request('auth/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({token: token}),
  })
}

const getUserDetails = (token: string) => {
  return fetchWithRefresh('auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`,
    }
  })
}

const updateUserDetails = (token: string, userData: TUser) => {
  return fetchWithRefresh('auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  })
}

const forgotPassword = (email: string) => {
  return request('password-reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({email: email}),
  })
}

const resetPassword = (password: string, token: string) => {
  return request('password-reset/reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({password: password, token: token}),
  })
}

export const api = {
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
