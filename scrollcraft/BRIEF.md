# ScrollCraft brief: Gibran Alief Irawan portfolio

**Self-authored under explicit creative delegation.** The owner answered three questions
(structure, peak, authority) and delegated everything else. Items marked *(user)* are their words;
the rest are authored decisions.

## The eight topics

1. **Vibe** *(user, earlier in this project)*: minimalis, elegant, tetap sangat interaktif. Premium-minimal
   monochrome with one restrained accent, light and dark themes. References: none supplied.
2. **Journey, in sequence**: Hero, About, Skills, Projects, Experience, Contact (the existing sections,
   in the existing order).
3. **Energy curve**: quiet open, warm middle, one loud peak at Skills, then steady, then a still close.
4. **Feeling curve and peak**: see below.
5. **Something no site has**: scroll itself spins the whole skill set like a globe (see signature move).
6. **Range**: premium-minimal *(user: "minimalis dan elegant")*.
7. **One world or distinct scenes**: *(user)* **distinct scenes**.
8. **Assets**: *(user)* existing 3D scenes plus `public/profile.png`. **No generation, no kie.ai, no spend.**

## Grammar

**Staged scenes** (a named new grammar, not one of the eight).

- Each section is its own scene with its own scroll device. No section behaves like its neighbour.
- Persistent minimal chrome stays (floating pill nav + progress bar, the owner approved it earlier).
- Grounds are hard per-section, never interpolated.
- Ending resolves and holds: the contact screen is the last thing, with content on it.
- **Bans:** a continuous camera flight, `scrub` video (none exists), the same device twice in a row,
  centred copy in every scene, section counters, scroll cues, decoration strips.

Why not the other eight: *filmic one-shot* needs scrub video and a single carried argument (no footage here);
*chaptered editorial* forbids the fixed bar the owner chose and the pinned peak; *live surface* needs a
product to operate; *continuous world* was explicitly declined; *typographic poster* drops the 3D the owner
wants; *gallery* fits Projects only; *split stage* has no two-sided argument; *cutlist* bans the pin the peak needs.

## Feeling curve

| # | Scene | Feeling | What causes it |
|---|---|---|---|
| 1 | Hero | Curiosity | Name rises line by line; scrolling pulls the 3D object closer while the copy lifts away at different rates |
| 2 | About | Intimacy | The photo is wiped in from below and the intro assembles beside it |
| 3 | Journey + Interests | Calm, then breadth | Timeline rail fills; interests slide sideways as a lateral pan |
| 4 | **Skills (peak)** | **Awe** | After a quiet empty beat, the skill sphere arrives and scroll spins it a full turn, lighting each discipline in turn |
| 5 | Projects | Pride | Cards arrive in staggered columns, spotlight and tilt on pointer |
| 6 | Experience | Grounded | The rail fills as the visitor moves through dated entries |
| 7 | Contact | Resolve | Everything stops. One line, one email, a knot that leans toward the pointer |

No two adjacent scenes share a feeling. Device order: pin + 3D scrub, reveal, pan, pin (peak), flow + pointer,
progress rail, hold.

## The peak

Scene 4, Skills. It gets the largest span by far (about 4.5 viewport-heights of pinned travel vs ~1.5 elsewhere),
the quiet before it (the sphere is *absent* for the first beat: only one line on an empty ground), and the
one hard change of ground on the page.

**Sentence a visitor would say:** "I scrolled and my whole skill set turned into a globe that spun a full
turn, lighting up web, then ML, then vision, and when I grabbed it I could spin it myself."

(The owner answered "semuanya" when asked for the peak. One peak is required: three peaks flatten each other.
Every other scene still gets its own distinct moment, just a smaller one.)

## Signature move

**Scroll is the spindle.** Scroll position rotates the 3D skill sphere through exactly one full turn and
selects the active discipline in sequence. The category pills are a readout of scroll position (clicking one
scrolls there), not a separate filter. On desktop the visitor can also grab the sphere and rotate it freely.
It exists nowhere else: no kit device does it, and it is the peak and the tell-someone sentence at once.

## Tell-someone sentence

> It's the site where scrolling spins my whole skill set like a globe, lighting each discipline as it passes,
> and you can grab it to take over.

## Authored silence

Skills scene, first ~8% of pinned travel: heading line only, sphere absent. This is deliberate (anticipation
before the peak), not dead scroll.

## Constraints carried from the project

- `transform` and `opacity` only for continuous motion.
- 3D scenes pause while offscreen (already in `ViewportCanvas`).
- `prefers-reduced-motion`: pins and pans collapse to normal flow, no position animation, content stays reachable.
- Touch devices: the sphere is scroll-driven only (trackball dragging would trap vertical scroll).
- Real numbers only: category tool counts are derived from the data, nothing invented.
