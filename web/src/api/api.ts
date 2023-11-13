import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
    baseURL: "http://172.17.0.231:8000", // https://rpb-shopping-deploy-4d6olwj6u-marios-projects-0da4102f.vercel.app
});

// Pega o token a cada requisição
api.interceptors.request.use((request) => {
    request.headers.Authorization = Cookies.get("token");
    return request;
});
