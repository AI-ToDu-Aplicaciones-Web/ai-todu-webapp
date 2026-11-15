import { Money } from '../../shared/domain/model/money.value-object.js';

export class CommercialTransaction {
    constructor({
                    id = '',
                    customerName = '',
                    sku = '',
                    itemName = '',
                    quantity = 1,
                    unitPrice = 0,
                    paymentStatus = 'PAID',
                    createdAt = new Date().toISOString()
                } = {}) {
        this._id = id || `trx-${Date.now()}`;
        this._customerName = customerName.trim();
        this._sku = sku.trim().toUpperCase();
        this._itemName = itemName.trim();
        this._quantity = Math.max(1, Number(quantity));
        const unitMoney = new Money({ amount: unitPrice, currency: 'PEN' });
        this._unitPrice = unitMoney.amount;
        const sub = unitMoney.multiply(this._quantity);
        this._subtotal = sub.amount;
        this._igv = sub.calculateIgv().amount;
        this._total = sub.withIgv().amount;
        this._paymentStatus = paymentStatus;
        this._createdAt = createdAt;
    }

    get id() { return this._id; }
    get customerName() { return this._customerName; }
    get sku() { return this._sku; }
    get itemName() { return this._itemName; }
    get quantity() { return this._quantity; }
    get unitPrice() { return this._unitPrice; }
    get subtotal() { return this._subtotal; }
    get igv() { return this._igv; }
    get total() { return this._total; }
    get paymentStatus() { return this._paymentStatus; }
    get createdAt() { return this._createdAt; }
}