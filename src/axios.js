import axios from "axios";

instance.interceptors.request.use(config => {
  config.headers.Authorization = window.localStorage.getItem("token");

  return config;
});

export default instance;
