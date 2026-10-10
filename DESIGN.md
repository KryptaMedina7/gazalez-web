---
name: GAZAL
description: Editorial industrial biotechnology with a rural welcome, an immersive particle ribbon, pale greens and forest ink.
colors:
  canvas: "#f7f8f3"
  surface: "#fff"
  mint: "#dcebd8"
  kit-primary: "#e4eedc"
  mint-light: "#edf3e9"
  sage: "#b8ceae"
  ink: "#183a2d"
  forest: "#163024"
  body: "#4c6254"
  line: "#cfd9ca"
  dark-line: "#3c5846"
  error: "#9d3232"
  focus: "#287452"
  button-hover: "#36583e"
  field-border: "#b9c8b4"
  placeholder: "#657460"
  tag-border: "#9eb89a"
  ribbon-heading: "#4c7050"
  ribbon-world: "#18251e"
  ribbon-contour: "#8daa8a"
  ribbon-caption: "#edf3df"
  ribbon-support: "#c5d5b9"
typography:
  display:
    fontFamily: '"Manrope Variable", sans-serif'
    fontSize: "clamp(54px, 5.8vw, 88px)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  ribbon-display:
    fontFamily: '"Manrope Variable", sans-serif'
    fontSize: "clamp(36px, 4.2vw, 64px)"
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  headline:
    fontFamily: '"Manrope Variable", sans-serif'
    fontSize: "clamp(34px, 3.65vw, 58px)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  title:
    fontFamily: '"Manrope Variable", sans-serif'
    fontSize: "26px"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  body:
    fontFamily: '"Lexend Variable", sans-serif'
    fontSize: "15px"
    lineHeight: 1.65
  action:
    fontFamily: '"Lexend Variable", sans-serif'
    fontSize: "12px"
    fontWeight: 450
    lineHeight: 1.45
  label:
    fontFamily: '"Lexend Variable", sans-serif'
    fontSize: "12px"
rounded:
  square: "0px"
  circle: "50%"
spacing:
  gutter: "clamp(24px, 4.5vw, 88px)"
  section: "100px"
  mobile-section: "65px"
  compact-section: "45px"
  field-gap: "10px"
components:
  button-primary:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.canvas}"
    typography: "{typography.action}"
    rounded: "{rounded.square}"
    padding: "15px 23px"
  button-primary-hover:
    backgroundColor: "{colors.button-hover}"
    textColor: "{colors.surface}"
  button-on-forest:
    backgroundColor: "{colors.kit-primary}"
    textColor: "{colors.forest}"
    typography: "{typography.action}"
    rounded: "{rounded.square}"
    padding: "15px 23px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.square}"
    padding: "15px 23px"
  button-secondary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
  text-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    padding: "8px 0"
  field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "14px 15px"
    width: "100%"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "5px 10px"
  navigation:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
  solution-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "26px 0"
  solution-row-hover:
    backgroundColor: "{colors.mint-light}"
---

# Design System: GAZAL

## Overview

**Creative North Star: "Industrial Biotech Premium"**

Pale mint and sage fields, forest ink, generous editorial typography and fine rules connect industrial material to applied science. The tone is serious, clear, technical and human. The supplied GAZAL lockup preserves its exact serif lettering and symbol as a transparent raster asset; it is not reconstructed with Manrope or an invented font.

The interface uses open sections and typographic hierarchy to organize information. A brief rural welcome precedes the restored official ADN particle ribbon, followed by calm kit-gradient surfaces, material artwork and scientific diagrams. The hero retains its ADN-only geometry throughout native scrolling. Generated scenery and material concepts remain distinct from operational evidence. Light green remains the chosen identity; gold is restricted to previously authorized subtle accents outside the five-color gradient kit; a generic SaaS identity is excluded.

**Key Characteristics:**

- Light green fields with forest text and focused dark sections.
- Exact supplied GAZAL lettering and static gradients from the brand kit.
- A rural welcome followed by an immersive particle ribbon driven by native scroll.
- Large Manrope headlines paired with readable Lexend supporting text.
- Square controls, fine rules and open editorial rows.
- Material concepts visibly distinguished from operational evidence.
- Keyboard access and reduced motion built into interactions.

This scan captures the local unpublished restoration of 2026-10-01 in `src/app/globals.css`, `src/app/gazal-campo.css`, `src/app/gazal-surfaces.css`, `src/app/hydrobac-lab.css`, `src/lib/matter-field.mjs` and the active components. The official particle hero and process geometry are restored while the current editorial architecture, navigation content and factual claims are retained. The internal HIDROBAC lab is recovered from `qa/restoration/hidrobac-lab.official.js` using the existing React runtime. Frontmatter records reusable defaults; stylesheets remain authoritative for responsive and component-specific overrides. The companion `.impeccable/design.json` contains extension metadata and framework-free previews. Earlier forest and material-morph plans are historical references, not the current implementation contract.

