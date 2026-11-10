import test from 'node:test';
import assert from 'node:assert/strict';
import {shallowRef,isProxy} from 'vue';
import {Sku} from '../src/warehouse/domain/model/sku.value-object.js';
import {InventoryItem} from '../src/warehouse/domain/model/inventory-item.entity.js';
import {InventoryItemAssembler} from '../src/warehouse/infrastructure/inventory-item.assembler.js';

const resource=()=>({id:'item-1',sku:' rice-1 ',name:'Rice',category:'Food',version:2,minimumStock:5,unitPrice:10,totalQuantity:20,availableQuantity:15,status:'AVAILABLE',lots:[{id:'lot-1',code:'A',location:'Shelf 1',quantity:20,isQuarantined:false}],movements:[{id:'movement-1',change:20}],counts:[],returns:[]});
test('SKU is normalized and compared by value',()=>{assert.equal(new Sku(' rice-1 ').value,'RICE-1');assert.ok(new Sku('rice-1').equals(new Sku('RICE-1')));assert.throws(()=>new Sku(' '));});
test('domain model preserves physical and available quantities separately',()=>{const item=new InventoryItem(resource());assert.equal(item.totalQuantity,20);assert.equal(item.availableQuantity,15);assert.equal(item.lots[0].quantity,20);});
test('domain instances remain usable in shallow reactive collections',()=>{const items=shallowRef([new InventoryItem(resource())]);assert.equal(isProxy(items.value[0]),false);assert.equal(items.value[0].sku,'RICE-1');});
test('collections and audit snapshots cannot be mutated by callers',()=>{const item=new InventoryItem(resource());assert.throws(()=>item.lots.push({}));assert.throws(()=>{item.movements[0].change=99;});});
test('invalid server quantities are rejected instead of silently clamped',()=>{assert.throws(()=>new InventoryItem({...resource(),totalQuantity:-1}));assert.throws(()=>new InventoryItem({...resource(),availableQuantity:NaN}));});
test('assembler reads the paginated real API contract',()=>{const items=InventoryItemAssembler.toEntitiesFromResponse({data:{items:[resource()],total:1}});assert.equal(items[0].sku,'RICE-1');assert.equal(items.length,1);});
