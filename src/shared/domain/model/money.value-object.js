export class Money {
    static IGV_RATE = 0.18;

    constructor({ amount = 0, currency = 'PEN' } = {}) {
        const parsed = Number(amount);
        if (Number.isNaN(parsed) || parsed < 0) {
            throw new Error('Money amount must be a non-negative number.');
        }
        if (!['PEN', 'USD'].includes(currency)) {
            throw new Error(`Unsupported currency: ${currency}`);
        }
        this._amount = Number(parsed.toFixed(2));
        this._currency = currency;
    }

    get amount() { return this._amount; }
    get currency() { return this._currency; }

    multiply(factor) {
        return new Money({ amount: this._amount * Number(factor), currency: this._currency });
    }

    calculateIgv() {
        return new Money({ amount: this._amount * Money.IGV_RATE, currency: this._currency });
    }

    withIgv() {
        return new Money({ amount: this._amount * (1 + Money.IGV_RATE), currency: this._currency });
    }

    format() {
        const symbol = this._currency === 'PEN' ? 'S/' : '$';
        return `${symbol} ${this._amount.toFixed(2)}`;
    }
}