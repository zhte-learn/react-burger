const apiConfig = {
  baseUrl: "https://norma.nomoreparties.space/api",
}

function request(url: string, options: RequestInit) {
  return fetch(url, options).then(getResponse);
}

const getResponse = (res: Response) => {
  if(!res.ok) {
    //throw new Error(`${res.status}`);
    Promise.reject(`Ошибка ${res.status}`);
  }
  return res.json();
}

export const getIngredientsRequest = () => {
  return request(`${apiConfig.baseUrl}/ingredients`, {
    method: 'GET',
  })
}

export const getOrder = (data: string[]) => {
  return request(`${apiConfig.baseUrl}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ingredients: data}),
  })
}