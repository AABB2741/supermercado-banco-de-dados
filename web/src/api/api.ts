import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
    baseURL: "http://localhost:8000",
});

api.interceptors.request.use((request) => {
    request.headers.Authorization = Cookies.get("token");
    return request;
});
