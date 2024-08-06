import {
  initialState,
  wsOpenAuth,
  wsCloseAuth,
  wsMessageAuth,
  wsErrorAuth,
  feedProfileSlice
} 
from './reducer';

const ordersTest = [
  {
    _id: "66a8ce35119d45001b4fc7d4",
    ingredients: ["643d69a5c3f7b9001cfa093d", "643d69a5c3f7b9001cfa093d"],
    status: "done",
    name:"Флюоресцентный бургер",
    createdAt:"2024-07-30T11:27:49.794Z",
    updatedAt:"2024-07-30T11:27:50.269Z",
    number: "47839",
  },
  {
    _id: "66a8cdef119d45001b4fc7d3",
    ingredients: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0943", "643d69a5c3f7b9001cfa0940", "643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa093e", "643d69a5c3f7b9001cfa093f", "643d69a5c3f7b9001cfa093c"],
    status: "done",
    name:"Space краторный люминесцентный бессмертный био-марсианский метеоритный бургер",
    createdAt:"2024-07-30T11:26:39.588Z",
    updatedAt:"2024-07-30T11:26:40.130Z",
    number: "47838",
  },
  {
    _id: "66a8cd6d119d45001b4fc7cf",
    ingredients: ["643d69a5c3f7b9001cfa093d", "643d69a5c3f7b9001cfa093d", "643d69a5c3f7b9001cfa093e"],
    status: "done",
    name:"Флюоресцентный люминесцентный бургер",
    createdAt:"2024-07-30T11:24:29.469Z",
    updatedAt:"2024-07-30T11:24:29.981Z",
    number: "47837",
  }
];

describe("feed profile reducer", () => {
  it("initialize correctly", () => {
    const state = feedProfileSlice.reducer(undefined, { type: ""})
    expect(state).toEqual(initialState);
  })
})

test("should open ws connection", ()=> {
  expect(feedProfileSlice.reducer(initialState, wsOpenAuth())).toEqual(
    { ...initialState, status: "online", connectionError: null }
  )
});

test("should close ws connection", ()=> {
  expect(feedProfileSlice.reducer(initialState, wsCloseAuth())).toEqual(
    { ...initialState, status: "offline" }
  )
});

test("should set error message", ()=> {
  expect(feedProfileSlice.reducer(initialState, wsErrorAuth("Error 404"))).toEqual(
    { ...initialState, connectionError: "Error 404" }
  )
});

test("should update state with data received through websocket", ()=> {
  expect(feedProfileSlice.reducer(
    initialState, 
    wsMessageAuth({ orders: ordersTest, total: "3", totalToday: "3" }))).toEqual(
      { ...initialState, orders: ordersTest, total: "3", totalToday: "3" }
    )
});