Restoration QA reported by the main task: lint and build pass, 17 tests pass with 3 PHP-dependent skips, and DOM checks at 390px and 1440px show no horizontal overflow. These checks do not certify physical devices or a production deployment. The 31 font/color/radius findings in `qa/restoration/detector.json` are advisory; local component exceptions do not establish new global tokens.

The 2026-10-09 navigation/landscape extension is recorded from the current source in `gazal-navigation-landscape.css` and its active components. It updates the fixed header, language disclosure, continuous explorer controls, supplied section films and footer ridges within the incumbent identity. The current detector reports 11 advisory findings from the existing ramp mismatch; these are non-blocking and do not authorize replacing the global tokens. Historical verification paragraphs below describe their named revisions, not fresh browser or deployment proof for this extension.

## Colors

The palette stays in a subdued green family, balancing light mineral surfaces with deep forest contrast.

### Primary

- **Forest** supplies primary action fills and high-contrast text; the current transformation laboratory uses pale green surfaces.
- **Ink** carries headings, navigation and high-priority copy.
- **Mint**, **Light Mint** and **Sage** provide feature fields, hover feedback and selection color.
- **Kit Primary** supplies pale actions on the forest and the light gradient surfaces.

### Neutral

- **Canvas** is the default page ground; **Surface** is the white input ground.
- **Body** softens paragraph text without introducing a separate hue.
- **Line** separates light sections; **Dark Line** separates content on forest.
- **Field Border**, **Placeholder** and **Tag Border** retain the observed form and metadata treatments.

The `ribbon-*` frontmatter shades describe the active hero heading, dark particle field, caption and supporting copy in `gazal-campo.css`. Particle colors and the restored process and HIDROBAC diagram colors remain local scientific-illustration values; they do not redefine the global palette or gradient kit. Unused morph-phase and sample-fiber colors are not normative system tokens.

The error color is reserved for error copy. Focus and button-hover colors express interaction states rather than additional brand accents.

The supplied gradient kit uses only Kit Primary, Mint, Canvas, Forest and Ink as inputs, with alpha blends of those channels. Bruma appears on the introduction; the current footer uses a forest field beneath layered green ridges. Biomasa appears on homepage solutions, Horizonte on traceability and Bosque on the contact band. Flujo and Halo remain available kit variants. These gradients are static CSS surfaces; the supplied aurora JSON is archived reference, not a running background animation.

**The Light Green Identity Rule.** Keep the supplied GAZAL lockup intact and use the established mint, sage and forest family. Keep the gradient kit within its five supplied colors; retain brass only as a restrained incumbent detail outside that kit.

## Typography

**Display Font:** Manrope Variable, sans-serif fallback.

**Body Font:** Lexend Variable, sans-serif fallback.

Both fonts are bundled locally through `@fontsource-variable` imports. Manrope supplies compact, balanced headlines; Lexend keeps technical prose and small interface labels distinct. There is no separate monospace brand role and no single mathematical type scale.

**The Exact Lettering Rule.** Display the supplied GAZAL lettering as the transparent raster lockup. The kit contains no installable logo font; never substitute a serif approximation or make the interface inherit the logo lettering. The header and footer use `public/assets/gazal/gazal-horizontal-transparente.webp`.

### Hierarchy

- **Display** retains the earlier reusable hero baseline. The current homepage alone uses **Ribbon Display** from `main .ribbon-copy h1`: `clamp(36px, 4.2vw, 64px)`, 1.1 line-height and -0.035em tracking; at widths up to 1000px or heights up to 719px it uses `clamp(30px, 7vw, 46px)`. Do not apply this local override to interior-page headings.
- **Headline** is the default section heading. Headings use balanced wrapping and medium weight rather than bold slabs.
- **Title** is the default third-level heading; the transformation panel uses a larger title (32px).
- **Body** is the inherited paragraph baseline. Supporting editorial copy commonly uses 12–13px. The ribbon hero description uses 16px/1.7 with a 42ch maximum, changing to 15px and 56ch in its compact layout. Its audience line uses 13px/1.7, changing to 12px. These are component-specific values.
- **Action** is the button role; **Label** captures the shared 12px label size. Metadata tags use 9px and 0.01em tracking.

