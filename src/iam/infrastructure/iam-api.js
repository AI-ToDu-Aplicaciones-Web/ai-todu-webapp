import {PlatformApi} from '../../shared/infrastructure/platform-api.js';
import {BaseEndpoint} from '../../shared/infrastructure/base-endpoint.js';

export class IamApi extends PlatformApi {
  #users;
  constructor(){
    super();
    this.#users=new BaseEndpoint(this,'/users');
  }
  signUp(resource){return this.http.post('/authentication/sign-up',resource);}
  signIn(resource){return this.http.post('/authentication/sign-in',resource);}
  me(){return this.http.get('/authentication/me');}
  getUsers(){return this.#users.getAll();}
  createUser(resource){return this.#users.create(resource);}
  setAccess(id,resource){return this.http.patch(`/users/${id}/access`,resource);}
  setUserStatus(id,isActive){return this.http.patch(`/users/${id}/status`,{isActive});}
}
