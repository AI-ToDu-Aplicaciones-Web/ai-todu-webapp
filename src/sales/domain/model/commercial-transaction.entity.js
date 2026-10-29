import { Money } from '../../../shared/domain/model/money.value-object.js';

export class CommercialTransaction {
    _id;
    _customerName;
    _sku;
    _itemName;
    _quantity;
    _unitPrice;
    _subtotal;
    _igv;
    _total;
    _paymentStatus;
    _createdAt;

    constructor({
                    id = '',
                    customerName = '',
                    sku = '',
                    itemName = '',
                    quantity = 1,
                    unitPrice = 0,
                    paymentStatus = 'PAID',
                    createdAt = new Date().toISOString()
                }) {
        const sub = new Money(unitPrice).multiply(quantity);
        const tax = sub.calculateIgv(0.18);
        this._id = id || `trx-${Date.now()}`;
        this._customerName = customerName.trim() || 'Generic MYPE Client';
        this._sku = sku;
        this._itemName = itemName;
        this._quantity = Number(quantity);
        this._unitPrice = Number(unitPrice);
        this._subtotal = sub.amount;
        this._igv = tax.amount;
        this._total = Number((sub.amount + tax.amount).toFixed(2));
        this._paymentStatus = paymentStatus;
        this._createdAt = createdAt;
        Object.freeze(this);
    }

    get id() { return this._id; }
    get customerName() { return this._customerName; }
    get sku() { return this._sku; }
    get itemName() { return this._itemName; }
    get quantity() { return this._quantity; }
    get subtotal() { return this._subtotal; }
    get igv() { return this._igv; }
    get total() { return this._total; }
    get paymentStatus() { return this._paymentStatus; }
    get createdAt() { return this._createdAt; }

    toPrimitives() {
        return {
            id: this._id,
            customerName: this._customerName,
            sku: this._sku,
            itemName: this._itemName,
            quantity: this._quantity,
            unitPrice: this._unitPrice,
            subtotal: this._subtotal,
            igv: this._igv,
            total: this._total,
            paymentStatus: this._paymentStatus,
            createdAt: this._createdAt
        };
    }
}