The critical form labels, consent and help text retain the final 12px overrides; enquiry results use 14px copy. On mobile, text inputs and textareas use 16px. Do not copy the tiny decorative caption sizes into instructions.

## Layout

The site uses full-width sections with a shared fluid horizontal gutter. General section spacing and interior layouts retain their existing stylesheet overrides. The particle hero opens with pale copy at 47% width and its dark visual clipped to the remaining area. Scrolling fades the copy and opens the dark visual across the full sticky frame below the header. These proportions belong to this opening surface.

At widths of at least 1001px and heights of at least 720px, the motion-ready hero uses a viewport-height sticky frame below `--site-header-height` with 1160px of extra travel. At widths up to 1000px or heights up to 719px, copy and visual stack: the copy scrolls normally and only the visual sticks, with 820px of extra travel. Its height is `min(760px, 100svh - var(--site-header-height))`, with a 260px minimum. Native scrolling and the “Ver soluciones” anchor remain available throughout. No JavaScript retains the original static particle plate; reduced motion keeps a static particle composition without an added scroll track.

The following solutions surface overlaps the hero by 16px, sits at z-index 4 and uses 24px upper corners. The progress bar sits 16px above the visual bottom edge. Reduced motion removes this overlap and rounding. The original particle field drifts downward by 6% and scales to 1.04 over the final 70% of native scroll. The restored transformation section uses its original particle diagram and editorial copy rather than the superseded compact sample layout.

The homepage HIDROBAC explorer retains its original layered illustration, followed by the separation toggle/range, component buttons and explanatory copy. It has no compact side-by-side workspace wrapper or forced 320px/235px figure sizing. The internal HIDROBAC page additionally uses the official six-stage SVG lab: Sistema, Matriz, Agua, Bacterias, Raíz and Evidencia. Its stage keeps a 3:2 aspect ratio, a maximum width of 1020px and a viewport-height bound of 74vh; its local responsive rules change at 720px. These are separate components with different interaction layouts.

The surrounding site retains its own responsive breakpoints; do not propagate the hero thresholds globally. Action controls generally provide at least 44px interactive height; the hero skip action uses 46px on desktop and 44px in compact layouts.

The approved 2026-10-09 material extension retains the existing header and page opening. Its workspace places the explorable SVG scene on the left and the contextual reading on the right (`1.4fr / 1fr`), with controls below both. At 900px it stacks scene then reading; at 760px the four chapter controls become a two-column grid and the transport wraps. Family articles and the document workspace also stack at 760px. These local breakpoints preserve the material → requirement → enquiry sequence without horizontal dragging.

## Elevation & Depth

The general editorial interface conveys depth through tonal fields, static kit gradients, fine dividers, conceptual texture and the forest process panel. The ADN hero layers Canvas 2D particle tones with contour lines and botanical edges. Countryside imagery also sits behind the hero under a static dark veil; it is not evidence of company property. The restored transformation diagram retains the same particles across four conceptual operations. The mobile dialog uses a translucent forest overlay (`#16302466`) and stacking order. The recovered internal HIDROBAC lab adds a local evidence-card shadow (`0 18px 40px -24px rgba(22, 48, 36, 0.45)`) and an active-control ring (`0 0 0 5px rgba(201, 226, 166, 0.6)`); these are component exceptions, not a general card-elevation system.

**The Tonal Depth Rule.** Separate content through field color, spacing and hairlines before adding elevation effects.

## Shapes

Controls and content regions are predominantly square. Fields explicitly use zero radius; buttons, tags and open rows retain the same rectangular character. Circular geometry is reserved for small status markers, arrow containers and scientific diagrams. The internal HIDROBAC lab has an 18px stage radius, 14px evidence-card corners and pill/circular controls. These restored local shapes are not general card tokens.

Light surfaces use thin green borders. Rows usually carry a bottom rule rather than an enclosing card outline. Images crop within their section region; visible captions sit over a light tonal strip.

The 2026-10-09 family extension deliberately uses local corners: 12px on family images, 16px around material/document workspaces, 6px on their controls and 8px on document sheets and family context. Its larger scene headings and reading text are scoped in `material-lab.css`. These are component exceptions, not new global radius or typography tokens; the frontmatter defaults remain unchanged.

## Components

### Buttons and text links

Primary actions are forest-filled rectangular controls with a 1px forest border, 24px content/icon gap and a 19px arrow. Secondary actions are transparent with ink text and border. Their frontmatter values capture default padding and colors; large and narrow screens override sizing where needed.

