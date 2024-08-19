let apiUrl =
  process.env.REACT_APP_IS_DEVELOPMENT === "true"
    ? process.env.REACT_APP_DEV_API_URL
    : process.env.REACT_APP_PRO_API_URL;

export default apiUrl;
