import axios from 'axios';
import { errorInterceptor } from './error.interceptor.js';

const baseURL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? '/api/v1' : 'http://localhost:3000/api/v1');

export class BaseApi {
    #http;

    constructor() {
        this.#http = axios.create({
            baseURL,
            headers: { 'Content-Type': 'application/json' }
        });
        this.#http.interceptors.response.use(response => response, errorInterceptor);
    }

    get http() {
        return this.#http;
    }
}