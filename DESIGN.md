---
name: GAZAL
description: Editorial industrial biotechnology with photographic forest depth, pale greens and forest ink.
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
typography:
  display:
    fontFamily: '"Manrope Variable", sans-serif'
    fontSize: "clamp(54px, 5.8vw, 88px)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.04em"
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

The interface uses open sections and typographic hierarchy to organize information. A layered photographic forest introduces the homepage, followed by calmer kit-gradient surfaces, material artwork and restrained scientific diagrams. Generated scenery and material concepts retain visible conceptual labels. The light green identity is the user's chosen direction; gold remains restricted to previously authorized subtle accents outside the five-color gradient kit; a generic SaaS identity is excluded.

**Key Characteristics:**

- Light green fields with forest text and focused dark sections.
- Exact supplied GAZAL lettering and static gradients from the brand kit.
- Photographic forest depth driven by a short native scroll passage.
- Large Manrope headlines paired with readable Lexend supporting text.
- Square controls, fine rules and open editorial rows.
- Material concepts visibly distinguished from operational evidence.
- Keyboard access and reduced motion built into interactions.

This is a scan of the implemented system in `src/app/globals.css`, `src/app/gazal-forest.css`, `src/app/gazal-gradients.css`, `src/app/layout.tsx` and `src/components/`, including the approved 2026-09-29 forest refresh. Frontmatter records reusable defaults; the stylesheet remains authoritative for responsive and component-specific overrides. The companion `.impeccable/design.json` contains extension metadata and framework-free component previews. The homepage journey and asset contract remain in `scrollcraft/builds/gazal-forest-2026-09-29/BRIEF.md`.

## Colors

The palette stays in a subdued green family, balancing light mineral surfaces with deep forest contrast.

### Primary

- **Forest** supplies primary action fills and the transformation section's dark ground.
- **Ink** carries headings, navigation and high-priority copy.
- **Mint**, **Light Mint** and **Sage** provide feature fields, hover feedback and selection color.
- **Kit Primary** supplies pale actions on the forest and the light gradient surfaces.

### Neutral

- **Canvas** is the default page ground; **Surface** is the white input ground.
- **Body** softens paragraph text without introducing a separate hue.
- **Line** separates light sections; **Dark Line** separates content on forest.
- **Field Border**, **Placeholder** and **Tag Border** retain the observed form and metadata treatments.

The error color is reserved for error copy. Focus and button-hover colors express interaction states rather than additional brand accents.

The supplied gradient kit uses only Kit Primary, Mint, Canvas, Forest and Ink as inputs, with alpha blends of those channels. Bruma appears on the introduction and footer, Biomasa on homepage solutions, Horizonte on traceability and Bosque on the contact band. Flujo and Halo remain available kit variants. These gradients are static CSS surfaces; the supplied aurora JSON is archived reference, not a running background animation.

**The Light Green Identity Rule.** Keep the supplied GAZAL lockup intact and use the established mint, sage and forest family. Keep the gradient kit within its five supplied colors; retain brass only as a restrained incumbent detail outside that kit.

## Typography

**Display Font:** Manrope Variable, sans-serif fallback.

**Body Font:** Lexend Variable, sans-serif fallback.

Both fonts are bundled locally through `@fontsource-variable` imports. Manrope supplies compact, balanced headlines; Lexend keeps technical prose and small interface labels distinct. There is no separate monospace brand role and no single mathematical type scale.

**The Exact Lettering Rule.** Display the supplied GAZAL lettering as the transparent raster lockup. The kit contains no installable logo font; never substitute a serif approximation or make the interface inherit the logo lettering. The header and footer use `public/assets/gazal/gazal-horizontal-transparente.webp`.

### Hierarchy

- **Display** is the home hero role in frontmatter. General page headings instead begin at `clamp(44px, 6vw, 88px)`; page-specific selectors refine them.
- **Headline** is the default section heading. Headings use balanced wrapping and medium weight rather than bold slabs.
- **Title** is the default third-level heading; the transformation panel uses a larger title (32px).
- **Body** is the inherited paragraph baseline. Supporting editorial copy commonly uses 12–13px. The forest hero description uses 16px with a 1.7 line-height, reducing to 14px/1.65 at 1000px and 13px at 420px.
- **Action** is the button role; **Label** captures the shared 12px label size. Metadata tags use 9px and 0.01em tracking.

The critical form labels, consent and help text retain the final 12px overrides; enquiry results use 14px copy. On mobile, text inputs and textareas use 16px. Do not copy the tiny decorative caption sizes into instructions.

## Layout

The site uses full-width sections with a shared fluid horizontal gutter. Standard section padding is defined in frontmatter; wide screens increase vertical section padding to 130px. The homepage hero is a full-width forest with an overlaid copy region (720px maximum width, 10vw horizontal inset on desktop). The process stage uses 57% / 43%, and innovation and traceability use equal columns. These are observed page patterns, not mandatory proportions for every future screen.

