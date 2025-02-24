import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:1066/ecomm/api/v1",  
    withCredentials: true // Allow cookies & authentication headers
});

export default api;
