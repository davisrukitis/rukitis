# Launch Roadmap

## Finished in this pass

- Added locale routing with `/en` and `/lv`.
- Added localized floating bottom navigation.
- Added `Projects`, `Notes`, `About`, and `Privacy` routes.
- Added project detail pages using `displayEvents` from `content/events-data.ts`.
- Added multi-year project periods, including ongoing-style ranges such as `2022–2026`.
- Added a separate creative notes archive for photos, TouchDesigner recordings, videos, and loose visual work.
- Added a blank About page scaffold.
- Added a privacy page that lists the tools currently used and leaves room for future tools.
- Added a small privacy notice stored with local browser storage.
- Updated project cards to link to internal archive entries instead of sending visitors straight away.
- Added footer-aware navigation behavior so the floating nav moves out of the way before the footer.

## Your side

For each project, later add:

- More approved images/screenshots.
- Shorter or more personal notes if any page feels too polished.
- Confirm which public numbers are safe to show.
- Confirm if any LinkedIn-hosted screenshots should be replaced with local files.
- Translate project body copy into Latvian when ready.

For Notes, later add:

- Photo sets.
- TouchDesigner videos.
- Short visual experiment descriptions.
- Local or hosted media files.

For About, later add:

- A slower personal intro.
- Optional image block.
- Optional timeline or small list of interests.

## Before launch

- Run `pnpm install`.
- Run `pnpm build`.
- Fix any remaining TypeScript errors from existing generated components.
- Add a real production domain to `content/site.ts`.
- Replace temporary/external screenshots with local optimized images where possible.
- Confirm whether Mapbox, YouTube embeds, or additional analytics need stricter consent behavior.
