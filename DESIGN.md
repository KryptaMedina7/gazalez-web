---
name: GAZALEZ
description: Editorial industrial biotechnology in pale greens and forest ink.
colors:
  canvas: "#f7f8f3"
  surface: "#fff"
  mint: "#dcebd8"
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
    fontSize: "clamp(52px, 5.55vw, 86px)"
    fontWeight: 500
    lineHeight: 1.08
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

# Design System: GAZALEZ

## Overview

**Creative North Star: "Industrial Biotech Premium"**

Pale mint and sage fields, forest ink, generous editorial typography and fine rules connect industrial material to applied science. The tone is serious, clear, technical and human. The supplied GAZALEZ symbol remains unchanged; Manrope lettering and a compact descriptor complete the implemented brand lockup.

The interface uses open sections and typographic hierarchy to organize information. Material artwork and restrained particle diagrams provide texture and depth, with visible conceptual labels. The light green identity is the user's chosen direction; gold is restricted to subtle accents; a generic SaaS identity is excluded.

**Key Characteristics:**

- Light green fields with forest text and focused dark sections.
- Large Manrope headlines paired with readable Lexend supporting text.
- Square controls, fine rules and open editorial rows.
- Material concepts visibly distinguished from operational evidence.
- Keyboard access and reduced motion built into interactions.

This is a scan of the implemented system in `src/app/globals.css`, `src/app/layout.tsx` and `src/components/`, including the final review overrides. Frontmatter records reusable defaults; the stylesheet remains authoritative for responsive and component-specific overrides. The companion `.impeccable/design.json` contains extension metadata and framework-free component previews.

## Colors

The palette stays in a subdued green family, balancing light mineral surfaces with deep forest contrast.

### Primary

- **Forest** supplies primary action fills and the transformation section's dark ground.
- **Ink** carries headings, navigation and high-priority copy.
- **Mint**, **Light Mint** and **Sage** provide feature fields, hover feedback and selection color.

### Neutral

- **Canvas** is the default page ground; **Surface** is the white input ground.
- **Body** softens paragraph text without introducing a separate hue.
- **Line** separates light sections; **Dark Line** separates content on forest.
- **Field Border**, **Placeholder** and **Tag Border** retain the observed form and metadata treatments.

The error color is reserved for error copy. Focus and button-hover colors express interaction states rather than additional brand accents.

**The Light Green Identity Rule.** Keep the supplied logo intact and use the established mint, sage and forest family; use brass only for fine details and charcoal for the material scene.

## Typography

**Display Font:** Manrope Variable, sans-serif fallback.

**Body Font:** Lexend Variable, sans-serif fallback.

Both fonts are bundled locally through `@fontsource-variable` imports. Manrope supplies compact, balanced headlines; Lexend keeps technical prose and small interface labels distinct. There is no separate monospace brand role and no single mathematical type scale.

### Hierarchy

- **Display** is the home hero role in frontmatter. General page headings instead begin at `clamp(44px, 6vw, 88px)`; page-specific selectors refine them.
- **Headline** is the default section heading. Headings use balanced wrapping and medium weight rather than bold slabs.
- **Title** is the default third-level heading; the transformation panel uses a larger title (32px).
- **Body** is the inherited paragraph baseline. Supporting editorial copy commonly uses 12–13px, while the hero description uses 19px with a 1.5 line-height.
- **Action** is the button role; **Label** captures the shared 12px label size. Metadata tags use 9px and 0.01em tracking.

The critical form labels, consent and help text retain the final 12px overrides; enquiry results use 14px copy. On mobile, text inputs and textareas use 16px. Do not copy the tiny decorative caption sizes into instructions.

## Layout

The site uses full-width sections with a shared fluid horizontal gutter. Standard section padding is defined in frontmatter; wide screens increase vertical section padding to 130px. The desktop hero uses a 47% / 53% editorial/art split, the process stage uses 57% / 43%, and innovation and traceability use equal columns. These are observed page patterns, not mandatory proportions for every future screen.

At 1100px, spacing and type compact. At 1000px, desktop navigation yields to the mobile dialog and the enquiry layout becomes one column. At 760px, the hero, process stage and most editorial structures stack; the gutter becomes 24px and process controls become two columns. At 380px, the gutter becomes 18px, the header CTA hides and form fields stack. At 290px, the gutter becomes 14px and secondary grids simplify further. The wide-screen expansion begins at 1700px.

The header is sticky, with desktop height 100px, compact height 86px, mobile height 78px and wide-screen height 112px. Action controls generally provide at least 44px interactive height; primary buttons start at 54px. Long field content can wrap, and enquiry columns explicitly allow shrinking with `minmax(0, ...)`.