The ribbon hero copy uses the standard forest-filled primary action on a pale ground, followed by a text link. The pale action variant remains available for dark sections; do not transfer the previous forest hero's light text and pale button treatment to the ribbon copy.

Fine-pointer hover changes primary fill to button-hover and secondary fill to ink, over 0.2s. Text links use a bottom rule, 18px icon gap and 44px minimum height. Their arrow shifts by 2px right and 2px up on fine-pointer hover. There is no distinct pressed animation. Disabled buttons use 0.55 opacity and a waiting cursor.

### Inputs and enquiry states

Fields use white backgrounds, fine field-border strokes and square corners. Labels sit above inputs with a 10px gap. Default inputs have 49px minimum height; textareas start at 140px and resize vertically up to 550px. Placeholder text uses its dedicated muted green.

Shared focus is a 3px focus-color outline offset by 5px. Preserve visible labels and the form's explicit preparation/download state: presentation must not imply a message was sent when no provider is configured.

### Tags

Metadata tags are compact, transparent, rectangular labels with a fine tag-border stroke. They are descriptive labels, without a selected state or invented interactivity.

### Navigation

The fixed header is 76px tall, changing to 70px at 700px; matching body padding reserves its space. Desktop uses a flat, Mistral-inspired horizontal rail with vertical separators, pale-green open states and an underline for the current primary group. The contact action is forest-filled. At 1100px and below, the rail gives way to the existing full-screen Radix Dialog adapted from 21st.dev Sterling Gate: three sage/mint layers, large clipped link labels and the supplied GAZAL logo on wide screens. Entrance is 420ms plus a short stagger; exit is 240ms. Keyboard opening and Escape dismissal are immediate. Keep its accessible title, description, close action, focus trap, focus return and scrollable content. Dismissal returns focus with `preventScroll`; following a destination link leaves the route transition in control of the destination's top position.

### Dropdowns and drilldown navigation

Desktop navigation uses semantic disclosure buttons and full-width panels, each with a category overview and two columns of destination links. Mouse hover opens after 90ms and leaving closes after 180ms unless focus remains inside; click toggles, ArrowDown opens and focuses the first link, and Escape closes and returns focus. Outside pointer activation and leaving the focus region dismiss the panel without locking or repositioning page scroll. Panel arrival takes 180ms; reduced motion removes the arrival animation. Destination icons and current-page checks remain. The mobile/full-screen menu preserves the Radix Dialog and supplied Drilldown Menu pattern: stable rows become return breadcrumbs and child labels appear with a short character stagger. Native links preserve opening in a new tab; exiting rows are inert. Rows allow wrapped labels at 240px. The menu tree is centralized in `src/lib/navigation.ts`.

The themed language disclosure lists Español, English and Português with the current language marked. It uses a 220px anchored panel, click toggling, outside/blur dismissal and Escape focus return without scroll locking. Compact navigation typography is intentional: primary triggers and language choices use 14px, the language trigger and header action use 13px, language-code metadata uses 11px, and category overviews use 28px. Destination links use 15px with local 4px corners. These values are scoped to `gazal-navigation-landscape.css`, not a replacement for the editorial type or radius scale.

### Footer landscape (2026-10-09)

Two generated rural illustration planes replace the rejected geometric ridges: a pale distant Cordillera and a darker foreground pasture. They are decorative, not company operational photography. Transparent WebP assets have 960px compact and 1920px desktop variants; prompts and provenance are recorded in `docs/assets/footer-rural-20261009.json`. The panorama sits after the footer links and before the legal line, remains visible at the page end, occupies `clamp(260px, 28vw, 440px)`, and blends into the forest surface. Background/foreground move from 38/90px to -12/-30px on desktop, or 24/54px to -6/-15px on compact screens, with 0.45-second scroll catch-up. At the document end a 20px (11px compact) compression over 160ms returns elastically to zero over 850ms. It rearms only after scrolling at least 65px upward. Only artwork transforms change: native scroll, logo, copy and links remain still. Both scroll movement and bounce are disabled with reduced motion. Closing contact/footer DotGrids are removed; the light DotGrid on informational pages remains. Total landscape transfer is approximately 124KiB compact or 451KiB desktop, lazy-loaded below the page content.

Stage selection in Process, MaterialLab, RecoveryPathways and the homepage HydrobacExplorer shares `StageHighlight`: one green surface travels to the selected button over 380ms with `power3.inOut`, including wrapped mobile rows. Local pale/forest variants keep labels legible during travel. Geometry is read at selection or resize; animation frames update transforms only. Interrupted movement retargets from its current position. Keyboard activation and reduced motion settle immediately. Existing controls, state, chapter progress and scene geometry remain authoritative; the highlight is decorative and aria-hidden.

