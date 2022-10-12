import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { userSlice } from "./user/userSlice";
import { createWrapper } from "next-redux-wrapper";

  export const makeStore = () => {
    const store = configureStore({
      reducer: {
        [authSlice.name]: authSlice.reducer,
        [userSlice.name]: userSlice.reducer,
      },
      devTools: true,
    });
    return store;
  };

  export const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type Store = ReturnType<typeof store.getState>;
export type ReduxStore = typeof store;

export const wrapper = createWrapper<ReduxStore>(makeStore);