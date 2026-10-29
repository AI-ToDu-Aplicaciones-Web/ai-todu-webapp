import { BaseApi } from '../../shared/infrastructure/base-api.js';
import { BaseEndpoint } from '../../shared/infrastructure/base-endpoint.js';

export class WarehouseApi extends BaseApi {
    #itemsEndpoint;

    constructor() {
        super();
        this.#itemsEndpoint = new BaseEndpoint(this, '/inventory-items');
    }

    getAllItems() {
        return this.#itemsEndpoint.getAll();
    }

    createItem(resource) {
        return this.#itemsEndpoint.create(resource);
    }

    updateItem(id, resource) {
        return this.#itemsEndpoint.update(id, resource);
    }
}