### Research and supporting motion

The research-to-industry visual is an interactive geometric model of hydrogel, water and beneficial bacteria. Each control changes emphasis and runs a bounded assembly sequence; keyboard changes are immediate. Traceability nodes, solution lists and the HIDROBAC mechanism have shorter relational movement. Sequences pause offscreen and when the document is hidden, and revert with reduced motion. FAQ, dropdown and button feedback remains under 220ms.

### Solution rows and content regions

The reusable solution pattern is an open ruled row with a title, compact description and circular arrow container. Its fill becomes light mint on hover, and the arrow container becomes mint. Mobile places the description under the title. The separate solutions directory is a two-column editorial article at desktop and one column at 760px; it does not reuse the former numbered-card structure.

### Transformation interaction

The transformation laboratory restores the official particle composition from revision `1dcd984` while retaining current editorial copy. Its 120 SVG particles move through four conceptual arrangements: material characterization, recovered fractions, formulation and a traceable chain. On compact screens, one in every three particles is animated. Four stage buttons, pause/replay and a repeat action control the sequence; no range-input or compact fiber/pellet sample is part of this component.

Particle movement lasts 720ms on desktop and 500ms in compact layouts, with a 130ms desktop stagger. Initial, keyboard and reduced-motion stage positioning is immediate. Autoplay advances at 4.5-second intervals in one bounded pass, pauses below the visibility threshold or in a hidden document, and yields to manual selection. Stage controls retain `aria-pressed`; manual stage changes activate polite copy announcements. The homepage HIDROBAC explorer retains its original geometry and controls below the figure. Its separation toggle seeks over 850ms with `power2.inOut`, starting from the current cursor when interrupted and tracking the requested destination for rapid reversals. The direct slider and reduced-motion selection update immediately; geometry and the one-decimal percentage share the same separation value.

The internal HIDROBAC lab preserves the official six chapters and SVG geometry in `hydrobac-lab.jsx`, using the existing React runtime. A manually started sequence spans 14 seconds; chapter selection seeks directly and stops playback. Playback suspends offscreen and skips progression while the document is hidden. With reduced motion, the play control seeks directly to the next chapter; informational hotspots and evidence remain accessible without playing. Its diagram is conceptual and carries no measured-performance claim.

**The Concept Label Rule.** Keep conceptual artwork and diagrams visibly labeled; do not present them as plant photography, measured process evidence or product proof. The user-approved exception of 2026-10-09 is limited to the two new generated family images used as provisional photographic artwork (`public/assets/familias/ingredientes-*` and `nucleos-*`): they appear without visible conceptual labels, with descriptive alternatives and provenance in `docs/assets/2026-10-09-familias.json`. This exception does not authorize evidence claims or removing labels elsewhere.

### Product families and explorable materials (2026-10-09)

The approved extension connects explorable samples to a requirement and a contact action within the existing sage, ivory and deep-green world, using Manrope and Lexend. It introduces no new composition system. Family articles show two supported starting points: animal-nutrition ingredients and poultry protein nuclei. The images are provisional generated material still lifes, not photographs of specific commercial products. No specific catalogue, stock, composition, supply guarantee or additional downloadable technical sheet is established by these articles.

`MaterialLab` replaces the former internal protein relationship diagram with a light SVG workspace. Protein proceeds through Materia prima, Requerimiento, Dieta completa and Documentación. Eighty-four persistent sample shapes and their trays share one progress value; GSAP updates the scene only during requested motion. The scene illustrates relationships without calculating a formula or an incorporation ratio. The initial shared sample treatment for industrial valorization was superseded on 2026-10-09 by the distinct branching decision map documented below.

Chapter buttons, previous/next, a native range and optional play share one continuous cursor. It drives scene geometry, blended chapter emphasis and a percentage displayed to one decimal place. Requested chapter seeks use `power2.inOut`, with a 0.6-second base plus 0.18 seconds per chapter traveled and a 1.4-second cap; interruptions start from the current cursor. A complete requested pass takes 12 seconds and stops at the last stage. Keyboard chapter changes, direct range scrubbing and reduced-motion selection are immediate; reduced-motion play advances one stage immediately. Manual input stops playback, and playback stops offscreen or when the document is hidden. Focusable sample hotspots expose contextual questions, with a return to the selected stage and a contextual enquiry link. Essential explanations remain readable without playing.

