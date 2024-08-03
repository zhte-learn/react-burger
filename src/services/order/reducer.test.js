import { initialState, orderSlice } from "./reducer";
import { placeOrder, getOrderByNumber } from "./actions";

const mockOrderConfirm = {
  name: "The best burger forever", 
  order: {
    number: "123",
  }
};

const mockOrderByNumber = {
  orders: [
    {_id: "66abb8c3119d45001b4fcee2"}
  ],
};

describe("order reducer", () => {
  test("initialize correctly", () => {
    const state = orderSlice.reducer(undefined, { type: ""})
    expect(state).toEqual(initialState);
  })

  test("place order fullfilled", () => {
    const action = { 
      type: placeOrder.fulfilled.type,
      payload: mockOrderConfirm,
    };
    
    const state = orderSlice.reducer(initialState, action);
    
    expect(state).toEqual(
      { ...initialState, 
        orderStatus: "success", 
        orderError: null,
        orderName: mockOrderConfirm.name,
        orderNumber: mockOrderConfirm.order.number,
      }
    )  
  })

  test("place order pending", () => {
    const action = { type: placeOrder.pending.type };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({...initialState, orderStatus: "loading"});
  })

  test("place order failed", () => {
    const action = { type: placeOrder.rejected.type, error: { message: "Test" } };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({...initialState, orderStatus: "failed", orderError: { message: "Test" }});
  })

  test("get order by number fullfilled", () => {
    const action = { 
      type: getOrderByNumber.fulfilled.type,
      payload: mockOrderByNumber,
    };
    
    const state = orderSlice.reducer(initialState, action);
    
    expect(state).toEqual(
      { ...initialState, 
        orderStatus: "success", 
        orderError: null,
        currentOrder: mockOrderByNumber.orders[0],
      }
    )  
  })

  test("get order by number pending", () => {
    const action = { type: getOrderByNumber.pending.type };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({...initialState, orderStatus: "loading"});
  })

  test("get order by number failed", () => {
    const action = { type: getOrderByNumber.rejected.type, error: { message: "Test" } };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({...initialState, orderStatus: "failed", orderError: { message: "Test" }});
  })
})
