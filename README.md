### Zebra is a fast, lightweight colour contrast checker plugin for Figma.
![image](https://cdn-images-1.medium.com/max/800/1*DXkmk6IFQR0tKzCeKXTnJw.gif)

## Note: 
If you are looking to follow along with the v1.0 tutorial you can find that [here](https://github.com/danhollick/zebra/tree/v1)

### Local Development:
This plugin uses a few key dependencies:
- [apca-w3](https://github.com/Myndex/apca-w3) for APCA contrast calculations.
- [chroma-js](https://gka.github.io/chroma.js) to help with some color conversions.
- [stitches](https://stitches.dev) for css in JS.
- [radix-ui](https://www.radix-ui.com) for UI components.
- [zustand](https://github.com/pmndrs/zustand) for state management.

#### Step 1
Download or clone the repo and run `npm install`

#### Step 2
- To build `npm run build`
- For production run `npm run build:production`
- To run in development mode run `npm run dev`.

#### Step 3
Open Figma and in the menu go to `Plugins` -> `Development` -> `New Plugin`.

#### Step 4
Choose Link to Existing Plugin and find the zebra `manifest.json`