## Elevation & Depth

The interface does not define a box-shadow vocabulary. Depth comes from alternating tonal fields, photographic/conceptual material texture, fine dividers and the forest process panel. The mobile dialog uses a translucent forest overlay (`#16302466`) and stacking order, without a shadow. Avoid adding ambient card shadows as a new default.

**The Tonal Depth Rule.** Separate content through field color, spacing and hairlines before adding elevation effects.

## Shapes

Controls and content regions are predominantly square. Fields explicitly use zero radius; buttons, tags and open rows retain the same rectangular character. Circular geometry is reserved for small status markers, arrow containers and scientific diagrams. The conceptual hydrogel core has a local 10px radius; it is not a general card token.

Light surfaces use thin green borders. Rows usually carry a bottom rule rather than an enclosing card outline. Images crop within their section region; visible captions sit over a light tonal strip.

## Components

### Buttons and text links

Primary actions are forest-filled rectangular controls with a 1px forest border, 24px content/icon gap and a 19px arrow. Secondary actions are transparent with ink text and border. Their frontmatter values capture default padding and colors; large and narrow screens override sizing where needed.

Fine-pointer hover changes primary fill to button-hover and secondary fill to ink, over 0.2s. Text links use a bottom rule, 18px icon gap and 44px minimum height. Their arrow shifts by 2px right and 2px up on fine-pointer hover. There is no distinct pressed animation. Disabled buttons use 0.55 opacity and a waiting cursor.

### Inputs and enquiry states

Fields use white backgrounds, fine field-border strokes and square corners. Labels sit above inputs with a 10px gap. Default inputs have 49px minimum height; textareas start at 140px and resize vertically up to 550px. Placeholder text uses its dedicated muted green.

Shared focus is a 3px focus-color outline offset by 5px. Preserve visible labels and the form's explicit preparation/download state: presentation must not imply a message was sent when no provider is configured.

### Tags

Metadata tags are compact, transparent, rectangular labels with a fine tag-border stroke. They are descriptive labels, without a selected state or invented interactivity.

### Navigation

Desktop triggers use a compact outlined menubar with pale green open/current states and Lucide icons. The contact action is separately outlined. The hamburger is also available on desktop. It opens a full-screen Radix Dialog adapted from 21st.dev Sterling Gate: three sage/mint layers, large clipped link labels and the original logo on wide screens. Entrance is 420ms plus a short stagger; exit is 240ms. Keyboard opening and Escape dismissal are immediate. Keep its accessible title, description, close action, focus trap, focus return and scrollable content.

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

A document-entry and refresh welcome uses the original logo and Text Roll (ibelick, 21st.dev), with forest and muted-green lettering. It stays for 1150ms and fades in 240ms, with a CSS escape at 1800ms. The welcome deliberately repeats on refresh, as requested; client-side page navigation does not remount it. Any key or the visible entry action dismisses it. Reduced-motion users see the site immediately.

The homepage uses a deterministic canvas of 2200 particles (1100 on mobile), transforming scattered matter into a ribbon. A 440px desktop sticky interval expands the charcoal visual across the viewport; native scrolling remains in control. Mobile uses a 390px inline canvas and no sticky scene. Reduced motion renders a static scene. Pointer navigation first covers the old page with three green layers in 180ms plus 25ms stagger, commits the destination at the top, then reveals it in 320ms plus 35ms stagger. A 1500ms failsafe restores visibility. Keyboard navigation skips this effect. GSAP contexts and media-query listeners clean up on unmount.

Buttons use 140ms press feedback; arrows move 3px over 180ms only on fine-pointer hover. The 21st Social Links adaptation keeps a desktop reveal and mobile expandable contact dock in brand greens. Only the verified email is configured; no unverified social accounts are displayed. Collapsed links are inert, Escape closes and restores focus.

## Do's and Don'ts

### Do:

- **Do** preserve the supplied GAZALEZ logo unchanged.
- **Do** build with the existing green tokens, local fonts and open editorial hierarchy.
- **Do** retain visible keyboard focus, semantic labels and reduced-motion behavior.
- **Do** keep conceptual image captions visible and critical form guidance legible.
- **Do** inspect stylesheet overrides before extending a responsive component.

### Don't:

- **Don't** let gold dominate or substitute a generic SaaS identity.
- **Don't** add rounded shadow cards as the default content structure.
- **Don't** treat material concepts as evidence of facilities, certifications or results.
- **Don't** make information or controls depend on animation or hover.
- **Don't** imply that an enquiry was sent when it was only prepared locally.
