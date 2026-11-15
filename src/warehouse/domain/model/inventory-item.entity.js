import { Money } from '../../shared/domain/model/money.value-object.js';

export class InventoryItem {
  constructor({
                id = '',
                sku = '',
                name = '',
                category = 'General',
                location = 'Aisle A - Shelf 01',
                lotCode = 'LOT-2026-01',
                quantity = 0,
                minStock = 10,
                unitPrice = 0,
                status = 'AVAILABLE'
              } = {}) {
    this._id = id || `inv-${Date.now()}`;
    this._sku = sku.trim().toUpperCase();
    this._name = name.trim();
    this._category = category;
    this._location = location;
    this._lotCode = lotCode;
    this._quantity = Number(quantity);
    this._minStock = Number(minStock);
    this._unitPrice = new Money({ amount: unitPrice, currency: 'PEN' });
    this._status = status;
    this.recalculateStatus();
  }

  get id() { return this._id; }
  get sku() { return this._sku; }
  get name() { return this._name; }
  get category() { return this._category; }
  get location() { return this._location; }
  get lotCode() { return this._lotCode; }
  get quantity() { return this._quantity; }
  get minStock() { return this._minStock; }
  get unitPrice() { return this._unitPrice.amount; }
  get formattedPrice() { return this._unitPrice.format(); }
  get status() { return this._status; }

  get canBeDispatched() {
    return this._status !== 'QUARANTINE' && this._quantity > 0;
  }

  recalculateStatus() {
    if (this._status === 'QUARANTINE') return;
    if (this._quantity <= 0) {
      this._quantity = 0;
      this._status = 'STOCK_OUT';
    } else if (this._quantity <= this._minStock) {
      this._status = 'LOW_STOCK';
    } else {
      this._status = 'AVAILABLE';
    }
  }

  deductStock(amount) {
    const qty = Number(amount);
    if (!this.canBeDispatched) {
      throw new Error(`Item ${this._sku} is in QUARANTINE or STOCK_OUT and cannot be dispatched.`);
    }
    if (qty <= 0 || qty > this._quantity) {
      throw new Error(`Insufficient stock for ${this._sku}. Available: ${this._quantity}`);
    }
    this._quantity -= qty;
    this.recalculateStatus();
  }

  toggleQuarantine() {
    if (this._status === 'QUARANTINE') {
      this._status = 'AVAILABLE';
      this.recalculateStatus();
    } else {
      this._status = 'QUARANTINE';
    }
  }
}