const warehouseRoutes = [
  {path:'/',redirect:'/inventory'},
  {path:'/inventory',name:'warehouse-inventory',component:() => import('./views/inventory-list.vue')},
  {path:'/inventory/new',name:'warehouse-inventory-new',component:() => import('./views/inventory-item-form.vue')},
  {path:'/inventory/:id',name:'warehouse-inventory-detail',component:() => import('./views/inventory-detail.vue')},
  {path:'/:pathMatch(.*)*',redirect:'/inventory'}
];
export default warehouseRoutes;
