import { configureStore } from "@reduxjs/toolkit";
import reduxStorage from "./storage";
import rootReducer from "./rootReducer";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage: reduxStorage,
  blacklist: ["user"],
  whitelist: ["theme"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const getEnhancers = (getDefaultEnhancers: any) => {
  if (process.env.NODE_ENV === 'development') {
    const reactotron = require('./ReactotronConfig').default;
    return getDefaultEnhancers().concat(reactotron.createEnhancer());
  }
  return getDefaultEnhancers();
};



export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  enhancers: getEnhancers,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
