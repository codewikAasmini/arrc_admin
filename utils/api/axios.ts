import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosHeaders,
} from "axios";
import { store } from "../../redux/store";
import { APIBaseUrl } from "../constance";
import ShowToast from "@/components/Common/ShowToast";

const defaultAxios = axios.create({ baseURL: APIBaseUrl });

defaultAxios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  let { token } = store.getState()?.auth;
  if (token) {
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

defaultAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    // if (response && response.data?.code == 401) {
    //   ShowToast(response.data?.error, "error");
    //   localStorage.removeItem("persist:arrc");
    //   window.location.href = "/";
    // }
    return response;
  },
  (error) => {
    // if (
    //   (error.response && error.response?.status === 401) ||
    //   error.code === "ERR_NETWORK"
    // ) {
    //   ShowToast(error.response?.data?.message || "Network error", "error");
    //   localStorage.removeItem("persist:arrc");
    //   window.location.href = "/";
    // }
    return Promise.reject(error);
  }
);

export default defaultAxios;
