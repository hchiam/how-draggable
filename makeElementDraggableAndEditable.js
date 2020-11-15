function makeElementDraggableAndEditable(element, settings) {
  var mouseX = 0;
  var mouseY = 0;
  var disableStyleReset = (settings && settings.disableStyleReset) || false;
  var detectAsClickToEdit = false;
  element.addEventListener("mousedown", setupOnMouseDown);
  element.addEventListener("blur", resetEditableOnBlur);
  if (!disableStyleReset || typeof disableStyleReset !== "boolean") {
    element.style.marginBlockStart = "initial";
    element.style.position = "absolute";
    element.style.minWidth = "1ch";
    element.style.minHeight = "1em";
  }

  function setupOnMouseDown(event) {
    var e = event || window.event;
    e.preventDefault();
    mouseX = e.clientX;
    mouseY = e.clientY;
    document.addEventListener("mouseup", stopDraggingOnMouseUp);
    document.addEventListener("mousemove", dragOnMouseMove);
    element.contentEditable = false;
    detectAsClickToEdit = true; // enable editing when only clicking
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
    detectAsClickToEdit = false; // disabling editing when dragging
    if (settings && settings.mouseMoveCallback) {
      settings.mouseMoveCallback(element);
    }
  }

  function stopDraggingOnMouseUp() {
    document.removeEventListener("mouseup", stopDraggingOnMouseUp);
    document.removeEventListener("mousemove", dragOnMouseMove);
    if (detectAsClickToEdit) {
      element.contentEditable = true; // disabling editing when stopped dragging
      element.focus();
      element.removeEventListener("mousedown", setupOnMouseDown);
    }
    if (settings && settings.mouseUpCallback) {
      settings.mouseUpCallback(element);
    }
  }

  function resetEditableOnBlur() {
    element.contentEditable = false;
    element.addEventListener("mousedown", setupOnMouseDown);
    if (settings && settings.blurCallback) {
      settings.blurCallback(element);
    }
  }
}
