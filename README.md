# Make anything draggable. And editable. ![version](https://img.shields.io/github/release/hchiam/draggable?style=flat-square)

[Live demo](https://codepen.io/hchiam/pen/pobxgBo)

```js
https://cdn.jsdelivr.net/gh/hchiam/draggable@main/makeElementDraggable.js
https://cdn.jsdelivr.net/gh/hchiam/draggable@main/makeElementDraggableAndEditable.js
```

```js
https://cdn.jsdelivr.net/gh/hchiam/draggable@2.2.3/makeElementDraggable.js
https://cdn.jsdelivr.net/gh/hchiam/draggable@2.2.3/makeElementDraggableAndEditable.js
```

Example usage:

```js
var element = document.getElementById("#some-selector");
var settings = {
  // NOTE: settings are all optional:
  disableStyleReset: false, // false by default
  mouseDownCallback: function () {}, // optional
  touchStartCallback: function () {}, // optional
  mouseMoveCallback: function () {}, // optional
  touchMoveCallback: function () {}, // optional
  mouseUpCallback: function () {
    // optional
    alert("mouseup");
  },
  touchEndCallback: function () {}, // optional
  blurCallback: function () {}, // optional
};
// now to actually use it:
makeElementDraggableAndEditable(element, settings);
// or: makeElementDraggable(element, settings);
```

CDN usage:

```html
<script
  src="https://cdn.jsdelivr.net/gh/hchiam/draggable@2.2.3/makeElementDraggable.js"
  integrity="sha384-QMYHwpvHc+xLaSjcXWMNVHfXgcYk3Q0zXa8BiMdP5Fx8c7HNGS3aJrQSu63/+P0a"
  crossorigin="anonymous"
></script>
```

```html
<script
  src="https://cdn.jsdelivr.net/gh/hchiam/draggable@2.2.3/makeElementDraggableAndEditable.js"
  integrity="sha384-nC7HyURId0WM5hUofkeHuShrHkHffsd5NAZz5e3uSNiLy/pj1MPPFXCvJEeos6uO"
  crossorigin="anonymous"
></script>
```

```bash
# get the thing to put into integrity="...":
source get-integrity.sh; sha makeElementDraggable.js;
```

```bash
# get the thing to put into integrity="...":
source get-integrity.sh; sha makeElementDraggableAndEditable.js;
```
