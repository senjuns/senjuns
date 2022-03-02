# FIGMA_REACT_FLOW

Here we describe how you can export Figma frames to React TS code with styled-components.

## Figma Design

First you need to create your Figma frame. You can either create it yourself or export an existing HTML side via Figma Plugin called "Figma to HTML, CSS, React & more!". Be cautious to:

- name the frames
- use autolayout everywhere! Avoid absolute positioning and sizing
- use frames for alining instead absolute positions!

## React Code Export

No as your design is ready we want to export the React code. For that you need to install the Figma plugin names "Anima - Export to React, HTML & Vue code. Than you do:

- select the frame you want to export
- in the top go to Plugins and choose the addon
- create an anima project if needed
- in the anima box click sync
- click "Open project"
- in the anima app you need to change some settings as we want to export React TS code with styled-components
- in the top area click "Code" than "Export Code"
- press ctrl/cmd + a and copy the selections
- in you git repo create a tsx file for temporary storing the content of the clipboard content
- insert the clipboard content
- now you can use the code to adjust your React TS components

Notice: You probably need to do the Figma Design and React Code export steps iteratively again and again as you figure out how to improve the figma design when you exporting the code!
