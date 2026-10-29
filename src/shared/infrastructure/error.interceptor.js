export function errorInterceptor(error) {
    const status = error.response?.status || 'NETWORK_ERROR';
    const message = error.response?.data?.message || error.message || 'Unexpected API error';
    console.error(`[AI-ToDu API Error ${status}]: ${message}`);
    return Promise.reject(new Error(message));
}