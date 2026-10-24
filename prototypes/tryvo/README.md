# Tryvo — Try. Learn. Own it.

A local, illustrated reasoning adventure for the Flipkart APM case. The 2040 setting is a speculative premise. Enjoyment, improvement, independence and earned satisfaction are separate hypotheses to test with users.

## Page-two visual update

**Connected campaign update:** the home screen now leads with one Lantern Festival world, all five thinking areas and eight chapters combining the three route missions with the five investigations. They share progress, actual decisions and a festival finale. The weather choice carries into the final route's destination. See `CAMPAIGN.md` for behavior, historical-record handling and validation. Older references below to connected campaigns as future work are superseded by this implemented local campaign; remote social play is still future work.

The prototype now follows the supplied page-two design: plum-and-cream branding, serif headings, a locally bundled illustrated town, live route markers and token controls, and contribution panels showing recorded attempts. Phone layouts include map panning and Fit town / Zoom in controls. See `POSTER-DESIGN.md` for the reference mapping, illustration provenance, limitations and 65 passing checks. The map artwork is recreated from the poster; the puzzle rules and earlier saved records are preserved.

## Open the prototype

Open `index.html` in a modern browser. All fonts, illustrations, styles and scripts are bundled locally; no build, account or backend is required.

For a consistent local preview, open a terminal in this folder and run:

```text
python -m http.server 8765 --bind 127.0.0.1
```

Then visit http://127.0.0.1:8765/. Keep that terminal running while using the preview. On Windows, `py` can be used instead of `python` if Python is installed through the Python launcher. Directly opening `index.html` is also supported, although browsers may handle saved progress differently for local files. Progress belongs to the browser and origin used.

## Recommended demonstration

Start with **Play Festival Rescue** on the new lantern-festival home screen. Connect adjacent streets, collect riders, and run your tram. Three chapters introduce a repair budget, two pickup stops, then a signal-controlled bridge. A failed plan is reversible; successful routes unlock the next chapter. Undo, cut back, clear, hints and keyboard arrow/Enter controls are available. Visit My progress or Rankings for your actual route records, kept separate from MindScore.

For the original evidence-based investigation journey:

1. Explore the illustrated island or enter **The empty seats** directly.
2. Record an explanation and confidence before seeing guidance.
3. Inspect raw evidence, compare clues and select supporting sources. Connect two sources to specific interpretations.
4. Choose a conclusion, then design an investigation: change price, transport or both; choose how comparison groups are formed. The board responds to these choices.
5. Commit and reveal **Your Contribution**: initial judgment, source connections, conclusion and saved investigation plan, with specific authored feedback. Optional enjoyment and personally earned satisfaction ratings are saved separately for each attempt.
6. Try **The reminder trial**, an independent check with a different study design. Continue to the market mission through the optional starter route.

The island contains five playable missions, twenty clearly upcoming entries and one additional independent check. Local two-person cooperation reuses the flagship; a labelled simulated duel reuses the archive mission. Rankings distinguish local results from fictional examples. Remote multiplayer is not implemented.

## Journal and dashboard update

- **Home:** Festival Rescue leads, followed by a resume/next-task card for returning investigators, the expandable district map and the searchable story library.
- **My progress:** an illustrated field journal with a next action, a specific recent contribution, district practice coverage, dated/filterable records, and inspectable reasoning. Mobile shows three recent attempts with a Show more control. Desktop shows up to ten initially.
- **Comparisons:** select two records of the same task and content version. Each retains its date, mode, assistance and replay labels; a score difference is not labelled proof of learning.
- **Rankings:** separate My records and Fictional examples views; chronological records with conclusion/evidence/next-step bars and a reasoning inspector. No fabricated live leaderboard or automatic first place.
- **Workspace:** one evidence connection editor at a time, keyboard-friendly interpretation choices and a selected-source preview. The source desk collapses on mobile. Drafts and scoring rules are preserved.
- **Your Contribution:** a concrete contribution and one relevant next action lead. The decision trail, source feedback and explanation expand on request. Optional earned-satisfaction and enjoyment responses remain separate.
- **Controls:** use **Demo controls → Reset Demo** for the existing confirmed, namespace-only reset. Sample investigation boards now show the plan that actually earned their displayed score.

The original investigation content/rubric remains version 2; earlier records keep their original scoring. Festival Rescue has its own deterministic rules and three authored layouts. Optional enquiry, richer focus paths, remote cooperative rooms and private challenge events remain future work.

## Festival Rescue implementation

`js/rescue-engine.js` owns the route rules, level definitions, validation, unlocks and records. `js/rescue.js` owns the board, tram playback, original SVG city illustration and dashboard integration. `css/festival.css` adds the lantern-festival visual direction. State is stored under `rescue` in the existing demo namespace; Reset Demo clears both experiences. All content is local and fictional. No payments, real transport dispatch or remote multiplayer occurs. The game does not claim to establish general reasoning improvement.

Verification: 30 reasoning checks, 15 journal checks and 14 Festival Rescue checks pass. See `QA.md`. The new UI was inspected at desktop and mobile sizes, including 320px overflow checks, normal/reduced motion, keyboard play, replay, navigation during animation and blocked storage.

