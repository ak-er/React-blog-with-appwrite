import { configureStore } from "@reduxjs/toolkit";
import {
  authReducer,
  postReducer,
  PostState,
  alertReducer,
  AlertState,
} from "./index";

interface User {
  $id: string;
  name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

interface RootState {
  auth: AuthState;
  posts: PostState;
  alert: AlertState;
}

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    alert: alertReducer,
  },
});

// export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
export type { RootState };
