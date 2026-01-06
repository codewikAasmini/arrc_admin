import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import rootReducer from "./rootReducer";


const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const createWebStorage = (type: "local" | "session") => {
  const storage = type === "local" ? localStorage : sessionStorage;
  return {
    getItem: (key: string) => Promise.resolve(storage.getItem(key)),
    setItem: (key: string, value: string) => {
      storage.setItem(key, value);
      return Promise.resolve();
    },
    removeItem: (key: string) => {
      storage.removeItem(key);
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();


const persistConfig = {
  key: "Arrc",
  storage,
  whitelist: ["auth"],
  blacklist: ["loader"], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
