/* Isolated synthetic records: regression fixtures, never user-research evidence. */
const {chromium}=require('playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),url=process.env.TRYVO_URL||'http://127.0.0.1:8765/';
const checks=[],errors=[],failures=[];
(async()=>{
 const browser=await chromium.launch({headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 const p=await context.newPage();p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)failures.push(r.url());});
 async function pass(name,run){await run();checks.push(name);console.log('PASS '+name);}
 async function key(selector){await p.locator(selector).first().focus();await p.keyboard.press('Enter');}
 async function nav(hash){await p.locator('.main-nav [href="'+hash+'"]').click();}
 async function shot(name){await p.evaluate(()=>{window.scrollTo(0,0);return document.fonts.ready;});await p.screenshot({path:path.join(root,'screenshots',name+'.png'),fullPage:true});}
 await p.goto(url+'#progress');
 await pass('First-use journal offers a mission; zero ratings are not invented',async()=>{
  assert.match(await p.locator('.next-action').innerText(),/Start my first mission/);
  assert.equal(await p.locator('.coverage-district').count(),5);
  await p.locator('.reflection-summary>summary').click();
  assert.equal(await p.locator('.reflection-grid article').count(),2);
  assert.match(await p.locator('.reflection-grid').innerText(),/0 of 0 attempts rated/);
  await shot('journal-empty-desktop');
 });
 let fixture;
 await pass('Journal renders dated contributions, real coverage and separate response denominators',async()=>{
  fixture=await p.evaluate(()=>{
   const D=TryvoData,E=TryvoEngine,s=E.fresh();
   for(const [i,id] of ['attendance','attendance','market','attendance','archive'].entries()){
    const m=D.missions.find(m=>m.id===id),a=E.begin(s,m);
    E.commitInitial(a,m,m.options[0].id,'medium','Fixture first take');a.phase='decision';a.pinned[0]=m.evidence.map(e=>e.id);
    a.reasoning=Object.fromEntries(m.links.map((l,n)=>[l.id,{source:l.sources[0],meaning:i===0&&n===1?l.options.find(o=>o.id!==l.correct).id:l.correct,by:0}]));a.plan={factor:'transport',groups:'random'};a.hint=i===3;
    const r=E.finish(s,m,m.options.find(o=>o.points===40).id,m.nextOptions.find(o=>o.points===20).id,'Fixture note');r.storySeen=true;r.date=new Date(Date.UTC(2026,9,18+i,10)).toISOString();
    if(i===0)s.surveys[r.id]={attempt:r.id,earned:'4',enjoyment:null};
    if(i===1)s.surveys[r.id]={attempt:r.id,earned:'5',enjoyment:'3'};
   }
   if(!E.valid(s,[...D.missions,D.check],D.legacy))throw Error('Invalid test fixture');
   localStorage.setItem('tryvo-adventure-v1',JSON.stringify(s));return s;
  });
  await p.reload();assert.equal(await p.locator('.record-row').count(),5);
  assert.match(await p.locator('.coverage-section').innerText(),/3 of 5/);
  assert.equal(await p.locator('.date-group').count(),5);
  assert.match(await p.locator('.record-row').first().innerText(),/The archive handoff/);
  await p.locator('.reflection-summary>summary').click();
  assert.match(await p.locator('.reflection-grid article').nth(0).innerText(),/2 of 5 attempts rated · 3 unanswered/);
  assert.match(await p.locator('.reflection-grid article').nth(1).innerText(),/1 of 5 attempts rated · 4 unanswered/);
  await shot('journal-desktop');
 });
 await pass('History filters persist; zero results recover without deleting records',async()=>{
  await p.locator('#history-search').fill('empty');await p.locator('#history-condition').selectOption('practice');
  assert.equal(await p.locator('.record-row').count(),2);await p.reload();
  assert.equal(await p.locator('#history-search').inputValue(),'empty');assert.equal(await p.locator('#history-condition').inputValue(),'practice');
  assert.equal(await p.locator('.record-row').count(),2);await p.locator('#history-search').fill('no such mission');
  assert.equal(await p.locator('.record-row').count(),0);assert.match(await p.locator('#history-records').innerText(),/No attempts match/);
  await key('[data-action=clear-history]');assert.equal(await p.locator('.record-row').count(),5);
 });
 await pass('Comparison rejects different tasks, allows matching versions and discloses conditions',async()=>{
  await p.locator('[data-record-compare][value="'+fixture.history[0].id+'"]').check();
  await p.locator('[data-record-compare][value="'+fixture.history[2].id+'"]').click();
  assert.equal(await p.locator('[data-record-compare]:checked').count(),1);assert.match(await p.locator('#compare-record-status').innerText(),/same task and content version/);
  await p.locator('[data-record-compare][value="'+fixture.history[3].id+'"]').check();
  await key('[data-action=compare-records]');assert.equal(await p.locator('.attempt-pair>article').count(),2);
  assert.match(await p.locator('#dialog').innerText(),/does not demonstrate improvement/);assert.match(await p.locator('#dialog').innerText(),/Hint used/);
  await p.keyboard.press('Escape');await key('[data-action=clear-records]');
 });
 await pass('Actual record inspection preserves filters and exposes the original plan',async()=>{
  await p.locator('#history-task').selectOption('attendance');const before=await p.evaluate(()=>JSON.stringify(TryvoEngine.total(JSON.parse(localStorage.getItem('tryvo-adventure-v1')))));
  await key('.record-row [data-action=inspect-record]');
  assert.match(await p.locator('#dialog').innerText(),/Source|source/);await p.locator('#dialog .saved-plan>summary').click();
  assert.match(await p.locator('#dialog .plan-board').innerText(),/Transport offered/);
  await p.keyboard.press('Escape');assert.equal(await p.locator('#history-task').inputValue(),'attendance');assert.equal(await p.locator('.record-row').count(),3);
  assert.equal(await p.evaluate(()=>JSON.stringify(TryvoEngine.total(JSON.parse(localStorage.getItem('tryvo-adventure-v1'))))),before);
 });
 await pass('Rankings defaults to latest task, has no fabricated rank and preserves view preferences',async()=>{
  await p.evaluate(()=>{const s=JSON.parse(localStorage.getItem('tryvo-adventure-v1'));delete s.dashboard;localStorage.setItem('tryvo-adventure-v1',JSON.stringify(s));});await p.reload();await nav('#rankings');
  assert.equal(await p.locator('#rank-task').inputValue(),'archive');assert.equal(await p.locator('.rank-position').count(),0);
  assert.equal(await p.locator('.record-row').count(),1);await p.locator('#rank-task').selectOption('attendance');await p.locator('#rank-support').selectOption('practice');await p.reload();
  assert.equal(await p.locator('#rank-task').inputValue(),'attendance');assert.equal(await p.locator('#rank-support').inputValue(),'practice');
  assert.equal(await p.locator('.record-row').count(),2);assert.match(await p.locator('.record-row').first().innerText(),/Hint used/);
  await key('.record-row:first-child [data-action=inspect-record]');await p.keyboard.press('Escape');await shot('rankings-desktop');
 });
 await pass('Fictional samples render their scored plan; no sample changes real state',async()=>{
  const before=await p.evaluate(()=>JSON.parse(localStorage.getItem('tryvo-adventure-v1')).history);
  await key('[data-action=samples]');assert.equal(await p.locator('.record-row').count(),0);
  await p.locator('.sample-rankings .rival-columns>article').first().locator('details>summary').first().click();
  await p.locator('.sample-rankings .saved-plan>summary').first().click();
  assert.match(await p.locator('.sample-rankings .plan-board').first().innerText(),/Transport offered/);assert.match(await p.locator('.sample-rankings .plan-board').first().innerText(),/Randomly split/);
  assert.doesNotMatch(await p.locator('.sample-rankings .plan-board').first().innerText(),/Choose what changes|Choose a comparison/);
  assert.deepEqual(await p.evaluate(()=>JSON.parse(localStorage.getItem('tryvo-adventure-v1')).history),before);
  await p.reload();assert.equal(await p.locator('[data-action=samples]').getAttribute('aria-pressed'),'true');
 });
 await pass('No page overflow on journal, records, examples and returning home at 320, 390, 768 and 1440px',async()=>{
  for(const width of [320,390,768,1440]){
   await p.setViewportSize({width,height:900});
   for(const hash of ['#progress','#rankings','#explore']){
    await nav(hash);assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),hash+' overflow at '+width);
    if(width===390)await shot(hash.slice(1)+'-journal-mobile');
    if(width===390&&hash==='#progress'){assert.equal(await p.locator('.record-row').count(),3);assert(!await p.locator('.coverage-section').evaluate(n=>n.open));await key('[data-action=more-history]');assert.equal(await p.locator('.record-row').count(),5);await p.locator('#history-search').fill('empty');await p.locator('#history-search').fill('');assert.equal(await p.locator('.record-row').count(),3);}
    if(hash==='#rankings'){await key('[data-action=rank-view]');assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));if(width===390)await shot('rankings-records-mobile');await key('[data-action=samples]');}
   }
  }
 });
 await pass('Home and journal lead with Resume and preserve an unfinished attempt',async()=>{
  await nav('#explore');await p.locator('.mission-card [data-id=attendance]').click();await p.locator('[name=initial][value=price]').check();await p.locator('[name=confidence][value=medium]').check();await key('#initial-form [type=submit]');
  for(const id of ['timing','travel']){await p.locator('[data-action=evidence][data-id="'+id+'"]').click();await p.locator('[data-action=pin]').click();}
  await key('[data-action=decide]');await p.locator('[name=answer][value=both]').check();await nav('#explore');assert.match(await p.locator('.next-action').innerText(),/Resume investigation/);
  await nav('#progress');await key('.next-action [data-action=resume]');assert(await p.locator('[name=answer][value=both]').isChecked());
 });
 await pass('Connection workbench is keyboard accessible, exclusive and retains drafts after refresh',async()=>{
  await p.locator('#source-overlap').selectOption('timing');await p.locator('[name=meaning-overlap][value=together]').focus();await p.keyboard.press('Space');
  assert.match(await p.locator('[data-link=overlap]>summary').innerText(),/Recorded/);
  await key('#preview-overlap summary');assert.match(await p.locator('#preview-overlap').innerText(),/price|bus/i);
  await key('[data-link=groups]>summary');assert.equal(await p.locator('.connection-editor[open]').count(),1);await p.locator('#source-groups').selectOption('travel');await p.locator('[name=meaning-groups][value=difference]').check();
  await p.reload();assert(await p.locator('[data-link=groups]').evaluate(n=>n.open));assert(await p.locator('[name=meaning-groups][value=difference]').isChecked());
  await shot('workbench-desktop');await p.setViewportSize({width:390,height:844});await shot('workbench-mobile');assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 });
 await pass('Result leads with a concrete contribution, one next action and collapsible details',async()=>{
  await key('[data-action=build-plan]');await p.locator('#plan-factor').selectOption('transport');await p.locator('#plan-groups').selectOption('random');await key('#decision-form [type=submit]');await key('[data-action=reveal]');
  assert.match(await p.locator('.contribution-highlight').innerText(),/You supported/);assert.equal(await p.locator('.next-card').count(),1);assert.equal(await p.locator('.result-detail[open]').count(),0);assert.equal(await p.locator('.result-detail').count(),3);
  assert(await p.locator('[data-action=explore]').filter({hasText:'Skip reflection'}).isVisible());await shot('contribution-journal-mobile');await p.setViewportSize({width:1440,height:1000});await shot('contribution-journal-desktop');
 });
 await pass('Earlier content cannot be mixed into a current-version comparison',async()=>{
  const legacyId=await p.evaluate(()=>{const s=JSON.parse(localStorage.getItem('tryvo-adventure-v1')),m=TryvoData.legacy[0],a=TryvoEngine.begin(s,m);TryvoEngine.commitInitial(a,m,'price','medium','Legacy fixture');a.phase='decision';a.pinned[0]=['travel','unknown'];const r=TryvoEngine.finish(s,m,'both','separate');r.storySeen=true;r.date='2026-10-17T10:00:00.000Z';if(!TryvoEngine.valid(s,[...TryvoData.missions,TryvoData.check],TryvoData.legacy))throw Error('Invalid legacy fixture');localStorage.setItem('tryvo-adventure-v1',JSON.stringify(s));return r.id;});
  await p.reload();await nav('#progress');await p.locator('#history-task').selectOption('attendance');await p.locator('[data-record-compare]').first().check();await p.locator('[data-record-compare][value="'+legacyId+'"]').click();assert.equal(await p.locator('[data-record-compare]:checked').count(),1);assert.match(await p.locator('#compare-record-status').innerText(),/same task and content version/);await key('[data-action=clear-records]');
 });
 await pass('All-seen state offers honest replay guidance and a working library destination',async()=>{
  await p.evaluate(()=>{const s=JSON.parse(localStorage.getItem('tryvo-adventure-v1'));for(const m of [...TryvoData.missions,TryvoData.check])s.seen[m.id]=s.seen[m.id]||1;localStorage.setItem('tryvo-adventure-v1',JSON.stringify(s));});await p.reload();await nav('#progress');assert.match(await p.locator('.next-action').innerText(),/opened every available task/);await key('[data-action=browse-library]');await p.locator('#mission-library').waitFor();assert.equal(await p.locator('.mission-card').count(),5);
 });
 await pass('Reset lives in Demo controls, retains confirmation and clears new view state',async()=>{
  await p.evaluate(()=>localStorage.setItem('journal-unrelated','keep'));
  await key('[data-action=demo-controls]');await key('[data-action=reset]');await key('[data-action=confirm-reset]');await nav('#progress');assert.equal(await p.locator('#history-search').inputValue(),'');assert.equal(await p.locator('.record-row').count(),0);assert.equal(await p.evaluate(()=>localStorage.getItem('journal-unrelated')),'keep');
 });
 await pass('No browser exceptions or failed assets in new dashboard and workspace checks',async()=>{assert.deepEqual(errors,[]);assert.deepEqual(failures,[]);});
 await browser.close();fs.writeFileSync(path.join(__dirname,'journal-results.json'),JSON.stringify({date:new Date().toISOString(),method:'Isolated Chromium; synthetic fixtures plus real UI interactions. Not user-study data.',checks,errors,failures},null,2));console.log(checks.length+' journal checks passed');
})().catch(e=>{console.error(e);process.exit(1);});
