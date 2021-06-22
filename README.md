# Make anything draggable. And editable. ![version](https://img.shields.io/github/release/hchiam/draggable?style=flat-square)

[Live demo](https://codepen.io/hchiam/full/pobxgBo) (mouse, touch, keyboard, or screen reader!)

```js
https://cdn.jsdelivr.net/gh/hchiam/draggable@main/makeElementDraggable.js
https://cdn.jsdelivr.net/gh/hchiam/draggable@main/makeElementDraggableAndEditable.js
```

```js
https://cdn.jsdelivr.net/gh/hchiam/draggable@3.4.1/makeElementDraggable.js
https://cdn.jsdelivr.net/gh/hchiam/draggable@3.4.1/makeElementDraggableAndEditable.js
```

Example usage:

```js
var element = document.getElementById("#some-selector");
var settings = {
  // NOTE: settings are all optional:
  disableStyleReset: false, // false by default
  disableEditing: false, // false by default
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
  snapCallback: function () {}, // optional
};
// now to actually use it:
makeElementDraggableAndEditable(element, settings);
// or: makeElementDraggable(element, settings);
```

CDN usage:

```html
<script
  src="https://cdn.jsdelivr.net/gh/hchiam/draggable@3.4.1/makeElementDraggable.js"
  integrity="sha384-qeMZYjNvssfC2HCZuLY1ouJRQOi+NnH8YnBQ1YWWQzv63aWXokJevcK+noP39Uhl"
  crossorigin="anonymous"
></script>
```

Or:

```html
<script
  src="https://cdn.jsdelivr.net/gh/hchiam/draggable@3.4.1/makeElementDraggableAndEditable.js"
  integrity="sha384-Q3Jxv47W9+0iI9AoOyQAkWdjKg+qrAsk141hv1iKKcJDWrgHMTOoqNUKyxKUuRwb"
  crossorigin="anonymous"
></script>
```

```bash
# get the things to put into integrity="...":
bash get-integrity.sh;
```
