# Make anything draggable. And editable. ![version](https://img.shields.io/github/release/hchiam/draggable?style=flat-square)

[Live demo](https://codepen.io/hchiam/pen/pobxgBo)

```js
https://cdn.jsdelivr.net/gh/hchiam/draggable@master/makeElementDraggable.js
https://cdn.jsdelivr.net/gh/hchiam/draggable@master/makeElementDraggableAndEditable.js
```

```js
https://cdn.jsdelivr.net/gh/hchiam/draggable@2.2.0/makeElementDraggable.js
https://cdn.jsdelivr.net/gh/hchiam/draggable@2.2.0/makeElementDraggableAndEditable.js
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
  src="https://cdn.jsdelivr.net/gh/hchiam/draggable@2.2.0/makeElementDraggable.js"
  integrity="sha384-sBO5ePJn4TDun0wc6ersIT39qtbT2/datyTqPh0lftrOLn3plYA64K0alj79pCik"
  crossorigin="anonymous"
></script>
```

```html
<script
  src="https://cdn.jsdelivr.net/gh/hchiam/draggable@2.2.0/makeElementDraggableAndEditable.js"
  integrity="sha384-s/FfyjyJF4K8JsBN/muyl5Nj5bligUsrJLeGWQINnY9cFNf91GXHUShJFyMJCxum"
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
