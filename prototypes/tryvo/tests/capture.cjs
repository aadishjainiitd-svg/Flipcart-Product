/* Clean visual capture and saved-plan verification. Run after reasoning.cjs. */
const {chromium}=require('playwright');
const path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
(async()=>{
 const b=await chromium.launch({headless:true});
 const c=await b.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),p=await c.newPage();
 const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(process.env.TRYVO_URL||'http://127.0.0.1:8765/');await p.evaluate(()=>document.fonts.ready);
 await p.screenshot({path:path.join(root,'screenshots/explore.png'),fullPage:true});
 await p.locator('.featured button').click();await p.locator('[data-action=enter-story]').click();
 await p.locator('[name=initial][value=price]').check();await p.locator('[name=confidence][value=medium]').check();await p.locator('#initial-form [type=submit]').click();
 await p.screenshot({path:path.join(root,'screenshots/mission.png'),fullPage:true});
 await p.setViewportSize({width:390,height:844});await p.screenshot({path:path.join(root,'screenshots/mobile.png')});await p.setViewportSize({width:1440,height:1000});
 for(const id of ['timing','travel']){await p.locator('[data-action=evidence][data-id="'+id+'"]').click();await p.locator('[data-action=pin][data-id="'+id+'"]').click();}
 await p.locator('[data-action=decide]').click();await p.locator('[name=answer][value=both]').check();
 await p.locator('#source-overlap').selectOption('timing');await p.locator('#meaning-overlap').selectOption('together');await p.locator('#source-groups').selectOption('travel');await p.locator('#meaning-groups').selectOption('difference');
 await p.locator('[data-action=build-plan]').click();await p.locator('#plan-factor').selectOption('transport');await p.locator('#plan-groups').selectOption('random');
 await p.locator('#decision-form [type=submit]').click();await p.screenshot({path:path.join(root,'screenshots/investigation-board.png'),fullPage:true});await p.locator('[data-action=reveal]').click();
 assert.equal(await p.locator('.task-score').innerText(),'100/100');await p.locator('.saved-plan summary').click();assert.match(await p.locator('.saved-plan .plan-board').innerText(),/Transport offered/);await p.reload();await p.locator('.saved-plan summary').click();assert.match(await p.locator('.saved-plan .plan-board').innerText(),/Randomly split/);await p.locator('.saved-plan summary').click();
 await p.screenshot({path:path.join(root,'screenshots/contribution.png'),fullPage:true});
 await p.setViewportSize({width:390,height:844});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await p.screenshot({path:path.join(root,'screenshots/mobile-contribution.png'),fullPage:true});
 assert.deepEqual(errors,[]);await b.close();console.log('Clean captures saved; recorded plan survives refresh; mobile contribution fits.');
})().catch(e=>{console.error(e);process.exit(1);});
