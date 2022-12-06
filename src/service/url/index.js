export const DOMAIN_NAME = "http://localhost";

// AUTH
export const URL_AUTH_LOGIN = `${DOMAIN_NAME}/auth/login`;
export const URL_FORGOT_PASSWORD = `${DOMAIN_NAME}/auth/forgot-password`;

//USERS
export const URL_USERS = `${DOMAIN_NAME}/users`;
export const URL_USERS_ID = (id) => `${DOMAIN_NAME}/users/${id}`;

//PROVIDERS
export const URL_PROVIDERS = `${DOMAIN_NAME}/providers`;
export const URL_PROVIDERS_ID = (id) => `${DOMAIN_NAME}/providers/${id}`;

// PRODUCTS - Dòng sản phẩm
export const URL_PRODUCTS = `${DOMAIN_NAME}/products`;
export const URL_PRODUCT_ID = (id) => `${DOMAIN_NAME}/products/${id}`;

// DELIVERY NOTES
export const URL_DELIVERY_NOTES = `${DOMAIN_NAME}/delivery-notes`;
export const URL_DELIVERY_NOTES_BY_ID = (id) =>
  `${DOMAIN_NAME}/delivery-notes/${id}`;

//PRODUCT-ITEMS - Sản phẩm
export const URL_PRODUCT_ITEM = `${DOMAIN_NAME}/product-item`;
export const URL_PRODUCT_ITEM_ID = (id) => `${DOMAIN_NAME}/product-item/${id}`;

//PRODUCT ITEM QUANTITY STATE RULE
export const URL_PRODUCT_ITEM_QUANTITY_STATE_RULE = `${DOMAIN_NAME}/product-item`;
export const URL_PRODUCT_ITEM_QUANTITY_STATE_RULE_ID = (id) => `${DOMAIN_NAME}/product-item/${id}`;
