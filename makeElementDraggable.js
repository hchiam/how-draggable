function makeElementDraggable(element, settings) {
  var mouseX = 0;
  var mouseY = 0;
  var disableStyleReset = (settings && settings.disableStyleReset) || false;
  element.addEventListener("mousedown", setupOnMouseDown);
  element.addEventListener("touchstart", setupOnTouchStart, { passive: true });
  if (!disableStyleReset || typeof disableStyleReset !== "boolean") {
    element.style.marginBlockStart = "initial";
    element.style.position = "absolute";
  }

  function setupOnMouseDown(event) {
    var e = event || window.event;
    e.preventDefault();
    mouseX = e.clientX || (e.touches && e.touches.length && e.touches[0].pageX);
    mouseY = e.clientY || (e.touches && e.touches.length && e.touches[0].pageY);
    document.addEventListener("mouseup", stopDraggingOnMouseUp);
    document.addEventListener("mousemove", dragOnMouseMove);
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
    if (settings && settings.touchStartCallback) {
      settings.touchStartCallback(element);
    }
  }

  function dragOnMouseMove(event) {
    drag(event);
    if (settings && settings.mouseMoveCallback) {
      settings.mouseMoveCallback(element);
    }
  }

  function dragOnTouchMove(event) {
    drag(event);
    if (settings && settings.touchMoveCallback) {
      settings.touchMoveCallback(element);
    }
  }

  function drag(event) {
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
  }

  function stopDraggingOnMouseUp() {
    document.removeEventListener("mouseup", stopDraggingOnMouseUp);
    document.removeEventListener("mousemove", dragOnMouseMove);
    if (settings && settings.mouseUpCallback) {
      settings.mouseUpCallback(element);
    }
  }

  function stopDraggingOnTouchEnd() {
    document.removeEventListener("touchend", stopDraggingOnTouchEnd);
    document.removeEventListener("touchmove", dragOnTouchMove);
    if (settings && settings.touchEndCallback) {
      settings.touchEndCallback(element);
    }
  }
}
