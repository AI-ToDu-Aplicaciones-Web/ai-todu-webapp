import {PlatformApi} from '../../shared/infrastructure/platform-api.js';
export class OrganizationApi extends PlatformApi {
  reasons(){return this.http.get('/adjustment-reasons');}
  addReason(name){return this.http.post('/adjustment-reasons',{name});}
  currentPlan(){return this.http.get('/subscription');}
  choosePlan(plan){return this.http.put('/subscription',{plan});}
  alerts(){return this.http.get('/notifications');}
  markRead(key){return this.http.put('/notifications/'+encodeURIComponent(key)+'/read');}
  audit(){return this.http.get('/audit');}
}
