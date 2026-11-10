import { InventoryItem } from '../domain/model/inventory-item.entity.js';
export class InventoryItemAssembler {
  static toEntityFromResource(resource) { return new InventoryItem(resource); }
  static toEntitiesFromResponse(response) { return (response.data.items || []).map(resource => this.toEntityFromResource(resource)); }
  static toCreateResource(form) {
    return {sku:form.sku,name:form.name,category:form.category,minimumStock:form.minimumStock,unitPrice:form.unitPrice};
  }
}
