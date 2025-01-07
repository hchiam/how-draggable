# how-draggable

## Make anything draggable. And editable. [![version](https://img.shields.io/npm/v/how-draggable.svg?style=flat-square&color=423a73)](https://www.npmjs.com/package/how-draggable) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/hchiam/how-draggable/blob/main/LICENSE)

[Live demo](https://codepen.io/hchiam/full/pobxgBo) (works with mouse, touch, keyboard, or screen reader!)

```sh
yarn add how-draggable
# npm i how-draggable
```

```js
import { makeElementDraggableAndEditable } from "how-draggable";
```

or with CDNs:

```js
https://cdn.jsdelivr.net/gh/hchiam/how-draggable@main/makeElementDraggable.js
https://cdn.jsdelivr.net/gh/hchiam/how-draggable@main/makeElementDraggableAndEditable.js
```

```js
https://cdn.jsdelivr.net/gh/hchiam/how-draggable@4.1.1/makeElementDraggable.js
https://cdn.jsdelivr.net/gh/hchiam/how-draggable@4.1.1/makeElementDraggableAndEditable.js
```

Example usage:

```js
var element = document.getElementById("#some-selector");
var settings = {
  // NOTE: settings are all optional:
  disableKeyboardMovement: false, // false by default
  disableStyleReset: false, // false by default
  disableEditing: false, // false by default
  // snapPoints?: SnapPoint[];
  // snapGridSize?: number;
  // snapThreshold?: number;
  // snapWithinElements?: HTMLElement[];
  // handleSelector: '.somethingInsideElement', // only clicks here in element can drag
  mouseDownCallback: function (element) {}, // optional
  touchStartCallback: function (element) {}, // optional
  mouseMoveCallback: function (element) {}, // optional
  touchMoveCallback: function (element) {}, // optional
  mouseUpCallback: function (element) {}, // optional
  touchEndCallback: function (element) {}, // optional
  snapCallback: function (left, top, containerElement) {
    // optional
    alert("left offset " + left + " and top offset " + top);
  },
  keyboardMoveCallback: function (element) {}, // optional
  blurCallback: function (element) {}, // optional
  customAriaLabel: function (element, settings) {
    return `custom aria-label: ${element.innerText}`;
  }, // optional
};
// now to actually use it:
makeElementDraggableAndEditable(element, settings);
// or: makeElementDraggable(element, settings);
```

CDN usage:

```html
<script
  src="https://cdn.jsdelivr.net/gh/hchiam/how-draggable@4.1.1/makeElementDraggable.js"
  integrity="sha384-vVhZCoOnPVPgQJhedP9exv9z8eDjgLXj1jSMMRHiwLEfbpH5LF5e0vkqs92VIYn4"
  crossorigin="anonymous"
></script>
```

Or:

```html
<script
  src="https://cdn.jsdelivr.net/gh/hchiam/how-draggable@4.1.1/makeElementDraggableAndEditable.js"
  integrity="sha384-JML9nrfkku4c6Q+12Hno2+sm+DbIxby+PRjfrXnLQ5HEp7p+oXnACk4YYDvWqQqV"
  crossorigin="anonymous"
></script>
```

Automated types check: https://arethetypeswrong.github.io/?p=how-draggable

## Development notes

Edit the TS files! The JS files are generated from the TS files.

To automatically generate the JS files and do type checking against the .d.ts files while developing from within this repo:

```sh
yarn global add typescript
# npm install --global typescript
npx tsc --init # or tsc --init # creates tsconfig.json
tsc
```

To run a demo on <http://localhost:5173/> :

```sh
yarn
yarn demo
# npm install; npm run build; vite;
```

To get the `sha384-...` values to put into `integrity="..."` of script tags:

```sh
bash get-integrity.sh;
```

A newer example of how to publish to npm (package.json setup only + `yarn pub`):

- <https://github.com/hchiam/trysterollup/tree/24457690a715e1c57e701b0d51e3b6fd3e50491c>
- <https://github.com/hchiam/trysterollup/blob/24457690a715e1c57e701b0d51e3b6fd3e50491c/package.json>
