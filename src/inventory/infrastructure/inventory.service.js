import { httpClient } from '@/shared/infrastructure/http-client.js';
import { InventoryItem } from '../domain/model/item.entity.js';

export class InventoryService {
    async getItems() {
        try {
            const response = await httpClient.get('/items');
            // Data Mapper: JSON crudo a Entidad de Dominio
            return response.data.map(itemData => new InventoryItem(itemData));
        } catch (error) {
            console.error("Error conectando a la Fake API:", error);
            return [];
        }
    }
}