function makeElementDraggable(element, settings) {
  var mouseX = 0;
  var mouseY = 0;
  var disableStyleReset = (settings && settings.disableStyleReset) || false;
  element.addEventListener("mousedown", setupOnMouseDown);
  if (!disableStyleReset || typeof disableStyleReset !== "boolean") {
    element.style.marginBlockStart = "initial";
    element.style.position = "absolute";
  }

  function setupOnMouseDown(event) {
    var e = event || window.event;
    e.preventDefault();
    mouseX = e.clientX;
    mouseY = e.clientY;
    document.addEventListener("mouseup", stopDraggingOnMouseUp);
    document.addEventListener("mousemove", dragOnMouseMove);
    if (settings && settings.mouseDownCallback) {
      settings.mouseDownCallback(element);
    }
  }

  function dragOnMouseMove(event) {
    element.focus();
    var e = event || window.event;
    e.preventDefault();
    const xChange = e.clientX - mouseX;
    const yChange = e.clientY - mouseY;
    mouseX = e.clientX;
    mouseY = e.clientY;
    element.style.left = element.offsetLeft + xChange + "px";
    element.style.top = element.offsetTop + yChange + "px";
    if (settings && settings.mouseMoveCallback) {
      settings.mouseMoveCallback(element);
    }
  }

  function stopDraggingOnMouseUp() {
    document.removeEventListener("mouseup", stopDraggingOnMouseUp);
    document.removeEventListener("mousemove", dragOnMouseMove);
    if (settings && settings.mouseUpCallback) {
      settings.mouseUpCallback(element);
    }
  }
}
