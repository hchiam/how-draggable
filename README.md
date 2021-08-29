# Make anything draggable. And editable. ![version](https://img.shields.io/github/release/hchiam/draggable) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Live demo](https://codepen.io/hchiam/full/pobxgBo) (mouse, touch, keyboard, or screen reader!)

```js
https://cdn.jsdelivr.net/gh/hchiam/draggable@main/makeElementDraggable.js
https://cdn.jsdelivr.net/gh/hchiam/draggable@main/makeElementDraggableAndEditable.js
```

```js
https://cdn.jsdelivr.net/gh/hchiam/draggable@3.4.5/makeElementDraggable.js
https://cdn.jsdelivr.net/gh/hchiam/draggable@3.4.5/makeElementDraggableAndEditable.js
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
  touchEndCallback: function (element) {}, // optional
  blurCallback: function (element) {}, // optional
};
// now to actually use it:
makeElementDraggableAndEditable(element, settings);
// or: makeElementDraggable(element, settings);
```

CDN usage:

```html
<script
  src="https://cdn.jsdelivr.net/gh/hchiam/draggable@3.4.5/makeElementDraggable.js"
  integrity="sha384-ueXRLERQxVzg2atTXS94ETTvv3IFJTbLJNFdVgq4QGYRKeKd5zU+oGYYHCI2GpM0"
  crossorigin="anonymous"
></script>
```

Or:

```html
<script
  src="https://cdn.jsdelivr.net/gh/hchiam/draggable@3.4.5/makeElementDraggableAndEditable.js"
  integrity="sha384-3WXCED1zKriz8Kc3CffCojZLa7M8xzHaWr3Fu28wDhu8TXDpqpkYlKc62NoS2NR+"
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
