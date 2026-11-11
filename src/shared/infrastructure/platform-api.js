import { BaseApi } from './base-api.js';

export class PlatformApi extends BaseApi {
  constructor() {
    const apiBaseURL = import.meta.env.VITE_WAREHOUSE_API_URL ||
      (import.meta.env.PROD ? '/api/v1' : '/warehouse-api');
    super({ apiBaseURL, errorHandler: error => Promise.reject(error) });

    this.http.interceptors.request.use(config => {
      const token = sessionStorage.getItem('aitodu_token');
      if (token && !config.url.startsWith('/authentication/sign-')) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      config.headers['Accept-Language'] = document.documentElement.lang || 'en-US';
      return config;
    });
    this.http.interceptors.response.use(response => response, error => {
      if (error.response?.status === 401 && !error.config?.url?.startsWith('/authentication/sign-')) {
        window.dispatchEvent(new Event('aitodu:session-expired'));
      }
      return Promise.reject(error);
    });
  }
}
