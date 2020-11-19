function makeElementDraggableAndEditable(element, settings) {
  var mouseX = 0;
  var mouseY = 0;
  var disableStyleReset = (settings && settings.disableStyleReset) || false;
  var detectAsClickToEdit = false;
  // element.contentEditable = true;
  element.addEventListener("mousedown", setupOnMouseDown);
  element.addEventListener("touchstart", setupOnTouchStart, { passive: true });
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
    mouseX = e.clientX || (e.touches && e.touches.length && e.touches[0].pageX);
    mouseY = e.clientY || (e.touches && e.touches.length && e.touches[0].pageY);
    document.addEventListener("mouseup", stopDraggingOnMouseUp);
    document.addEventListener("mousemove", dragOnMouseMove);
    element.contentEditable = false;
    detectAsClickToEdit = true; // enable editing when only clicking
    if (settings && settings.mouseDownCallback) {
      settings.mouseDownCallback(element);
    }
  }
  function setupOnTouchStart(event) {
    var e = event || window.event;
    // e.preventDefault();
    mouseX = e.clientX || (e.touches && e.touches.length && e.touches[0].pageX);
    mouseY = e.clientY || (e.touches && e.touches.length && e.touches[0].pageY);
    document.addEventListener("touchend", stopDraggingOnTouchEnd);
    document.addEventListener("touchmove", dragOnTouchMove);
    element.contentEditable = false;
    detectAsClickToEdit = true; // enable editing when only clicking
    if (settings && settings.touchStartCallback) {
      settings.touchStartCallback(element);
    }
  }

  function dragOnMouseMove(event) {
    element.focus();
    var e = event || window.event;
    e.preventDefault();
    const xChange =
      e.clientX - mouseX ||
      (e.touches && e.touches.length && e.touches[0].pageX - mouseX);
    const yChange =
      e.clientY - mouseY ||
      (e.touches && e.touches.length && e.touches[0].pageY - mouseY);
    mouseX = e.clientX || (e.touches && e.touches.length && e.touches[0].pageX);
    mouseY = e.clientY || (e.touches && e.touches.length && e.touches[0].pageY);
    element.style.left = element.offsetLeft + xChange + "px";
    element.style.top = element.offsetTop + yChange + "px";
    detectAsClickToEdit = false; // disabling editing when dragging
    if (settings && settings.mouseMoveCallback) {
      settings.mouseMoveCallback(element);
    }
  }

  function dragOnTouchMove(event) {
    element.focus();
    var e = event || window.event;
    e.preventDefault();
    const xChange =
      e.clientX - mouseX ||
      (e.touches && e.touches.length && e.touches[0].pageX - mouseX);
    const yChange =
      e.clientY - mouseY ||
      (e.touches && e.touches.length && e.touches[0].pageY - mouseY);
    mouseX = e.clientX || (e.touches && e.touches.length && e.touches[0].pageX);
    mouseY = e.clientY || (e.touches && e.touches.length && e.touches[0].pageY);
    element.style.left = element.offsetLeft + xChange + "px";
    element.style.top = element.offsetTop + yChange + "px";
    if (settings && settings.touchMoveCallback) {
      settings.touchMoveCallback(element);
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

  function stopDraggingOnTouchEnd() {
    document.removeEventListener("touchend", stopDraggingOnTouchEnd);
    document.removeEventListener("touchmove", dragOnTouchMove);
    if (detectAsClickToEdit) {
      element.contentEditable = true; // disabling editing when stopped dragging
      element.focus();
      element.removeEventListener("touchstart", setupOnTouchStart);
    }
    if (settings && settings.touchEndCallback) {
      settings.touchEndCallback(element);
    }
  }

  function resetEditableOnBlur() {
    element.contentEditable = false;
    element.addEventListener("mousedown", setupOnMouseDown);
    element.addEventListener("touchstart", setupOnTouchStart, {
      passive: true,
    });
    if (settings && settings.blurCallback) {
      settings.blurCallback(element);
    }
  }
}
