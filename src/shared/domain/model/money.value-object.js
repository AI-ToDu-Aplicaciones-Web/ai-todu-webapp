export class Money {
    #amount;
    #currency;

    constructor(amount = 0, currency = 'PEN') {
        const parsed = Number(amount);
        this.#amount = Number.isFinite(parsed) && parsed >= 0 ? Number(parsed.toFixed(2)) : 0;
        this.#currency = currency;
        Object.freeze(this);
    }

    get amount() { return this.#amount; }
    get currency() { return this.#currency; }

    multiply(factor) {
        return new Money(this.#amount * Number(factor), this.#currency);
    }

    calculateIgv(rate = 0.18) {
        return new Money(this.#amount * rate, this.#currency);
    }

    format() {
        return `S/ ${this.#amount.toFixed(2)}`;
    }
}