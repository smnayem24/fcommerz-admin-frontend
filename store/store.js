import { userReducer } from "@/reducer";
import {
    combineReducers,
    configureStore,
} from "@reduxjs/toolkit";
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
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";


const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user"],
};


const userPersistConfig = {
    key: "user",
    storage,
};


const rootReducers = combineReducers({
    user: persistReducer(userPersistConfig, userReducer),
});
const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            FLUSH,
            REHYDRATE,
            PAUSE,
            PERSIST,
            PURGE,
            REGISTER
          ],
        },
      }),
});

export let persitor = persistStore(store);