At 1100px, spacing and type compact. At 1000px, desktop navigation yields to the mobile dialog and the enquiry layout becomes one column; the forest reduces its travel and removes its intermediate plane. At 760px, the process stage and most editorial structures stack; the gutter becomes 24px and process controls become two columns. The forest uses its own 420px narrow breakpoint, with 24px copy insets and smaller display type. At 380px, the general gutter becomes 18px, the header CTA hides and form fields stack. At 290px, the gutter becomes 14px and secondary grids simplify further; the forest copy inset is 18px. The wide-screen expansion begins at 1700px.

The header is sticky, with desktop height 100px, compact height 86px, mobile height 78px and wide-screen height 112px. Action controls generally provide at least 44px interactive height; primary buttons start at 54px. Long field content can wrap, and enquiry columns explicitly allow shrinking with `minmax(0, ...)`.

The animated forest uses a native sticky frame sized to `100svh` minus the matching header height, with 780px extra travel on desktop and 420px at widths up to 1000px. Extra travel is enabled only after image decoding succeeds, with motion allowed and a viewport at least 600px tall. Reduced motion, no JavaScript, failed image decoding and shorter viewports retain the static content and actions without an added scroll track. Short viewports use a 600px minimum static frame.

## Elevation & Depth

The interface does not define a box-shadow vocabulary. Depth comes from alternating tonal fields, static kit gradients, photographic/conceptual material texture, fine dividers and the forest process panel. The homepage forest separates a background clearing, a smaller intermediate vegetation plane and independent transparent foreground wings. A stable dark contrast veil supports the HTML copy. The mobile dialog uses a translucent forest overlay (`#16302466`) and stacking order, without a shadow. Avoid adding ambient card shadows as a new default.

**The Tonal Depth Rule.** Separate content through field color, spacing and hairlines before adding elevation effects.

## Shapes

Controls and content regions are predominantly square. Fields explicitly use zero radius; buttons, tags and open rows retain the same rectangular character. Circular geometry is reserved for small status markers, arrow containers and scientific diagrams. The conceptual hydrogel core has a local 10px radius; it is not a general card token.

Light surfaces use thin green borders. Rows usually carry a bottom rule rather than an enclosing card outline. Images crop within their section region; visible captions sit over a light tonal strip.

## Components

### Buttons and text links

Primary actions are forest-filled rectangular controls with a 1px forest border, 24px content/icon gap and a 19px arrow. Secondary actions are transparent with ink text and border. Their frontmatter values capture default padding and colors; large and narrow screens override sizing where needed.

On the photographic hero and dark contact band, primary actions use Kit Primary with Forest text. Hero hover changes the fill to Canvas, text links remain Canvas, and focus outlines stay light. The hero presents “Explorar soluciones” before the commercial conversation action.

Fine-pointer hover changes primary fill to button-hover and secondary fill to ink, over 0.2s. Text links use a bottom rule, 18px icon gap and 44px minimum height. Their arrow shifts by 2px right and 2px up on fine-pointer hover. There is no distinct pressed animation. Disabled buttons use 0.55 opacity and a waiting cursor.

### Inputs and enquiry states

Fields use white backgrounds, fine field-border strokes and square corners. Labels sit above inputs with a 10px gap. Default inputs have 49px minimum height; textareas start at 140px and resize vertically up to 550px. Placeholder text uses its dedicated muted green.

Shared focus is a 3px focus-color outline offset by 5px. Preserve visible labels and the form's explicit preparation/download state: presentation must not imply a message was sent when no provider is configured.

### Tags

Metadata tags are compact, transparent, rectangular labels with a fine tag-border stroke. They are descriptive labels, without a selected state or invented interactivity.

### Navigation

Desktop triggers use a compact outlined menubar with pale green open/current states and Lucide icons. The contact action is separately outlined. The hamburger is also available on desktop. It opens a full-screen Radix Dialog adapted from 21st.dev Sterling Gate: three sage/mint layers, large clipped link labels and the supplied GAZAL logo on wide screens. Entrance is 420ms plus a short stagger; exit is 240ms. Keyboard opening and Escape dismissal are immediate. Keep its accessible title, description, close action, focus trap, focus return and scrollable content. Dismissal returns focus with `preventScroll`; following a destination link leaves the route transition in control of the destination's top position.

### Dropdowns and drilldown navigation

