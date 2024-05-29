const apiConfig = {
  baseUrl: "https://norma.nomoreparties.space/api",
}

const getResponse = (res: Response) => {
  if(!res.ok) {
    throw new Error(`${res.status}`);
  }
  return res.json();
}

export const getIngredientsRequest = () => {
  return fetch(`${apiConfig.baseUrl}/ingredients`, {
    method: 'GET',
  })
  .then(getResponse);
}