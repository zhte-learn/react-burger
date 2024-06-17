import { BURGER_API_URL, BURGER_API_AUTH_URL } from "./api-settings";
import { TUser } from "./auth-types";


// const getResponse = (res: Response) => {
//   if(!res.ok) {
//     Promise.reject(res.status);
//   } 
//   return res.json();
// }

// function request2(url: string, options: RequestInit) {
//   return fetch(url, options).then(getResponse);
// }

const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

function request(url: string, options: RequestInit) {
  return fetch(url, options).then(checkResponse);
}

const fetchWithRefresh = async (url: string, options: RequestInit) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      const headers = new Headers(options.headers as HeadersInit);
      headers.set('authorization', refreshData.accessToken);
      //options.headers.authorization = refreshData.accessToken;
      //const res = await fetch(url, options); //повторяем запрос
      const res = await fetch(url, { ...options, headers });
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

const refreshToken = () => {
  return fetch(`${BURGER_API_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
  .then(checkResponse)
   // !! Важно для обновления токена в мидлваре, чтобы запись
   // была тут, а не в fetchWithRefresh
  .then((refreshData) => {
    if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
    localStorage.setItem("refreshToken", refreshData.refreshToken); 
    localStorage.setItem("accessToken", refreshData.accessToken);
    return refreshData;
  });
};

const getIngredientsRequest = () => {
  return request(`${BURGER_API_URL}/ingredients`, {
    method: 'GET',
  })
}

const getOrder = (data: string[]) => {
  return request(`${BURGER_API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ingredients: data}),
  })
}

const register = (email: string, password: string, name: string) => {
  return request(`${BURGER_API_AUTH_URL}/register`, {
    credentials: 'omit',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  });
}

const login = (email: string, password: string) => {
  return request(`${BURGER_API_AUTH_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({email: email, password: password}),
  })
}

const logout = (token: string) => {
  return request(`${BURGER_API_AUTH_URL}/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({token: token}),
  })
}

// const refreshToken = (token: string) => {
//   return request(`${BURGER_API_AUTH_URL}/token`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({token: token}),
//   })
// }

const getUserDetails = (token: string) => {
  return fetchWithRefresh(`${BURGER_API_AUTH_URL}/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`,
    }
  })
}

const updateUserDetails = (token: string, userData: TUser) => {
  return fetchWithRefresh(`${BURGER_API_AUTH_URL}/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  })
}

const forgotPassword = (email: string) => {
  return request(`${BURGER_API_URL}/password-reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({email: email}),
  })
}

const resetPassword = (password: string, token: string) => {
  return request(`${BURGER_API_URL}/password-reset/reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({password: password, token: token}),
  })
}

export const api = {
  getOrder,
  getIngredientsRequest,
  register,
  login,
  logout,
  refreshToken,
  getUserDetails,
  updateUserDetails,
  forgotPassword,
  resetPassword,
};