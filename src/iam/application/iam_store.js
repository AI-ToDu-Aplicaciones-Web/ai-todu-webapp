import {defineStore} from 'pinia';
import {computed,ref,shallowRef} from 'vue';
import {IamApi} from '../infrastructure/iam-api.js';
import {UserAssembler} from '../infrastructure/user.assembler.js';

export const useIamStore=defineStore('iam',()=>{
  const api=new IamApi();
  const currentUser=shallowRef(null),users=shallowRef([]),error=shallowRef(null);
  const busy=ref(false),loadingUsers=ref(false),initialized=ref(false);
  const isAuthenticated=computed(()=>currentUser.value!==null);
  const isOwner=computed(()=>currentUser.value?.role==='BUSINESS_OWNER');
  let restoring=null,generation=0;

  function rejected(e){
    const status=e.response?.status;
    const code=e.response?.data?.code?.split('.').pop();
    error.value={code:code||(status===429?'TooManyAttempts':status===403?'Forbidden':status===400?'InvalidAccountData':'RequestFailed')};
  }
  function signOut(){
    generation++;currentUser.value=null;users.value=[];error.value=null;initialized.value=true;
    sessionStorage.removeItem('aitodu_token');
    localStorage.removeItem('aitodu_token');localStorage.removeItem('aitodu_user');
  }
  window.addEventListener('aitodu:session-expired',signOut);

  async function restore(){
    if(initialized.value)return;
    if(restoring)return restoring;
    const request=generation;
    restoring=(async()=>{
      // Only server-validated session tokens can restore an authenticated user.
      localStorage.removeItem('aitodu_token');localStorage.removeItem('aitodu_user');
      if(!sessionStorage.getItem('aitodu_token')){initialized.value=true;return;}
      try{const response=await api.me();if(request===generation)currentUser.value=UserAssembler.toEntityFromResource(response.data);}
      catch{if(request===generation)signOut();}
      finally{initialized.value=true;restoring=null;}
    })();
    return restoring;
  }
  async function signIn(email,password){
    busy.value=true;error.value=null;
    try{
      const response=await api.signIn({email,password});
      generation++;sessionStorage.setItem('aitodu_token',response.data.token);
      localStorage.removeItem('aitodu_token');localStorage.removeItem('aitodu_user');
      currentUser.value=UserAssembler.toEntityFromResource(response.data.user);initialized.value=true;
      return true;
    }catch(e){rejected(e);return false;}finally{busy.value=false;}
  }
  async function signUp(resource){
    busy.value=true;error.value=null;
    try{await api.signUp(resource);return true;}catch(e){rejected(e);return false;}finally{busy.value=false;}
  }
  async function loadUsers(){
    const request=generation;loadingUsers.value=true;error.value=null;
    try{const response=await api.getUsers();if(request===generation)users.value=UserAssembler.toEntitiesFromResponse(response);}
    catch(e){if(request===generation)rejected(e);}finally{loadingUsers.value=false;}
  }
  async function createUser(resource){
    busy.value=true;error.value=null;
    try{await api.createUser(resource);await loadUsers();return true;}catch(e){rejected(e);return false;}finally{busy.value=false;}
  }
  async function setUserStatus(id,isActive){
    busy.value=true;error.value=null;
    try{await api.setUserStatus(id,isActive);await loadUsers();}catch(e){rejected(e);}finally{busy.value=false;}
  }
  async function setAccess(id,resource){
    busy.value=true;error.value=null;
    try{await api.setAccess(id,resource);await loadUsers();return true;}catch(e){rejected(e);return false;}finally{busy.value=false;}
  }
  return {setAccess,currentUser,users,error,busy,loadingUsers,isAuthenticated,isOwner,restore,signIn,signUp,signOut,loadUsers,createUser,setUserStatus};
});
