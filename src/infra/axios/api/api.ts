import axios from "axios";

export const api = axios.create({
    baseURL: 'https://acessoaccount.herokuapp.com/api',
    headers: { 'Content-Type': 'application/json' }
});
