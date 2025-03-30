
import { deleteFromLocal } from "@/util/util";
import axios from "axios";

const baseURL = 'https://hissing-christie-personal-2-38808a4c.koyeb.app'
// const baseURL = 'http://localhost:3001'


const apiClient = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("jwt_access_token");
        if (!config.headers) {
            // config.headers = {};
        }
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    response => {

        console.log({ response });

        return response
    },
    error => {
        console.log(error);

        if (error.response && (error.response.status === 403 || error.response.status === 401)) {
            deleteFromLocal('jwt_access_token');
            // window.location.href = `/auth/login`;
        }
        return Promise.reject(error);
    }
)

export default apiClient;
