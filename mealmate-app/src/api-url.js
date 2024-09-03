const BASE_URL = "http://172.16.51.191:3001/api";

export const apiUrls = {
  FETCH_PATIENT_URL: BASE_URL + "/patient?pid=",
  SUBMIT_PATIENT_ORDER_URL: BASE_URL + "/submit-patient-order",
  FETCH_PATIENT_ORDER__URL: BASE_URL + "/fetch-patient-order",
  AUTH_LOGIN_URL: BASE_URL + "/login",
  FETCH_API_MODE_URL: BASE_URL + "/mode",
  FETCH_MEALS_URL: BASE_URL + "/meals",
  ADD_NEW_MEAL_URL: BASE_URL + "/add-meal",
  FETCH_MENU_URL: BASE_URL + "/menu",
  DELETE_MENU_URL: BASE_URL + "/menu",
  ADD_MENU_ITEM_URL: BASE_URL + "/add-menu-item",
  ADD_MENUITEM_BYNAME_URL: BASE_URL + "/add-menu-item-name",
  FETCH_DAY_WEEK_URL: BASE_URL + "/day-week",
};
