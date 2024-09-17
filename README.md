# how-draggable

## Make anything draggable. And editable. [![version](https://img.shields.io/npm/v/how-draggable.svg?style=flat-square&color=423a73)](https://www.npmjs.com/package/how-draggable) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/hchiam/how-draggable/blob/main/LICENSE)

[Live demo](https://codepen.io/hchiam/full/pobxgBo) (mouse, touch, keyboard, or screen reader!)

```sh
yarn add how-draggable
```

or with CDNs:

```js
https://cdn.jsdelivr.net/gh/hchiam/how-draggable@main/makeElementDraggable.js
https://cdn.jsdelivr.net/gh/hchiam/how-draggable@main/makeElementDraggableAndEditable.js
```

```js
https://cdn.jsdelivr.net/gh/hchiam/how-draggable@3.5.5/makeElementDraggable.js
https://cdn.jsdelivr.net/gh/hchiam/how-draggable@3.5.5/makeElementDraggableAndEditable.js
```

Example usage:

```js
var element = document.getElementById("#some-selector");
var settings = {
  // NOTE: settings are all optional:
  disableStyleReset: false, // false by default
  disableEditing: false, // false by default
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
  src="https://cdn.jsdelivr.net/gh/hchiam/how-draggable@3.5.5/makeElementDraggable.js"
  integrity="sha384-Sz/4UFjMKLyRI6OcvUNsBcJ9/hHx+k+IvTZa3tdQHd49Ofsm4SE7Ex5MF2RnlHqD"
  crossorigin="anonymous"
></script>
```

Or:

```html
<script
  src="https://cdn.jsdelivr.net/gh/hchiam/how-draggable@3.5.5/makeElementDraggableAndEditable.js"
  integrity="sha384-0gzf80wLisosL7pLUjzknXl5TQPfxtu16rHcGZrRPMAU+4wpXk8iYaI5KfTdqTiR"
  crossorigin="anonymous"
></script>
```

## Development notes

```bash
yarn
yarn demo
```

```bash
# get the things to put into integrity="...":
bash get-integrity.sh;
```

A newer example of how to publish to npm (package.json setup only + `yarn pub`):

- <https://github.com/hchiam/trysterollup/tree/24457690a715e1c57e701b0d51e3b6fd3e50491c>
- <https://github.com/hchiam/trysterollup/blob/24457690a715e1c57e701b0d51e3b6fd3e50491c/package.json>
