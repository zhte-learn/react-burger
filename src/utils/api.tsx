const apiConfig = {
  baseUrl: "https://norma.nomoreparties.space/api",
}

const getResponse = (res: Response) => {
  if(!res.ok) {
    //throw new Error(`${res.status}`);
    Promise.reject(`Ошибка ${res.status}`);
  }
  return res.json();
}

export const getIngredientsRequest = () => {
  return fetch(`${apiConfig.baseUrl}/ingredients`, {
    method: 'GET',
  })
  .then(getResponse);
}

export const getOrder = (data: string[]) => {
  return fetch(`${apiConfig.baseUrl}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ingredients: data}),
  })
  .then(getResponse);
}