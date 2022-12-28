export const DOMAIN_NAME = "http://localhost";

// AUTH
export const URL_AUTH_LOGIN = `${DOMAIN_NAME}/auth/login`;
export const URL_FORGOT_PASSWORD = `${DOMAIN_NAME}/auth/forgot-password`;
export const URL_RESET_PASSWORD = `${DOMAIN_NAME}/auth/reset-password`;

//USERS
export const URL_USERS = `${DOMAIN_NAME}/users`;
export const URL_USERS_ID = (id) => `${DOMAIN_NAME}/users/${id}`;

//PROVIDERS
export const URL_PROVIDERS = `${DOMAIN_NAME}/providers`;
export const URL_PROVIDERS_ID = (id) => `${DOMAIN_NAME}/providers/${id}`;

//PRODUCT OF PROVIDER 
export const URL_PRODUCT_OF_PROVIDER_ID = (id) => `${DOMAIN_NAME}/providers/products/${id}`; 
export const URL_PRODUCT_OF_PROVIDER_ID_ADD = (id) => `${DOMAIN_NAME}/providers/products/${id}/add`; 
export const URL_PRODUCT_OF_PROVIDER_ID_REMOVE = (id) => `${DOMAIN_NAME}/providers/products/${id}/remove`; 

// PRODUCTS - Dòng sản phẩm
export const URL_PRODUCTS = `${DOMAIN_NAME}/products`;
export const URL_PRODUCT_ID = (id) => `${DOMAIN_NAME}/products/${id}`;

// DELIVERY NOTES
export const URL_DELIVERY_NOTES = `${DOMAIN_NAME}/delivery-notes`;
export const URL_DELIVERY_NOTES_BY_ID = (id) =>
  `${DOMAIN_NAME}/delivery-notes/${id}`;

//PRODUCT-ITEMS - Sản phẩm
export const URL_PRODUCT_ITEM = `${DOMAIN_NAME}/product-items`;
export const URL_PRODUCT_ITEM_ID = (id) => `${DOMAIN_NAME}/product-items/${id}`;

//PRODUCT ITEM QUANTITY STATE RULE
export const URL_PRODUCT_ITEM_QUANTITY_STATE_RULE = `${DOMAIN_NAME}/product-item-quantity-state-rule`;
export const URL_PRODUCT_ITEM_QUANTITY_STATE_RULE_ID = (id) =>
  `${DOMAIN_NAME}/product-item-quantity-state-rule/${id}`;

//REPORT
export const URL_GET_REPORT_WEEK = (year, month, day) => `${DOMAIN_NAME}/report/week?year=${year}&month=${month}&day=${day}`;
export const URL_GET_REPORT_MONTH = (year, month) => `${DOMAIN_NAME}/report/month?year=${year}&month=${month}`;
export const URL_GET_REPORT_YEAR = (year) => `${DOMAIN_NAME}/report/year?year=${year}`;

//INVOICES
export const URL_POST_INVOICES = `${DOMAIN_NAME}/invoices`;
export const URL_GET_INVOICES = `${DOMAIN_NAME}/invoices`;
export const URL_GET_INVOICES_BY_ID = (id) => `${DOMAIN_NAME}/invoices/${id}`;

//PRODUCT_ITEM_EXPIRE
export const URL_PRODUCT_ITEM_EXPIRE_STATE = `${DOMAIN_NAME}/product-item-expire-state-rule`;
export const URL_PRODUCT_ITEM_EXPIRE_STATE_BY_ID = (id) =>
  `${DOMAIN_NAME}/product-item-expire-state-rule/${id}`;
