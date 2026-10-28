# Junk-B-Gone — website

Single-page static site in plain HTML, Tailwind CSS v3 (compiled and committed) and a small vanilla JS file. No frameworks and no runtime CDNs. It runs on GitHub Pages from `main` (root).

Draft: https://tobygregg.github.io/junk-b-gone/

## Folder layout

```
index.html               the whole site, one section per comment banner
thanks.html              page shown after the quote form is sent
404.html                 not-found page (GitHub Pages serves it automatically)
assets/css/styles.css    compiled Tailwind – rebuild with `npm run build`, don't edit by hand
assets/js/main.js        menu, header, scroll reveals, services explorer, mobile bar, form validation
assets/fonts/            self-hosted Rokkitt + Figtree (woff2) and their OFL licences
images/brand/            logo.svg (full), logo-horizontal.svg (header), mark.svg (island only)
images/illustrations/    hero-clearout.svg + service-*.svg (copies of the inline artwork, for reuse)
images/                  favicons, icon-192/512, og-image.jpg, site.webmanifest
src/input.css            Tailwind source: @font-face, components, keyframes
tailwind.config.js       brand colours and fonts
sitemap.xml, robots.txt
_fb-pack/                the Facebook research pack the site was built from (not published)
```

## Brand

| Name | Hex | Used for |
|---|---|---|
| leaf | `#7AB83C` | Island green from the logo – illustration fills, highlights, selected states |
| leaf-700 | `#467A1C` | Green buttons and links (passes contrast with white text) |
| leaf-900 | `#20391A` | Reviews band |
| leaf-50 / 100 | `#F3F8EC` / `#E4F0D6` | Pale section and illustration backgrounds |
| rust | `#933A1A` | Lettering colour from the logo – Call buttons, "Guernsey" in the headline, step numbers |
| card | `#E2B56B` | Cardboard boxes in the illustrations (from the brown in the logo palette) |
| ink | `#1F2A17` | Body text and illustration outlines |
| paper | `#FAF8F2` | Warm off-white page background |

- **Fonts:** Rokkitt (headings – a condensed slab close to the logo's lettering) and Figtree (body), both from @fontsource, self-hosted, SIL Open Font Licence.
- **Logo:** the Facebook profile picture is only 320 px, so it has been **redrawn as SVG**. The island outline is traced from the original and the wordmark is set in Rokkitt Bold, condensed to match. Same layout and colours as the original. Worth showing the client so they can confirm they're happy with it.

## Editing

- **Text:** everything is in `index.html`. Sections are marked with big comment banners (HERO, SERVICES, HOW A JOB RUNS, WHY US, REVIEWS, FAQ, CONTACT, FOOTER).
- **Colours:** change them in `tailwind.config.js`, then run `npm install` (first time only) and `npm run build`.
- **Services explorer:** each service has a tab button (`role="tab"`, `data-tab="house"` etc.) and a matching panel (`data-panel="house"`). To add one, copy a tab and a panel, give both a new id, and add the service to the form's `<select>`. The "Get a quote" button in each panel pre-selects the service in the form via `data-quote-service`, which must match an `<option>` exactly.
- **Adding photos:** the Facebook page had no photos of finished jobs, so this draft uses illustrations. When the client sends photos, save two WebP sizes into `images/work/` (`name.webp` at ~1600 px and `name-sm.webp` at ~800 px) and use them with `srcset`, `width`/`height` and `loading="lazy"`. Once there are real photos, add a "Recent work" gallery with a lightbox, or a before/after slider. The service panels are also a good place for one photo per service in place of the illustration.
- **Reviews:** four short quotes in the REVIEWS section. Swap or add more by copying a `<figure>`.
- **FAQ:** native `<details>` elements – copy one to add a question.

## Before going live — checklist

- [ ] Swap `https://tobygregg.github.io/junk-b-gone/` for the real domain everywhere: canonical, `og:url`, `og:image`, `twitter:image`, JSON-LD, `sitemap.xml`, `robots.txt` and the form's `_next` field.
- [ ] Update the absolute `/junk-b-gone/` paths in `404.html` (they're needed so the page works at any URL on GitHub Pages). On a custom domain they become `/`.
- [ ] **When the client goes ahead, switch the form from Toby's email to the client's** (`action="https://formsubmit.co/…"` in `index.html`, and the `_subject` line), then send a test enquiry and click FormSubmit's activation link.
- [ ] Confirm phone (07781 111266, also used for WhatsApp) and email (gsyjunkbgone@gmail.com).
- [ ] Get the client to sign off the services wording, the "what's included" lists and the FAQ answers.
- [ ] Confirm the business name styling: the logo and most posts say "Junk-B-Gone", the Facebook page name is "Junk-B-gone". The site uses "Junk-B-Gone".
- [ ] Ask for real job photos (before/after clear-outs, a loaded-up vehicle). They'd make the biggest difference to the site.
- [ ] Ask whether they want more trust points shown. One graphic says "fully licensed", but that isn't on the site until the client confirms what licence it refers to.

### Assumptions in this draft

- Service list and "what's included" come from the business's own post graphics (house, garage, shed, loft, office and garden clearances; furniture, appliances, bin bags; soil, rubble, aggregates, wood and timber; storm clear-ups), plus a review mentioning dismantled sheds and fence panels.
- "Free in-person quotes", "same-day pickups", "family run", "competitive rates", "rain or shine" and "sorted for recycling" are all claims the business makes in its own posts.
- No address or opening hours were published, so none are shown. JSON-LD only gives Guernsey as the area.
- Reviews are trimmed quotes from customers' own posts, shown with first name and surname initial.

### Left out on purpose

- Shared posts from other pages (a museum open day, property listings, a shop's job adverts, a restaurant's hiring post, a drinks company's statement), quote/meme images, seasonal promos (Christmas, summer holidays, Storm Darragh) and the follower/review counts.
- Review screenshots were used only as the source of the four quotes.
- No gallery or before/after slider, because there are no real job photos in the pack.

## Source

Built from the Facebook pack in `_fb-pack/` (BRIEF.md, data.json, images). The folder name starts with an underscore so GitHub Pages doesn't publish it.