The quality workspace selects Origen e identificación, Ficha técnica or Análisis and explains what to request; it is not a certificate or a substitute for an actual document. Family actions open the existing enquiry with `interes=formulacion` and a validated `familia` value. The existing form adds a family selector and includes that family in the locally prepared summary. It continues to use `contacto@empresagazalez.cl`; no sending provider or WhatsApp channel is confirmed. Keep the preparation state explicit.

This extension leaves the ADN hero, HIDROBAC, route-introduction videos and their attribution intact. Implementation scope, sources, QA evidence and publication pending are recorded in `docs/GAZAL-FAMILIAS-2026-10-09.md`.

### Language navigation and distinct recovery pathways (2026-10-09)

Spanish remains the source language and unprefixed route family. Static English and Brazilian Portuguese copies live under `/en/` and `/pt/`; the latter uses `pt-BR`. The ES / EN / PT disclosure preserves the current content route, the `interes` and `familia` enquiry parameters, and the URL fragment. Localized labels must wrap within their controls and preserve the existing logo, menu access, focus states and light-green identity. The earlier language-pass 320px header adjustment was verified in the local browser: document client and scroll widths both measure 305px, and the menu remains within the viewport. Evidence: `qa/idiomas-20261009/contact-en-320-fixed.png`. Translation approval by Nassira remains pending.

`RecoveryPathways` gives industrial valorization its own SVG decision map: origin, properties, branching alternatives and enquiry. Recovery, processing and utilization remain possibilities requiring evaluation, not guaranteed sequential production steps. Stage controls expose the reading, alternative controls explain each branch, and the enquiry link retains `interes=subproducto`. Lines reveal over 650ms with `power2.out` and 55ms stagger; nodes respond over 300ms and reading feedback over 240ms. Interrupted GSAP transitions preserve the current line position rather than reverting to the start; reduced motion is immediate.

Nutrition keeps the existing MaterialLab geometry, transport and manual exploration, with subtle 240ms reading feedback. The HIDROBAC internal lab retains its geometry, six chapters and 14-second requested playback; chapter seeking now eases over 650ms with `power2.inOut`, while range scrubbing and reduced-motion seeking stay immediate. Supporting detail feedback lasts 240ms. These timings communicate a requested state change and introduce no evidence claim.

Specific ingredient pictures depend on a confirmed ingredient list. Current family artwork remains provisional; no catalogue entries or ingredient-specific images may be invented from the broad family descriptions. Local implementation and QA boundaries are recorded in `docs/GAZAL-IDIOMAS-RECORRIDOS-2026-10-09.md`.

### Static surface depth

`gazal-surfaces.css` adds canopy, lab and voices gradients using the existing forest, sage, mint and ivory colors. Introduction, transformation, HIDROBAC, leadership, FAQ and contact have distinct light directions; interior pages get a bounded radial wash behind their opening content. Gradients are static CSS backgrounds, without animated filters or continuous repaint effects.

### Welcome and page movement

The welcome pairs the supplied name-only GAZAL raster wordmark with generated rural imagery. Automatic exit begins after 1200ms and lasts 900ms. The wordmark stays opaque through 65% of the exit at scale 4, then reaches scale 12 and fades; the landscape reaches scale 1.3. The overlay fades during the final 40% and explicitly remains visible during its exit animation. It appears once per session when session storage is available. “Omitir y entrar” and Escape dismiss it immediately; background inertness, scroll locking and focus are restored on dismissal. Reduced motion and no-JavaScript bypass the opening. The countryside asset is atmospheric artwork rather than company-facility photography and remains exclusive to the welcome. No chick video is loaded.

The browser favicon is a transparent optical adaptation of the GAZAL emblem, without a square background. Its SVG alpha mask changes from forest to pale green in dark browser themes; PNG/ICO fallbacks retain the green symbol at 16/32/48/64px. URLs use v3. The header logo remains unchanged. Source: `assets/gazal-favicon-transparent.png`.

The hero uses a volumetric double helix with 18,000 desktop / 6,000 compact points, rendered by a lazily loaded Three.js Points shader in one draw. The offline 144KB XYZ sample buffer avoids runtime geometry generation. The two tubular strands and 29 crosslinks have actual depth; a full axial revolution precedes release. GSAP retains native reversible scroll (0.22 desktop scrub, direct compact scrub): copy holds to 25%, becomes invisible/inert by 49%, framing expands at 49–69%, and particles gather rightward and fall from 70% desktop / 48% compact. Compact copy and scene remain in normal flow with no extended travel; the figure reserves the lower area for its caption. Demand rendering stops when no scroll or pointer trail needs a frame, and pauses offscreen/hidden. Reduced motion bypasses the renderer and uses the matching transparent WebP plate. A failed sample request or WebGL context falls back to that same plate. Assets and reproducible sampling: `scripts/build-dna-particles.mjs`, `public/assets/dna/`. Historical image provenance remains in `docs/assets/2026-10-02-dna.json`.

