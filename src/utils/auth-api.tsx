import { TUser } from "./auth-types";

const apiConfig = {
  baseUrl: "https://norma.nomoreparties.space/api/auth",
}

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

export const register = (email: string, password: string, name: string) => {
  return request(`${apiConfig.baseUrl}/register`, {
    credentials: 'omit',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  });
}

export const login = (email: string, password: string) => {
  return request(`${apiConfig.baseUrl}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({email: email, password: password}),
  })
}

export const logout = (token: string) => {
  return request(`${apiConfig.baseUrl}/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({token: token}),
  })
}

export const refreshToken = (token: string) => {
  return request(`${apiConfig.baseUrl}/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({token: token}),
  })
}

export const getUserDetails = (token: string) => {
  return request(`${apiConfig.baseUrl}/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`,
    }
  })
}

export const updateUserDetails = (token: string, userData: TUser) => {
  return request(`${apiConfig.baseUrl}/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  })
}


export const authApi = {
  register,
  login,
  logout,
  refreshToken,
  getUserDetails,
  updateUserDetails
};


// export const forgetPassword = () => {
//   return request(`${apiConfig.baseUrl}/password-reset`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({email: ""}),
//   })
// }


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



