# Template for convenience script repos ![version](https://img.shields.io/github/release/hchiam/convenience?style=flat-square) [![HitCount](http://hits.dwyl.com/hchiam/convenience.svg)](http://hits.dwyl.com/hchiam/convenience)

With [`gh`](https://github.com/hchiam/learning-gh), you can quickly use this repo from CLI: `gh repo clone hchiam/convenience && cd convenience`. Everything else in this README.md is boilerplate, including the heading above.

```js
https://cdn.jsdelivr.net/gh/hchiam/convenience@master/someFileName.js
```

```js
https://cdn.jsdelivr.net/gh/hchiam/convenience@1.0.0/someFileName.js
```

[Live demo](https://codepen.io/hchiam/pen/...)

Example usage:

```js
...
```

CDN usage:

```html
<script
  src="https://cdn.jsdelivr.net/gh/hchiam/convenience@1.0.0/someFileName.js"
  integrity="sha384-L0ng4lphAnum3r1C57r1N9"
  crossorigin="anonymous"
></script>
```

```bash
# get the thing to put into integrity="...":
source get-integrity.sh; sha someFileName.js
```
