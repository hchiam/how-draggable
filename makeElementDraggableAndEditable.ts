import {
  DraggableElementOrEvent,
  DraggableSettings,
  SnapPoint,
} from "./makeDraggableShared";

export function makeElementDraggableAndEditable(
  element: DraggableElementOrEvent,
  settings: DraggableSettings
): void {
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

  function setupAriaLabel(element: DraggableElementOrEvent) {
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

  function setupOnMouseDown(event: MouseEvent | TouchEvent) {
    var e = event || (window.event as MouseEvent | TouchEvent);
    e.preventDefault();
    element.mouseX =
      (e as MouseEvent).clientX ||
      ((e as TouchEvent).touches &&
        (e as TouchEvent).touches.length &&
        (e as TouchEvent).touches[0].pageX);
    element.mouseY =
      (e as MouseEvent).clientY ||
      ((e as TouchEvent).touches &&
        (e as TouchEvent).touches.length &&
        (e as TouchEvent).touches[0].pageY);
    document.addEventListener("mouseup", stopDraggingOnMouseUp, false);
    document.addEventListener("mousemove", dragOnMouseMove, { passive: false });
    element.contentEditable = "false";
    element.detectAsClickToEdit = true && !element.disableEditing; // enable editing when only clicking
    if (settings && settings.mouseDownCallback) {
      settings.mouseDownCallback(element);
    }
  }
  function setupOnTouchStart(event: MouseEvent | TouchEvent) {
    var e = event || (window.event as MouseEvent | TouchEvent);
    e.preventDefault();
    element.mouseX =
      (e as MouseEvent).clientX ||
      ((e as TouchEvent).touches &&
        (e as TouchEvent).touches.length &&
        (e as TouchEvent).touches[0].pageX);
    element.mouseY =
      (e as MouseEvent).clientY ||
      ((e as TouchEvent).touches &&
        (e as TouchEvent).touches.length &&
        (e as TouchEvent).touches[0].pageY);
    document.addEventListener("touchend", stopDraggingOnTouchEnd, false);
    document.addEventListener("touchmove", dragOnTouchMove, { passive: false });
    element.contentEditable = "false";
    element.detectAsClickToEdit = true && !element.disableEditing; // enable editing when only clicking
    if (settings && settings.touchStartCallback) {
      settings.touchStartCallback(element);
    }
  }

  function dragOnMouseMove(event: MouseEvent) {
    drag(event);
    element.detectAsClickToEdit = false; // disabling editing when dragging
    if (settings && settings.mouseMoveCallback) {
      settings.mouseMoveCallback(element);
    }
  }

  function dragOnTouchMove(event: TouchEvent) {
    drag(event);
    if (settings && settings.touchMoveCallback) {
      settings.touchMoveCallback(element);
    }
  }

  var firstTimeDragging = true;
  function drag(event: MouseEvent | TouchEvent) {
    element.focus();
    var e = event || (window.event as MouseEvent | TouchEvent);
    e.preventDefault();
    if (firstTimeDragging) {
      firstTimeDragging = false;
      var xChange =
        (e as MouseEvent).clientX - element.getBoundingClientRect().left ||
        ((e as TouchEvent).touches &&
          (e as TouchEvent).touches.length &&
          (e as TouchEvent).touches[0].pageX -
            element.getBoundingClientRect().left);
      var yChange =
        (e as MouseEvent).clientY - element.getBoundingClientRect().top ||
        ((e as TouchEvent).touches &&
          (e as TouchEvent).touches.length &&
          (e as TouchEvent).touches[0].pageY -
            element.getBoundingClientRect().top);
      element.mouseX =
        (e as MouseEvent).clientX ||
        ((e as TouchEvent).touches &&
          (e as TouchEvent).touches.length &&
          (e as TouchEvent).touches[0].pageX);
      element.mouseY =
        (e as MouseEvent).clientY ||
        ((e as TouchEvent).touches &&
          (e as TouchEvent).touches.length &&
          (e as TouchEvent).touches[0].pageY);
      element.style.left = element.mouseX - xChange + "px";
      element.style.top = element.mouseY - yChange + "px";

      makePositionDraggable(element);
    } else {
      var xChange =
        (e as MouseEvent).clientX - (element as any).mouseX ||
        ((e as TouchEvent).touches &&
          (e as TouchEvent).touches.length &&
          (e as TouchEvent).touches[0].pageX - (element as any).mouseX);
      var yChange =
        (e as MouseEvent).clientY - (element as any).mouseY ||
        ((e as TouchEvent).touches &&
          (e as TouchEvent).touches.length &&
          (e as TouchEvent).touches[0].pageY - (element as any).mouseY);
      element.mouseX =
        (e as MouseEvent).clientX ||
        ((e as TouchEvent).touches &&
          (e as TouchEvent).touches.length &&
          (e as TouchEvent).touches[0].pageX);
      element.mouseY =
        (e as MouseEvent).clientY ||
        ((e as TouchEvent).touches &&
          (e as TouchEvent).touches.length &&
          (e as TouchEvent).touches[0].pageY);
      element.style.left =
        Number(element.style.left.replace("px", "")) + xChange + "px";
      element.style.top =
        Number(element.style.top.replace("px", "")) + yChange + "px";
    }
  }

  var alreadyMadePositionDraggable = false;
  function makePositionDraggable(element: DraggableElementOrEvent) {
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

  var snapTimer: NodeJS.Timeout;
  function snap(element: DraggableElementOrEvent) {
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
      settings.snapWithinElements.some(function (container: HTMLElement) {
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
      var threshold = (settings && settings.snapThreshold) ?? 50;
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

  function snapToGrid(value: number, gridSize: number) {
    gridSize = gridSize || 25;
    var newValue = gridSize * Math.floor(value / gridSize);
    return newValue;
  }

  function isSnapPointInRange(
    snapPoint: SnapPoint,
    left: number,
    top: number,
    threshold: number
  ) {
    threshold = threshold || 50;
    var a = snapPoint.x - left;
    var b = snapPoint.y - top;
    var c = Math.sqrt(a * a + b * b);
    return c <= threshold;
  }

  function setupKeyboardEvents(element: DraggableElementOrEvent) {
    element.addEventListener(
      "keyup",
      function (event: KeyboardEvent) {
        event.preventDefault();
        var arrowKey = getArrowKey(event);
        var selectionRange = null;
        try {
          selectionRange =
            window.getSelection() && window.getSelection()?.getRangeAt(0);
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

  function setCaret(element: HTMLElement) {
    var range = document.createRange();
    range.setStart(element, 0);
    range.collapse(true);

    var selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  }

  function moveWithArrowKeys(element: HTMLElement, arrowKey: string) {
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

  function getArrowKey(event: KeyboardEvent): string {
    var e = event || (window.event as KeyboardEvent);
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

  function isTabKey(event: KeyboardEvent) {
    var e = event || (window.event as KeyboardEvent);
    var key = e.key || e.code || e.keyCode || e.which;
    return key === "Tab" || key === 9;
  }

  function isEscKey(event: KeyboardEvent) {
    var e = event || (window.event as KeyboardEvent);
    var key = e.key || e.code || e.keyCode || e.which;
    return key === "Escape" || key === "Esc" || key === 27;
  }
}
