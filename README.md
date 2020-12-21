# Make anything draggable. And editable. ![version](https://img.shields.io/github/release/hchiam/draggable?style=flat-square)

[Live demo](https://codepen.io/hchiam/pen/pobxgBo)

```js
https://cdn.jsdelivr.net/gh/hchiam/draggable@main/makeElementDraggable.js
https://cdn.jsdelivr.net/gh/hchiam/draggable@main/makeElementDraggableAndEditable.js
```

```js
https://cdn.jsdelivr.net/gh/hchiam/draggable@3.1.0/makeElementDraggable.js
https://cdn.jsdelivr.net/gh/hchiam/draggable@3.1.0/makeElementDraggableAndEditable.js
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
  // optional:
  snapPoints: [
    {
      x: 200,
      y: 200,
    },
  ],
  snapGridSize: 25, // optional
};
// now to actually use it:
makeElementDraggableAndEditable(element, settings);
// or: makeElementDraggable(element, settings);
```

CDN usage:

```html
<script
  src="https://cdn.jsdelivr.net/gh/hchiam/draggable@3.1.0/makeElementDraggable.js"
  integrity="sha384-HEvXA8ROpDajvXCA2Bp8arOr8CZWLQ7UoffoOwPNF9dRcIQGDY17yWmGBRLx5tNZ"
  crossorigin="anonymous"
></script>
```

```html
<script
  src="https://cdn.jsdelivr.net/gh/hchiam/draggable@3.1.0/makeElementDraggableAndEditable.js"
  integrity="sha384-9QUf72ouDKSNdfrlhALjl76VLYcGwV2Kv1DhWuTHiAdfawL+dNoASnaLwlk35Ci1"
  crossorigin="anonymous"
></script>
```

```bash
# get the things to put into integrity="...":
bash get-integrity.sh;
```
