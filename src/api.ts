import axios from "axios";

const api = axios.create({
    baseURL: 'https://acessoaccount.herokuapp.com/api',
    headers: { 'Content-Type': 'application/json' }
});

export { api }