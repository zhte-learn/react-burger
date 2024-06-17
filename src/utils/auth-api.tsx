import { TUser } from "./auth-types";
import { BURGER_API_URL, BURGER_API_AUTH_URL } from "./api-settings";

function request(url: string, options: RequestInit) {
  return fetch(url, options).then(getResponse);
}

const getResponse = (res: Response) => {
  return res.json()
  .then(data => ({ status: res.status, body: data }))
  .then(({ status, body }) => {
    if (!res.ok) {
      return Promise.reject(body.message || `Ошибка ${status}`);
    }
    return body;
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

const refreshToken = (token: string) => {
  return request(`${BURGER_API_AUTH_URL}/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({token: token}),
  })
}

const getUserDetails = (token: string) => {
  return request(`${BURGER_API_AUTH_URL}/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`,
    }
  })
}

const updateUserDetails = (token: string, userData: TUser) => {
  return request(`${BURGER_API_AUTH_URL}/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  })
}

export const forgotPassword = (email: string) => {
  return request(`${BURGER_API_URL}/password-reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({email: email}),
  })
}

export const resetPassword = (password: string, token: string) => {
  return request(`${BURGER_API_URL}/password-reset/reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({password: password, token: token}),
  })
}

export const authApi = {
  register,
  login,
  logout,
  refreshToken,
  getUserDetails,
  updateUserDetails,
  forgotPassword,
  resetPassword,
};





// export const getUserDetails = (token: string) => {
//   return request(`${apiConfig.baseUrl}/user`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization' : `Bearer ${token}`,
//     }
//   })
// }

// export const updateUserDetails = (token: string, email: string, name: string) => {
//   return request(`${apiConfig.baseUrl}/user`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization' : `Bearer ${token}`,
//     }
//   })
// }






// export const resetPassword = (newPassword: string, token: string) => {
//   return request(`${apiConfig.baseUrl}/password-reset/reset`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({password: newPassword, token: token}),
//   })
// }



