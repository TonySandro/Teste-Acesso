import axios from "axios";

const api = axios.create({
    baseURL: 'localhos:5000',
    headers: { 'Content-Type': 'application/json' }
});

export { api }