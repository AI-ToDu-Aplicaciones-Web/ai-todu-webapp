import { Sku } from './sku.value-object.js';
import { StockLot } from './stock-lot.entity.js';

/** Immutable client model. Server commands are the authority for stock changes. */
export class InventoryItem {
  #id; #sku; #name; #category; #minimumStock; #unitPrice; #version;
  #totalQuantity; #availableQuantity; #status; #lots; #movements; #counts; #returns;
  constructor({id,sku,name,category,minimumStock=0,unitPrice=0,version=1,totalQuantity=0,availableQuantity=0,status='STOCK_OUT',lots=[],movements=[],counts=[],returns=[]}) {
    if (!id || typeof name !== 'string' || !name.trim()) throw new Error('InvalidItem');
    for (const value of [minimumStock,unitPrice,totalQuantity,availableQuantity]) if (!Number.isFinite(Number(value)) || Number(value) < 0) throw new Error('InvalidQuantity');
    if (!Number.isSafeInteger(version) || version < 1) throw new Error('InvalidVersion');
    this.#id=id; this.#sku=new Sku(sku); this.#name=name; this.#category=category;
    this.#minimumStock=Number(minimumStock); this.#unitPrice=Number(unitPrice); this.#version=version;
    this.#totalQuantity=Number(totalQuantity); this.#availableQuantity=Number(availableQuantity); this.#status=status;
    this.#lots=Object.freeze(lots.map(lot => new StockLot(lot)));
    const immutable = rows => Object.freeze(rows.map(row => Object.freeze({...row})));
    this.#movements=immutable(movements); this.#counts=immutable(counts); this.#returns=immutable(returns);
    Object.freeze(this);
  }
  get id(){return this.#id;} get sku(){return this.#sku.value;} get name(){return this.#name;}
  get category(){return this.#category;} get minimumStock(){return this.#minimumStock;} get minStock(){return this.#minimumStock;}
  get unitPrice(){return this.#unitPrice;} get version(){return this.#version;}
  get totalQuantity(){return this.#totalQuantity;} get quantity(){return this.#availableQuantity;} get availableQuantity(){return this.#availableQuantity;}
  get status(){return this.#status;} get lots(){return this.#lots;} get movements(){return this.#movements;}
  get counts(){return this.#counts;} get returns(){return this.#returns;}
  get canBeSold(){return this.#availableQuantity>0;} get location(){return this.#lots[0]?.location || '';}
}
