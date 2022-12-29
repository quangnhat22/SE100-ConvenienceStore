import { configureStore } from "@reduxjs/toolkit";
import rootSaga from "./rootSaga";
import createSagaMiddleware from "redux-saga";
import authSlice from "./reducer/authSlice";
import modalSlice from "./reducer/ModalReducer";
import productSlice from "./reducer/ProductReducer";
import staffsSlice from "./reducer/StaffReducer";
import regulationSlice from "./reducer/RegulationSlice";
import productsSlice from "./reducer/ProductsReducer";
import deliveryNotesSlice from "./reducer/DeliveryNotesReducer";
import providerSlice from "./reducer/ProviderReducer";
import reportsSlice from "./reducer/ReportReducer";
import invoiceSlice from "./reducer/InvoiceReducer";
import productItemsExpireSlice from "./reducer/ProductExpireReducer";
import cartSlice from "./reducer/CartReducer";
import productItemsQuantitySlice from "./reducer/ProductItemQuantityReducer";
import editDeliveryNotesSlice from "./reducer/EditDeliveryNotesReducer";
import printInvoiceSlice from "./reducer/printInvoiceReducer";
import vatSlice from "./reducer/VatReducer";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = {
  authSlice,
  modalSlice,
  productSlice, // danh mục sản phẩm
  staffsSlice,
  regulationSlice,
  productsSlice,
  deliveryNotesSlice,
  providerSlice,
  reportsSlice,
  invoiceSlice,
  productItemsExpireSlice,
  productItemsQuantitySlice,
  cartSlice,
  editDeliveryNotesSlice,
  printInvoiceSlice,
  vatSlice,
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
