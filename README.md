# Tryvo — Try. Learn. Own it.

A playable prototype for the Flipkart APM 2040 case. One Lantern Festival campaign connects route planning with evidence, trade-offs, deduction, quantities and uncertainty.

## Run the prototype

Download or clone this repository, then open **[prototypes/tryvo/index.html](prototypes/tryvo/index.html)** in a browser. No install or build step is needed. GitHub's file view displays source; it does not run the game.

For a local server, from the repository root:

```sh
python -m http.server 8765 --bind 127.0.0.1 --directory prototypes/tryvo
```

Open **http://127.0.0.1:8765/#explore**.

## The connected experience

Eight chapters combine three tram-route challenges with five investigations. All five thinking areas are visible on a shared town map. Actual choices and arrivals appear in a shared festival file and finale.

The performance-venue decision changes the destination of the final delivery. Changing that choice reopens the final chapter without rewriting earlier arrival records. Free practice uses the same missions and save state. The optional independent check remains outside the campaign completion count.

Progress is saved only in this browser. Use **Demo controls → Reset Demo** to start again. Characters, scenarios and transactions are fictional; no payment or real transport dispatch occurs. Remote multiplayer is not implemented. Task results do not establish general intelligence or lasting improvement.

## Documentation and previews

- [Campaign behavior and limitations](prototypes/tryvo/CAMPAIGN.md)
- [Prototype setup and controls](prototypes/tryvo/README.md)
- [Visual design and artwork provenance](prototypes/tryvo/POSTER-DESIGN.md)
- [Existing research and findings](Practise_Research_and_Findings.md)
- [Desktop campaign preview](prototypes/tryvo/screenshots/campaign-home-desktop.png)
- [Mobile campaign preview](prototypes/tryvo/screenshots/campaign-home-mobile.png)

## Verification

73 automated checks passed for this update: 30 reasoning, 15 journal, 14 route, 6 visual-map interaction and 8 connected-campaign checks. Tests cover complete journeys, actual decision carry-over, historical records, mobile layouts, keyboard controls, storage, reset and recovery. Results are in `prototypes/tryvo/tests/*-results.json`.

The prototype uses plain HTML, CSS and JavaScript. Browser tests require Node.js and Playwright as development tools only. HTML5 Boilerplate, adapted interaction examples and bundled fonts retain their attribution and license files.
