const BASE_URL = "http://localhost:3000/api";

export const apiUrls = {
  PATIENT_FETCH_URL: BASE_URL + "/patient?pid=",
  ORDER_SUBMIT_URL: BASE_URL + "/submit-patient-order",
  ORDER_FETCH_URL: BASE_URL + "/fetch-patient-order",
  AUTH_LOGIN_URL: BASE_URL + "/login",
  MODE_URL: BASE_URL + "/mode",
  MEALS_URL: BASE_URL + "/meals",
  ADD_NEW_MEAL_URL: BASE_URL + "/add-meal",
  MENU_URL: BASE_URL + "/menu",
  ADD_MENU_ITEM_URL: BASE_URL + "/add-menu-item",
  MENUITEM_INSERT_BYNAME_URL: BASE_URL + "/add-menu-item-name",
};
