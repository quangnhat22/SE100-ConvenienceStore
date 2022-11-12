import {configureStore} from "@reduxjs/toolkit";
import rootSaga from "./rootSaga";
import createSagaMiddleware from 'redux-saga';


const sagaMiddleware = createSagaMiddleware();

const rootReducer = {
//   authentication: authReducer,
//   forgotRouter: forgotRouterReducer,
}

export const store =  configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);