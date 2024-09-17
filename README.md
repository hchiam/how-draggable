# how-draggable

## Make anything draggable. And editable. [![version](https://img.shields.io/npm/v/how-draggable.svg?style=flat-square&color=423a73)](https://www.npmjs.com/package/how-draggable) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/hchiam/how-draggable/blob/main/LICENSE)

[Live demo](https://codepen.io/hchiam/full/pobxgBo) (mouse, touch, keyboard, or screen reader!)

```sh
yarn add how-draggable
```

or with CDNs:

```js
https://cdn.jsdelivr.net/gh/hchiam/draggable@main/makeElementDraggable.js
https://cdn.jsdelivr.net/gh/hchiam/draggable@main/makeElementDraggableAndEditable.js
```

```js
https://cdn.jsdelivr.net/gh/hchiam/draggable@3.6.0/makeElementDraggable.js
https://cdn.jsdelivr.net/gh/hchiam/draggable@3.6.0/makeElementDraggableAndEditable.js
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
  mouseDownCallback: function (element) {}, // optional
  touchStartCallback: function (element) {}, // optional
  mouseMoveCallback: function (element) {}, // optional
  touchMoveCallback: function (element) {}, // optional
  mouseUpCallback: function (element) {}, // optional
  touchEndCallback: function (element) {}, // optional
  snapCallback: function (left, top) {
    // optional
    alert("left offset " + left + " and top offset " + top);
  },
  keyboardMoveCallback: function (element) {}, // optional
  blurCallback: function (element) {}, // optional
};
// now to actually use it:
makeElementDraggableAndEditable(element, settings);
// or: makeElementDraggable(element, settings);
```

CDN usage:

```html
<script
  src="https://cdn.jsdelivr.net/gh/hchiam/draggable@3.6.0/makeElementDraggable.js"
  integrity="sha384-p8wHO1b47yVMnUmZwvNCG/qsQkBkWk2xT0cmqkXXz77QEGpWM/XSdRdeWb+V+si3"
  crossorigin="anonymous"
></script>
```

Or:

```html
<script
  src="https://cdn.jsdelivr.net/gh/hchiam/draggable@3.6.0/makeElementDraggableAndEditable.js"
  integrity="sha384-VTKNpzWPC6tuOViYhS//WCUNK8HgwZO0pqRDlFDj09/yvdwmtnJfpeeUzQYbCtsQ"
  crossorigin="anonymous"
></script>
```

## Development notes

Edit the TS files! The JS files are generated from the TS files.

To automatically generate the JS files and do type checking against the .d.ts files while developing from within this repo:

```sh
yarn global add typescript
npx tsc --init # or tsc --init # creates tsconfig.json
tsc
```

To run a demo on <http://localhost:5173/> :

```sh
yarn
yarn demo
```

To get the `sha384-...` values to put into `integrity="..."` of script tags:

```sh
bash get-integrity.sh;
```

A newer example of how to publish to npm (package.json setup only + `yarn pub`):

- <https://github.com/hchiam/trysterollup/tree/24457690a715e1c57e701b0d51e3b6fd3e50491c>
- <https://github.com/hchiam/trysterollup/blob/24457690a715e1c57e701b0d51e3b6fd3e50491c/package.json>
