export class Sku {
  #value;
  constructor(value) {
    if (typeof value !== 'string' || !value.trim() || value.trim().length > 64) throw new Error('InvalidSku');
    this.#value = value.trim().toUpperCase();
    Object.freeze(this);
  }
  get value() { return this.#value; }
  equals(other) { return other instanceof Sku && other.value === this.#value; }
}
