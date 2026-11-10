import { BaseApi } from '../../shared/infrastructure/base-api.js';
import { BaseEndpoint } from '../../shared/infrastructure/base-endpoint.js';

export class WarehouseApi extends BaseApi {
  #items;
  constructor() {
    super({apiBaseURL:import.meta.env.VITE_WAREHOUSE_API_URL || (import.meta.env.PROD ? '/api/v1' : '/warehouse-api'),errorHandler:error=>Promise.reject(error)});
    this.#items=new BaseEndpoint(this,'/inventory-items');
    this.http.interceptors.request.use(config => {
      const token=sessionStorage.getItem('aitodu_token');
      if(token) config.headers.Authorization=`Bearer ${token}`;
      config.headers['Accept-Language']=document.documentElement.lang || 'en-US';
      return config;
    });
    this.http.interceptors.response.use(response=>response,error=>{
      if(error.response?.status===401)window.dispatchEvent(new Event('aitodu:session-expired'));
      return Promise.reject(error);
    });
  }
  getSession(){return this.http.get('/warehouse/session');}
  getAllItems(params){return this.#items.getAll(params);}
  getItem(id){return this.#items.getById(id);}
  createItem(resource){return this.#items.create(resource);}
  receiveLot(id,resource){return this.http.post(`/inventory-items/${id}/lots`,resource);}
  recordMovement(id,resource){return this.http.post(`/inventory-items/${id}/movements`,resource);}
  registerCount(id,resource){return this.http.post(`/inventory-items/${id}/counts`,resource);}
  classifyReturn(id,resource){return this.http.post(`/inventory-items/${id}/returns`,resource);}
  changeQuarantine(id,lotId,resource){return this.http.patch(`/inventory-items/${id}/lots/${lotId}/quarantine`,resource);}
  relocateLot(id,lotId,resource){return this.http.patch(`/inventory-items/${id}/lots/${lotId}/location`,resource);}
}
