import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
    baseURL: "http://localhost:8000",
});

// Pega o token a cada requisição
api.interceptors.request.use((request) => {
    request.headers.Authorization = Cookies.get("token");
    return request;
});
