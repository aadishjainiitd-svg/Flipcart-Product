# Tryvo: changes after the product critique

## Festival Rescue and lantern-festival visual direction

The home screen now leads into an active route-building adventure. Three connected levels add repair budgets, multiple pickups and an ordered bridge/signal constraint. Players manipulate a board, watch their tram follow the plan, see specific failure feedback and retry without losing their recorded first plan. Multiple valid routes support optimisation. Real route records appear in My progress and Rankings, separately from investigation scores.

The visual update introduces an original twilight city illustration, warm gold controls, coral/mint landmarks, chapter cards, tactile street connections, a more compact desktop board and mobile controls above the bottom navigation. Results sit immediately after the board. Route inspection is read-only and preserves the player's unfinished draft.

59 automated checks pass across the new and existing experiences. Engagement still needs testing with users; this is not evidence of cognitive improvement. Remote multiplayer and payments remain simulated/unimplemented as previously disclosed.

## Implemented journal and workspace update — 24 October 2026

| Immediate improvement | What now works |
| --- | --- |
| My Progress | Resume/next task leads; specific contribution; illustrated practice coverage; grouped dates, search and filters; inspectable attempts; same-task/version comparisons; separate reflection distributions with missing-response counts. |
| Rankings | My records and fictional examples are separate; latest completed task defaults; saved filters; newest-first records with visible rubric components and reasoning inspection. No invented ranking position. |
| Mission workspace | One connection editor at a time; radio interpretation choices; source previews; relationship-focused questions; mobile source-desk disclosure; drafts and delayed correctness feedback preserved. |
| Results | Specific contribution, one relevant next action, expandable decision trail/feedback/explanation, and clearly skippable ratings. Previously opened check tasks are explicitly described as replays. |
| Home | Active attempts get Resume first. Returning players get a next-task recommendation. The five-district island and library remain available. |
| Sample-plan bug | Fictional samples retain the response used to score them; the investigation board uses that plan rather than rendering empty choices alongside 20/20. |
| Visual consistency | Shared typography, illustrated dashboard landmarks, responsive record cards, fewer initially expanded mobile sections, visible keyboard focus, labelled meters and Reset Demo inside Demo controls. |

Verification: 30 existing regression checks plus 15 new journal/workspace checks passed. See `QA.md`. All test fixtures are synthetic and isolated from the user's normal browser data.

Still future scope: connected festival chapters, optional player-selected enquiry, deeper practice-focus paths, real cross-device cooperative rooms and private challenge events. No backend, payments, verified independence or demonstrated learning is implied by this update.

## Earlier reasoning revision


24 October 2026 · Implemented prototype revision 2

The central change is a more meaningful practice loop: record a first judgment → inspect raw evidence → connect sources to interpretations → design a comparison → see precisely what the structured choices support → attempt a different kind of problem.

| Review gap | Implemented change | Remaining limit |
| --- | --- | --- |
| Selecting every clue could earn full evidence credit | Every playable mission and the independent check now require two source–interpretation connections. Correct source and interpretation are both required for each 20-point connection. | Multiple-choice interpretations can still be guessed. This is not a general reasoning assessment. |
| Evidence notes disclosed the lesson before a hint | Revised evidence displays observations; instruction appears in explicit hints or post-commit feedback. | Some observations naturally constrain the answer. |
| Distractors were too easy | Alternatives now represent specific mistakes: confusing timing with causality, overlooking group differences, confusing totals with rates, and overgeneralising a trial. | Difficulty needs testing with the intended audience. |
| Contribution feedback overstated what the player understood | The record shows the chosen source, chosen interpretation and why that connection is supported or needs revisiting. Personal notes are visibly ungraded. | No semantic evaluation of free text or verification of unaided work. |
| Decisions did not visibly change the scenario | The flagship has a responsive investigation board. Choosing price, transport or a combined offer changes the comparison groups; allocation changes the plan's limitations and authored response. | No simulated causal outcome or persistent city economy. |
| The independent check repeated the lesson too closely | The reminder trial uses random assignment and a supported effect estimate. Automatically choosing “we cannot know” is no longer the correct shortcut. | One task cannot establish transfer, improvement or durable learning. |
| Assistance and replay felt like wasted practice | First-exposure rules appear before entering a new story. Progress records supported practice, revisits and shared investigations separately. Specific feedback remains available. | Independent point rules are preserved; whether they discourage help-seeking must be tested. |
| Shared play did not require both contributions | Each player receives complementary key evidence and must record their own connection before handoff. The final record retains individual attribution. | Same-device cooperation only. |
| Satisfaction was asked too late and overwritten | Optional earned-achievement and enjoyment ratings now appear after every result and persist per attempt, including partial drafts. | Self-report is not a biological or cognitive measurement. |
| The library emphasised breadth over depth | Five playable stories are prioritised; twenty upcoming entries remain labelled and collapsed. A three-step starter route offers a concrete sequence. | Upcoming stories are not implemented. |
| Rankings were only unexplained numbers | Same-revision local results are separated from fictional examples. Example and simulated-duel reasoning can be inspected. | No remote leaderboard, opponent or verified ranking. |
| No useful next action after a mission | Feedback recommends a relevant next task or supported revisit. The optional route connects the flagship, independent check and market mission. | Voluntary return and habit formation are unproven. |
| Mobile investigation was too long | Collapsible briefing, compact clue rail, collapsible supporting context and a two-part flagship decision flow. Sticky actions and bottom navigation remain. | Tested in Chromium viewports; physical-device testing remains. |
| Commercial story was too broad | The campaign panel distinguishes free starter content, a future authored campaign and facilitated club sessions. Optional interest stays local and is explicitly not a signup. | Pricing, willingness to pay and content economics remain research questions. |

## What was deliberately retained

The illustrated world, five districts, local cooperation, simulated duel, rankings and progress remain. MindScore measures accumulated eligible game points; it does not claim intelligence, brain health, improvement or dopamine change. No live payments, accounts, real opponents or external analytics were introduced. The earlier prototype folder is untouched.

Saved earlier attempts continue with their original mission content and rubric. Old scores are excluded from revised comparisons. A content revision never creates another opportunity to earn points on the same task.

See `QA.md` for implementation checks and `VALIDATION.md` for the user evidence still needed.
