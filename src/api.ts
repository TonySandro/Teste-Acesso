import axios from "axios";

const api = axios.create({
    baseURL: 'https://acessoaccount.herokuapp.com/api',
    // timeout: 1000,
    // headers: { 'X-Custom-Header': 'foobar' }
});

export { api }