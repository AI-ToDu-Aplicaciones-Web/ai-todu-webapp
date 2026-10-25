export class InventoryItem {
    _id;
    _name;
    _quantity;
    _status;

    constructor({ id = "", name = "", quantity = 0, status = "available" }) {
        this._id = id;
        this._name = name;
        this._quantity = quantity;
        this._status = status;
        Object.freeze(this);
    }

    get id() { return this._id; }
    get name() { return this._name; }
    get quantity() { return this._quantity; }
    get status() { return this._status; }
}