## Interaction refinements

- Search the mission library by title, district or skill. Combine district and availability filters, see matching counts and reset an empty search. Playable includes completed missions available to replay. Upcoming entries remain unavailable.
- Connected mission stages distinguish completed, current and unreached steps. Review your recorded first take without changing it; return from a decision to evidence without losing the draft. Finished contribution records offer read-only stage review.
- A single polite toast reports evidence selections and reflection saves. It does not move focus, stack messages or carry old feedback into another screen. Storage failures stay visible, and session-only responses are labelled honestly.
- On mobile, existing Explore, My progress and Rankings links become bottom navigation. The mission action bar stays above it, with safe-area spacing. Switching destinations preserves the active attempt.
- Library filters, initial/decision drafts and optional reflection drafts survive refresh when local saving is available. Archived contribution links now reopen the correct record after refresh.

These changes adapt four inspected examples from Brad Traversy's **50projects50days**. Exact source paths, revision and adaptation notes are in `ATTRIBUTION.md`; the MIT notice is retained in `vendor/50projects50days/LICENSE`.

## Game and scoring rules

MindScore is accumulated game-progress points, not intelligence, brain health or evidence of improvement. Eligible first unhinted attempts earn once. Replays, interrupted prior exposure, hints, outside assistance and cooperation do not earn independent credit. Duplicate submissions and content-version changes cannot create another award. Task feedback remains available. Free-text reflections are ungraded.

Revised tasks award 40 points for the conclusion, 40 for two correct source–interpretation pairs, and 20 for the next step. In the flagship, those final 20 points depend on separating the factor and randomising allocation. Selecting all clues alone cannot earn a result. Plausible wrong interpretations receive corrective feedback after commitment.

Scenario responses and scoring are authored locally. They are not predictions, AI evaluations or proof of real-world learning. Comparing travel groups does not establish causality. The demo cannot verify whether a player used outside assistance. Earlier saved attempts retain their original content and scoring and are excluded from revised rankings; the new content cannot create repeat awards.

## Demo state and recovery

The new prototype stores non-sensitive demo progress in `tryvo-adventure-v1`. Optional notes stay local; do not enter personal information. **Demo controls → Reset Demo** explains and confirms deletion, clears only this namespace and returns to first use. It preserves the earlier prototype's `tryvo-progress-v1` and unrelated storage. Resetting does not make a previously seen challenge unfamiliar.

If storage is blocked, the adventure remains usable for the current session with an unsaved-progress notice. Invalid saved progress is not silently replaced; the interface offers explicit fresh-session recovery. Interrupted attempts can be resumed.

## Foundation and source

Built from the published **HTML5 Boilerplate v9.0.1** release:

- Project: https://github.com/h5bp/html5-boilerplate
- Release archive: https://github.com/h5bp/html5-boilerplate/releases/download/v9.0.1/html5-boilerplate_v9.0.1.zip
- Archive SHA-256: `f8b02fecb4532381a49a2eb9f481cf46f4e3a420f09587ce5cc6309d9ec67076`

The starter HTML is adapted; its stylesheet is retained as `css/boilerplate.css`. The release's 404 page, robots file, editor configuration and MIT licence are retained. Original HTML and provenance are in `vendor/html5-boilerplate/`. Optional webpack tooling is not used. Font licences are included beside the local fonts. Illustrations are original SVG artwork implemented in `js/art.js`.

## Organisation

- `index.html`: entry document and application shell.
- `css/boilerplate.css`: published starter defaults.
- `css/tryvo.css`, `css/adventure.css`, `css/interactions.css`, `css/reasoning.css`, `css/journal.css`: interface, world and responsive interaction styling.
- `js/data.js`: original fictional mission data, retained for earlier saved attempts.
- `js/content.js`: revised mission content, source interpretations, investigation choices and the new independent check.
- `js/engine.js`: validation, state and scoring rules.
- `js/art.js`: world, landmarks, characters, scenes and evidence illustrations.
- `js/app.js`: navigation, interactions, rendering and local persistence.
- `assets/`: bundled brand mark and licensed fonts.
- `screenshots/`: clean desktop exploration, mission, contribution and mobile captures.
- `QA.md`, `tests/reasoning-results.json`, `tests/journal-results.json`: current verification summary and recorded results.
- `tests/reasoning.cjs`, `tests/journal.cjs`: current engine and browser checks using Node.js and Playwright as development tools, separate from the dependency-free prototype.
- `IMPROVEMENTS.md`: review findings mapped to changes and remaining limitations.
- `VALIDATION.md`: proposed target-user study, return-use research and commercial discovery.

The earlier `output/Tryvo_Prototype/` remains separate and unchanged by this build.

## Validation

45 current checks passed on 24 October 2026 (30 reasoning/journey checks and 15 journal/workspace checks). They cover revised scoring, all playable missions, the independent check, cooperation, simulated duel, keyboard use, mobile and tablet layouts, reflection persistence, old-result compatibility, reset and recovery. See `QA.md` for scope and limitations. Earlier test scripts/results are historical and do not describe the revised flow. The prototype has not been validated with target users and does not demonstrate improved reasoning ability.
