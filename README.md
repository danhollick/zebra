#### Note: 
⚠️ If you are looking to follow along with the `v1.0` tutorial you can find that [here](https://github.com/danhollick/zebra/tree/v1)⚠️

## Zebra is a fast, lightweight, APCA color contrast plugin
![Screenshot 2022-01-02 at 13 06 11](https://user-images.githubusercontent.com/13898607/147876779-d63c76fd-66d1-4289-a50a-d06c52248c4a.png)


### What is APCA?
APCA(Advanced Perceptual Contrast Algorithm) is a modern color contrast algorithm that aims to be be perceptually uniform. It is currently being evaluated as a part of the WCAG 3 draught process.

Note: Because APCA is still being evaluated, it is likely that some aspects of the algorithm and scoring system will change between APCA versions.

More info [here](https://github.com/Myndex/SAPC-APCA/blob/master/WhyAPCA.md)

---
### Local Development:

#### Step 1
Download or clone the repo and run `npm install`

#### Step 2
- To build: `npm run build`
- For production: `npm run build:production`
- For development: `npm run dev`.

#### Step 3
Open Figma and in the menu go to `Plugins` -> `Development` -> `New Plugin`.

#### Step 4
Choose Link to Existing Plugin and find the zebra `manifest.json`

---

### How stuff works
This plugin uses a few key dependencies:
- [react](https://reactjs.org) for rendering the UI.
- [apca-w3](https://github.com/Myndex/apca-w3) for APCA contrast calculations.
- [chroma-js](https://gka.github.io/chroma.js) to help with some color conversions.
- [stitches](https://stitches.dev) for css in JS.
- [radix-ui](https://www.radix-ui.com) for UI components.
- [zustand](https://github.com/pmndrs/zustand) for state management.

There are two dependencies entirely for building and bundling:
- [vite](https://vitejs.dev) - A dev server that takes all the frontend code in `./ui-src` and spits it out into `./dist/index.js` via a script tag.
- [esbuild](https://esbuild.github.io) - a bundler that takes all the Figma side code in `./plugin-src` and spits it our into `./dist/code.js` 




