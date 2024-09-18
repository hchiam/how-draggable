"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeElementDraggableAndEditable = void 0;
function makeElementDraggableAndEditable(element, settings) {
  element.mouseX = 0;
  element.mouseY = 0;
  element.disableStyleReset = (settings && settings.disableStyleReset) || false;
  element.snapPoints = (settings && settings.snapPoints) || []; // [ {x,y}, ... ]
  element.disableEditing = (settings && settings.disableEditing) || false;
  element.detectAsClickToEdit = false;
  element.startedTyping = false;
  // element.contentEditable = true;
  element.addEventListener("mousedown", setupOnMouseDown, false);
  element.addEventListener("touchstart", setupOnTouchStart, { passive: false });
  element.addEventListener("blur", resetEditableOnBlur, false);
  setupAriaLabel(element);
  setupKeyboardEvents(element);
  function setupAriaLabel(element) {
    var ariaLabel = "";
    if (settings && settings.customAriaLabel) {
      ariaLabel = settings.customAriaLabel(element, settings);
    } else {
      var typeAnnouncement = "";
      if (settings) {
        if (!settings.disableKeyboardMovement) {
          typeAnnouncement += "Draggable";
          if (!settings.disableEditing) {
            typeAnnouncement += " and editable";
          }
        } else if (!settings.disableEditing) {
          typeAnnouncement += "Editable";
        }
      }
      typeAnnouncement += ". ";
      ariaLabel =
        typeAnnouncement +
        " " +
        (settings && settings.disableKeyboardMovement
          ? ""
          : "To enter move mode, hit escape then the arrow keys.") +
        " " +
        (settings && settings.disableEditing
          ? ""
          : "To enter edit mode, hit any letter. ") +
        " Text: " +
        element.innerText;
    }
    element.setAttribute("aria-label", ariaLabel);
  }
  function setupOnMouseDown(event) {
    var e = event || window.event;
    e.preventDefault();
    element.mouseX =
      e.clientX || (e.touches && e.touches.length && e.touches[0].pageX);
    element.mouseY =
      e.clientY || (e.touches && e.touches.length && e.touches[0].pageY);
    document.addEventListener("mouseup", stopDraggingOnMouseUp, false);
    document.addEventListener("mousemove", dragOnMouseMove, { passive: false });
    element.contentEditable = "false";
    element.detectAsClickToEdit = true && !element.disableEditing; // enable editing when only clicking
    if (settings && settings.mouseDownCallback) {
      settings.mouseDownCallback(element);
    }
  }
  function setupOnTouchStart(event) {
    var e = event || window.event;
    e.preventDefault();
    element.mouseX =
      e.clientX || (e.touches && e.touches.length && e.touches[0].pageX);
    element.mouseY =
      e.clientY || (e.touches && e.touches.length && e.touches[0].pageY);
    document.addEventListener("touchend", stopDraggingOnTouchEnd, false);
    document.addEventListener("touchmove", dragOnTouchMove, { passive: false });
    element.contentEditable = "false";
    element.detectAsClickToEdit = true && !element.disableEditing; // enable editing when only clicking
    if (settings && settings.touchStartCallback) {
      settings.touchStartCallback(element);
    }
  }
  function dragOnMouseMove(event) {
    drag(event);
    element.detectAsClickToEdit = false; // disabling editing when dragging
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
  var firstTimeDragging = true;
  function drag(event) {
    element.focus();
    var e = event || window.event;
    e.preventDefault();
    if (firstTimeDragging) {
      firstTimeDragging = false;
      var xChange =
        e.clientX - element.getBoundingClientRect().left ||
        (e.touches &&
          e.touches.length &&
          e.touches[0].pageX - element.getBoundingClientRect().left);
      var yChange =
        e.clientY - element.getBoundingClientRect().top ||
        (e.touches &&
          e.touches.length &&
          e.touches[0].pageY - element.getBoundingClientRect().top);
      element.mouseX =
        e.clientX || (e.touches && e.touches.length && e.touches[0].pageX);
      element.mouseY =
        e.clientY || (e.touches && e.touches.length && e.touches[0].pageY);
      element.style.left = element.mouseX - xChange + "px";
      element.style.top = element.mouseY - yChange + "px";
      makePositionDraggable(element);
    } else {
      var xChange =
        e.clientX - element.mouseX ||
        (e.touches && e.touches.length && e.touches[0].pageX - element.mouseX);
      var yChange =
        e.clientY - element.mouseY ||
        (e.touches && e.touches.length && e.touches[0].pageY - element.mouseY);
      element.mouseX =
        e.clientX || (e.touches && e.touches.length && e.touches[0].pageX);
      element.mouseY =
        e.clientY || (e.touches && e.touches.length && e.touches[0].pageY);
      element.style.left =
        Number(element.style.left.replace("px", "")) + xChange + "px";
      element.style.top =
        Number(element.style.top.replace("px", "")) + yChange + "px";
    }
  }
  var alreadyMadePositionDraggable = false;
  function makePositionDraggable(element) {
    if (alreadyMadePositionDraggable) return;
    alreadyMadePositionDraggable = true;
    if (
      !element.disableStyleReset ||
      typeof element.disableStyleReset !== "boolean"
    ) {
      element.style.setProperty(
        "width",
        element.getBoundingClientRect().width + "px",
        "important"
      );
      element.style.setProperty(
        "height",
        element.getBoundingClientRect().height + "px",
        "important"
      );
      element.style.marginBlockStart = "initial";
      element.style.minWidth = "1ch";
      element.style.minHeight = "1em";
      element.style.position = "fixed";
    }
  }
  function stopDraggingOnMouseUp() {
    document.removeEventListener("mouseup", stopDraggingOnMouseUp);
    document.removeEventListener("mousemove", dragOnMouseMove);
    if (element.detectAsClickToEdit) {
      element.contentEditable = "true"; // disabling editing when stopped dragging
      element.focus();
      element.removeEventListener("mousedown", setupOnMouseDown);
    }
    snap(element);
    if (settings && settings.mouseUpCallback) {
      settings.mouseUpCallback(element);
    }
  }
  function stopDraggingOnTouchEnd() {
    document.removeEventListener("touchend", stopDraggingOnTouchEnd);
    document.removeEventListener("touchmove", dragOnTouchMove);
    if (element.detectAsClickToEdit) {
      element.contentEditable = "true"; // disabling editing when stopped dragging
      element.focus();
      element.removeEventListener("touchstart", setupOnTouchStart);
    }
    snap(element);
    if (settings && settings.touchEndCallback) {
      settings.touchEndCallback(element);
    }
  }
  function resetEditableOnBlur() {
    element.contentEditable = "false";
    element.addEventListener("mousedown", setupOnMouseDown, false);
    element.addEventListener("touchstart", setupOnTouchStart, {
      passive: false,
    });
    element.startedTyping = false;
    if (settings && settings.blurCallback) {
      settings.blurCallback(element);
    }
  }
  var snapTimer;
  function snap(element) {
    var _a;
    var elementRect = element.getBoundingClientRect();
    var left = elementRect.left;
    var top = elementRect.top;
    var width = elementRect.width;
    var height = elementRect.height;
    var middleLeft = left + width / 2;
    var middleTop = top + height / 2;
    var shouldRunSnapCallback = false;
    var snapWithinContainer = undefined;
    if (settings && settings.snapWithinElements) {
      settings.snapWithinElements.some(function (container) {
        if (container.checkVisibility()) {
          var containerRect = container.getBoundingClientRect();
          var containerStyles = getComputedStyle(container);
          var isCenterWithinContainer =
            middleLeft >= containerRect.left &&
            middleLeft <= containerRect.left + containerRect.width &&
            middleTop >= containerRect.top &&
            middleTop <= containerRect.top + containerRect.height;
          if (isCenterWithinContainer) {
            var newLeft =
              containerRect.left + containerRect.width / 2 - width / 2;
            var newTop =
              containerRect.top + containerRect.height / 2 - height / 2;
            element.style.left = newLeft + "px";
            element.style.top = newTop + "px";
            snapWithinContainer = container;
            shouldRunSnapCallback = true;
            snapTimer = setTimeout(function () {
              return true; // exit Array.some()
            }, 100);
          }
        }
      });
    }
    if (settings && settings.snapGridSize) {
      var threshold = settings.snapGridSize;
      var newLeft = snapToGrid(middleLeft, threshold) - width / 2;
      var newTop = snapToGrid(middleTop, threshold) - height / 2;
      element.style.left = newLeft + "px";
      element.style.top = newTop + "px";
      shouldRunSnapCallback = true;
    }
    if (element.snapPoints && element.snapPoints.length) {
      var threshold =
        (_a = settings && settings.snapThreshold) !== null && _a !== void 0
          ? _a
          : 50;
      clearTimeout(snapTimer);
      element.snapPoints.some(function (snapPoint) {
        if (isSnapPointInRange(snapPoint, middleLeft, middleTop, threshold)) {
          var newLeft = snapPoint.x - width / 2;
          var newTop = snapPoint.y - height / 2;
          element.style.left = newLeft + "px";
          element.style.top = newTop + "px";
          shouldRunSnapCallback = true;
          snapTimer = setTimeout(function () {
            return true; // exit Array.some()
          }, 100);
        }
      });
    }
    if (shouldRunSnapCallback && settings && settings.snapCallback) {
      settings.snapCallback(
        Number(element.style.left.replace("px", "")),
        Number(element.style.top.replace("px", "")),
        snapWithinContainer
      );
    }
  }
  function snapToGrid(value, gridSize) {
    gridSize = gridSize || 25;
    var newValue = gridSize * Math.floor(value / gridSize);
    return newValue;
  }
  function isSnapPointInRange(snapPoint, left, top, threshold) {
    threshold = threshold || 50;
    var a = snapPoint.x - left;
    var b = snapPoint.y - top;
    var c = Math.sqrt(a * a + b * b);
    return c <= threshold;
  }
  function setupKeyboardEvents(element) {
    element.addEventListener(
      "keyup",
      function (event) {
        var _a;
        event.preventDefault();
        var arrowKey = getArrowKey(event);
        var selectionRange = null;
        try {
          selectionRange =
            window.getSelection() &&
            ((_a = window.getSelection()) === null || _a === void 0
              ? void 0
              : _a.getRangeAt(0));
        } catch (e) {}
        var notUsingKeyboardArrowsToSelectLetters =
          !selectionRange || !selectionRange.startOffset;
        if (
          (!settings || !settings.disableKeyboardMovement) &&
          arrowKey &&
          (!element.startedTyping || notUsingKeyboardArrowsToSelectLetters)
        ) {
          element.detectAsClickToEdit = false;
          element.contentEditable = "false";
          moveWithArrowKeys(element, arrowKey);
        } else if (isEscKey(event) || isTabKey(event)) {
          element.startedTyping = false;
          element.detectAsClickToEdit = false;
          element.contentEditable = "false";
          element.blur();
          element.focus();
        } else if (
          (!settings || !settings.disableEditing) &&
          !isTabKey(event)
        ) {
          // if typing inside:
          var didNotSelectAnyText =
            selectionRange &&
            (!selectionRange.startOffset ||
              selectionRange.startOffset > element.innerText.length);
          if (!element.startedTyping && didNotSelectAnyText) {
            setCaret(element);
          }
          element.startedTyping = true;
          element.detectAsClickToEdit = true;
          element.contentEditable = "true";
          setupAriaLabel(element); // update
          element.focus();
        }
      },
      false
    );
  }
  function setCaret(element) {
    var range = document.createRange();
    range.setStart(element, 0);
    range.collapse(true);
    var selection = window.getSelection();
    selection === null || selection === void 0
      ? void 0
      : selection.removeAllRanges();
    selection === null || selection === void 0
      ? void 0
      : selection.addRange(range);
  }
  function moveWithArrowKeys(element, arrowKey) {
    var offsetLeft = element.offsetLeft;
    var offsetTop = element.offsetTop;
    var scrollDelta = 10;
    switch (arrowKey) {
      case "ArrowLeft":
        offsetLeft -= scrollDelta;
        break;
      case "ArrowUp":
        offsetTop -= scrollDelta;
        break;
      case "ArrowRight":
        offsetLeft += scrollDelta;
        break;
      case "ArrowDown":
        offsetTop += scrollDelta;
        break;
      default:
        break;
    }
    element.style.left = offsetLeft + "px";
    element.style.top = offsetTop + "px";
    makePositionDraggable(element);
    if (settings && settings.keyboardMoveCallback) {
      settings.keyboardMoveCallback(element);
    }
  }
  function getArrowKey(event) {
    var e = event || window.event;
    var key = e.key || e.code || e.keyCode || e.which;
    switch (key) {
      case "ArrowLeft":
      case "Left":
      case 37:
        return "ArrowLeft";
      case "ArrowUp":
      case "Up":
      case 38:
        return "ArrowUp";
      case "ArrowRight":
      case "Right":
      case 39:
        return "ArrowRight";
      case "ArrowDown":
      case "Down":
      case 40:
        return "ArrowDown";
      default:
        return "";
    }
  }
  function isTabKey(event) {
    var e = event || window.event;
    var key = e.key || e.code || e.keyCode || e.which;
    return key === "Tab" || key === 9;
  }
  function isEscKey(event) {
    var e = event || window.event;
    var key = e.key || e.code || e.keyCode || e.which;
    return key === "Escape" || key === "Esc" || key === 27;
  }
}
exports.makeElementDraggableAndEditable = makeElementDraggableAndEditable;
