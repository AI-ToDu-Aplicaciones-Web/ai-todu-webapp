import { Money } from '../../../shared/domain/model/money.value-object.js';

/**
 * Aggregate Root: InventoryItem
 * Uses '_' prefix for internal fields to remain compatible with Vue 3 Proxy reactivity (ADR-0003).
 */
export class InventoryItem {
    _id;
    _sku;
    _name;
    _category;
    _location;
    _lotCode;
    _quantity;
    _minStock;
    _unitPrice;
    _status;

    constructor({
                    id = '',
                    sku = '',
                    name = '',
                    category = 'General',
                    location = 'Unassigned',
                    lotCode = 'LOT-DEFAULT',
                    quantity = 0,
                    minStock = 10,
                    unitPrice = 0,
                    status = 'AVAILABLE'
                }) {
        if (!sku || !sku.trim()) {
            throw new Error('SKU is mandatory for an Inventory Item (US02).');
        }
        this._id = id || `inv-${Date.now()}`;
        this._sku = sku.trim().toUpperCase();
        this._name = name.trim();
        this._category = category;
        this._location = location;
        this._lotCode = lotCode;
        this._quantity = Math.max(0, Number(quantity));
        this._minStock = Math.max(0, Number(minStock));
        this._unitPrice = new Money(unitPrice).amount;
        this._status = this.#evaluateDomainStatus(status);
        Object.freeze(this);
    }

    #evaluateDomainStatus(currentStatus) {
        if (currentStatus === 'QUARANTINE') return 'QUARANTINE';
        if (this._quantity === 0) return 'STOCK_OUT';
        if (this._quantity <= this._minStock) return 'LOW_STOCK';
        return 'AVAILABLE';
    }

    get id() { return this._id; }
    get sku() { return this._sku; }
    get name() { return this._name; }
    get category() { return this._category; }
    get location() { return this._location; }
    get lotCode() { return this._lotCode; }
    get quantity() { return this._quantity; }
    get minStock() { return this._minStock; }
    get unitPrice() { return this._unitPrice; }
    get status() { return this._status; }

    get canBeSold() {
        return this._status !== 'QUARANTINE' && this._quantity > 0;
    }

    withUpdatedStock(deltaQuantity) {
        const newQty = this._quantity + Number(deltaQuantity);
        if (newQty < 0) throw new Error('Insufficient stock for operation (US11).');
        return new InventoryItem({
            ...this.toPrimitives(),
            quantity: newQty,
            status: this._status === 'QUARANTINE' ? 'QUARANTINE' : 'AVAILABLE'
        });
    }

    withQuarantineToggled() {
        const nextStatus = this._status === 'QUARANTINE' ? 'AVAILABLE' : 'QUARANTINE';
        return new InventoryItem({ ...this.toPrimitives(), status: nextStatus });
    }

    toPrimitives() {
        return {
            id: this._id,
            sku: this._sku,
            name: this._name,
            category: this._category,
            location: this._location,
            lotCode: this._lotCode,
            quantity: this._quantity,
            minStock: this._minStock,
            unitPrice: this._unitPrice,
            status: this._status
        };
    }
}