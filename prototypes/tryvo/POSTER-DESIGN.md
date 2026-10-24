# Tryvo: page-two visual implementation

Implemented 24 October 2026 from the user's `Tryvo_ Festival Rescue Infographic.png` reference.

## Visual direction

- Plum `#79064f`, navy ink `#17162f`, cream `#fffefa`, blush `#f7edf5`, orange `#dc4b20`, teal `#176b63`.
- Georgia display headings and wordmark, existing locally bundled Source Sans 3 for body and controls.
- Illustrated town leads the home and live mission. The live mission places the map beside Your plan, Visible consequences and Your contribution.
- Purple routes, portrait pickups, red closures, a used-token counter, tram playback and recorded-route comparisons are live HTML/SVG controls over the background.
- The mobile map supports horizontal panning and an explicit Fit town / Zoom in control. Edits preserve the current pan position. Arrow keys and Enter still work.
- Journals and the original investigation flow retain their functionality and receive the shared plum/cream typography and controls. Investor content (business model, roadmap and research) stays in the two-pager, outside the player interface.

## Scope and limitations

The poster is a visual reference, not executable source. Its town artwork was recreated for the game; this is not a pixel-identical extraction. The established puzzle graph and saved records were preserved. The overlaid connections define playable streets; incidental painted background streets are scenery. No live multiplayer, backend, payments or efficacy claims were added.

Actual contribution comparisons show the first submitted plan in grey, latest tested plan in orange and current plan in plum. Comparisons neither modify drafts nor award points.

## Image asset provenance

Generated using the built-in image-generation tool, with the user's poster as the reference. The project asset is `assets/festival-town.png`; the original generated image was retained.

Full generation prompt:

> Use case: precise-object-edit. Extract and recreate ONLY the illustrated Festival Rescue town map shown in the large gameplay rectangle in the attached poster, as a full landscape game background asset, 1536x1024. The poster is the reference; do not reproduce the poster or infographic. Preserve the distinctive illustrated low-poly/isometric style, warm sage green town, cream little houses and clay roofs, trees, mountains along upper edge, blue river curving down the right quarter, stone bridge at middle-right, orange glowing festival tents at upper/middle right, fireworks behind festival, white depot building at middle-left. Fill the entire image edge to edge with the town illustration. Remove ALL UI: no buttons, panels, labels, text, token counters, people portraits, icons, route overlays, circles, pins, warning symbols, selection lines, or tram. Keep light cream streets weaving through town. Leave central town legible, somewhat uncluttered for live road overlays. Camera composition as close as possible to the actual gameplay map in the reference. Roads should roughly connect six columns of junctions left-to-right across town and five rows top-to-bottom, middle-left depot to middle-right festival, with the river at right. Beautiful detailed real game environment, not a diagram, not a flat icon. The sky/mountain strip occupies only top 15%; most image is playable town viewed from above at an isometric tilt.

## Verification

- 14 Festival Rescue checks passed: all chapters, keyboard route edits, failures, unlocks, playback, persistence, reset, mobile layout, blocked storage and asset/runtime checks.
- 15 journal checks passed: filters, inspection, comparisons, honest sample rankings, mobile layouts and recovery.
- 30 reasoning checks passed: original investigations, assessment, local cooperation, simulated duel, form validation, direct-file opening and persistence.
- 6 poster checks passed: local map asset and theme, actual route comparisons, tram marker coordinates, mobile pan/fit controls, refresh and keyboard controls, browser exceptions.
- The direct-file test now waits for asynchronous hash navigation before asserting visibility; application behavior is unchanged.

Results are in `tests/*-results.json`. Desktop and phone captures are in `screenshots/poster-mission-desktop.png` and `screenshots/poster-mission-mobile.png`; the home capture is `screenshots/festival-home-desktop.png`.

## Reopen

Visit `http://127.0.0.1:8765/#rescue` while the local server is running. Alternatively open `index.html` directly. To restart the server, run `python -m http.server 8765 --bind 127.0.0.1` from this prototype directory. No build step is required.
