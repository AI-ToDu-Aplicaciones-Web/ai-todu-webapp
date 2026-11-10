export class UserId {
  #value;
  constructor(value){
    if(typeof value!=='string'||!value) throw new Error('InvalidUserId');
    this.#value=value; Object.freeze(this);
  }
  get value(){return this.#value;}
}
