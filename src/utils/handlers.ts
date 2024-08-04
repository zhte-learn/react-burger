import { TBurgerIngredient, TOrder } from "./custom-types";

export function countIngredients(ingredients: string[]) {
  const dict = new Map<string, number>();
  
  ingredients.forEach(id => {
    if(!dict.has(id)) {
      dict.set(id, 0);
    }
    dict.set(id, dict.get(id)! + 1);
  })
  return dict;
}

export function countTotalPrice(ingredients: Map<string, number>, ingredientsMap: {[id: string]: TBurgerIngredient}) {
  let total = 0;
  ingredients.forEach((num, id) => {
    total += ingredientsMap[id].price * num;
  })
  return total;
}

export function getOrderByNumber(orders: TOrder[], orderNumer: string) {
  const res = orders.filter(item => item.number.toString() === orderNumer.toString());
  if(res.length === 0) {
    return null;
  } else {
    return res[0];
  }
}

