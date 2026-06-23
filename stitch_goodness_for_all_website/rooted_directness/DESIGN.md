---
name: Rooted Directness
colors:
  surface: '#fff9ed'
  surface-dim: '#e1dac3'
  surface-bright: '#fff9ed'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fbf3dc'
  surface-container: '#f6eed6'
  surface-container-high: '#f0e8d1'
  surface-container-highest: '#eae2cb'
  on-surface: '#1f1c0e'
  on-surface-variant: '#44483e'
  inverse-surface: '#343021'
  inverse-on-surface: '#f9f0d9'
  outline: '#74796d'
  outline-variant: '#c4c8ba'
  surface-tint: '#4a6634'
  primary: '#1d370a'
  on-primary: '#ffffff'
  primary-container: '#334e1f'
  on-primary-container: '#9fbf84'
  inverse-primary: '#b0d194'
  secondary: '#885200'
  on-secondary: '#ffffff'
  secondary-container: '#ffa52e'
  on-secondary-container: '#6b3f00'
  tertiary: '#1e3700'
  on-tertiary: '#ffffff'
  tertiary-container: '#2d5000'
  on-tertiary-container: '#95c364'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cbedae'
  primary-fixed-dim: '#b0d194'
  on-primary-fixed: '#0b2000'
  on-primary-fixed-variant: '#334e1f'
  secondary-fixed: '#ffddbb'
  secondary-fixed-dim: '#ffb868'
  on-secondary-fixed: '#2b1700'
  on-secondary-fixed-variant: '#673d00'
  tertiary-fixed: '#c1f18c'
  tertiary-fixed-dim: '#a6d573'
  on-tertiary-fixed: '#0f2000'
  on-tertiary-fixed-variant: '#2d5000'
  background: '#fff9ed'
  on-background: '#1f1c0e'
  surface-variant: '#eae2cb'
  pure-mist: '#F7F4EF'
  evergreen: '#334E1F'
  harvest-orange: '#ED961D'
  sandstone-beige: '#F1E9D2'
  asparagus: '#7CA84C'
typography:
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: '1.1'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Red Hat Display
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Red Hat Display
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  cta:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '700'
    lineHeight: '1'
  label-sm:
    fontFamily: Red Hat Display
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
spacing:
  base: 8px
  container-margin: 20px
  gutter: 16px
  section-gap-sm: 40px
  section-gap-lg: 80px
---

## Brand & Style

The brand personality is grounded, community-focused, and radically accessible. It captures the spirit of "Dichtbij, vertrouwd, zonder drempels" (Close, trusted, without barriers). The design style is **Minimalist-Brutalist**, characterized by maximum whitespace, sharp edges, and high-impact color blocking.

The visual narrative relies on the tension between the organic, friendly curves of the display typography and the rigid, square geometry of the UI containers. It evokes a feeling of reliability and warmth without being precious or exclusionary. It is a system built for clarity and direct action.

## Colors

The palette is derived from nature and agriculture, reflecting the "Goodness" of the brand.

- **Primary (Evergreen):** Used for primary text, logos on light backgrounds, and deep structural elements.
- **Secondary (Harvest Orange):** Reserved for call-to-actions, alerts, and logos on dark backgrounds.
- **Tertiary (Asparagus):** Used for supportive accents and success states.
- **Neutral (Sandstone Beige & Pure Mist):** These form the "near-white" foundation. `Pure Mist` is the default background color to ensure maximum whitespace feels warm rather than clinical. `Sandstone Beige` is used for subtle section differentiation.

Color blocks should be used sparingly as accents to maintain a high-breathability layout.

## Typography

The system utilizes **Plus Jakarta Sans** (as a high-quality substitute for the rounded, bold nature of Baloo) for headlines and CTAs to provide a friendly, approachable voice. **Red Hat Display** is used for all body text and labels to maintain professional clarity and legibility.

- Headlines should use tight line-heights and slight negative letter-spacing to feel impactful.
- Body text requires generous line-height to support the "maximum whitespace" philosophy.
- All primary CTAs must use the headline font in a bold weight to ensure they stand out against the geometric UI.

## Layout & Spacing

This design system follows a **Mobile-First, Fluid Grid** model.

- **Grid:** A 12-column grid is used for desktop, collapsing to a single column for mobile. 
- **Rhythm:** An 8px base unit drives all padding and margins. 
- **Margins:** Mobile screens utilize a strict 20px side margin. Desktop layouts utilize a max-width container of 1200px centered on the screen.
- **Whitespace:** Spacing between sections (`section-gap-lg`) should be intentionally large to emphasize the minimalist aesthetic. Elements should never feel crowded.

## Elevation & Depth

This system avoids shadows and depth-mimicry to maintain its "without barriers" directness. Hierarchy is established through:

- **High-Contrast Outlines:** Using 1px or 2px solid strokes in `Evergreen` to define boundaries.
- **Tonal Layering:** Placing `Pure Mist` elements on `Sandstone Beige` backgrounds to create subtle separation.
- **Color Blocking:** Using solid fills of `Harvest Orange` or `Evergreen` to draw the eye to specific focal points.
- **Flat Planes:** All elements exist on the same optical plane. No blurs, no gradients, and no skeuomorphism.

## Shapes

The shape language is **strictly architectural**. 

- **Corners:** All buttons, cards, input fields, and containers must have 0px radius corners. 
- **Strokes:** Use consistent 1px borders for neutral elements and 2px borders for active or focused elements.
- **Visual Contrast:** The only "roundness" in the system resides within the letterforms of the headline typeface, creating a distinctive contrast between the human voice (type) and the social structure (UI).

## Components

- **Buttons:** Strictly rectangular. Primary buttons use `Harvest Orange` background with `Evergreen` text. Secondary buttons use `Evergreen` background with `Sandstone Beige` text. No shadows.
- **Input Fields:** 1px `Evergreen` border, square corners, `Pure Mist` background. Labels sit above the field in `Red Hat Display` Bold.
- **Cards:** No borders by default; use `Sandstone Beige` or `Pure Mist` background blocks to group content. If a border is necessary, use a 1px `Evergreen` stroke.
- **Chips/Tags:** Small rectangular blocks with `Asparagus` background and `Evergreen` text. No rounded ends.
- **Lists:** Separated by 1px `Evergreen` horizontal rules. High vertical padding between list items to maintain whitespace.
- **Checkboxes/Radios:** Large, square boxes. When selected, they fill solid with `Evergreen`. No circular radio buttons; use square boxes with an "X" or solid fill to denote selection to maintain shape consistency.
- **Accordions:** Clean, full-width dividers with simple "+" and "-" icons. Avoid chevron arrows to stick to the direct, "low barrier" visual language.