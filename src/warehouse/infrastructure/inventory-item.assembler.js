import { InventoryItem } from '../domain/model/inventory-item.entity.js';

export class InventoryItemAssembler {
    static toEntityFromResource(resource) {
        return new InventoryItem(resource);
    }

    static toEntitiesFromResponse(response) {
        const data = Array.isArray(response.data) ? response.data : [];
        return data.map(item => this.toEntityFromResource(item));
    }

    static toResourceFromEntity(entity) {
        return entity.toPrimitives();
    }
}