import {defineStore} from 'pinia';
import {ref} from 'vue';
import {OrganizationApi} from '../infrastructure/organization-api.js';
export const useOrganizationStore=defineStore('organization',()=>{
  const reasons=ref([]);
  const api=new OrganizationApi(), alerts=ref([]), activity=ref([]), subscription=ref(null);
  let generation=0;
  function reset(){generation++;reasons.value=[];alerts.value=[];activity.value=[];subscription.value=null;}
  async function load(owner){
    const session=generation;
    const [notifications,plan,history]=await Promise.all([api.alerts(),owner&&api.currentPlan(),owner&&api.audit()]);
    if(session!==generation)return;
    alerts.value=notifications.data;subscription.value=plan?.data;activity.value=history?.data||[];
  }
  async function read(key){const session=generation;await api.markRead(key);if(session===generation){const row=alerts.value.find(x=>x.key===key);if(row)row.isRead=true;}}
  async function choose(plan){const session=generation;const result=await api.choosePlan(plan);if(session===generation)subscription.value=result.data;}
  async function loadReasons(){const session=generation;const result=await api.reasons();if(session===generation)reasons.value=result.data;}
  async function addReason(name){await api.addReason(name);await loadReasons();}
  return {reasons,loadReasons,addReason,alerts,activity,subscription,reset,load,read,choose};
});
