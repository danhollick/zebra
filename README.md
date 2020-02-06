### Zebra is a fast, lightweight colour contrast checker plugin for Figma.
![image](https://cdn-images-1.medium.com/max/800/1*DXkmk6IFQR0tKzCeKXTnJw.gif)

This repo is split up into steps that track with a tutorial. Which can be found [here](https://medium.com/@danhollick/figma-plugin-tutorial-1-6-65fc2102506).

The plugin can be found [here](https://www.figma.com/c/plugin/806578669827234193/zebra)

### Local Development:
It should be pretty straight forward to run the plugin code from any of the steps in Figma as there are no dependencies, only dev dependencies for webpack and linting. 

#### Step 1
Download or clone the repo.

#### Step 2
Open Figma and in the menu go to `Plugins` -> `Development` -> `New Plugin`.
![image](https://cdn-images-1.medium.com/max/800/1*4D2TPssw664SjCq2rLdLjA.png)

#### Step 3
Choose Link to Existing Plugin and find the zebra `manifest.json`

#### Step 4
Open `manifest.json` and change the 'main' and 'ui' fields to the step you want to run. ie:

```
"main": "step1/code.js",
  "ui": "step1/ui.html"
```

#### Note:
The code in the **final** folder is bundled with webpack so to change any code in `final/src/...` you need to have node and npm working.

Run `npm install` in the main folder to install all the dev-dependencies including webpack.

After that is installed you can `run npx webpack --mode=development --watch` to run the development server in watch mode. This will refresh after each change you make.

Alternatively you can run `npx webpack --mode=production` to build for production

#### Credits:
- 🙌  A lot of the code for checking colour contrast came from [the brilliant repo](https://github.com/LeaVerou/contrast-ratio) for [contrast-ratio.com](https://contrast-ratio.com/).
- 👊 [Tanya Hirst](https://twitter.com/tanyathehuman) made the dope illustration of a zebra. You can check out [her dribbble here](https://dribbble.com/TanyaTheHuman).
- 😍 The Figma team and their brilliant tool and [their brilliant docs](https://www.figma.com/plugin-docs/intro/) . A lot of the explanations were stolen from their docs site.
- ❤️ Everyone on the Figma plugin slack . Searching through past issues helped a lot.


