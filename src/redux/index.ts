import { configureStore } from "@reduxjs/toolkit";
import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { useDispatch } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { AppMiddlewares, AppReducers } from "./redux-hooks";

const AppMiddlewareFunc = (
  getDefaultMiddleware: CurriedGetDefaultMiddleware<any>
) => {
  return getDefaultMiddleware({
    immutableCheck: false,
    serializableStateInvariant: false,
    actionCreatorInvariant: false,
  }).concat(AppMiddlewares);
};

export const AppStore = configureStore({
  reducer: AppReducers,
  middleware: (getDefaultMiddleware) => AppMiddlewareFunc(getDefaultMiddleware),
});

export type RootState = ReturnType<typeof AppStore.getState>;
export type AppDispatch = typeof AppStore.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
setupListeners(AppStore.dispatch);
