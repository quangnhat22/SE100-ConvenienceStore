import {configureStore} from "@reduxjs/toolkit";
import rootSaga from "./rootSaga";
import createSagaMiddleware from 'redux-saga';
import authSlice from "./reducer/authSlice";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = {
    authSlice,
}

export const store =  configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);