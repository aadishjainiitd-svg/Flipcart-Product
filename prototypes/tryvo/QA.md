# Tryvo verification — Festival Rescue and visual update

## Latest verification: 24 October 2026

59 checks pass: 30 in `tests/reasoning.cjs`, 15 in `tests/journal.cjs`, and 14 in `tests/rescue.cjs`. Results are saved beside those scripts. Tests use isolated browser contexts and synthetic records, never the user's actual local progress.

- Three complete chapter playthroughs; at least two valid routes per layout.
- Distinct feedback for incomplete routes, missed riders, insufficient budget and a closed bridge.
- Keyboard editing, rejected jumps/closures, cutting back, saved drafts and first-plan preservation.
- Sequential unlocks, idempotent replay, real local best routes, and read-only record inspection that preserves the working draft.
- Mobile/desktop overflow checks at 320, 390, 768 and 1440 pixels; visible board labels and keyboard focus.
- Normal animation, reduced motion, navigation cancellation, blocked storage and namespace-only reset.
- All older investigation, ranking, reflection, validation and recovery checks still pass.

Screenshots: `screenshots/festival-home-desktop.png`, `festival-board-desktop.png`, `festival-home-mobile.png`, `festival-board-mobile.png`, `festival-complete-desktop.png` and `festival-progress-desktop.png`.

Limits: authored game layouts and outcomes; local-only state; no real players, payments, verified independence or measured learning transfer. This verification establishes functional behavior, not user engagement or cognitive benefit. Existing third-party attribution remains in `ATTRIBUTION.md`; the new game and illustration are original.

## Previous journal and workspace verification

24 October 2026 · **45 current checks passed** (30 reasoning/journey checks and 15 journal/workspace checks) in the revised engine and Chromium browser suite. No runtime exceptions or failed asset responses were observed across the monitored journeys.

## Journal and workspace checks

The new `tests/journal.cjs` suite uses an isolated browser and synthetic records, never ordinary browser progress or user-study data. It verifies:

- Resume and next-task recommendations, first-use and all-seen states.
- Dated history, actual district coverage, saved filters, no-match recovery and mobile recent-history expansion.
- Inspectable local results with source/interpretation feedback and the saved plan; comparison restricted to the same task and content version, with assistance and exposure disclosed.
- Latest-task ranking default, chronological records, fictional examples separated from real records, and no fabricated rank for a lone local result.
- The sample-plan regression: the displayed transport offer and random allocation now match its scored response. Samples never change recorded results.
- Independent denominators for earned-satisfaction and enjoyment responses; unanswered responses are excluded rather than counted as zero.
- Keyboard-operated connection editors, one open at a time, source preview, and saved interpretation drafts after refresh.
- Contribution-first results with one next action and expandable detail; Reset Demo behind a clearly labelled control, preserving unrelated storage.
- Dashboard layouts at 320, 390, 768 and 1440 pixels with no horizontal page overflow. Mobile map and condition summaries start collapsed, and recent history expands on request.

Desktop and mobile screenshots in `screenshots/` were visually inspected. The full-page captures include the fixed mobile navigation at its viewport position; it is not an inline divider in the actual page.

## Verified behaviour

- Five playable missions, twenty labelled upcoming stories, one separate check and the three-step optional route.
- Every revised task requires two source–interpretation connections. Missing connections block submission; wrong interpretations and unsupported source pairs do not earn evidence credit.
- Flagship plan scoring distinguishes separating a factor from combining offers, and random allocation from self-selection or historical comparison. The live board and authored response change with these choices.
- The independent reminder trial supports a different inference: “cannot know” is not the correct shortcut. Its response and ratings remain separate from the flagship.
- Invalid initial/decision input retains entered information. Claim, connections, plan and note survive review navigation and refresh.
- Complete journeys through the flagship, all four other missions and the independent check. Local shared play requires both investigators' attributed connections. Scripted duels and example rankings display authored reasoning.
- First-exposure explanation appears before entry. Cancellation does not consume an attempt. Hints, declared outside assistance, cooperation, replay, duplicate submission and content revisions do not create extra independent awards.
- Optional satisfaction/enjoyment ratings persist by attempt; a missing rating is not invented. Empty submissions request a response or allow leaving the survey.
- Current/old content is selected by record version. Earlier results retain their original rubric and wording, remain viewable and prevent duplicate awards; they are excluded from revised rankings.
- Search with empty results, recovery, comparison modal, stage review, hints, reduced-motion toast, campaign-interest disclosure and explicit reset.
- Reset cancellation preserves data; confirmation clears only tryvo-adventure-v1. Unrelated data and the earlier prototype key are preserved.
- Full flagship completion and session-only reflection when storage is blocked. Corrupt saved data is retained through fresh-session recovery until explicit reset.
- Flagship and independent journeys at mobile width; no horizontal page overflow at 320/390px decision views. All clue buttons can be reached by keyboard in the mobile rail. Investigation layout also fits 768px; desktop checks use 1440px.
- Direct-file opening loads the bundled prototype and starts a mission without a server.

## Visual and interaction review

Reviewed desktop contribution and investigation-board screenshots and the 390px mobile investigation. Fixed a mobile CSS conflict that kept clues in a large grid, and an Escape-close focus race that could reopen the comparison dialog during rapid keyboard navigation. The flagship decision is split into interpretation and planning to reduce the size of each step. Saved contribution records also retain an expandable investigation board.

## Reproduce

Start the preview from this directory with `python -m http.server 8765 --bind 127.0.0.1`. With Node.js, Playwright and its Chromium browser available, run `node tests/reasoning.cjs` and `node tests/journal.cjs`. `TRYVO_URL` can override the default local URL. These are verification dependencies; the prototype itself remains dependency-free HTML, CSS and JavaScript.

`tests/reasoning-results.json` and `tests/journal-results.json` contain the current check names and observed error lists. `tests/results.json`, `tests/interaction-results.json`, `tests/interactions.cjs` and earlier workspace scripts document prior versions; their old totals are not added to current coverage.

## Limits

Chromium checks are not cross-browser, physical-device or assistive-technology certification. Keyboard and viewport checks are not a complete accessibility audit. The demo has no real opponent, account, payment, backend or experiment execution. No target-user study has been conducted; meaningful ownership, enjoyment, return use and learning are still hypotheses. Free text is explicitly ungraded. See `VALIDATION.md` for the study plan.
