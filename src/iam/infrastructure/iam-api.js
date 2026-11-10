import {BaseApi} from '../../shared/infrastructure/base-api.js';
import {BaseEndpoint} from '../../shared/infrastructure/base-endpoint.js';

export class IamApi extends BaseApi {
  #users;
  constructor(){
    super({apiBaseURL:import.meta.env.VITE_WAREHOUSE_API_URL || (import.meta.env.PROD?'/api/v1':'/warehouse-api'),errorHandler:error=>Promise.reject(error)});
    this.#users=new BaseEndpoint(this,'/users');
    this.http.interceptors.request.use(config=>{
      const token=sessionStorage.getItem('aitodu_token');
      if(token&&!config.url.startsWith('/authentication/sign-'))config.headers.Authorization=`Bearer ${token}`;
      config.headers['Accept-Language']=document.documentElement.lang||'en-US';
      return config;
    });
    this.http.interceptors.response.use(response=>response,error=>{
      if(error.response?.status===401&&!error.config?.url?.startsWith('/authentication/sign-'))
        window.dispatchEvent(new Event('aitodu:session-expired'));
      return Promise.reject(error);
    });
  }
  signUp(resource){return this.http.post('/authentication/sign-up',resource);}
  signIn(resource){return this.http.post('/authentication/sign-in',resource);}
  me(){return this.http.get('/authentication/me');}
  getUsers(){return this.#users.getAll();}
  createUser(resource){return this.#users.create(resource);}
  setUserStatus(id,isActive){return this.http.patch(`/users/${id}/status`,{isActive});}
}
