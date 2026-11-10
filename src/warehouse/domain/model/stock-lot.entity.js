export class StockLot {
  #id; #code; #location; #expiresOn; #quantity; #quarantined; #expired;
  constructor({id,code,location,expiresOn=null,quantity=0,isQuarantined=false,isExpired=false}) {
    if (!id || !code || !location || !Number.isFinite(Number(quantity)) || Number(quantity) < 0) throw new Error('InvalidLot');
    this.#id=id; this.#code=code; this.#location=location; this.#expiresOn=expiresOn;
    this.#quantity=Number(quantity); this.#quarantined=Boolean(isQuarantined); this.#expired=Boolean(isExpired);
    Object.freeze(this);
  }
  get id(){return this.#id;} get code(){return this.#code;} get location(){return this.#location;}
  get expiresOn(){return this.#expiresOn;} get quantity(){return this.#quantity;}
  get isQuarantined(){return this.#quarantined;} get isExpired(){return this.#expired;}
  get isAvailable(){return !this.#quarantined && !this.#expired && this.#quantity > 0;}
}
