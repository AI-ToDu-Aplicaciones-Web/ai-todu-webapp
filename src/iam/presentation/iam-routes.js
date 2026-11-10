export const iamRoutes=[
  {path:'/sign-in',alias:'/login',name:'sign-in',component:()=>import('./views/SignInView.vue'),meta:{guestOnly:true}},
  {path:'/sign-up',name:'sign-up',component:()=>import('./views/SignUpView.vue'),meta:{guestOnly:true}},
  {path:'/users',name:'organization-users',component:()=>import('./views/OrganizationUsersView.vue'),meta:{requiresAuth:true,ownerOnly:true}}
];

export function safeAuthRedirect(value){
  return typeof value==='string'&&(value==='/users'||value==='/inventory'||value.startsWith('/inventory/'))?value:'/inventory';
}
