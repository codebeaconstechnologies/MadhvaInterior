# Website photos

Photos for the hero, before/after slider, project galleries and About page
come from the folders below (all inside `public/images/`). To add, remove or
replace a photo, change the files here and redeploy — no code changes needed.
Photos are served under the same names, e.g. `/images/hero/01_living-room.jpg`.
Use `.jpg` (or `.png` / `.webp`), ideally under ~400 KB and about 1600–2000 px wide.

| Folder | What it's for | File names |
|---|---|---|
| `hero/` | Home page slideshow (zoom / pan transitions run automatically) | `01_living-room.jpg`, `02_modular-kitchen.jpg` … The number sets the order; the rest becomes the caption on the slide. |
| `before-after/` | Home page "before & after" slider | `1_before.jpg` + `1_after.jpg`, `2_before.jpg` + `2_after.jpg` … Both photos of a pair must be the same room, same angle, same size. A pair shows only once both files exist. Room names per number are set in `src/data/images.ts` (`beforeAfterRooms`): 1 Living Room, 2 TV Unit, 3 Entrance, 4 Bedroom, 5 Kitchen, 6 Bathroom. |
| `gallery/<projectId>/` | Project cards, project pages and their photo grid | `<projectId>_<room>.jpg`, e.g. `smruti-garden_kitchen.jpg`, `smruti-garden_tvunit.jpg`. More shots of one room: `smruti-garden_kitchen-2.jpg`. Optional `<projectId>_cover.jpg` becomes the cover photo. |
| `about/` | About page | `founder.jpg` (founder portrait), `studio.jpg` (story section image) |

## Project IDs

The folder name under `gallery/` is the project ID, and must match the `id` in
`src/data/projects.ts` (where each project's title, description and details live):

`smruti-garden`, `walnut-residence`, `family-residence`, `luxury`, `minimalist`,
`modern`, `scandinavian`, `traditional`, `rustic`

A new project needs an entry in `projects.ts` plus a matching folder here.

## Other files in public/images

`studio/` (logos, service photos) and `testimonials/` (client portraits) are
referenced by fixed names in the code. `og-image.jpg` is the preview image shown when the site link is
shared (WhatsApp, Facebook…).
