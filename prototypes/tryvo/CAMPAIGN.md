# One connected Lantern Festival

## What changed

Festival Rescue is now the planning activity inside one eight-chapter Lantern Festival campaign. The five thinking areas are prominent on the shared world map and all contribute to one festival file.

1. Bring the lantern makers — route planning.
2. The empty seats — evidence about the previous festival.
3. One courtyard, three plans — trade-offs for this festival's gathering space.
4. Bring the town together — route planning for musicians and vendors.
5. The archive handoff — deduction for the festival exhibition.
6. The bigger stall — quantities and the vendors' display trial.
7. A roof for the evening — uncertainty and the performance venue.
8. The final arrivals — signal the bridge and deliver the crew to the chosen venue.

Mira, the map, the next-chapter handoffs, the shared contribution count, the festival file and the finale connect the existing missions. The library remains a free-practice entry to these same missions; it does not have a separate campaign save. Finishing a mission there also contributes to the festival.

## Consequences and truthful progress

- Route success and current-version investigation submissions determine campaign progress; weak recommendations are marked for review rather than described as mastery.
- Actual recorded answers appear in the shared festival file. Existing scores, evidence, assistance labels and historical records remain intact.
- The weather decision selects Indoor hall or Outdoor stage for the final route. Each final delivery snapshots its destination.
- Changing the venue makes the final chapter pending again. Running it creates a new delivery record; old arrivals retain their original destination.
- Other investigation choices contribute inspectable recommendations and narrative handoffs; they do not secretly alter puzzle budgets or invent attendance/revenue forecasts.
- Existing saves are reused. Earlier route records without a venue snapshot remain labelled as earlier festival records; no venue is retrospectively invented.
- The separate independent check is optional and outside the eight-chapter completion count. It remains an assessment, not a festival unlock or proof of general learning.

## Implementation

`js/campaign.js` derives progression from the existing state. `css/campaign.css` presents the shared map, district cards, eight-chapter route, mission context, shared file and finale. There is no new account, server or storage namespace. Reset Demo clears both routes and investigations as before.

## Verification

`tests/campaign.cjs` plays the full campaign through browser controls, including all five investigations and all three routes. It verifies locked previews, actual carried-forward choices, a weak decision remaining reviewable, changing the venue, preserved history, a new final delivery, reload, keyboard previews, 320–1440px layouts, shared reset and errors/assets. Other suites cover scoring, route rules, journals, controls and independent assessment.

Open `http://127.0.0.1:8765/?v=connected-festival#explore` for the shared world. The previous poster design notes describe the visual layer; this document supersedes their statement that connected campaigns are future work. Remote multiplayer remains unimplemented.
