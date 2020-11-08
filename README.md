# Make anything draggable. And editable. ![version](https://img.shields.io/github/release/hchiam/draggable?style=flat-square) [![HitCount](http://hits.dwyl.com/hchiam/draggable.svg)](http://hits.dwyl.com/hchiam/draggable)

```js
https://cdn.jsdelivr.net/gh/hchiam/draggable@master/makeElementDraggable.js
https://cdn.jsdelivr.net/gh/hchiam/draggable@master/makeElementDraggableAndEditable.js
```

```js
https://cdn.jsdelivr.net/gh/hchiam/draggable@1.0.0/makeElementDraggable.js
https://cdn.jsdelivr.net/gh/hchiam/draggable@1.0.0/makeElementDraggableAndEditable.js
```

[Live demo](https://codepen.io/hchiam/pen/OJXoqaj)

Example usage:

```js
var element = document.getElementById("#some-selector");
var settings = {
  // NOTE: settings are all optional:
  disableStyleReset: false, // false by default
  mouseDownCallback: function () {}, // optional
  mouseMoveCallback: function () {}, // optional
  mouseUpCallback: function () {
    // optional
    alert("mouseup");
  },
  blurCallback: function () {}, // optional
};
// now to actually use it:
makeElementDraggableAndEditable(element, settings);
```

CDN usage:

```html
<script
  src="https://cdn.jsdelivr.net/gh/hchiam/draggable@1.0.0/makeElementDraggableAndEditable.js"
  integrity="sha384-L0ng4lphAnum3r1C57r1N9"
  crossorigin="anonymous"
></script>
```

```bash
# get the thing to put into integrity="...":
source get-integrity.sh; sha makeElementDraggableAndEditable.js
```
