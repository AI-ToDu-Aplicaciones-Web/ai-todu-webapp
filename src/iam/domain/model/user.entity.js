import {UserId} from './user-id.value-object.js';

/** An immutable account snapshot. Passwords and tokens are not domain properties. */
export class User {
  #id; #organizationId; #organizationName; #fullName; #email; #role; #isActive;
  constructor({id,organizationId,organizationName,fullName,email,role,isActive,canSell,canManageStock}) {
    this.#id=new UserId(id);
    this.#organizationId=organizationId; this.#organizationName=organizationName;
    this.#fullName=fullName; this.#email=email; this.#role=role; this.#isActive=isActive===true;
    this.canSell=canSell===true; this.canManageStock=canManageStock===true;
    Object.freeze(this);
  }
  get id(){return this.#id.value;} get organizationId(){return this.#organizationId;}
  get organizationName(){return this.#organizationName;} get fullName(){return this.#fullName;}
  get email(){return this.#email;} get username(){return this.#email;}
  get role(){return this.#role;} get isActive(){return this.#isActive;}
}