A new, independent `praderas` landscape accompanies the hero under a static dark-green veil; it does not change the welcome artwork or behavior. Responsive 640/1600 WebP versions also replace the forest in nature-themed internal pages; the social image uses the same rural direction. These generated landscapes are generic atmosphere, not company-property evidence.

Solution cards show images and essential descriptions together. Fine-pointer hover only opens a small image inset, without replacing text or changing height. Tablet cards use a horizontal text/image layout. Process stages retain their identities and sequence; shared SVG gradients give small particles volume, while overlapping grid panels reserve the largest text height without fading every paragraph. Manual selection or focus inside the explanation pauses autoplay. Repetition is explicit. HIDROBAC retains all controls and geometry with slightly stronger surface/edge shading.

The user approved Three.js on 2 October and clarified on 3 October that scroll must rotate the double helix about its own longitudinal axis. The active representation is a volumetric point cloud, not a rotating image plate. Legacy image sampling and Canvas geometry remain available but are not the active hero. The DNA is brand artwork, not measured process evidence.

Navigation restores the three-panel green route curtain in `page-motion.tsx`. A primary pointer activation of an internal link covers the screen in 180ms with a 25ms panel stagger, changes the route, then reveals it in 320ms with a 35ms stagger. Keyboard activation, reduced motion, modified clicks, downloads, external destinations and same-path anchors bypass this cover. A 1500ms watchdog releases a stalled curtain. Route-top settlement respects fragment destinations and is canceled by wheel, touch or keyboard input; its final 360ms check is not an animation duration.

Buttons use 140ms press feedback; arrows move 3px over 180ms only on fine-pointer hover. The 21st Social Links adaptation keeps a desktop reveal and mobile expandable contact dock in brand greens. Only the verified email is configured; no unverified social accounts are displayed. Collapsed links are inert, Escape closes and restores focus.

## Do's and Don'ts

### Do:

- **Do** preserve the supplied GAZAL symbol and exact raster lettering unchanged.
- **Do** build with the existing green tokens, local fonts and open editorial hierarchy.
- **Do** retain visible keyboard focus, semantic labels and reduced-motion behavior.
- **Do** keep conceptual image captions visible except for the explicitly approved provisional family imagery above, and keep critical form guidance legible.
- **Do** inspect stylesheet overrides before extending a responsive component.
- **Do** keep the particle scroll native, its local type overrides scoped and its static image fallback complete.
- **Do** use the supplied gradients as static surfaces within their five-color kit.

### Don't:

- **Don't** let gold dominate or substitute a generic SaaS identity.
- **Don't** add rounded shadow cards as the default content structure.
- **Don't** treat material concepts as evidence of facilities, certifications or results.
- **Don't** make information or controls depend on animation or hover.
- **Don't** imply that an enquiry was sent when it was only prepared locally.
- **Don't** replace the GAZAL lettering with an approximate font or present generated forest imagery as company photography.


### Pointer exploration and image variety

Fine-pointer movement creates a local particle impulse with a twelve-sample trail, stronger for faster motion, followed by an 850ms return. It changes the nearby silhouette and point size rather than rotating the entire molecule. Interaction resumes 180ms after the final scroll/scrub update and remains available until the exit completes, including on reverse scroll. The visible scene inset protects the copy; compact screens do not capture touch input. No idle rendering or extra animation loop is added. The transparent barley edge and existing rural backdrop remain behind the particles.

Stage selectors use four compact, outlined buttons with number badges and two-line labels; an opaque pale-green active state distinguishes selection. At 1100px and below they use a two-column grid. Keyboard selection and reduced-motion changes remain immediate. Generic generated poultry, formulation and sample-taking illustrations diversify internal routes; image alternatives describe them as illustrations, with no claim of actual GAZAL facilities.

