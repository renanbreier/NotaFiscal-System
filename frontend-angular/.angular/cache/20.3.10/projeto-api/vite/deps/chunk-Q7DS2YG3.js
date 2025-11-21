import {
  createEvent,
  eventData,
  eventDelta,
  isDxMouseWheelEvent,
  isTouchEvent,
  m_dom_default,
  m_emitter_default,
  needSkipEvent
} from "./chunk-ICLEXNO5.js";
import {
  m_devices_default,
  sign
} from "./chunk-DONQLAZQ.js";
import {
  ready_callbacks_default,
  renderer_default,
  styleProp
} from "./chunk-Q6FQHMWM.js";
import {
  call_once_default,
  m_events_engine_default
} from "./chunk-3BIZTSZ2.js";
import {
  isDefined,
  noop
} from "./chunk-G6GPM76E.js";

// node_modules/devextreme/esm/__internal/events/gesture/m_emitter.gesture.js
var ready = ready_callbacks_default.add;
var {
  abs
} = Math;
var TOUCH_BOUNDARY = 10;
var supportPointerEvents = function() {
  return styleProp("pointer-events");
};
var setGestureCover = call_once_default((() => {
  const isDesktop = "desktop" === m_devices_default.real().deviceType;
  if (!supportPointerEvents() || !isDesktop) {
    return noop;
  }
  const $cover = renderer_default("<div>").addClass("dx-gesture-cover").css("pointerEvents", "none");
  m_events_engine_default.subscribeGlobal($cover, "dxmousewheel", ((e) => {
    e.preventDefault();
  }));
  ready((() => {
    $cover.appendTo("body");
  }));
  return function(toggle, cursor) {
    $cover.css("pointerEvents", toggle ? "all" : "none");
    toggle && $cover.css("cursor", cursor);
  };
}));
var gestureCover = function(toggle, cursor) {
  const gestureCoverStrategy = setGestureCover();
  gestureCoverStrategy(toggle, cursor);
};
var GestureEmitter = m_emitter_default.inherit({
  gesture: true,
  configure(data) {
    this.getElement().css("msTouchAction", data.immediate ? "pinch-zoom" : "");
    this.callBase(data);
  },
  allowInterruptionByMouseWheel() {
    return 2 !== this._stage;
  },
  getDirection() {
    return this.direction;
  },
  _cancel() {
    this.callBase.apply(this, arguments);
    this._toggleGestureCover(false);
    this._stage = 0;
  },
  start(e) {
    if (e._needSkipEvent || needSkipEvent(e)) {
      this._cancel(e);
      return;
    }
    this._startEvent = createEvent(e);
    this._startEventData = eventData(e);
    this._stage = 1;
    this._init(e);
    this._setupImmediateTimer();
  },
  _setupImmediateTimer() {
    clearTimeout(this._immediateTimer);
    this._immediateAccepted = false;
    if (!this.immediate) {
      return;
    }
    if (0 === this.immediateTimeout) {
      this._immediateAccepted = true;
      return;
    }
    this._immediateTimer = setTimeout((() => {
      this._immediateAccepted = true;
    }), this.immediateTimeout ?? 180);
  },
  move(e) {
    if (1 === this._stage && this._directionConfirmed(e)) {
      this._stage = 2;
      this._resetActiveElement();
      this._toggleGestureCover(true);
      this._clearSelection(e);
      this._adjustStartEvent(e);
      this._start(this._startEvent);
      if (0 === this._stage) {
        return;
      }
      this._requestAccept(e);
      this._move(e);
      this._forgetAccept();
    } else if (2 === this._stage) {
      this._clearSelection(e);
      this._move(e);
    }
  },
  _directionConfirmed(e) {
    const touchBoundary = this._getTouchBoundary(e);
    const delta = eventDelta(this._startEventData, eventData(e));
    const deltaX = abs(delta.x);
    const deltaY = abs(delta.y);
    const horizontalMove = this._validateMove(touchBoundary, deltaX, deltaY);
    const verticalMove = this._validateMove(touchBoundary, deltaY, deltaX);
    const direction = this.getDirection(e);
    const bothAccepted = "both" === direction && (horizontalMove || verticalMove);
    const horizontalAccepted = "horizontal" === direction && horizontalMove;
    const verticalAccepted = "vertical" === direction && verticalMove;
    return bothAccepted || horizontalAccepted || verticalAccepted || this._immediateAccepted;
  },
  _validateMove(touchBoundary, mainAxis, crossAxis) {
    return mainAxis && mainAxis >= touchBoundary && (this.immediate ? mainAxis >= crossAxis : true);
  },
  _getTouchBoundary(e) {
    return this.immediate || isDxMouseWheelEvent(e) ? 0 : TOUCH_BOUNDARY;
  },
  _adjustStartEvent(e) {
    const touchBoundary = this._getTouchBoundary(e);
    const delta = eventDelta(this._startEventData, eventData(e));
    this._startEvent.pageX += sign(delta.x) * touchBoundary;
    this._startEvent.pageY += sign(delta.y) * touchBoundary;
  },
  _resetActiveElement() {
    if ("ios" === m_devices_default.real().platform && this.getElement().find(":focus").length) {
      m_dom_default.resetActiveElement();
    }
  },
  _toggleGestureCover(toggle) {
    this._toggleGestureCoverImpl(toggle);
  },
  _toggleGestureCoverImpl(toggle) {
    const isStarted = 2 === this._stage;
    if (isStarted) {
      gestureCover(toggle, this.getElement().css("cursor"));
    }
  },
  _clearSelection(e) {
    if (isDxMouseWheelEvent(e) || isTouchEvent(e)) {
      return;
    }
    m_dom_default.clearSelection();
  },
  end(e) {
    this._toggleGestureCover(false);
    if (2 === this._stage) {
      this._end(e);
    } else if (1 === this._stage) {
      this._stop(e);
    }
    this._stage = 0;
  },
  dispose() {
    clearTimeout(this._immediateTimer);
    this.callBase.apply(this, arguments);
    this._toggleGestureCover(false);
  },
  _init: noop,
  _start: noop,
  _move: noop,
  _stop: noop,
  _end: noop
});
GestureEmitter.initialTouchBoundary = TOUCH_BOUNDARY;
GestureEmitter.touchBoundary = function(newBoundary) {
  if (isDefined(newBoundary)) {
    TOUCH_BOUNDARY = newBoundary;
    return;
  }
  return TOUCH_BOUNDARY;
};
var m_emitter_gesture_default = GestureEmitter;

export {
  m_emitter_gesture_default
};
//# sourceMappingURL=chunk-Q7DS2YG3.js.map
