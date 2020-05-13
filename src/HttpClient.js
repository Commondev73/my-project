import axios from "axios";

const axiosInstance = axios.create({
  headers: {
    "content-type": "application/json",
    "Accept": "application/json"
  }
});

const createRequestInterceptor = () => {
  return axiosInstance.interceptors.request.use(config => {
    config.headers.Authorization = getAccessToken()
      ? `Bearer ${getAccessToken()}`
      : "";
    return config;
  });
};

const createResponseInterceptor = () => {
  return axiosInstance.interceptors.response.use(
    response => response,
    errorHandler
  );
};

const errorHandler = error => {
  if (error.response.status !== 401) return Promise.reject(error);
  axios.interceptors.response.eject(createResponseInterceptor());
  return refreshAccessToken()
    .then(response => {
      localStorage.setItem("token", response.data.access_token);
      error.response.config.headers.Authorization = `Bearer ${response.data.access_token}`;
      return axios(error.response.config);
    })
    .catch(error => {
      localStorage.removeItem("token");
      window.location.href = "/login";
      return Promise.reject(error);
    })
    .finally(createResponseInterceptor());
};

const getAccessToken = () => {
  return localStorage.getItem("token");
};

const refreshAccessToken = async () => {
  const response = await axios.post("/api/token/refresh", {
    token: getAccessToken()
  });
  return response;
};

createRequestInterceptor();
createResponseInterceptor();

export const httpClient = axiosInstance;
