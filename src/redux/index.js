import {configureStore} from "@reduxjs/toolkit";
import rootSaga from "./rootSaga";
import createSagaMiddleware from 'redux-saga';
import authSlice from "./reducer/authSlice";
import modalSlice from "./reducer/ModalReducer";
import productSlice from "./reducer/ProductReducer";
import staffsSlice from "./reducer/StaffReducer";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = {
    authSlice,
    modalSlice,
    productSlice,
    staffsSlice
}

export const store =  configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);