import { initialState, userSlice, setAuthChecked, setUser, clearStatus } from "./reducer";
import { register, login, logout, updateUserDetails, checkUserAuth } from "./actions";

const mockUser = {
  name: "Tom",
  email: "123@mail.ru",
  password: "123",
}

const mockLoginRequest = {
  accessToken: "Bearer testAccessToken",
  refreshToken: "testRefreshToken",
  user: {
    email: "123@mail.ru",
    name: "Tom",
  }
}

describe("user reducer", () => {
  test("initialize correctly", () => {
    const state = userSlice.reducer(undefined, { type: ""})
    expect(state).toEqual(initialState);
  });

  test("should set auth checking", ()=> {
    let isAuth = false;
    expect(userSlice.reducer(initialState, setAuthChecked(isAuth))).toEqual(
      { ...initialState, isAuthChecked: isAuth }
    )
  });

  test("should set user", ()=> {
    expect(userSlice.reducer(initialState, setUser(mockUser))).toEqual(
      { ...initialState, user: mockUser }
    )
  });

  test("should clear status", ()=> {
    expect(userSlice.reducer(initialState, clearStatus())).toEqual(
      { ...initialState, status: "idle" }
    )
  });

  test("user register fulfilled", () => {
    const action = { 
      type: register.fulfilled.type,
      payload: mockUser,
    };
    
    const state = userSlice.reducer(initialState, action);
    
    expect(state).toEqual(
      { ...initialState, 
        status: "success",
        error: null,
        user: {...mockUser.user, password: "*****"}
      }
    )  
  })

  test("register user pending", () => {
    const action = { type: register.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({...initialState, status: "loading"});
  })

  test("register user failed", () => {
    const action = { type: register.rejected.type, error: { message: "Test" } };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({...initialState, status: "failed", error: { message: "Test" }});
  })

  test("login fulfilled", () => {
    const action = { 
      type: login.fulfilled.type,
      payload: mockLoginRequest,
    };
    
    const state = userSlice.reducer(initialState, action);
    
    expect(state).toEqual(
      { ...initialState, 
        status: "success",
        error: null,
        user: {...mockLoginRequest.user, password: "*****"}
      }
    )  
  })

  test("login pending", () => {
    const action = { type: login.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({...initialState, status: "loading"});
  })

  test("login failed", () => {
    const action = { type: login.rejected.type, error: { message: "Test" } };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({...initialState, status: "failed", error: { message: "Test" }});
  })

  test("logout fulfilled", () => {
    const action = { type: logout.fulfilled.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({...initialState, user: null});
  })

  test("update user details fulfilled", () => {
    const action = { type: updateUserDetails.fulfilled.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({...initialState, status: "success"});
  })

  test("update user detail pending", () => {
    const action = { type: updateUserDetails.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({...initialState, status: "loading"});
  })

  test("update user detail failed", () => {
    const action = { type: updateUserDetails.rejected.type, error: { message: "Test" } };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({...initialState, status: "failed", error: { message: "Test" }});
  })
})
