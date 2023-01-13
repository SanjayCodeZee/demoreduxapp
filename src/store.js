import { createStore ,compose, applyMiddleware } from "redux";
import rootReducer from "./services/reducers/index";
import ReduxThunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from 'redux-persist';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistConfig = {
    key: 'persist-root',
    storage,
}

const persistedReducer = persistReducer(persistConfig,rootReducer);

const store = createStore(
    persistedReducer,
    composeEnhancer(applyMiddleware(ReduxThunk)),
);

export default store;
export const persistor = persistStore(store);