# CSS framework

Contents:

- [Summary](#summary)
  - [Issue](#issue)
  - [Decision](#decision)
  - [Status](#status)
- [Details](#details)
  - [Assumptions](#assumptions)
  - [Constraints](#constraints)
  - [Positions](#positions)
  - [Argument](#argument)
  - [Implications](#implications)
- [Related](#related)
  - [Related decisions](#related-decisions)
  - [Related requirements](#related-requirements)
  - [Related artifacts](#related-artifacts)
  - [Related principles](#related-principles)
- [Notes](#notes)

## Summary

### Issue

We want to use a CSS framework to create our web applications:

- We want user experience to be fast and reliable, on all popular browsers and screen sizes.

- We want rapid iteration on design, layout, UI/UX, etc.

- We want responsive applications, especially for smaller screens such as on mobile devices, larger screens such as on 4K widescreens, and dynamic screens such as rotatable displays.

### Decision

Decided on styled-components.
Decided on material.

### Status

Decided on material and styled-components. Open to new CSS framework choices as they arrive.

## Details

### Assumptions

We want to create web apps that are modern, fast, reliable, responsive, etc.

### Constraints

If we choose a CSS framework that is minimal, then we forego framework components that we may want now or soon. For example, Semantic UI provides an image carousel, and Tachyons does not.

### Positions

We considered using no framework. This still seems viable, especially because CSS grid provides much of what we need for our project.

We considered CSS frameworks using a quick shortlist triage: TailWindCSS.

TailWindCSS is an interesting approach but as I am still fairly new to CSS it is complicated to learn all those new identifier. As well the VS Code IDE seems to have problems sometime to load the CSS doc. Styled-Components are much more beginner friendly.

### Argument

### Implications

## Related

### Related decisions

The CSS framework we choose may affect testability.

### Related requirements

We want to ship a purely-modern app fast.

### Related artifacts

Affects all the typical HTML that will use the CSS.

### Related principles

Easily reversible.

Need for speed.

## Notes

Any notes here.
