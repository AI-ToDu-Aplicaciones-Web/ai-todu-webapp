import { PlatformApi } from '../../shared/infrastructure/platform-api.js';

export class SalesApi extends PlatformApi {
  customers(search) { return this.http.get('/customers', { params: { search } }); }
  addCustomer(name) { return this.http.post('/customers', { name }); }
  history(params) { return this.http.get('/transactions',{params}); }
  checkout(resource) { return this.http.post('/transactions', resource); }
  cancel(id) { return this.http.post(`/transactions/${id}/cancel`); }
  pay(id,reference) { return this.http.post(`/transactions/${id}/payment`,{reference}); }
  receipt(id) { return this.http.get(`/transactions/${id}/receipt`); }
  recordReturn(id, resource) { return this.http.post(`/transactions/${id}/returns`, resource); }
}
