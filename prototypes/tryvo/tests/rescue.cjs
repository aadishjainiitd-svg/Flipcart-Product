/* Synthetic puzzle and browser checks; these are not user research. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright'),E=require('../js/rescue-engine');
const root=path.resolve(__dirname,'..'),url=process.env.TRYVO_URL||'http://127.0.0.1:8765/',checks=[];
const paths=[[12,6,7,8,9,10,11,17],[28,21,14,7,8,15,22,29,30,31,32,33,34,27,20,13],[35,28,29,22,15,8,9,16,23,24,25,32,39,40,41,34,27,20,13]];
const alternatives=[[12,6,7,8,2,3,4,5,11,17],[28,21,14,7,8,15,22,29,30,31,32,33,26,19,12,13],[35,28,21,14,7,8,15,22,23,24,25,32,39,40,41,34,27,20,13]];
async function pass(name,fn){await fn();checks.push(name);console.log('PASS '+name);}
(async()=>{
 await pass('All three layouts have multiple valid routes within their budgets',()=>{E.levels.forEach((l,i)=>{assert(E.evaluate(l,paths[i]).success);assert(E.evaluate(l,alternatives[i]).success);});});
 await pass('Missing riders, unfinished routes, over-budget routes and closed bridge have distinct feedback',()=>{
  assert.equal(E.evaluate(E.levels[0],[12,6]).reason,'unfinished');
  assert.equal(E.evaluate(E.levels[0],[12,6,7,1,2,3,4,5,11,17]).reason,'pickup');
  assert.equal(E.evaluate(E.levels[0],[12,18,19,20,21,22,16,10,9,8]).reason,'budget');
  assert.equal(E.evaluate(E.levels[2],[35,36,29,30,23,24]).reason,'gate');
 });
 await pass('Street editing rejects jumps and closures, and truncates a route without loops',()=>{
  const l=E.levels[0],d=E.draft(l);assert.throws(()=>E.edit(l,d,14),/closed/);assert.throws(()=>E.edit(l,d,8),/beside/);E.edit(l,d,6);E.edit(l,d,7);E.edit(l,d,6);assert.deepEqual(d.path,[12,6]);assert(!E.validatePath(l,[12,6,12]));
 });
 await pass('Records preserve first submitted plan, unlock sequentially, and repeated playback cannot add attempts',()=>{
  const s=E.fresh(),l=E.levels[0],d=E.draft(l);s.drafts[l.id]=d;assert(!E.unlocked(s,E.levels[1].id));E.edit(l,d,6);E.run(s,l,d);d.path=[...paths[0]];d.lastId=null;E.run(s,l,d);assert.deepEqual(d.firstPlan,[12,6]);assert(E.unlocked(s,E.levels[1].id));assert(!E.unlocked(s,E.levels[2].id));E.run(s,l,d);assert.equal(s.history.length,2);assert(E.valid(s));assert.equal(E.best(s,l.id).cost,8);s.history[1].cost=1;assert(!E.valid(s));
 });
 const browser=await chromium.launch({headless:true}),context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),p=await context.newPage(),errors=[],failed=[];
 p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)failed.push(r.url());});
 const click=async(s)=>p.locator(s).click();
 const snapshot=async(name)=>{await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:path.join(root,'screenshots',name+'.png'),fullPage:true});};
 const stored=()=>p.evaluate(()=>JSON.parse(localStorage.getItem('tryvo-adventure-v1')));
 await p.goto(url);
 await pass('Homepage leads with a playable chapter and keeps original stories accessible',async()=>{assert.equal(await p.locator('.campaign-chapter').count(),8);assert.equal(await p.locator('#chapter-all-aboard [data-campaign=play]').count(),0);assert.equal(await p.locator('.mission-card').count(),5);await snapshot('festival-home-desktop');await click('#chapter-first-light [data-campaign=play]');});
 await pass('Keyboard connects streets, blocked moves explain the error, and draft survives refresh',async()=>{
  await p.locator('[data-cell="12"]').focus();await p.keyboard.press('ArrowUp');await p.keyboard.press('Enter');assert.deepEqual((await stored()).rescue.drafts['first-light'].path,[12,6]);await p.locator('[data-cell="14"]').focus();await p.keyboard.press('Enter');assert.match(await p.locator('#rescue-message').innerText(),/closed/);await p.reload();assert.equal(await p.locator('.on-route').count(),2);await snapshot('festival-board-desktop');
 });
 await pass('An incomplete route produces a retry, and retry retains the first plan',async()=>{await click('[data-rescue=run]');await p.locator('.outcome-retry').waitFor();assert.match(await p.locator('#run-outcome').innerText(),/track ends/);assert.equal((await stored()).rescue.history.length,1);await click('[data-rescue=keep]');});
 await pass('All routes work with completed campaign prerequisites',async()=>{
  // Synthetic completed investigation fixtures isolate route regression coverage.
  // campaign.cjs separately plays the full connected journey through the real UI.
  await p.evaluate(()=>{const key='tryvo-adventure-v1',s=JSON.parse(localStorage.getItem(key)),E=TryvoEngine;for(const m of TryvoData.missions){const a=E.begin(s,m);E.commitInitial(a,m,m.options[0].id,'medium','Synthetic route prerequisite');a.phase='decision';a.pinned=[m.links.map(l=>l.sources[0]),[]];a.reasoning=Object.fromEntries(m.links.map(l=>[l.id,{source:l.sources[0],meaning:l.correct,by:0}]));a.plan={factor:'transport',groups:'random'};E.finish(s,m,m.options.find(o=>o.points===40).id,m.nextOptions.find(o=>o.points===20).id,'Synthetic fixture',false);}localStorage.setItem(key,JSON.stringify(s));});await p.reload();
  for(let i=0;i<3;i++){
   for(const id of paths[i].slice(i===0?2:1))await click(`[data-cell="${id}"]`);
   await click('[data-rescue=run]');await p.locator('.outcome-won').waitFor();const s=await stored();assert.equal(s.history.length,5);assert.equal(s.rescue.history.at(-1).level,E.levels[i].id);assert(s.rescue.history.at(-1).success);if(i===0)assert.deepEqual(s.rescue.history.at(-1).firstPlan,[12,6]);
   if(i<2)await click('.campaign-handoff [data-chapter="'+E.levels[i+1].id+'"]');
  }
  await snapshot('festival-complete-desktop');await click('[data-campaign=finale]');assert.match(await p.locator('#dialog').innerText(),/8 of 8/);await p.keyboard.press('Escape');
 });
 await pass('Replay adds no score or attempt; route records and journal show real local results',async()=>{
  const n=(await stored()).rescue.history.length;await click('.route-receipt summary');await click('[data-rescue=replay]');await p.locator('.outcome-won').waitFor();assert.equal((await stored()).rescue.history.length,n);
  await click('.main-nav [href="#progress"]');assert.match(await p.locator('.rescue-journal').innerText(),/3 of 3/);await snapshot('festival-progress-desktop');await click('.main-nav [href="#rankings"]');await click('.rescue-records>summary');assert.equal(await p.locator('.route-record-grid article').count(),3);const before=JSON.stringify((await stored()).rescue.drafts);await click('[data-rescue=watch-best][data-level="first-light"]');assert.equal(await p.locator('#dialog .on-route').count(),8);assert.equal(JSON.stringify((await stored()).rescue.drafts),before);await p.keyboard.press('Escape');await p.goto(url+'#rescue');await p.locator('.rescue-board').waitFor();
 });
 await pass('Mobile and desktop layouts have no overflow; all board cells have accessible names',async()=>{
  for(const width of [320,390,768,1440]){await p.setViewportSize({width,height:900});await p.reload();assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Board overflow at ${width}`);for(const b of await p.locator('[data-cell]').all())assert(await b.getAttribute('aria-label'));if(width===390)await snapshot('festival-board-mobile');await click('.main-nav [href="#explore"]');assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Home overflow at ${width}`);if(width===390)await snapshot('festival-home-mobile');await click('#chapter-first-light [data-campaign=play]');}
 });
 await pass('Navigation safely cancels animation; normal motion completes and restores controls',async()=>{
  await p.emulateMedia({reducedMotion:'no-preference'});await click('.chapter-pips [data-level="first-light"]');await click('[data-rescue=run]');await click('.main-nav [href="#progress"]');await p.waitForTimeout(350);assert(await p.locator('.rescue-journal').isVisible());await click('.rescue-journal a');await click('[data-rescue=run]');await p.waitForFunction(()=>!document.querySelector('[data-rescue=run]').disabled);assert(await p.locator('.outcome-won').isVisible());await p.emulateMedia({reducedMotion:'reduce'});
 });
 await pass('Reset deletes route progress and leaves unrelated browser data alone',async()=>{
  await p.evaluate(()=>localStorage.setItem('festival-unrelated','keep'));await click('[data-action=demo-controls]');await click('[data-action=reset]');await click('[data-action=confirm-reset]');assert.equal(await p.evaluate(()=>localStorage.getItem('tryvo-adventure-v1')),null);assert.equal(await p.evaluate(()=>localStorage.getItem('festival-unrelated')),'keep');assert.equal(await p.locator('#chapter-all-aboard [data-campaign=play]').count(),0);
 });
 await pass('Blocked storage still allows a complete route in the current session',async()=>{
  const c=await browser.newContext({reducedMotion:'reduce'}),q=await c.newPage();await q.addInitScript(()=>{Storage.prototype.getItem=()=>{throw Error('Blocked');};Storage.prototype.setItem=()=>{throw Error('Blocked');};});await q.goto(url+'#rescue');for(const id of paths[0].slice(1))await q.locator(`[data-cell="${id}"]`).click();await q.locator('[data-rescue=run]').click();await q.locator('.outcome-won').waitFor();assert.match(await q.locator('#notice').innerText(),/cannot be saved/);await c.close();
 });
 await pass('No JavaScript errors or failed assets in the tested journey',()=>{assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);});
 fs.writeFileSync(path.join(__dirname,'rescue-results.json'),JSON.stringify({passed:checks.length,checks,errors,failed},null,2));await browser.close();console.log(`${checks.length} checks passed`);
})().catch(e=>{console.error(e);process.exit(1);});
