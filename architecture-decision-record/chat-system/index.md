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

We want to leverage an existing chat system for the senior, junior and clients to communicate with and helping with finding each other:

- We want the user proactively using our chat system they love and they are familiar with

- We want that the user can communicate with each other to help each other

- We want to leverage the chat API to help with finding and building the teams

- We want that the chat system can be used mobile too

### Decision

Decided on Discord / Slack

### Status

Decided. Open to revisiting if/when new tooling or new feature becomes available.

## Details

### Assumptions

We want to leverage a chat system that is modern, fast, reliable, responsive, etc.

### Constraints

If we choose the wrong chat system we might have not a good costs feature ratio and can not perfectly help matching the user.

### Positions

We didn't consider implementing our own chat system. That would consume way to much resources and money. And it would be not possible to reach nearly the functionality from existing well-integrated chat platforms like Discord or Slack.

### Argument

...

### Implications

...

## Related

### Related decisions

We will create decisions for how to integrate matching algorithms into the chat system.

### Related requirements

...

### Related artifacts

Affect how the UI integration from the platform senjuns.com into the chat system will be.

### Related principles

Easily reversible. If we don't like the chat system we can try another one or implement our own.

Need for speed.

## Notes

Any notes here.
