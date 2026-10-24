const {chromium}=require('playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),url=process.env.TRYVO_URL||'http://127.0.0.1:8765/',checks=[];
(async()=>{
 const browser=await chromium.launch({headless:true}),ctx=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),p=await ctx.newPage(),errors=[],failed=[];
 p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)failed.push(r.url());});
 const pass=async(n,fn)=>{await fn();checks.push(n);console.log('PASS '+n);};
 const stored=()=>p.evaluate(()=>JSON.parse(localStorage.getItem('tryvo-adventure-v1')));
 const routePaths={'first-light':[12,6,7,8,9,10,11,17],'all-aboard':[28,21,14,7,8,15,22,29,30,31,32,33,34,27,20,13],'across-the-river':[35,28,29,22,15,8,9,16,23,24,25,32,39,40,41,34,27,20,13]};
 async function finishMission(id,answer){const m=await p.evaluate(id=>TryvoData.missions.find(m=>m.id===id),id);if(await p.locator('[data-action=enter-story]').isVisible())await p.locator('[data-action=enter-story]').click();await p.locator('#initial-form').waitFor();await p.locator(`[name=initial][value="${m.options[0].id}"]`).check();await p.locator('[name=confidence][value=medium]').check();await p.locator('#initial-form [type=submit]').click();for(const source of new Set(m.links.map(l=>l.sources[0]))){await p.locator(`[data-action=evidence][data-id="${source}"]`).click();await p.locator(`[data-action=pin][data-id="${source}"]`).click();}await p.locator('[data-action=decide]').click();await p.locator(`[name=answer][value="${answer||m.options.find(o=>o.points===40).id}"]`).check();for(const l of m.links){const e=p.locator(`.connection-editor[data-link="${l.id}"]`);if(!await e.evaluate(n=>n.open))await e.locator('summary').click();await p.locator('#source-'+l.id).selectOption(l.sources[0]);await p.locator(`[name="meaning-${l.id}"][value="${l.correct}"]`).check();}if(m.plan){await p.locator('[data-action=build-plan]').click();await p.locator('#plan-factor').selectOption('transport');await p.locator('#plan-groups').selectOption('random');}else await p.locator(`[name=next][value="${m.nextOptions.find(o=>o.points===20).id}"]`).check();await p.locator('#decision-form [type=submit]').click();await p.locator('[data-action=reveal]').click();await p.locator('.task-score').waitFor();}
 await p.goto(url);
 await pass('All five thinking areas and eight connected chapters are visible on the shared map',async()=>{
  assert.equal(await p.locator('.skill-tile').count(),5);assert.equal(await p.locator('.campaign-pin').count(),8);assert.equal(await p.locator('.campaign-chapter').count(),8);
  for(const skill of ['Evidence','Trade-offs','Deduction','Quantities','Uncertainty'])assert.match(await p.locator('.skill-districts').innerText(),new RegExp(skill));
  await p.locator('.skill-tile[data-chapter=forecast]').click();assert.match(await p.locator('#dialog').innerText(),/Bring the lantern makers/);assert.equal(await p.locator('#dialog [data-campaign=play][data-chapter=forecast]').count(),0);await p.keyboard.press('Escape');
  await p.screenshot({path:path.join(root,'screenshots/campaign-home-desktop.png'),fullPage:true});
 });
 const sequence=['first-light','attendance','courtyard','all-aboard','archive','market','forecast','across-the-river'];
 await p.locator('.campaign-dispatch [data-campaign=play]').click();
 await pass('One continuous eight-chapter journey moves between routes and all five investigations',async()=>{
  for(let i=0;i<sequence.length;i++){
   const id=sequence[i];
   if(routePaths[id]){await p.locator('.rescue-board').waitFor();for(const n of routePaths[id].slice(1))await p.locator(`[data-cell="${n}"]`).click();await p.locator('[data-rescue=run]').click();await p.locator('.outcome-won').waitFor();}
   else await finishMission(id,id==='forecast'?'outside':undefined);
   const s=await stored();assert.equal(await p.evaluate(s=>TryvoCampaign.count(s),s),i+1);
   if(id==='attendance'){assert.match(await p.locator('.campaign-handoff').innerText(),/courtyard/i);}
   if(id==='forecast'){assert.match(await p.locator('.campaign-handoff').innerText(),/final destination/);}
   if(i<7){await p.locator(`.campaign-handoff [data-chapter="${sequence[i+1]}"]`).click();if(sequence[i+1]==='across-the-river'){assert.match(await p.locator('.rescue-heading').innerText(),/Outdoor stage/i);assert.match(await p.locator('.festival-gate').getAttribute('aria-label'),/Outdoor stage/);}}
  }
 });
 await pass('Finale uses real choices, preserves weak-decision feedback, and keeps the independent check separate',async()=>{
  const s=await stored();assert.equal(s.rescue.history.at(-1).destination,'Outdoor stage');assert.equal(s.history.length,5);
  await p.locator('.campaign-handoff [data-campaign=finale]').click();assert.match(await p.locator('.festival-finale').innerText(),/8 of 8/);assert.match(await p.locator('.festival-finale').innerText(),/Outdoor stage/);assert.match(await p.locator('.festival-finale').innerText(),/review feedback/);assert.equal(await p.locator('.festival-finale [data-id=library-check]').count(),1);await p.keyboard.press('Escape');
 });
 await pass('Changing the venue reopens only the final delivery and does not rewrite its historical destination',async()=>{
  await p.locator('.main-nav [href="#explore"]').click();await p.locator('#chapter-forecast [data-campaign=play]').click();await finishMission('forecast','inside');const s=await stored();assert.equal(s.rescue.history.at(-1).destination,'Outdoor stage');assert.equal(await p.evaluate(s=>TryvoCampaign.count(s),s),7);assert.equal(await p.evaluate(s=>TryvoCampaign.next(s).id,s),'across-the-river');await p.reload();assert.match(await p.locator('.campaign-handoff').innerText(),/final destination/);
  await p.locator('.campaign-handoff [data-chapter=across-the-river]').click();assert.match(await p.locator('.rescue-heading').innerText(),/Indoor hall/i);assert.equal(await p.locator('.outcome-won').count(),0);await p.locator('[data-rescue=run]').click();await p.locator('.outcome-won').waitFor();const updated=await stored();assert.equal(updated.rescue.history.at(-1).destination,'Indoor hall');assert.equal(updated.rescue.history.at(-2).destination,'Outdoor stage');assert.equal(await p.evaluate(s=>TryvoCampaign.count(s),updated),8);
 });
 await pass('Campaign progress, keyboard previews and phone layouts survive refresh',async()=>{
  await p.locator('.main-nav [href="#explore"]').click();await p.reload();assert.match(await p.locator('.campaign-count').innerText(),/8/);
  for(const width of [320,390,768,1440]){await p.setViewportSize({width,height:900});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow ${width}`);}
  await p.setViewportSize({width:390,height:844});await p.locator('.skill-tile[data-chapter=market]').focus();await p.keyboard.press('Enter');assert.match(await p.locator('#dialog').innerText(),/Carried into your festival/);await p.keyboard.press('Escape');await p.screenshot({path:path.join(root,'screenshots/campaign-home-mobile.png'),fullPage:true});
  await p.locator('.main-nav [href="#progress"]').click();assert.match(await p.locator('.festival-summary').innerText(),/8 of 8/);await p.screenshot({path:path.join(root,'screenshots/campaign-progress-mobile.png'),fullPage:true});
 });
 await pass('Reset clears route and investigation campaign progress together and preserves unrelated state',async()=>{
  await p.evaluate(()=>localStorage.setItem('unrelated-campaign-test','keep'));await p.locator('[data-action=demo-controls]').click();await p.locator('[data-action=reset]').click();await p.locator('[data-action=confirm-reset]').click();assert.match(await p.locator('.campaign-count').innerText(),/0/);assert.equal(await p.evaluate(()=>localStorage.getItem('tryvo-adventure-v1')),null);assert.equal(await p.evaluate(()=>localStorage.getItem('unrelated-campaign-test')),'keep');
 });
 await pass('Malformed route state does not crash the shared world or invent campaign completion',async()=>{
  await p.evaluate(()=>{const s=TryvoEngine.fresh();s.rescue={version:1,selected:'first-light',history:'invalid',drafts:{}};localStorage.setItem('tryvo-adventure-v1',JSON.stringify(s));});await p.reload();assert.equal(await p.locator('.campaign-chapter').count(),8);assert.match(await p.locator('.campaign-count').innerText(),/0/);await p.locator('.campaign-dispatch [data-campaign=play]').click();await p.locator('.rescue-board').waitFor();assert.match(await p.locator('.rescue-page').innerText(),/could not be restored/);
 });
 await pass('No browser errors or missing assets across the complete campaign',async()=>{assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);});
 fs.writeFileSync(path.join(root,'tests/campaign-results.json'),JSON.stringify({date:new Date().toISOString(),checks,errors,failed},null,2));await browser.close();console.log(`${checks.length} campaign checks passed`);
})().catch(e=>{console.error(e);process.exit(1);});
