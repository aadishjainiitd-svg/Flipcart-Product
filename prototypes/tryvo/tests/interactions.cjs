/* Run against the local preview with Node.js and Playwright installed. */
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const url=process.env.TRYVO_URL||'http://127.0.0.1:8765/';
const checks=[],errors=[],failedAssets=[],external=[];
const key='tryvo-adventure-v1';
(async()=>{
 const b=await chromium.launch({headless:true});
 const c=await b.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 c.on('page',p=>{
  p.on('pageerror',e=>errors.push(e.message));
  p.on('response',r=>{if(r.status()>=400)failedAssets.push(r.url());});
  p.on('request',r=>{if(/^https?:/.test(r.url())&&!r.url().startsWith(url))external.push(r.url());});
 });
 const p=await c.newPage();await p.goto(url);
 async function pass(name,fn){await fn();checks.push(name);console.log('PASS '+name);}
 const saved=()=>p.evaluate(k=>JSON.parse(localStorage.getItem(k)),key);
 const click=async(sel)=>{await p.locator(sel).focus();await p.keyboard.press('Enter');};
 await pass('Search supports titles, district, skills and combined filters; upcoming never launches',async()=>{
  assert.match(await p.locator('#filter-count').innerText(),/25 matching missions/);
  for(const [term,count] of [['empty seats',1],['Logic Lab',5],['quantitative reasoning',5]]){
   await p.locator('#mission-search').fill(term);
   assert.equal(await p.locator('[data-library-entry]:visible').count(),count);
   assert.equal(await p.evaluate(()=>document.activeElement.id),'mission-search');
  }
  await p.locator('#mission-availability').selectOption('upcoming');
  assert.equal(await p.locator('[data-library-entry]:visible').count(),4);
  assert.equal(await p.locator('.upcoming [data-action=start]').count(),0);
  await p.locator('.filters [data-id=logic]').click();
  assert(await p.locator('#filter-empty').isVisible());
  await p.locator('[data-action=reset-filters]').first().click();
  assert.equal(await p.locator('#mission-search').inputValue(),'');
  assert.equal(await p.locator('#mission-availability').inputValue(),'all');
 });
 await pass('Empty results, safe text, keyboard reset and filter persistence',async()=>{
  await p.locator('#mission-search').fill('<img src=x onerror=alert(1)>');
  assert(await p.locator('#filter-empty').isVisible());
  assert.match(await p.locator('#filter-count').innerText(),/^0 matching/);
  await click('#filter-empty button');
  assert.equal(await p.evaluate(()=>document.activeElement.id),'mission-search');
  await p.locator('#mission-search').fill('Logic');
  await p.locator('#mission-availability').selectOption('playable');
  await p.reload();
  assert.equal(await p.locator('#mission-search').inputValue(),'Logic');
  assert.equal(await p.locator('[data-library-entry]:visible').count(),1);
  await p.locator('[data-action=reset-filters]').first().click();
 });
 await pass('Incomplete initial form retains draft; stage navigation cannot bypass prerequisites',async()=>{
  await click('.featured button');
  assert.equal(await p.locator('.mission-progress button').count(),0);
  await p.locator('[name=initial][value=price]').check();
  await p.locator('#initial-note').fill('Price might explain some of the change.');
  await click('#initial-form [type=submit]');
  assert(await p.locator('.form-error').isVisible());
  assert(await p.locator('[name=initial][value=price]').isChecked());
  await p.reload();
  assert.equal(await p.locator('#initial-note').inputValue(),'Price might explain some of the change.');
  await p.locator('[name=confidence][value=medium]').check();
  await click('#initial-form [type=submit]');
  assert.match(await p.locator('[aria-current=step]').innerText(),/Investigate/);
  await click('[data-stage=first]');
  assert.match(await p.locator('#dialog').innerText(),/Price might explain/);
  assert.equal(await p.locator('#dialog input,#dialog textarea').count(),0);
  await p.keyboard.press('Escape');
  assert.equal(await p.evaluate(()=>document.activeElement.dataset.stage),'first');
  // A freshly inspected clue is not support. Continuing requires deliberate selection.
  await click('[data-action=decide]');
  assert(await p.locator('.form-error').isVisible());
  assert.equal((await saved()).active.phase,'investigate');
 });
 await pass('Evidence toast is specific, single, polite and leaves focus on the control',async()=>{
  for(const id of ['travel','unknown']){
   await click(`[data-action=evidence][data-id=${id}]`);
   await click(`[data-action=pin][data-id=${id}]`);
   assert.equal(await p.evaluate(()=>document.activeElement.dataset.action),'pin');
  }
  assert.equal(await p.locator('#toast').count(),1);
  assert.match(await p.locator('#toast').innerText(),/Selected: What we do not know/);
  assert.equal(await p.locator('#toast').getAttribute('aria-live'),'polite');
  assert.equal(await p.locator('#toast').evaluate(n=>getComputedStyle(n).transitionDuration),'0s');
 });
 await pass('Safe stage review preserves decision draft, initial judgment and support flags',async()=>{
  await click('[data-action=hint]');
  await click('[data-action=decide]');
  assert.equal(await p.locator('#toast').innerText(),'');
  assert.equal(await p.locator('.mission-progress .current>.step-content').evaluate(n=>getComputedStyle(n).color),'rgb(35, 77, 181)');
  await p.locator('[name=answer][value=both]').check();
  await p.locator('#final-note').fill('Both changes remain plausible.');
  await p.locator('[name=external]').check();
  await click('#decision-form [type=submit]');
  assert(await p.locator('.form-error').isVisible());
  assert(await p.locator('[name=answer][value=both]').isChecked());
  await click('[data-stage=evidence]');
  assert.equal((await saved()).active.initials[0].answer,'price');
  assert((await saved()).active.hint&&(await saved()).active.external);
  await click('[data-action=decide]');
  assert.equal(await p.locator('#final-note').inputValue(),'Both changes remain plausible.');
  await p.reload();
  assert(await p.locator('[name=answer][value=both]').isChecked());
  assert.equal(await p.locator('#final-note').inputValue(),'Both changes remain plausible.');
  await p.locator('.main-nav [href="#progress"]').click();
  await p.locator('.main-nav [href="#explore"]').click();
  await click('.resume-strip button');
  assert.equal(await p.locator('#final-note').inputValue(),'Both changes remain plausible.');
  await p.locator('[name=next][value=separate]').check();
  await click('#decision-form [type=submit]');
  await click('[data-action=reveal]');
  assert.equal((await saved()).history[0].points,0);
 });
 await pass('Completed filter and archived contribution survive refresh; review is read-only',async()=>{
  await p.locator('.main-nav [href="#explore"]').click();
  await p.locator('#mission-availability').selectOption('completed');
  assert.equal(await p.locator('.mission-card:visible').count(),1);
  assert.equal(await p.locator('.upcoming-item:visible').count(),0);
  await p.locator('.main-nav [href="#progress"]').click();
  await p.locator('[data-action=history]').first().click();
  await p.reload();
  assert(await p.getByRole('heading',{name:'Your Contribution',exact:true}).isVisible());
  for(const stage of ['first','evidence','decision']){
   await click(`[data-stage=${stage}]`);
   assert.equal(await p.locator('#dialog input,#dialog textarea').count(),0);
   await p.keyboard.press('Escape');
  }
 });
 await pass('Independent check and separate reflection draft survive refresh',async()=>{
  await click('[data-action=start][data-id=library-check]');
  await click('[data-action=pin-check][data-id=counts]');
  await click('[data-action=pin-check][data-id=overlap]');
  await p.locator('[name=answer][value=uncertain]').check();
  await p.locator('[name=next][value=separate]').check();
  await click('#decision-form [type=submit]');
  await p.locator('[name=earned][value="4"]').check();
  await p.reload();
  assert(await p.locator('[name=earned][value="4"]').isChecked());
  assert.equal(await p.locator('[name=enjoyment]:checked').count(),0);
  await p.locator('[name=enjoyment][value="5"]').check();
  await click('#survey-form [type=submit]');
  assert.match(await p.locator('#toast').innerText(),/saved on this device/);
 });
 await pass('Mobile tabs preserve drafts, active state and keyboard focus; controls stay above navigation',async()=>{
  await p.setViewportSize({width:390,height:844});
  await p.locator('.main-nav [href="#explore"]').click();
  await p.locator('[data-action=reset-filters]').first().click();
  await click('.featured button');
  await p.locator('[name=initial][value=price]').check();
  await p.locator('#initial-note').fill('Mobile draft retained.');
  await click('.main-nav [href="#progress"]');
  await p.locator('.main-nav [href="#progress"][aria-current=page]').waitFor();
  assert.equal(await p.locator('.main-nav [aria-current=page]').innerText(),'My progress');
  assert.equal(await p.evaluate(()=>document.activeElement.id),'main');
  await click('.main-nav [href="#explore"]');
  await click('.resume-strip button');
  assert.equal(await p.locator('#initial-note').inputValue(),'Mobile draft retained.');
  await p.locator('[name=confidence][value=medium]').check();
  await click('#initial-form [type=submit]');
  await p.locator('[data-action=decide]').scrollIntoViewIfNeeded();
  const nav=await p.locator('.main-nav').boundingBox(),action=await p.locator('[data-action=decide]').boundingBox();
  assert(action.y+action.height<=nav.y);
  for(const width of [320,390,768,1440]){
   await p.setViewportSize({width,height:900});
   assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  }
  await p.setViewportSize({width:390,height:844});
  await p.evaluate(()=>scrollTo(0,0));
  await p.screenshot({path:path.join(__dirname,'../screenshots/mobile-interactions.png')});
 });
 await pass('Mobile flagship, independent check and invalid inputs work end to end',async()=>{
  await click('[data-action=decide]');
  assert(await p.locator('.form-error').isVisible());
  for(const id of ['travel','unknown']){await click(`[data-action=evidence][data-id=${id}]`);await click(`[data-action=pin][data-id=${id}]`);}
  await click('[data-action=decide]');
  await click('#decision-form [type=submit]');assert(await p.locator('.form-error').isVisible());
  await p.locator('[name=answer][value=both]').check();await p.locator('[name=next][value=separate]').check();
  await click('#decision-form [type=submit]');await click('[data-action=reveal]');
  assert.equal(await p.locator('.task-score').innerText(),'100/100');
  await click('[data-action=start][data-id=library-check]');
  for(const id of ['counts','overlap'])await click(`[data-action=pin-check][data-id=${id}]`);
  await p.locator('[name=answer][value=uncertain]').check();await p.locator('[name=next][value=separate]').check();
  await click('#decision-form [type=submit]');assert.equal(await p.locator('.task-score').innerText(),'100/100');
 });
 await pass('Reset cancellation preserves progress; confirmation clears drafts, filters and only own key',async()=>{
  await p.evaluate(()=>{localStorage.setItem('unrelated','keep');localStorage.setItem('tryvo-progress-v1','keep earlier');});
  const before=await saved();
  await click('.reset-button');await p.getByRole('button',{name:'Cancel',exact:true}).click();
  assert.deepEqual(await saved(),before);
  await click('.reset-button');await click('[data-action=confirm-reset]');
  assert.equal(await saved(),null);
  assert.equal(await p.evaluate(()=>localStorage.getItem('unrelated')),'keep');
  assert.equal(await p.evaluate(()=>localStorage.getItem('tryvo-progress-v1')),'keep earlier');
  assert.equal(await p.locator('#mission-search').inputValue(),'');
  assert.equal(await p.locator('#mission-availability').inputValue(),'all');
 });
 await pass('Blocked storage keeps failure notice persistent; reflection toast does not claim saved',async()=>{
  const q=await c.newPage();
  // Same existing valid state is readable, but writes fail for this page.
  await q.addInitScript(()=>{Storage.prototype.setItem=()=>{throw new DOMException('Blocked','SecurityError');};});
  await q.goto(url);await q.locator('.featured button').click();
  await q.locator('[name=initial][value=price]').check();await q.locator('[name=confidence][value=medium]').check();
  await q.locator('#initial-form [type=submit]').click();
  await q.locator('[data-action=pin]').click();await q.locator('[data-action=decide]').click();
  await q.locator('[name=answer][value=both]').check();await q.locator('[name=next][value=separate]').check();
  await q.locator('#decision-form [type=submit]').click();await q.locator('[data-action=reveal]').click();
  // This survey is shown after the separate check.
  await q.locator('[data-action=start][data-id=library-check]').click();
  await q.locator('[data-action=pin-check]').first().click();
  await q.locator('[name=answer][value=uncertain]').check();await q.locator('[name=next][value=separate]').check();
  await q.locator('#decision-form [type=submit]').click();
  await q.locator('#survey-form [type=submit]').click();
  assert.match(await q.locator('#toast').innerText(),/session only/);
  assert.match(await q.locator('#notice').innerText(),/cannot be saved/);
  await q.close();
 });
 await pass('No browser exceptions, failed assets or external requests across the new journeys',async()=>{
  assert.deepEqual(errors,[]);assert.deepEqual(failedAssets,[]);assert.deepEqual(external,[]);
 });
 await p.setViewportSize({width:1440,height:1000});await p.goto(url+'#explore');
 await p.locator('#mission-library').scrollIntoViewIfNeeded();
 await p.screenshot({path:path.join(__dirname,'../screenshots/library-interactions.png')});
 await b.close();
 fs.writeFileSync(path.join(__dirname,'interaction-results.json'),JSON.stringify({date:new Date().toISOString(),checks,errors,failedAssets,external},null,2));
 console.log(`${checks.length} interaction checks passed`);
})().catch(e=>{console.error(e);process.exit(1);});
