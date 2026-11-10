import {defineStore} from 'pinia';
import {computed,ref,shallowRef} from 'vue';
import {WarehouseApi} from '../infrastructure/warehouse-api.js';
import {InventoryItemAssembler as Assembler} from '../infrastructure/inventory-item.assembler.js';

export const useWarehouseStore=defineStore('warehouse',()=>{
  const api=new WarehouseApi();
  // Private-field domain models must never be wrapped in Vue's deep Proxy.
  const items=shallowRef([]),selected=shallowRef(null),session=shallowRef(null);
  const loading=ref(false),saving=ref(false),error=ref(null),notice=ref(''),searchQuery=ref(''),page=ref(1),total=ref(0);
  const pageSize=20;
  let accountVersion=0;
  const pendingOperations=new Map();
  const canManage=computed(()=>session.value?.canManageInventory===true);
  function rejected(e){
    error.value={code:e.response?.status===401?'AuthenticationRequired':e.response?.status===403?'Forbidden':e.response?.data?.code || 'RequestFailed',detail:e.response?.data?.detail || '',status:e.response?.status};
  }
  let sessionRequest=0;
  async function fetchSession(){const request=++sessionRequest;try{const response=await api.getSession();if(request===sessionRequest)session.value=response.data;}catch(e){if(request===sessionRequest)rejected(e);}}
  let listRequest=0,detailRequest=0;
  async function fetchItems(){
    const request=++listRequest;loading.value=true;error.value=null;
    try{const response=await api.getAllItems({search:searchQuery.value,page:page.value,pageSize});if(request===listRequest){items.value=Assembler.toEntitiesFromResponse(response);total.value=response.data.total;}}
    catch(e){if(request===listRequest)rejected(e);}finally{if(request===listRequest)loading.value=false;}
  }
  async function fetchItem(id){const request=++detailRequest;loading.value=true;error.value=null;selected.value=null;
    try{const response=await api.getItem(id);if(request===detailRequest)selected.value=Assembler.toEntityFromResource(response.data);}catch(e){if(request===detailRequest)rejected(e);}finally{if(request===detailRequest)loading.value=false;}
  }
  async function registerItem(form){const account=accountVersion;saving.value=true;error.value=null;notice.value='';
    try{const result=Assembler.toEntityFromResource((await api.createItem(Assembler.toCreateResource(form))).data);if(account!==accountVersion)return null;selected.value=result;return result;}
    catch(e){if(account===accountVersion)rejected(e);return null;}finally{if(account===accountVersion)saving.value=false;}
  }
  async function mutate(action,payload,lotId=null){
    if(!selected.value || saving.value)return false;
    const account=accountVersion;
    const itemId=selected.value.id;
    const key=JSON.stringify([itemId,action,lotId,payload]);
    const operationId=pendingOperations.get(key)||crypto.randomUUID();pendingOperations.set(key,operationId);
    const resource={...payload,operationId,expectedVersion:selected.value.version};
    saving.value=true;error.value=null;notice.value='';
    try{
      const response=lotId?await api[action](itemId,lotId,resource):await api[action](itemId,resource);
      if(account!==accountVersion)return false;
      selected.value=Assembler.toEntityFromResource(response.data);pendingOperations.delete(key);notice.value='Saved';return true;
    }catch(e){if(account===accountVersion)rejected(e);return false;}finally{if(account===accountVersion)saving.value=false;}
  }
  function reset(){
    accountVersion++;
    listRequest++;detailRequest++;sessionRequest++;
    items.value=[];selected.value=null;session.value=null;error.value=null;notice.value='';
    searchQuery.value='';page.value=1;total.value=0;loading.value=false;saving.value=false;pendingOperations.clear();
  }
  return {reset,items,selected,session,loading,saving,error,notice,searchQuery,page,total,pageSize,canManage,fetchSession,fetchItems,fetchItem,registerItem,mutate};
});
