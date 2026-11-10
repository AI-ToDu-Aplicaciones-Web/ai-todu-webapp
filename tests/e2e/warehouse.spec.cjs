const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const {mkdirSync}=require('node:fs');
const {join}=require('node:path');

(async()=>{
  const browser=await chromium.launch({channel:'msedge',headless:true});
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  const root=process.env.WAREHOUSE_WEB_URL||'http://127.0.0.1:5173/inventory.html';
  const screenshotDirectory=join(__dirname,'..','..','artifacts');mkdirSync(screenshotDirectory,{recursive:true});
  const sku='UI-'+Date.now();
  async function stock(expected){await page.locator('[data-testid="available-stock"]').filter({hasText:new RegExp('^'+expected+'$')}).waitFor();}
  async function submit(field,name){await page.locator(field).locator('xpath=ancestor::form').getByRole('button',{name,exact:true}).click();}
  try{
    await page.goto(root);
    await page.getByRole('button',{name:'Register product',exact:true}).click();
    await page.locator('#item-sku').fill(sku);await page.locator('#item-name').fill('Rice for UI verification');await page.locator('#item-category').fill('Food');
    await page.locator('#item-minimum').fill('5');await page.locator('#item-price').fill('10');
    await page.getByRole('button',{name:'Save',exact:true}).click();
    await page.getByRole('heading',{name:'Rice for UI verification',exact:true}).waitFor();
    await page.locator('#receipt-code').fill('LOT-UI');await page.locator('#receipt-location').fill('A-1');await page.locator('#receipt-quantity').fill('20');
    await page.getByRole('button',{name:'Record receipt',exact:true}).click();await stock(20);
    await page.locator('#operation-lot').click();await page.getByRole('option',{name:/LOT-UI/}).click();
    await page.locator('#movement-quantity').fill('4');await page.locator('#movement-reason').fill('Sale UI-1');await submit('#movement-reason','Save');await stock(16);
    await page.reload();await stock(16);
    await page.locator('#operation-lot').click();await page.getByRole('option',{name:/LOT-UI/}).click();
    await page.locator('#count-quantity').fill('14');await page.locator('#count-reason').fill('Count UI-1');await page.getByRole('button',{name:'Apply count',exact:true}).click();await stock(14);
    await page.locator('#return-quantity').fill('2');await page.locator('#return-reference').fill('SALE UI-1');await page.locator('#return-reason').fill('Inspected customer return');await page.getByRole('button',{name:'Record return',exact:true}).click();await stock(16);
    await page.locator('#quarantine-reason').fill('Pending inspection');await page.getByRole('button',{name:'Place in quarantine',exact:true}).click();await stock(0);
    await page.locator('[data-testid="physical-stock"]').filter({hasText:/^16$/}).waitFor();
    await page.locator('#movement-quantity').fill('1');await page.locator('#movement-reason').fill('Blocked issue');await submit('#movement-reason','Save');
    await page.getByRole('alert').filter({hasText:/quarantined or expired/}).waitFor();await stock(0);
    await page.locator('#quarantine-reason').fill('Inspection complete');await page.getByRole('button',{name:'Release lot',exact:true}).click();await stock(16);
    await page.locator('#new-location').fill('B-2');await page.locator('#relocation-reason').fill('Move shelf');await page.getByRole('button',{name:'Relocate lot',exact:true}).click();
    await page.getByRole('cell',{name:'B-2',exact:true}).waitFor();
    await page.getByRole('button',{name:'ES',exact:true}).click();await page.getByRole('heading',{name:'Lotes de mercadería',exact:true}).waitFor();
    assert.equal(await page.locator('html').getAttribute('lang'),'es-419');
    await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:join(screenshotDirectory,'warehouse-desktop.png')});
    await page.setViewportSize({width:390,height:844});await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:join(screenshotDirectory,'warehouse-mobile.png')});
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),'Mobile layout must not overflow horizontally');
    assert.deepEqual(errors,[]);
    console.log(JSON.stringify({status:'passed',sku,availableQuantity:16,checks:['registration','receipt','issue','reload persistence','physical count','customer return','quarantine rejection','release','relocation','Spanish','mobile layout'],screenshots:screenshotDirectory}));
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