Internal page openings retain their one-to-one map of 14 routes to 14 distinct images. The supplied four-second brand films are full-screen route introductions for Nutrition (chicken), Protein nuclei (granules) and Innovation (DNA), not inline content. They replace the generic welcome on those destinations and appear once per section/session. Native dialogs preserve keyboard focus and background inertness. Skip and Escape enter immediately; completion fades out in 220ms. Reduced motion, data saving, playback rejection, failure or a slow start bypass the introduction. The page does not depend on successful playback. The 2026-10-09 assets contain six supplied original 1080p films: one 1920×1080 landscape and one 1080×1920 portrait version for each of the three sections, all four seconds at 24fps. Orientation at entry selects the matching original and poster. The earlier 720px portrait crop/blur adaptations are superseded. Lossless VP9 WebM preserves the decoded source frames, with matching decoded-video SHA-256 hashes recorded in `docs/assets/section-videos-20261009.json`; the original MP4 is selected when VP9 is unsupported. Each WebM is approximately 21–32MiB, and only the selected orientation/format receives a source after the intro eligibility checks. Playback has a 2.5-second startup limit and a 6.5-second overall watchdog; skip, Escape and error paths remain immediate. These are full-screen introductions, not inline videos or an operational evidence claim. Homepage category artwork (`nutrition`, `valorization`, `biotech`) remains reserved for the three homepage cards. Eleven generated editorial illustrations complete the other openings; source prompts and responsive outputs are listed in `docs/assets/2026-10-01-image-collection.json`. Neither films nor illustrations are evidence of company facilities. Do not reuse the hero meadow panorama for internal openings.

Topbar state has one primary route owner, even when shortcuts are shared: Innovation owns its subtree and Bioprocesses; Solutions owns the other solution routes; Company owns its corporate destinations. An open secondary menu uses the lighter mint surface so it does not compete with the current section.

### Didactic internal layouts

Nine internal routes use purpose-specific bodies: Nutrition places the avian illustration inside a selectable context scene; protein nuclei connect ingredients, requirements and documentation to a complete diet without proportions; Formulation uses a reference desk; Valuation now branches through the RecoveryPathways decision map instead of reorganizing shared SVG samples; Bioprocesses maps material, challenge and collaboration. Sustainability separates possible recovery from measured evidence, Transfer distinguishes research/license/application, Projects pairs the documented HIDROBAC initiative with a collaboration desk, and Company leads with directors before connected capabilities. The approved homepage, quality trace, solution directory and route introductions retain their behavior; HIDROBAC preserves its geometry with the chapter transition refinement documented above.

Interactions are deliberate selections, not idle loops or mandatory reading gates. Response text enters over 240ms; the bounded sample SVG moves over 450ms. Keyboard selection and reduced motion are immediate. Essential commercial scope remains visible and transfer includes a no-JavaScript fallback. Use the existing forest, sage and canvas tokens; the earlier dark protein diagram was replaced on 2026-10-09 by the light SVG/GSAP material workspace documented above. The other incumbent explorer surfaces retain their rhythm without gradients on every element. On mobile the diagrams precede explanations, controls remain at least 48px tall, and no horizontal drag is required. These incumbent styles are scoped in `section-explorers.css`; the material replacement uses its own local styles and timings in `material-lab.css`. No new visual dependency is added.

Informational pages (FAQ, news, contact, privacy, terms) reuse the light DotGrid: forest-green points at 16% base alpha, 1.1px radius and 38px minimum spacing, with a softer reading-area mask. Local pointer repulsion is limited to 9px; no idle motion, no touch reaction, reduced-motion static, capped at two million raster pixels. Existing dark contact surfaces retain their appearance.

### Scroll-driven axial DNA rotation

Scroll rotates the real XYZ particle cloud one complete revolution around its longitudinal axis, starting at 2.5% and ending at 70% desktop / 48% compact. A second rotation progressively inclines the projected helix by 0.38 radians on desktop and 0.24 on compact layouts. Both rotations finish before release and retain their orientation during it. Reversing native scroll reverses both rotations. A fixed shallow camera tilt reveals depth in the 29 crosslinks; rotated depth controls shading, size and occlusion. The two strands retain cylindrical volume at every angle, with no edge-on flattening. Mouse displacement is applied after projection and release, preserving its local response. The same 18,000 / 6,000 budgets, frame scheduling, fallback and reduced-motion behavior remain. The offline script builds `helix.bin` plus `landscape-axial.webp` and `portrait-axial.webp` from matching geometry; the previously generated image is no longer used to build the active particles.

The October 4 fluency pass shares GSAP's frame clock for DOM and particle drawing, with 320ms desktop / 180ms compact scroll catch-up. Pointer envelopes are packed once per frame and the shader skips inactive impulses entirely; particle count and visual response remain unchanged. Rendering detaches when idle or hidden. Avoid writing readiness attributes on every frame because the fallback uses a `:has()` selector. These changes reduce redundant work; they are not a claim of measured device FPS.
