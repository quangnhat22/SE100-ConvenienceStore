import { call, put, takeLatest } from "redux-saga/effects";
import * as SagaActionTypes from "../constants/constant";
import { productActions } from "../reducer/ProductReducer";
import { ProductService } from "../../service/api/ProductApi";

// function* actGetListProducts() {
//   try {
//     yield put(productActions.getListProductsLoading());

//     let res = yield call(() => ProductsService.getProducts());
//     let {status, data} = res;
//     if (status === 200) {
//       yield put(
//         productActions.getListProductsSuccess({ products: data })
//       );
//     } else {
//       //yield put(authActions.requestLogFailed());
//     }
//   } catch (err) {
//     //yield put(authActions.requestLogFailed());
//   }
// }

function* actPostProduct(action) {
  try {
    let { newProduct } = action;
    //yield put(productActions.getListProductsLoading());
    let res = yield call(() => ProductService.postProduct(newProduct));
    if (res.status === 201) {
     // yield put({ type: SagaActionTypes.GET_LIST_PRODUCTS_SAGA });
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

// function* actPutProducts(action) {
//   try {
//     let { id, products } = action;

//     yield put(productsActions.getListProductsLoading());
//     let res = yield call(() => ProductsService.putProductsById(id, products));
//     if (res.status === 200) {
//       yield put({ type: SagaActionTypes.GET_LIST_PRODUCTS_SAGA });
//     } else {
//       //yield put(authActions.requestLogFailed());
//     }
//   } catch (err) {
//     //yield put(authActions.requestLogFailed());
//   }
// }

function* actDeleteProduct(action) {
  try {
    let { id } = action;
    //yield put(productActions.getListProductsLoading());

    let res = yield call(() => ProductService.deleteProductById(id));
    if (res.status === 200) {
      //yield put({ type: SagaActionTypes.GET_LIST_PRODUCTS_SAGA });
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

// function* actGetProductsById(action) {
//   try {
//     let { id } = action;
//     let res = yield call(() => ProductsService.getProductsById(id));
//     let {data, status} = res;
//     if (status === 200) {
//       yield put(productsActions.getProductsByIdSuccess({productsById : data}));
//     } else {
//       //yield put(authActions.requestLogFailed());
//     }
//   } catch (err) {
//     //yield put(authActions.requestLogFailed());
//   }
// }

// export function* followActGetListProducts() {
//   yield takeLatest(SagaActionTypes.GET_LIST_PRODUCTS_SAGA, actGetListProducts);
// }

export function* followActPostProducts() {
  yield takeLatest(SagaActionTypes.POST_PRODUCT_ITEM_SAGA, actPostProduct);
}

// export function* followActPutProducts() {
//   yield takeLatest(SagaActionTypes.PUT_PRODUCTS_SAGA, actPutProducts);
// }

export function* followActDeleteProducts() {
  yield takeLatest(SagaActionTypes.DELETE_PRODUCT_ITEM_SAGA, actDeleteProduct);
}

// export function* followActGetProductsById() {
//   yield takeLatest(SagaActionTypes.GET_PRODUCTS_BY_ID_SAGA, actGetProductsById);
// }
