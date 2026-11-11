import { PlatformApi } from '../../shared/infrastructure/platform-api.js';
import { BaseEndpoint } from '../../shared/infrastructure/base-endpoint.js';

export class WarehouseApi extends PlatformApi {
  #items;
  constructor() {
    super();
    this.#items=new BaseEndpoint(this,'/inventory-items');
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