Desktop navigation adapts the supplied AppMenuBar/shadcn pattern with Radix Menubar: four compact anchored dropdowns (276px), semantic Lucide icons on every trigger and all 18 destinations, thin separators, and a current-page check. Enter is 160ms from the trigger origin; closing is immediate so an exiting focus layer cannot dismiss the next panel; keyboard and reduced-motion interaction are immediate. Arrow keys, typeahead and Escape use Radix focus management. The mobile/full-screen menu uses the supplied Drilldown Menu pattern: stable rows become return breadcrumbs and child labels appear with a short character stagger. Native links preserve opening in a new tab; exiting rows are inert. Rows allow wrapped labels at 240px. The menu tree is centralized in src/lib/navigation.ts.

### Research and supporting motion

The research-to-industry visual is an interactive geometric model of hydrogel, water and beneficial bacteria. Each control changes emphasis and runs a bounded assembly sequence; keyboard changes are immediate. Traceability nodes, solution lists and the HIDROBAC mechanism have shorter relational movement. Sequences pause offscreen and when the document is hidden, and revert with reduced motion. FAQ, dropdown and button feedback remains under 220ms.

### Solution rows and content regions

The reusable solution pattern is an open ruled row with a title, compact description and circular arrow container. Its fill becomes light mint on hover, and the arrow container becomes mint. Mobile places the description under the title. The separate solutions directory is a two-column editorial article at desktop and one column at 760px; it does not reuse the former numbered-card structure.

### Transformation interaction

The signature process section combines a dark forest ground, four numbered controls and an SVG particle composition. The selected control has a light top border and brighter text, with `aria-pressed` carrying selection. The copy panel announces updates politely. Scroll advances the process until a user explicitly chooses a step; manual choice then retains control.

The same 120 particles pass through scattered matter, sorted lanes, formulation clusters and a connected ribbon. GSAP animates from the current position in 720ms plus a 130ms total stagger. A single four-stage sequence starts when the diagram is visible, pauses offscreen, and yields to manual selection. Replay restarts it; keyboard changes are immediate. The progress line and copy follow the selected stage. Dark-panel controls use a pale focus outline (`#d3e8c5`).

**The Concept Label Rule.** Keep conceptual artwork and diagrams visibly labeled; do not present them as plant photography, measured process evidence or product proof.

### Welcome and page movement

A document-entry and refresh welcome uses the supplied GAZAL identity and Text Roll (ibelick, 21st.dev), with forest and muted-green lettering. Its existing animation is preserved; only its visible identity is refreshed. It stays for 1150ms and fades in 240ms, with a CSS escape at 1800ms. The welcome deliberately repeats on refresh, as requested; client-side page navigation does not remount it. Any key or the visible entry action dismisses it. Reduced-motion users see the site immediately.

The homepage forest replaces the former particle-canvas hero. GSAP ScrollTrigger drives image transforms and opacity from native scrolling: the foreground wings move outwards, the intermediate plane separates and fades, and the clearing advances more slowly. The opening HTML offer yields to “Misma materia. Nuevas posibilidades.” near the exit. Hidden opening actions become inert beyond 70% progress and become available again when scrolling back; cleanup restores their state. Desktop scrub is 0.25 and mobile scrub follows scroll directly. There is no hero Canvas, WebGL, video decoder or persistent rendering loop. Mobile hides the intermediate plane and uses three distinct responsive WebP assets totaling approximately 463 KB. Keep the visible “Paisaje conceptual” caption: the generated photographic scene is atmosphere, not evidence of company facilities.

Pointer navigation first covers the old page with three green layers in 180ms plus 25ms stagger, commits the destination at the top, then reveals it in 320ms plus 35ms stagger. A 1500ms failsafe restores visibility. Keyboard navigation skips this effect. GSAP contexts and media-query listeners clean up on unmount.

Buttons use 140ms press feedback; arrows move 3px over 180ms only on fine-pointer hover. The 21st Social Links adaptation keeps a desktop reveal and mobile expandable contact dock in brand greens. Only the verified email is configured; no unverified social accounts are displayed. Collapsed links are inert, Escape closes and restores focus.

## Do's and Don'ts

### Do:

- **Do** preserve the supplied GAZAL symbol and exact raster lettering unchanged.
- **Do** build with the existing green tokens, local fonts and open editorial hierarchy.
- **Do** retain visible keyboard focus, semantic labels and reduced-motion behavior.
- **Do** keep conceptual image captions visible and critical form guidance legible.
- **Do** inspect stylesheet overrides before extending a responsive component.
- **Do** keep the forest scroll native and its static fallback complete.
- **Do** use the supplied gradients as static surfaces within their five-color kit.

### Don't:

- **Don't** let gold dominate or substitute a generic SaaS identity.
- **Don't** add rounded shadow cards as the default content structure.
- **Don't** treat material concepts as evidence of facilities, certifications or results.
- **Don't** make information or controls depend on animation or hover.
- **Don't** imply that an enquiry was sent when it was only prepared locally.
- **Don't** replace the GAZAL lettering with an approximate font or present generated forest imagery as company photography.
