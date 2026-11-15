import { CommercialTransaction } from '../domain/model/commercial-transaction.entity.js';

export class TransactionAssembler {
    static toEntityFromResource(resource) {
        return new CommercialTransaction({
            id: resource.id,
            customerName: resource.customerName,
            sku: resource.sku,
            itemName: resource.itemName,
            quantity: resource.quantity,
            unitPrice: resource.unitPrice,
            paymentStatus: resource.paymentStatus,
            createdAt: resource.createdAt
        });
    }

    static toEntitiesFromResponse(response) {
        if (!response || !Array.isArray(response.data)) return [];
        return response.data.map(r => this.toEntityFromResource(r));
    }

    static toResourceFromEntity(entity) {
        return {
            id: entity.id,
            customerName: entity.customerName,
            sku: entity.sku,
            itemName: entity.itemName,
            quantity: entity.quantity,
            unitPrice: entity.unitPrice,
            subtotal: entity.subtotal,
            igv: entity.igv,
            total: entity.total,
            paymentStatus: entity.paymentStatus,
            createdAt: entity.createdAt
        };
    }
}