# Make anything draggable. And editable. ![version](https://img.shields.io/github/release/hchiam/draggable?style=flat-square) [![HitCount](http://hits.dwyl.com/hchiam/draggable.svg)](http://hits.dwyl.com/hchiam/draggable)

```js
https://cdn.jsdelivr.net/gh/hchiam/draggable@master/makeElementDraggable.js
https://cdn.jsdelivr.net/gh/hchiam/draggable@master/makeElementDraggableAndEditable.js
```

```js
https://cdn.jsdelivr.net/gh/hchiam/draggable@1.0.0/makeElementDraggable.js
https://cdn.jsdelivr.net/gh/hchiam/draggable@1.0.0/makeElementDraggableAndEditable.js
```

[Live demo](https://codepen.io/hchiam/pen/pobxgBo)

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
// or: makeElementDraggable(element, settings);
```

CDN usage:

```html
<script
  src="https://cdn.jsdelivr.net/gh/hchiam/draggable@1.0.0/makeElementDraggableAndEditable.js"
  integrity="sha384-GZso6VrTTzL1tHZCyf6OW5uOt2pdqZq7VfHgy1yon9CiJULGllxBmQuw4sS9YQoY"
  crossorigin="anonymous"
></script>
```

```html
<script
  src="https://cdn.jsdelivr.net/gh/hchiam/draggable@1.0.0/makeElementDraggableAndEditable.js"
  integrity="sha384-TmrMybYBXmQPWeftdLUzfNh93lMz3CEBkuB1p4KUIhW+yJSdQYelC1aBB7tnqjve"
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
