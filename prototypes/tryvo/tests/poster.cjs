/* Functional regression checks for the illustrated map presentation. */
const {chromium}=require('playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),url=process.env.TRYVO_URL||'http://127.0.0.1:8765/',checks=[];
(async()=>{
 const b=await chromium.launch({headless:true}),c=await b.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),p=await c.newPage(),errors=[];
 p.on('pageerror',e=>errors.push(e.message));
 const pass=async(name,fn)=>{await fn();checks.push(name);console.log('PASS '+name);};
 const read=()=>p.evaluate(()=>JSON.parse(localStorage.getItem('tryvo-adventure-v1')));
 await p.goto(url+'#rescue');
 await pass('Illustrated town is locally loaded with the poster palette and live route controls',async()=>{
  assert(await p.locator('.town-backdrop').evaluate(n=>n.complete&&n.naturalWidth>=1024));
  assert.equal(await p.locator('h1').evaluate(n=>getComputedStyle(n).color),'rgb(121, 6, 79)');
  assert.equal(await p.locator('[data-rescue=cell]').count(),30);
  assert(await p.locator('[data-rescue=run]').isDisabled());
 });
 await p.locator('[data-cell="6"]').click();await p.locator('[data-rescue=run]').click();await p.locator('.outcome-retry').waitFor();
 for(const id of [7,8,9,10,11,17])await p.locator(`[data-cell="${id}"]`).click();
 await p.locator('[data-rescue=run]').click();await p.locator('.outcome-won').waitFor();
 await pass('Contribution comparison uses actual first and latest plans without changing saved state',async()=>{
  const before=await read();assert.deepEqual(before.rescue.history[0].path,[12,6]);
  await p.locator('[data-rescue=compare]').click();
  assert.equal(await p.locator('.previous-route').count(),2);
  assert.equal(await p.locator('.previous-0').getAttribute('points'),'100,233.345 190,286.681');
  assert.equal(await p.locator('.previous-1').getAttribute('points'),await p.locator('.route-plan').getAttribute('points'));
  assert.match(await p.locator('.attempt-line.previous').innerText(),/First submitted plan.*1 tokens/s);
  assert.match(await p.locator('.attempt-line.latest').innerText(),/Last tested plan.*8 tokens/s);
  assert.deepEqual(await read(),before);
  await p.locator('[data-rescue=compare]').click();assert.equal(await p.locator('.previous-route').count(),0);
 });
 await pass('The animated tram ends at the live festival marker and the success banner appears',async()=>{
  const delta=await p.evaluate(()=>{const a=document.querySelector('.moving-tram'),z=document.querySelector('.festival-gate');return [a.style.left===z.style.left,a.style.top===z.style.top];});
  assert.deepEqual(delta,[true,true]);assert(await p.locator('.arrival-banner').isVisible());
  await p.screenshot({path:path.join(root,'screenshots/poster-mission-desktop.png'),fullPage:true});
 });
 await p.setViewportSize({width:390,height:844});await p.locator('.board-feedback [data-rescue=clear]').click();
 await pass('Phone map can pan and fit without overflowing the page or losing a draft',async()=>{
  const initial=await read();await p.locator('[data-rescue=fit]').click();
  assert(await p.locator('.rescue-board').evaluate(n=>n.getBoundingClientRect().width<400));
  await p.locator('[data-rescue=fit]').click();assert(await p.locator('.rescue-board').evaluate(n=>n.getBoundingClientRect().width>=600));
  assert.deepEqual(await read(),initial);
  for(const id of [6,7,8,9,10])await p.locator(`[data-cell="${id}"]`).click();
  const before=await p.locator('.map-scroll').evaluate(n=>n.scrollLeft);
  assert(before>0);
  await p.locator('[data-cell="11"]').click();
  assert(await p.locator('.map-scroll').evaluate(n=>n.scrollLeft>0));
  assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await p.locator('[data-cell="17"]').click();await p.locator('[data-rescue=run]').click();await p.locator('.outcome-won').waitFor();
  await p.screenshot({path:path.join(root,'screenshots/poster-mission-mobile.png'),fullPage:true});
 });
 await pass('Phone route controls remain keyboard reachable, and saved routes survive refresh',async()=>{
  await p.reload();assert.equal((await read()).rescue.drafts['first-light'].path.at(-1),17);
  await p.locator('[data-rescue=fit]').focus();await p.keyboard.press('Enter');assert.equal(await p.locator('[data-rescue=fit]').getAttribute('aria-pressed'),'true');
  assert(await p.locator('[data-rescue=fit]').evaluate(n=>n===document.activeElement));
  await p.setViewportSize({width:320,height:844});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 });
 await pass('The visual update introduces no browser exceptions',async()=>assert.deepEqual(errors,[]));
 fs.writeFileSync(path.join(__dirname,'poster-results.json'),JSON.stringify({date:new Date().toISOString(),checks,errors},null,2));
 await b.close();console.log(`${checks.length} poster checks passed`);
})().catch(e=>{console.error(e);process.exit(1);});
